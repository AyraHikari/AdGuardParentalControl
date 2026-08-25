"""AdGuard Home HTTP API client."""

from __future__ import annotations

import logging
from typing import Any

import aiohttp

_LOGGER = logging.getLogger(__name__)


class AdGuardHomeAPI:
    """Async client for AdGuard Home REST API."""

    def __init__(
        self,
        session: aiohttp.ClientSession,
        base_url: str,
        username: str,
        password: str,
        verify_ssl: bool = True,
    ) -> None:
        self._session = session
        self._base_url = base_url.rstrip("/")
        self._username = username
        self._password = password
        self._verify_ssl = verify_ssl
        self._token: str | None = None

    def _url(self, path: str) -> str:
        return f"{self._base_url}{path}"

    def _headers(self) -> dict[str, str]:
        h: dict[str, str] = {"Content-Type": "application/json"}
        if self._token:
            # AdGuard Home uses cookie-based session auth ("agh_session")
            h["Cookie"] = f"agh_session={self._token}"
        return h

    async def _request(
        self,
        method: str,
        path: str,
        json: Any = None,
        params: dict[str, Any] | None = None,
    ) -> Any:
        url = self._url(path)
        kwargs: dict[str, Any] = {
            "headers": self._headers(),
            "ssl": None if self._verify_ssl else False,
        }
        if json is not None:
            kwargs["json"] = json
        if params:
            kwargs["params"] = {k: v for k, v in params.items() if v is not None and v != ""}
        try:
            async with self._session.request(method, url, **kwargs) as resp:
                if resp.status == 401:
                    # Token expired, try login and retry
                    if await self.login():
                        kwargs["headers"] = self._headers()
                        async with self._session.request(method, url, **kwargs) as retry:
                            retry.raise_for_status()
                            if retry.content_type == "application/json":
                                return await retry.json()
                            return None
                    resp.raise_for_status()
                resp.raise_for_status()
                if resp.content_type == "application/json":
                    return await resp.json()
                return None
        except aiohttp.ClientError as err:
            _LOGGER.error("AdGuard API error %s %s: %s", method, path, err)
            raise

    # ── Auth ──────────────────────────────────────────────────

    async def login(self) -> bool:
        """Authenticate and store token.

        AdGuard Home /control/login returns ``text/plain`` ("OK") on
        success.  The session token is delivered via the ``Set-Cookie``
        header as ``session_id=<token>``.
        """
        try:
            async with self._session.post(
                self._url("/control/login"),
                json={"name": self._username, "password": self._password},
                ssl=None if self._verify_ssl else False,
            ) as resp:
                resp.raise_for_status()
                token: str | None = None
                # aiohttp parses Set-Cookie into resp.cookies automatically
                # AdGuard Home uses cookie name "agh_session" (not "session_id")
                for cookie_name in ("agh_session", "session_id"):
                    session_cookie = resp.cookies.get(cookie_name)
                    if session_cookie:
                        token = session_cookie.value
                        break
                _LOGGER.debug(
                    "Login response: status=%s content_type=%s cookies=%s",
                    resp.status,
                    resp.content_type,
                    dict(resp.cookies),
                )
                # Fallback: some builds return JSON with "token"
                if token is None and "application/json" in resp.content_type:
                    data = await resp.json()
                    token = data.get("token")
                # Fallback: body may be the token itself
                if token is None:
                    body = (await resp.text()).strip()
                    _LOGGER.debug("Login body: %s", body)
                    if body and body != "OK":
                        token = body
                self._token = token
                if self._token:
                    return True
                _LOGGER.warning("AdGuard login succeeded but no token found")
                return False
        except aiohttp.ClientError as err:
            _LOGGER.error("AdGuard login failed: %s", err)
            return False

    # ── Query Log ─────────────────────────────────────────────

    async def get_query_log(
        self,
        *,
        search: str | None = None,
        older_than: str | None = None,
        response_status: str | None = None,
        reason: list[str] | None = None,
    ) -> dict[str, Any]:
        """Get AdGuard Home DNS query log entries.

        ``search`` can be a client IP or a domain.  ``older_than`` is the
        cursor returned by AdGuard Home for pagination.  The current AGH API
        also supports the ``reason`` filter; it is passed through when set.
        """
        params: dict[str, Any] = {
            "search": search,
            "older_than": older_than,
            "response_status": response_status,
        }
        if reason:
            params["reason"] = ",".join(reason)
        data = await self._request("GET", "/control/querylog", params=params)
        if not isinstance(data, dict):
            return {"oldest": "", "data": []}
        return {
            "oldest": data.get("oldest", ""),
            "data": data.get("data", []) if isinstance(data.get("data", []), list) else [],
        }

    async def get_querylog_info(self) -> dict[str, Any]:
        """Get AdGuard Home query log configuration."""
        data = await self._request("GET", "/control/querylog_info")
        return data if isinstance(data, dict) else {}

    # ── Filtering / User Rules ────────────────────────────────

    async def get_filtering_status(self) -> dict:
        return await self._request("GET", "/control/filtering/status")

    async def get_user_rules(self) -> list[str]:
        data = await self.get_filtering_status()
        return data.get("user_rules", [])

    async def set_user_rules(self, rules: list[str]) -> None:
        await self._request("POST", "/control/filtering/set_rules", {"rules": rules})

    # ── Blocked Services ──────────────────────────────────────

    async def get_blocked_services(self) -> list[str]:
        data = await self._request("GET", "/control/blocked_services/get")
        return data.get("ids", [])

    async def set_blocked_services(self, services: list[str]) -> None:
        await self._request("POST", "/control/blocked_services/set", {"ids": services})

    async def get_all_blocked_services(self) -> list[dict]:
        data = await self._request("GET", "/control/blocked_services/all")
        return data if isinstance(data, list) else []

    # ── Clients ───────────────────────────────────────────────

    async def get_clients(self) -> list[dict]:
        data = await self._request("GET", "/control/clients")
        clients = data.get("clients", []) if isinstance(data, dict) else []
        return clients

    async def add_client(self, client: dict) -> None:
        await self._request("POST", "/control/clients/add", client)

    async def update_client(self, name: str, data: dict) -> None:
        # AdGuard API requires 'name' inside the 'data' payload as well
        payload = {"name": name, "data": {**data, "name": name}}
        await self._request("POST", "/control/clients/update", payload)

    async def delete_client(self, name: str) -> None:
        await self._request("POST", "/control/clients/delete", {"name": name})

    # ── DNS Rewrites ──────────────────────────────────────────

    async def get_rewrites(self) -> list[dict]:
        data = await self._request("GET", "/control/rewrite/list")
        return data.get("rewrites", []) if isinstance(data, dict) else []

    async def add_rewrite(self, domain: str, answer: str) -> None:
        await self._request("POST", "/control/rewrite/add", {"domain": domain, "answer": answer})

    async def delete_rewrite(self, domain: str, answer: str) -> None:
        await self._request("POST", "/control/rewrite/delete", {"domain": domain, "answer": answer})

    # ── Protection Status ─────────────────────────────────────

    async def get_protection_status(self) -> dict:
        return await self._request("GET", "/control/status")

    async def set_protection(self, enabled: bool) -> None:
        await self._request("POST", "/control/protection", {"enabled": enabled})

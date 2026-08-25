export interface HomeAssistant {
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<void>;
  language: string;
  config: { time_zone: string };
}

export interface PolicyRule {
  target: string;
  action: "block" | "allow";
  rule_type: "domain" | "service" | "category";
}

export interface TimeSchedule {
  days: string[];
  time_from: string | null;
  time_to: string | null;
}

export interface CalendarCondition {
  calendar_entity: string | null;
  event_match: string[];
  invert: boolean;
}

export interface Profile {
  id: string;
  name: string;
  rules: PolicyRule[];
  default_action: "block" | "allow";
}

export interface Policy {
  id: string;
  name: string;
  time_schedule: TimeSchedule | null;
  calendar_condition: CalendarCondition | null;
  profile_id: string | null;
  rules: PolicyRule[];
  priority: number;
  description?: string;
  enabled?: boolean;
  tags?: string[];
  exceptions?: PolicyRule[];
}

export interface Group {
  id: string;
  name: string;
  member_names: string[];
  client_names: string[];
  assigned_policy_ids: string[];
}

export interface Member {
  id: string;
  name: string;
  client_names: string[];
  assigned_policy_ids: string[];
  exceptions: string[];
}

export interface Client {
  name: string;
  ids: string[];
  assigned_policy_ids: string[];
  exceptions: string[];
}

export interface GlobalState {
  profiles: Profile[];
  groups: Group[];
  members: Member[];
  clients: Client[];
  policies: Policy[];
  overrides: Override[];
  calendar_entities: string[];
}

export interface Override {
  id: string;
  target: string;
  target_type: "client" | "member";
  action: "allow_all" | "block_all" | "custom";
  custom_rules: PolicyRule[] | null;
  expires: string | null;
  created_at: string;
}

export interface ServiceInfo {
  id: string;
  name: string;
  icon: string;
  blocked: boolean;
  categories: string[];
}

export interface QueryLogEntry {
  time: string;
  client: string;
  client_id?: string;
  member_client?: string;
  question: { host?: string; name?: string; type: string; class?: string };
  answer?: Array<{ type: string; value: string; ttl?: number }>;
  elapsedMs?: string;
  reason?: string;
  rule?: string;
  filterId?: number;
  service_name?: string;
  status?: string;
  upstream?: string;
  client_proto?: string;
}

export interface QueryLogResponse {
  oldest: string;
  data: QueryLogEntry[];
}

export interface Status {
  rules_count: number;
  overrides_count: number;
  clients_count: number;
  policies_count: number;
  profiles_count: number;
  groups_count: number;
  members_count: number;
}

/** Extract the queried hostname from a query-log entry.  AGH ≥0.108 uses
 *  ``question.name``; older versions used ``question.host``. */
export function qhost(q: QueryLogEntry): string {
  return q.question?.name || q.question?.host || "";
}

export class AdguardWebsocketApi {
  constructor(private hass: HomeAssistant) {}

  async getState(): Promise<GlobalState> {
    return this.hass.callWS({ type: "adguard_pc/state/get" });
  }

  async updateState(state: GlobalState): Promise<void> {
    await this.hass.callWS({ type: "adguard_pc/state/update", state });
  }

  async getStatus(): Promise<Status> {
    return this.hass.callWS({ type: "adguard_pc/status" });
  }

  async sync(): Promise<{ rules_added: number; rules_removed: number; services_updated: number }> {
    return this.hass.callWS({ type: "adguard_pc/sync" });
  }

  // Profiles
  async listProfiles(): Promise<Profile[]> {
    return this.hass.callWS({ type: "adguard_pc/profiles/list" });
  }

  async createProfile(profile: Omit<Profile, "id">): Promise<Profile> {
    return this.hass.callWS({ type: "adguard_pc/profiles/create", profile });
  }

  async updateProfile(profile: Profile): Promise<Profile> {
    return this.hass.callWS({ type: "adguard_pc/profiles/update", profile });
  }

  async deleteProfile(profileId: string): Promise<void> {
    await this.hass.callWS({ type: "adguard_pc/profiles/delete", profile_id: profileId });
  }

  // Groups
  async listGroups(): Promise<Group[]> {
    return this.hass.callWS({ type: "adguard_pc/groups/list" });
  }

  async createGroup(group: Omit<Group, "id">): Promise<Group> {
    return this.hass.callWS({ type: "adguard_pc/groups/create", group });
  }

  async updateGroup(group: Group): Promise<Group> {
    return this.hass.callWS({ type: "adguard_pc/groups/update", group });
  }

  async deleteGroup(groupId: string): Promise<void> {
    await this.hass.callWS({ type: "adguard_pc/groups/delete", group_id: groupId });
  }

  // Members
  async listMembers(): Promise<Member[]> {
    return this.hass.callWS({ type: "adguard_pc/members/list" });
  }

  async createMember(member: Omit<Member, "id">): Promise<Member> {
    return this.hass.callWS({ type: "adguard_pc/members/create", member });
  }

  async updateMember(member: Member): Promise<Member> {
    return this.hass.callWS({ type: "adguard_pc/members/update", member });
  }

  async deleteMember(memberId: string): Promise<void> {
    await this.hass.callWS({ type: "adguard_pc/members/delete", member_id: memberId });
  }

  // Member Query Log
  async getMemberQueryLog(
    memberId: string,
    options: { limit?: number; search?: string; responseStatus?: string; olderThan?: string } = {}
  ): Promise<QueryLogResponse> {
    return this.hass.callWS({
      type: "adguard_pc/members/querylog",
      member_id: memberId,
      limit: options.limit ?? 50,
      search: options.search ?? "",
      response_status: options.responseStatus ?? "",
      older_than: options.olderThan ?? "",
    });
  }

  // Client Query Log
  async getClientQueryLog(clientId: string, options: { limit?: number; search?: string; responseStatus?: string; olderThan?: string } = {}): Promise<QueryLogResponse> {
    return this.hass.callWS({ type: "adguard_pc/clients/querylog", client_id: clientId, limit: options.limit ?? 100, search: options.search ?? "", response_status: options.responseStatus ?? "", older_than: options.olderThan ?? "" });
  }

  // Clients
  async listClients(): Promise<Client[]> {
    return this.hass.callWS({ type: "adguard_pc/clients/list" });
  }

  async createClient(client: Client): Promise<Client> {
    return this.hass.callWS({ type: "adguard_pc/clients/create", client });
  }

  async updateClient(client: Client): Promise<Client> {
    return this.hass.callWS({ type: "adguard_pc/clients/update", client });
  }

  async deleteClient(clientName: string): Promise<void> {
    await this.hass.callWS({ type: "adguard_pc/clients/delete", client_id: clientName });
  }

  // Policies
  async listPolicies(): Promise<Policy[]> {
    return this.hass.callWS({ type: "adguard_pc/policies/list" });
  }

  async createPolicy(policy: Omit<Policy, "id">): Promise<Policy> {
    return this.hass.callWS({ type: "adguard_pc/policies/create", policy });
  }

  async updatePolicy(policy: Policy): Promise<Policy> {
    return this.hass.callWS({ type: "adguard_pc/policies/update", policy });
  }

  async deletePolicy(policyId: string): Promise<void> {
    await this.hass.callWS({ type: "adguard_pc/policies/delete", policy_id: policyId });
  }

  // Overrides
  async setOverride(
    target: string,
    targetType: string,
    action: string,
    durationMinutes: number
  ): Promise<string> {
    return this.hass.callWS({
      type: "adguard_pc/overrides/set",
      target,
      target_type: targetType,
      action,
      duration_minutes: durationMinutes,
    });
  }

  async clearOverride(overrideId: string): Promise<void> {
    await this.hass.callWS({ type: "adguard_pc/overrides/clear", override_id: overrideId });
  }

  // Services
  async listServices(): Promise<ServiceInfo[]> {
    return this.hass.callWS({ type: "adguard_pc/services/list" });
  }

  async getBlockedServices(): Promise<string[]> {
    return this.hass.callWS({ type: "adguard_pc/services/blocked" });
  }

  async updateBlockedServices(blockedIds: string[]): Promise<void> {
    await this.hass.callWS({ type: "adguard_pc/services/update", blocked_ids: blockedIds });
  }
}

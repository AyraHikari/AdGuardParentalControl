/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ee=globalThis,ne=ee.ShadowRoot&&(ee.ShadyCSS===void 0||ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ce=Symbol(),pe=new WeakMap;let Ae=class{constructor(e,i,a){if(this._$cssResult$=!0,a!==ce)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i}get styleSheet(){let e=this.o;const i=this.t;if(ne&&e===void 0){const a=i!==void 0&&i.length===1;a&&(e=pe.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&pe.set(i,e))}return e}toString(){return this.cssText}};const He=t=>new Ae(typeof t=="string"?t:t+"",void 0,ce),k=(t,...e)=>{const i=t.length===1?t[0]:e.reduce((a,s,r)=>a+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[r+1],t[0]);return new Ae(i,t,ce)},Me=(t,e)=>{if(ne)t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of e){const a=document.createElement("style"),s=ee.litNonce;s!==void 0&&a.setAttribute("nonce",s),a.textContent=i.cssText,t.appendChild(a)}},ue=ne?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(const a of e.cssRules)i+=a.cssText;return He(i)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ne,defineProperty:Ee,getOwnPropertyDescriptor:De,getOwnPropertyNames:ke,getOwnPropertySymbols:Ve,getPrototypeOf:Te}=Object,D=globalThis,me=D.trustedTypes,Re=me?me.emptyScript:"",ae=D.reactiveElementPolyfillSupport,F=(t,e)=>t,te={toAttribute(t,e){switch(e){case Boolean:t=t?Re:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch{i=null}}return i}},de=(t,e)=>!Ne(t,e),_e={attribute:!0,type:String,converter:te,reflect:!1,useDefault:!1,hasChanged:de};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),D.litPropertyMetadata??(D.litPropertyMetadata=new WeakMap);let Z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=_e){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(e,i),!i.noAccessor){const a=Symbol(),s=this.getPropertyDescriptor(e,a,i);s!==void 0&&Ee(this.prototype,e,s)}}static getPropertyDescriptor(e,i,a){const{get:s,set:r}=De(this.prototype,e)??{get(){return this[i]},set(l){this[i]=l}};return{get:s,set(l){const d=s==null?void 0:s.call(this);r==null||r.call(this,l),this.requestUpdate(e,d,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_e}static _$Ei(){if(this.hasOwnProperty(F("elementProperties")))return;const e=Te(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F("properties"))){const i=this.properties,a=[...ke(i),...Ve(i)];for(const s of a)this.createProperty(s,i[s])}const e=this[Symbol.metadata];if(e!==null){const i=litPropertyMetadata.get(e);if(i!==void 0)for(const[a,s]of i)this.elementProperties.set(a,s)}this._$Eh=new Map;for(const[i,a]of this.elementProperties){const s=this._$Eu(i,a);s!==void 0&&this._$Eh.set(s,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const i=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const s of a)i.unshift(ue(s))}else e!==void 0&&i.push(ue(e));return i}static _$Eu(e,i){const a=i.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(i=>i(this))}addController(e){var i;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var i;(i=this._$EO)==null||i.delete(e)}_$E_(){const e=new Map,i=this.constructor.elementProperties;for(const a of i.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Me(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(i=>{var a;return(a=i.hostConnected)==null?void 0:a.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(i=>{var a;return(a=i.hostDisconnected)==null?void 0:a.call(i)})}attributeChangedCallback(e,i,a){this._$AK(e,a)}_$ET(e,i){var r;const a=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,a);if(s!==void 0&&a.reflect===!0){const l=(((r=a.converter)==null?void 0:r.toAttribute)!==void 0?a.converter:te).toAttribute(i,a.type);this._$Em=e,l==null?this.removeAttribute(s):this.setAttribute(s,l),this._$Em=null}}_$AK(e,i){var r,l;const a=this.constructor,s=a._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const d=a.getPropertyOptions(s),c=typeof d.converter=="function"?{fromAttribute:d.converter}:((r=d.converter)==null?void 0:r.fromAttribute)!==void 0?d.converter:te;this._$Em=s;const u=c.fromAttribute(i,d.type);this[s]=u??((l=this._$Ej)==null?void 0:l.get(s))??u,this._$Em=null}}requestUpdate(e,i,a,s=!1,r){var l;if(e!==void 0){const d=this.constructor;if(s===!1&&(r=this[e]),a??(a=d.getPropertyOptions(e)),!((a.hasChanged??de)(r,i)||a.useDefault&&a.reflect&&r===((l=this._$Ej)==null?void 0:l.get(e))&&!this.hasAttribute(d._$Eu(e,a))))return;this.C(e,i,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,i,{useDefault:a,reflect:s,wrapped:r},l){a&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,l??i??this[e]),r!==!0||l!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(i=void 0),this._$AL.set(e,i)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var a;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,l]of this._$Ep)this[r]=l;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,l]of s){const{wrapped:d}=l,c=this[r];d!==!0||this._$AL.has(r)||c===void 0||this.C(r,void 0,l,c)}}let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(a=this._$EO)==null||a.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(i)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(i)}willUpdate(e){}_$AE(e){var i;(i=this._$EO)==null||i.forEach(a=>{var s;return(s=a.hostUpdated)==null?void 0:s.call(a)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(i=>this._$ET(i,this[i]))),this._$EM()}updated(e){}firstUpdated(e){}};Z.elementStyles=[],Z.shadowRootOptions={mode:"open"},Z[F("elementProperties")]=new Map,Z[F("finalized")]=new Map,ae==null||ae({ReactiveElement:Z}),(D.reactiveElementVersions??(D.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const q=globalThis,ve=t=>t,ie=q.trustedTypes,ye=ie?ie.createPolicy("lit-html",{createHTML:t=>t}):void 0,Le="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,Se="?"+E,Oe=`<${Se}>`,U=document,J=()=>U.createComment(""),K=t=>t===null||typeof t!="object"&&typeof t!="function",he=Array.isArray,We=t=>he(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",le=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,fe=/>/g,O=RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,$e=/"/g,Ce=/^(?:script|style|textarea|title)$/i,je=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),o=je(1),G=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),we=new WeakMap,W=U.createTreeWalker(U,129);function Pe(t,e){if(!he(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ye!==void 0?ye.createHTML(e):e}const Ue=(t,e)=>{const i=t.length-1,a=[];let s,r=e===2?"<svg>":e===3?"<math>":"",l=B;for(let d=0;d<i;d++){const c=t[d];let u,f,p=-1,P=0;for(;P<c.length&&(l.lastIndex=P,f=l.exec(c),f!==null);)P=l.lastIndex,l===B?f[1]==="!--"?l=ge:f[1]!==void 0?l=fe:f[2]!==void 0?(Ce.test(f[2])&&(s=RegExp("</"+f[2],"g")),l=O):f[3]!==void 0&&(l=O):l===O?f[0]===">"?(l=s??B,p=-1):f[1]===void 0?p=-2:(p=l.lastIndex-f[2].length,u=f[1],l=f[3]===void 0?O:f[3]==='"'?$e:be):l===$e||l===be?l=O:l===ge||l===fe?l=B:(l=O,s=void 0);const N=l===O&&t[d+1].startsWith("/>")?" ":"";r+=l===B?c+Oe:p>=0?(a.push(u),c.slice(0,p)+Le+c.slice(p)+E+N):c+E+(p===-2?d:N)}return[Pe(t,r+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]};class Y{constructor({strings:e,_$litType$:i},a){let s;this.parts=[];let r=0,l=0;const d=e.length-1,c=this.parts,[u,f]=Ue(e,i);if(this.el=Y.createElement(u,a),W.currentNode=this.el.content,i===2||i===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=W.nextNode())!==null&&c.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(const p of s.getAttributeNames())if(p.endsWith(Le)){const P=f[l++],N=s.getAttribute(p).split(E),X=/([.?@])?(.*)/.exec(P);c.push({type:1,index:r,name:X[2],strings:N,ctor:X[1]==="."?Ze:X[1]==="?"?Ge:X[1]==="@"?Ie:se}),s.removeAttribute(p)}else p.startsWith(E)&&(c.push({type:6,index:r}),s.removeAttribute(p));if(Ce.test(s.tagName)){const p=s.textContent.split(E),P=p.length-1;if(P>0){s.textContent=ie?ie.emptyScript:"";for(let N=0;N<P;N++)s.append(p[N],J()),W.nextNode(),c.push({type:2,index:++r});s.append(p[P],J())}}}else if(s.nodeType===8)if(s.data===Se)c.push({type:2,index:r});else{let p=-1;for(;(p=s.data.indexOf(E,p+1))!==-1;)c.push({type:7,index:r}),p+=E.length-1}r++}}static createElement(e,i){const a=U.createElement("template");return a.innerHTML=e,a}}function I(t,e,i=t,a){var l,d;if(e===G)return e;let s=a!==void 0?(l=i._$Co)==null?void 0:l[a]:i._$Cl;const r=K(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((d=s==null?void 0:s._$AO)==null||d.call(s,!1),r===void 0?s=void 0:(s=new r(t),s._$AT(t,i,a)),a!==void 0?(i._$Co??(i._$Co=[]))[a]=s:i._$Cl=s),s!==void 0&&(e=I(t,s._$AS(t,e.values),s,a)),e}class ze{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:i},parts:a}=this._$AD,s=((e==null?void 0:e.creationScope)??U).importNode(i,!0);W.currentNode=s;let r=W.nextNode(),l=0,d=0,c=a[0];for(;c!==void 0;){if(l===c.index){let u;c.type===2?u=new Q(r,r.nextSibling,this,e):c.type===1?u=new c.ctor(r,c.name,c.strings,this,e):c.type===6&&(u=new Be(r,this,e)),this._$AV.push(u),c=a[++d]}l!==(c==null?void 0:c.index)&&(r=W.nextNode(),l++)}return W.currentNode=U,s}p(e){let i=0;for(const a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,i),i+=a.strings.length-2):a._$AI(e[i])),i++}}class Q{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,i,a,s){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=a,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=I(this,e,i),K(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==G&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):We(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==_&&K(this._$AH)?this._$AA.nextSibling.data=e:this.T(U.createTextNode(e)),this._$AH=e}$(e){var r;const{values:i,_$litType$:a}=e,s=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=Y.createElement(Pe(a.h,a.h[0]),this.options)),a);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(i);else{const l=new ze(s,this),d=l.u(this.options);l.p(i),this.T(d),this._$AH=l}}_$AC(e){let i=we.get(e.strings);return i===void 0&&we.set(e.strings,i=new Y(e)),i}k(e){he(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let a,s=0;for(const r of e)s===i.length?i.push(a=new Q(this.O(J()),this.O(J()),this,this.options)):a=i[s],a._$AI(r),s++;s<i.length&&(this._$AR(a&&a._$AB.nextSibling,s),i.length=s)}_$AR(e=this._$AA.nextSibling,i){var a;for((a=this._$AP)==null?void 0:a.call(this,!1,!0,i);e!==this._$AB;){const s=ve(e).nextSibling;ve(e).remove(),e=s}}setConnected(e){var i;this._$AM===void 0&&(this._$Cv=e,(i=this._$AP)==null||i.call(this,e))}}class se{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,a,s,r){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=i,this._$AM=s,this.options=r,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=_}_$AI(e,i=this,a,s){const r=this.strings;let l=!1;if(r===void 0)e=I(this,e,i,0),l=!K(e)||e!==this._$AH&&e!==G,l&&(this._$AH=e);else{const d=e;let c,u;for(e=r[0],c=0;c<r.length-1;c++)u=I(this,d[a+c],i,c),u===G&&(u=this._$AH[c]),l||(l=!K(u)||u!==this._$AH[c]),u===_?e=_:e!==_&&(e+=(u??"")+r[c+1]),this._$AH[c]=u}l&&!s&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ze extends se{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}}class Ge extends se{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==_)}}class Ie extends se{constructor(e,i,a,s,r){super(e,i,a,s,r),this.type=5}_$AI(e,i=this){if((e=I(this,e,i,0)??_)===G)return;const a=this._$AH,s=e===_&&a!==_||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,r=e!==_&&(a===_||s);s&&this.element.removeEventListener(this.name,this,a),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var i;typeof this._$AH=="function"?this._$AH.call(((i=this.options)==null?void 0:i.host)??this.element,e):this._$AH.handleEvent(e)}}class Be{constructor(e,i,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){I(this,e)}}const re=q.litHtmlPolyfillSupport;re==null||re(Y,Q),(q.litHtmlVersions??(q.litHtmlVersions=[])).push("3.3.3");const Fe=(t,e,i)=>{const a=(i==null?void 0:i.renderBefore)??e;let s=a._$litPart$;if(s===void 0){const r=(i==null?void 0:i.renderBefore)??null;a._$litPart$=s=new Q(e.insertBefore(J(),r),r,void 0,i??{})}return s._$AI(t),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=globalThis;class $ extends Z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;const e=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=e.firstChild),e}update(e){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Fe(i,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return G}}var xe;$._$litElement$=!0,$.finalized=!0,(xe=j.litElementHydrateSupport)==null||xe.call(j,{LitElement:$});const oe=j.litElementPolyfillSupport;oe==null||oe({LitElement:$});(j.litElementVersions??(j.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qe={attribute:!0,type:String,converter:te,reflect:!1,hasChanged:de},Je=(t=qe,e,i)=>{const{kind:a,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),a==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),a==="accessor"){const{name:l}=i;return{set(d){const c=e.get.call(this);e.set.call(this,d),this.requestUpdate(l,c,t,!0,d)},init(d){return d!==void 0&&this.C(l,void 0,t,d),d}}}if(a==="setter"){const{name:l}=i;return function(d){const c=this[l];e.call(this,d),this.requestUpdate(l,c,t,!0,d)}}throw Error("Unsupported decorator location: "+a)};function h(t){return(e,i)=>typeof i=="object"?Je(t,e,i):((a,s,r)=>{const l=s.hasOwnProperty(r);return s.constructor.createProperty(r,a),l?Object.getOwnPropertyDescriptor(s,r):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function n(t){return h({...t,state:!0,attribute:!1})}var Ke=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,g=(t,e,i,a)=>{for(var s=a>1?void 0:a?Ye(e,i):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(s=(a?l(e,i,s):l(s))||s);return a&&s&&Ke(e,i,s),s};let v=class extends ${constructor(){super(...arguments),this.narrow=!1,this._showAddPolicy=!1,this._newPolicyName="",this._showAddClient=!1,this._newClientName="",this._newClientId="",this._showAddProfile=!1,this._newProfileName="",this._showAddGroup=!1,this._newGroupName="",this._showAddMember=!1,this._newMemberName="",this._syncing=!1}render(){return this.state?o`
      <!-- Active Policy Card -->
      <ha-card class="active-policy-card">
        <div class="card-header">
          <div class="name">Active Policy</div>
          <div class="actions">
            <mwc-button raised label="Sync Now" @click=${this._syncNow} .disabled=${this._syncing}>
              ${this._syncing?"Syncing...":"Sync Now"}
            </mwc-button>
          </div>
        </div>
        <div class="card-content">
          <div class="stat-row">
            <span class="stat-label">Policies</span>
            <span class="stat-value">${this.state.policies.length}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Clients</span>
            <span class="stat-value">${this.state.clients.length}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Active Overrides</span>
            <span class="stat-value">${this.state.overrides.length}</span>
          </div>
        </div>
      </ha-card>

      <!-- Policies Section -->
      <div class="section-header">
        <h2>Policies</h2>
        <ha-icon-button label="Add Policy"
          .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
          @click=${()=>{this._showAddPolicy=!this._showAddPolicy}}
        ></ha-icon-button>
      </div>
      ${this._showAddPolicy?o`
        <ha-card>
          <div class="card-content">
            <div class="add-form">
              <ha-textfield label="Policy name" .value=${this._newPolicyName}
                @input=${t=>{this._newPolicyName=t.target.value}}
                @keydown=${t=>{t.key==="Enter"&&this._createPolicy()}}
              ></ha-textfield>
              <mwc-button raised label="Create" @click=${this._createPolicy}
                .disabled=${!this._newPolicyName.trim()}></mwc-button>
            </div>
          </div>
        </ha-card>
      `:""}
      <div class="card-grid">
        ${this.state.policies.map(t=>o`
            <ha-card class="clickable" @click=${()=>{var e;return(e=this.onNavigate)==null?void 0:e.call(this,"policy-detail",t)}}>
              <div class="card-header">
                <div class="name">${t.name}</div>
                <div class="actions">
                  <ha-icon-button label="Delete"
                    .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0,0,0 18,19V7H6V19Z"}
                    @click=${e=>{e.stopPropagation(),this._deletePolicy(t)}}
                  ></ha-icon-button>
                </div>
              </div>
              <div class="card-content">
                <p class="card-meta">Priority ${t.priority} - ${t.rules.length} rules${t.profile_id?" - "+this._getProfileName(t.profile_id):""}</p>
              </div>
            </ha-card>
          `)}
      </div>

      <!-- Profiles Section -->
      <div class="section-header">
        <h2>Profiles</h2>
        <ha-icon-button label="Add Profile"
          .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
          @click=${()=>{this._showAddProfile=!this._showAddProfile}}
        ></ha-icon-button>
      </div>
      ${this._showAddProfile?o`
        <ha-card>
          <div class="card-content">
            <div class="add-form">
              <ha-textfield label="Profile name" .value=${this._newProfileName}
                @input=${t=>{this._newProfileName=t.target.value}}
                @keydown=${t=>{t.key==="Enter"&&this._createProfile()}}
              ></ha-textfield>
              <mwc-button raised label="Create" @click=${this._createProfile}
                .disabled=${!this._newProfileName.trim()}></mwc-button>
            </div>
          </div>
        </ha-card>
      `:""}
      <div class="card-grid">
        ${this.state.profiles.map(t=>o`
            <ha-card class="clickable" @click=${()=>{var e;return(e=this.onNavigate)==null?void 0:e.call(this,"profile-detail",t)}}>
              <div class="card-header">
                <div class="name">${t.name}</div>
                <div class="actions">
                  <ha-icon-button label="Delete"
                    .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                    @click=${e=>{e.stopPropagation(),this._deleteProfile(t)}}
                  ></ha-icon-button>
                </div>
              </div>
              <div class="card-content">
                <p class="card-meta">${t.rules.length} rules - ${t.default_action}</p>
              </div>
            </ha-card>
          `)}
      </div>

      <!-- Clients Section -->
      <div class="section-header">
        <h2>Clients</h2>
        <ha-icon-button label="Add Client"
          .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
          @click=${()=>{this._showAddClient=!this._showAddClient}}
        ></ha-icon-button>
      </div>
      ${this._showAddClient?o`
        <ha-card>
          <div class="card-content">
            <div class="add-form">
              <ha-textfield label="Client name" .value=${this._newClientName}
                @input=${t=>{this._newClientName=t.target.value}}
              ></ha-textfield>
              <ha-textfield label="IP / ID (optional)" .value=${this._newClientId}
                @input=${t=>{this._newClientId=t.target.value}}
                @keydown=${t=>{t.key==="Enter"&&this._createClient()}}
              ></ha-textfield>
              <mwc-button raised label="Create" @click=${this._createClient}
                .disabled=${!this._newClientName.trim()}></mwc-button>
            </div>
          </div>
        </ha-card>
      `:""}
      <div class="card-grid">
        ${this.state.clients.map(t=>o`
            <ha-card class="clickable" @click=${()=>{var e;return(e=this.onNavigate)==null?void 0:e.call(this,"client-detail",t)}}>
              <div class="card-header">
                <div class="name">${t.name}</div>
                <div class="actions">
                  <ha-icon-button label="Delete"
                    .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                    @click=${e=>{e.stopPropagation(),this._deleteClient(t)}}
                  ></ha-icon-button>
                </div>
              </div>
              <div class="card-content">
                <div class="id-list">
                  ${t.ids.length===0?o`<span class="empty">No IDs</span>`:t.ids.map(e=>o`<span class="id-badge">${e}</span>`)}
                </div>
              </div>
            </ha-card>
          `)}
      </div>

      <!-- Groups Section -->
      <div class="section-header">
        <h2>Groups</h2>
        <ha-icon-button label="Add Group"
          .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
          @click=${()=>{this._showAddGroup=!this._showAddGroup}}
        ></ha-icon-button>
      </div>
      ${this._showAddGroup?o`
        <ha-card>
          <div class="card-content">
            <div class="add-form">
              <ha-textfield label="Group name" .value=${this._newGroupName}
                @input=${t=>{this._newGroupName=t.target.value}}
                @keydown=${t=>{t.key==="Enter"&&this._createGroup()}}
              ></ha-textfield>
              <mwc-button raised label="Create" @click=${this._createGroup}
                .disabled=${!this._newGroupName.trim()}></mwc-button>
            </div>
          </div>
        </ha-card>
      `:""}
      <div class="card-grid">
        ${this.state.groups.length===0?o`<p class="empty">No groups configured</p>`:""}
        ${this.state.groups.map(t=>o`
            <ha-card class="clickable" @click=${()=>{var e;return(e=this.onNavigate)==null?void 0:e.call(this,"group-detail",t)}}>
              <div class="card-header">
                <div class="name">${t.name}</div>
                <div class="actions">
                  <ha-icon-button label="Delete"
                    .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                    @click=${e=>{e.stopPropagation(),this._deleteGroup(t)}}
                  ></ha-icon-button>
                </div>
              </div>
              <div class="card-content">
                <p class="card-meta">${t.member_names.length} members - ${t.client_names.length} clients</p>
              </div>
            </ha-card>
          `)}
      </div>

      <!-- Members Section -->
      <div class="section-header">
        <h2>Members</h2>
        <ha-icon-button label="Add Member"
          .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
          @click=${()=>{this._showAddMember=!this._showAddMember}}
        ></ha-icon-button>
      </div>
      ${this._showAddMember?o`
        <ha-card>
          <div class="card-content">
            <div class="add-form">
              <ha-textfield label="Member name" .value=${this._newMemberName}
                @input=${t=>{this._newMemberName=t.target.value}}
                @keydown=${t=>{t.key==="Enter"&&this._createMember()}}
              ></ha-textfield>
              <mwc-button raised label="Create" @click=${this._createMember}
                .disabled=${!this._newMemberName.trim()}></mwc-button>
            </div>
          </div>
        </ha-card>
      `:""}
      <div class="card-grid">
        ${this.state.members.length===0?o`<p class="empty">No members configured</p>`:""}
        ${this.state.members.map(t=>o`
            <ha-card class="clickable" @click=${()=>{var e;return(e=this.onNavigate)==null?void 0:e.call(this,"member-detail",t)}}>
              <div class="card-header">
                <div class="name">${t.name}</div>
                <div class="actions">
                  <ha-icon-button label="Delete"
                    .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                    @click=${e=>{e.stopPropagation(),this._deleteMember(t)}}
                  ></ha-icon-button>
                </div>
              </div>
              <div class="card-content">
                <p class="card-meta">${t.client_names.length} clients - ${t.assigned_policy_ids.length} policies</p>
              </div>
            </ha-card>
          `)}
      </div>

      <!-- Overrides Section -->
      <div class="section-header">
        <h2>Overrides</h2>
        <mwc-button raised label="Manage" @click=${()=>{var t;return(t=this.onNavigate)==null?void 0:t.call(this,"override")}}></mwc-button>
      </div>
      <ha-card>
        <div class="card-content">
          ${this.state.overrides.length===0?o`<p class="empty">No active overrides</p>`:o`
                <table class="data-table">
                  <thead><tr><th>Target</th><th>Action</th><th>Expires</th><th></th></tr></thead>
                  <tbody>
                    ${this.state.overrides.map(t=>o`
                      <tr>
                        <td>${t.target} <span class="badge">${t.target_type}</span></td>
                        <td><span class="badge">${t.action}</span></td>
                        <td>${t.expires?new Date(t.expires).toLocaleTimeString():"∞"}</td>
                        <td>
                          <ha-icon-button label="Clear"
                            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                            @click=${()=>this._clearOverride(t.id)}
                          ></ha-icon-button>
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              `}
        </div>
      </ha-card>
    `:o``}_getProfileName(t){const e=this.state.profiles.find(i=>i.id===t);return(e==null?void 0:e.name)||t}async _syncNow(){var t;this._syncing=!0;try{await this.hass.callWS({type:"adguard_pc/sync"}),(t=this.onNavigate)==null||t.call(this,"dashboard")}catch(e){console.error("Sync failed:",e)}finally{this._syncing=!1}}async _createPolicy(){this._newPolicyName.trim()&&(await this.hass.callWS({type:"adguard_pc/policies/create",policy:{name:this._newPolicyName.trim(),rules:[],priority:0}}),this._newPolicyName="",this._showAddPolicy=!1,this._reloadState())}async _createClient(){this._newClientName.trim()&&(await this.hass.callWS({type:"adguard_pc/clients/create",client:{name:this._newClientName.trim(),ids:this._newClientId.trim()?[this._newClientId.trim()]:[],assigned_policy_ids:[],exceptions:[]}}),this._newClientName="",this._newClientId="",this._showAddClient=!1,this._reloadState())}async _createProfile(){this._newProfileName.trim()&&(await this.hass.callWS({type:"adguard_pc/profiles/create",profile:{name:this._newProfileName.trim(),rules:[],default_action:"block"}}),this._newProfileName="",this._showAddProfile=!1,this._reloadState())}async _createGroup(){this._newGroupName.trim()&&(await this.hass.callWS({type:"adguard_pc/groups/create",group:{name:this._newGroupName.trim(),member_names:[],client_names:[],assigned_policy_ids:[]}}),this._newGroupName="",this._showAddGroup=!1,this._reloadState())}async _createMember(){this._newMemberName.trim()&&(await this.hass.callWS({type:"adguard_pc/members/create",member:{name:this._newMemberName.trim(),client_names:[],assigned_policy_ids:[],exceptions:[]}}),this._newMemberName="",this._showAddMember=!1,this._reloadState())}async _reloadState(){try{this.state=await this.hass.callWS({type:"adguard_pc/state/get"})}catch(t){console.error("Failed to reload state:",t)}}async _deleteProfile(t){await this.hass.callWS({type:"adguard_pc/profiles/delete",profile_id:t.id}),this._reloadState()}async _deleteGroup(t){await this.hass.callWS({type:"adguard_pc/groups/delete",group_id:t.id}),this._reloadState()}async _deleteMember(t){await this.hass.callWS({type:"adguard_pc/members/delete",member_id:t.id}),this._reloadState()}async _deleteClient(t){await this.hass.callWS({type:"adguard_pc/clients/delete",client_id:t.name}),this._reloadState()}async _deletePolicy(t){await this.hass.callWS({type:"adguard_pc/policies/delete",policy_id:t.id}),this._reloadState()}async _clearOverride(t){await this.hass.callWS({type:"adguard_pc/overrides/clear",override_id:t}),this._reloadState()}};v.styles=k`
    .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; margin-bottom: 16px; }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin: 20px 0 8px; }
    h2 { font-size: 1.2em; font-weight: 500; margin: 0; }
    ha-card { margin-bottom: 8px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
    .name { font-weight: 500; font-size: 1.05em; }
    .card-content { padding: 0 16px 16px; }
    .card-meta { color: var(--secondary-text-color); font-size: 0.9em; margin: 0; }
    .actions { display: flex; gap: 4px; }
    .clickable { cursor: pointer; }
    .clickable:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.12); }
    .active-policy-card { border-left: 4px solid var(--success-color, #4caf50); }
    .stat-row { display: flex; justify-content: space-between; padding: 4px 0; }
    .stat-label { color: var(--secondary-text-color); }
    .stat-value { font-weight: 500; }
    .id-list { display: flex; gap: 6px; flex-wrap: wrap; }
    .id-badge { padding: 3px 8px; background: var(--code-editor-background-color, #f5f5f5); border-radius: 4px; font-size: 0.85em; font-family: var(--code-font-family, monospace); }
    .add-form { padding: 8px 0; display: flex; flex-direction: column; gap: 8px; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th, .data-table td { padding: 10px 8px; text-align: left; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
    .data-table th { font-weight: 500; color: var(--secondary-text-color); font-size: 0.85em; text-transform: uppercase; }
    .badge { padding: 2px 8px; border-radius: 4px; background: var(--code-editor-background-color, #f5f5f5); font-size: 0.8em; }
    .empty { color: var(--secondary-text-color); font-style: italic; }
  `;g([h({attribute:!1})],v.prototype,"hass",2);g([h({attribute:!1})],v.prototype,"state",2);g([h({type:Boolean})],v.prototype,"narrow",2);g([h({type:Object})],v.prototype,"onNavigate",2);g([n()],v.prototype,"_showAddPolicy",2);g([n()],v.prototype,"_newPolicyName",2);g([n()],v.prototype,"_showAddClient",2);g([n()],v.prototype,"_newClientName",2);g([n()],v.prototype,"_newClientId",2);g([n()],v.prototype,"_showAddProfile",2);g([n()],v.prototype,"_newProfileName",2);g([n()],v.prototype,"_showAddGroup",2);g([n()],v.prototype,"_newGroupName",2);g([n()],v.prototype,"_showAddMember",2);g([n()],v.prototype,"_newMemberName",2);g([n()],v.prototype,"_syncing",2);v=g([V("dashboard-view")],v);var Qe=Object.defineProperty,Xe=Object.getOwnPropertyDescriptor,T=(t,e,i,a)=>{for(var s=a>1?void 0:a?Xe(e,i):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(s=(a?l(e,i,s):l(s))||s);return a&&s&&Qe(e,i,s),s};let L=class extends ${constructor(){super(...arguments),this.narrow=!1,this._newException="",this._showDeleteConfirm=!1}render(){return this.client?o`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.client.name}</div>
          <div class="actions">
            <ha-icon-button label="Delete"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
              @click=${()=>{this._showDeleteConfirm=!0}}
            ></ha-icon-button>
          </div>
        </div>
        <div class="card-content">
          <div class="identity">
            ${this.client.ids.map(t=>o`<span class="id-badge">${t}</span>`)}
          </div>
        </div>
      </ha-card>

      ${this._showDeleteConfirm?o`
        <ha-dialog open @closed=${()=>{this._showDeleteConfirm=!1}}>
          <p>Delete client "${this.client.name}"?</p>
          <mwc-button slot="secondaryAction" @click=${()=>{this._showDeleteConfirm=!1}}>Cancel</mwc-button>
          <mwc-button slot="primaryAction" @click=${this._deleteClient}>Delete</mwc-button>
        </ha-dialog>
      `:""}

      <ha-card>
        <div class="card-header">
          <div class="name">Assigned Policies (${this.client.assigned_policy_ids.length})</div>
        </div>
        <div class="card-content">
          ${this.client.assigned_policy_ids.length===0?o`<p class="empty">No policies assigned</p>`:this.client.assigned_policy_ids.map(t=>{const e=this.state.policies.find(i=>i.id===t);return o`
                  <div class="list-item">
                    <span class="item-text clickable" @click=${()=>{var i;return(i=this.onNavigate)==null?void 0:i.call(this,"policy-detail",e)}}>
                      ${(e==null?void 0:e.name)||t}
                      <ha-icon .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}></ha-icon>
                    </span>
                    <ha-icon-button label="Unassign"
                      .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                      @click=${()=>this._removePolicy(t)}
                    ></ha-icon-button>
                  </div>
                `})}
          <div class="add-row">
            <ha-select label="Assign policy" .value=${""}
              @selected=${t=>{t.detail.value&&this._addPolicy(t.detail.value)}}
            >
              ${this.state.policies.filter(t=>!this.client.assigned_policy_ids.includes(t.id)).map(t=>o`<ha-list-item value="${t.id}">${t.name}</ha-list-item>`)}
            </ha-select>
          </div>
        </div>
      </ha-card>

      <ha-card>
        <div class="card-header">
          <div class="name">Exceptions (${this.client.exceptions.length})</div>
        </div>
        <div class="card-content">
          ${this.client.exceptions.map((t,e)=>o`
              <div class="list-item">
                <span class="exception-text">${t}</span>
                <ha-icon-button label="Remove"
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  @click=${()=>this._removeException(e)}
                ></ha-icon-button>
              </div>
            `)}
          <div class="add-row">
            <ha-textfield label="Add exception domain" .value=${this._newException}
              @input=${t=>{this._newException=t.target.value}}
              @keydown=${t=>{t.key==="Enter"&&this._addException()}}
            ></ha-textfield>
            <ha-icon-button label="Add"
              .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
              @click=${this._addException}
            ></ha-icon-button>
          </div>
        </div>
      </ha-card>
    `:o``}async _addException(){if(!this._newException.trim())return;const t={...this.client,exceptions:[...this.client.exceptions,this._newException.trim()]};await this.hass.callWS({type:"adguard_pc/clients/update",client:t}),this.client=t,this._newException=""}async _removeException(t){const e=this.client.exceptions.filter((a,s)=>s!==t),i={...this.client,exceptions:e};await this.hass.callWS({type:"adguard_pc/clients/update",client:i}),this.client=i}async _addPolicy(t){if(!t||this.client.assigned_policy_ids.includes(t))return;const e={...this.client,assigned_policy_ids:[...this.client.assigned_policy_ids,t]};await this.hass.callWS({type:"adguard_pc/clients/update",client:e}),this.client=e}async _removePolicy(t){const e={...this.client,assigned_policy_ids:this.client.assigned_policy_ids.filter(i=>i!==t)};await this.hass.callWS({type:"adguard_pc/clients/update",client:e}),this.client=e}async _deleteClient(){var t;await this.hass.callWS({type:"adguard_pc/clients/delete",client_id:this.client.name}),this._showDeleteConfirm=!1,(t=this.onNavigate)==null||t.call(this,"dashboard")}};L.styles=k`
    ha-card { margin-bottom: 8px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
    .name { font-weight: 500; font-size: 1.05em; }
    .card-content { padding: 0 16px 16px; }
    .actions { display: flex; gap: 4px; }
    .identity { display: flex; gap: 8px; flex-wrap: wrap; }
    .id-badge { padding: 4px 10px; background: var(--code-editor-background-color, #f5f5f5); border-radius: 6px; font-family: var(--code-font-family, monospace); font-size: 0.9em; }
    .list-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
    .list-item:last-child { border-bottom: none; }
    .item-text { display: flex; align-items: center; gap: 4px; }
    .clickable { cursor: pointer; color: var(--primary-color, #03a9f4); }
    .empty { color: var(--secondary-text-color); font-style: italic; }
    .add-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
    ha-textfield { flex: 1; }
    ha-select { width: 100%; margin-top: 8px; }
  `;T([h({attribute:!1})],L.prototype,"hass",2);T([h({attribute:!1})],L.prototype,"state",2);T([h({attribute:!1})],L.prototype,"client",2);T([h({type:Boolean})],L.prototype,"narrow",2);T([h({type:Object})],L.prototype,"onNavigate",2);T([n()],L.prototype,"_newException",2);T([n()],L.prototype,"_showDeleteConfirm",2);L=T([V("client-view")],L);var et=Object.defineProperty,tt=Object.getOwnPropertyDescriptor,y=(t,e,i,a)=>{for(var s=a>1?void 0:a?tt(e,i):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(s=(a?l(e,i,s):l(s))||s);return a&&s&&et(e,i,s),s};let m=class extends ${constructor(){super(...arguments),this.narrow=!1,this._showAddRule=!1,this._newRuleTarget="",this._newRuleAction="block",this._newRuleType="domain",this._showAddSchedule=!1,this._schedDays=["mon","tue","wed","thu","fri"],this._schedFrom="08:00",this._schedTo="20:00",this._showAddCalendar=!1,this._calEntity="",this._calMatch="",this._showDeleteConfirm=!1}render(){return this.policy?o`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.policy.name}</div>
          <div class="actions">
            <ha-icon-button label="Delete"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
              @click=${()=>{this._showDeleteConfirm=!0}}
            ></ha-icon-button>
          </div>
        </div>
        <div class="card-content">
          <p class="meta">Priority: ${this.policy.priority} - Profile: ${this._getProfileName()}</p>
        </div>
      </ha-card>

      ${this._showDeleteConfirm?o`
        <ha-dialog open @closed=${this._handleDeleteDialog}>
          <p>Delete policy "${this.policy.name}"?</p>
          <mwc-button slot="secondaryAction" @click=${()=>{this._showDeleteConfirm=!1}}>Cancel</mwc-button>
          <mwc-button slot="primaryAction" @click=${this._deletePolicy}>Delete</mwc-button>
        </ha-dialog>
      `:""}

      <ha-card>
        <div class="card-header">
          <div class="name">Profile Template</div>
        </div>
        <div class="card-content">
          <div class="info-section">
            <p><strong>Current:</strong> ${this._getProfileName()}</p>
            <div class="add-row">
              <ha-select label="Assign profile" .value=${this.policy.profile_id||""}
                @selected=${t=>{t.detail.value!==void 0&&this._assignProfile(t.detail.value)}}
              >
                <ha-list-item value="">None</ha-list-item>
                ${this.state.profiles.map(t=>o`
                  <ha-list-item value="${t.id}">${t.name}</ha-list-item>
                `)}
              </ha-select>
            </div>
          </div>
        </div>
      </ha-card>

      <ha-card>
        <div class="card-header">
          <div class="name">Rules (${this.policy.rules.length})</div>
          <ha-icon-button label="Add Rule"
            .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
            @click=${()=>{this._showAddRule=!this._showAddRule}}
          ></ha-icon-button>
        </div>
        <div class="card-content">
          ${this._showAddRule?o`
            <div class="add-form">
              <ha-textfield label="Target (domain)" .value=${this._newRuleTarget}
                @input=${t=>{this._newRuleTarget=t.target.value}}
              ></ha-textfield>
              <ha-select label="Action" .value=${this._newRuleAction}
                @selected=${t=>{this._newRuleAction=t.detail.value}}
              >
                <ha-list-item value="block">Block</ha-list-item>
                <ha-list-item value="allow">Allow</ha-list-item>
              </ha-select>
              <ha-select label="Type" .value=${this._newRuleType}
                @selected=${t=>{this._newRuleType=t.detail.value}}
              >
                <ha-list-item value="domain">Domain</ha-list-item>
                <ha-list-item value="service">Service</ha-list-item>
                <ha-list-item value="category">Category</ha-list-item>
              </ha-select>
              <mwc-button raised label="Add" @click=${this._addRule} .disabled=${!this._newRuleTarget.trim()}></mwc-button>
            </div>
          `:""}
          ${this.policy.rules.length===0?o`<p class="empty">No rules defined</p>`:o`
                <table class="data-table">
                  <thead><tr><th>Type</th><th>Target</th><th>Action</th><th></th></tr></thead>
                  <tbody>
                    ${this.policy.rules.map((t,e)=>o`
                      <tr>
                        <td><span class="badge">${t.rule_type}</span></td>
                        <td class="target-cell">${t.target}</td>
                        <td><span class=${t.action==="block"?"action-block":"action-allow"}>${t.action}</span></td>
                        <td>
                          <ha-icon-button label="Remove"
                            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                            @click=${()=>this._removeRule(e)}
                          ></ha-icon-button>
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              `}
        </div>
      </ha-card>

      <ha-card>
        <div class="card-header">
          <div class="name">Schedule</div>
          <ha-icon-button label="Edit Schedule"
            .path=${this.policy.time_schedule?"M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z":"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
            @click=${()=>{this._showAddSchedule=!this._showAddSchedule}}
          ></ha-icon-button>
        </div>
        <div class="card-content">
          ${this.policy.time_schedule&&!this._showAddSchedule?o`
                <div class="info-section">
                  <p><strong>Days:</strong> ${this.policy.time_schedule.days.join(", ")||"All"}</p>
                  <p><strong>Time:</strong> ${this.policy.time_schedule.time_from||"00:00"} - ${this.policy.time_schedule.time_to||"23:59"}</p>
                  <mwc-button label="Remove" @click=${this._removeSchedule}></mwc-button>
                </div>
              `:this._showAddSchedule?this._renderScheduleForm():o`<p class="empty">No schedule - active at all times</p>`}
        </div>
      </ha-card>

      <ha-card>
        <div class="card-header">
          <div class="name">Calendar Condition</div>
          <ha-icon-button label="Edit Calendar"
            .path=${this.policy.calendar_condition?"M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25Z":"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
            @click=${()=>{this._showAddCalendar=!this._showAddCalendar}}
          ></ha-icon-button>
        </div>
        <div class="card-content">
          ${this.policy.calendar_condition&&!this._showAddCalendar?o`
                <div class="info-section">
                  <p><strong>Entity:</strong> ${this.policy.calendar_condition.calendar_entity||"None"}</p>
                  <p><strong>Match:</strong> ${this.policy.calendar_condition.event_match.join(", ")||"None"}</p>
                  <p><strong>Invert:</strong> ${this.policy.calendar_condition.invert?"Yes":"No"}</p>
                  <mwc-button label="Remove" @click=${this._removeCalendar}></mwc-button>
                </div>
              `:this._showAddCalendar?this._renderCalendarForm():o`<p class="empty">No calendar condition</p>`}
        </div>
      </ha-card>
    `:o``}_renderScheduleForm(){return o`
      <div class="add-form">
        <div class="day-chips">
          ${["mon","tue","wed","thu","fri","sat","sun"].map(e=>o`
            <button class="chip ${this._schedDays.includes(e)?"active":""}"
              @click=${()=>this._toggleDay(e)}>${e}</button>
          `)}
        </div>
        <ha-textfield label="From (HH:MM)" .value=${this._schedFrom}
          @input=${e=>{this._schedFrom=e.target.value}}
        ></ha-textfield>
        <ha-textfield label="To (HH:MM)" .value=${this._schedTo}
          @input=${e=>{this._schedTo=e.target.value}}
        ></ha-textfield>
        <mwc-button raised label="Save Schedule" @click=${this._saveSchedule}></mwc-button>
        <mwc-button label="Cancel" @click=${()=>{this._showAddSchedule=!1}}></mwc-button>
      </div>
    `}_renderCalendarForm(){return o`
      <div class="add-form">
        <ha-select label="Calendar Entity" .value=${this._calEntity}
          @selected=${t=>{this._calEntity=t.detail.value}}
        >
          ${this.state.calendar_entities.map(t=>o`
            <ha-list-item value="${t}">${t}</ha-list-item>
          `)}
        </ha-select>
        <ha-textfield label="Event keywords (comma-separated)" .value=${this._calMatch}
          @input=${t=>{this._calMatch=t.target.value}}
        ></ha-textfield>
        <mwc-button raised label="Save Condition" @click=${this._saveCalendar}></mwc-button>
        <mwc-button label="Cancel" @click=${()=>{this._showAddCalendar=!1}}></mwc-button>
      </div>
    `}_getProfileName(){if(!this.policy.profile_id)return"None";const t=this.state.profiles.find(e=>e.id===this.policy.profile_id);return(t==null?void 0:t.name)||this.policy.profile_id}_toggleDay(t){this._schedDays=this._schedDays.includes(t)?this._schedDays.filter(e=>e!==t):[...this._schedDays,t]}async _addRule(){if(!this._newRuleTarget.trim())return;const t={target:this._newRuleTarget.trim(),action:this._newRuleAction,rule_type:this._newRuleType},e={...this.policy,rules:[...this.policy.rules,t]};await this.hass.callWS({type:"adguard_pc/policies/update",policy:e}),this.policy=e,this._newRuleTarget="",this._showAddRule=!1}async _removeRule(t){const e=this.policy.rules.filter((a,s)=>s!==t),i={...this.policy,rules:e};await this.hass.callWS({type:"adguard_pc/policies/update",policy:i}),this.policy=i}async _saveSchedule(){const t={...this.policy,time_schedule:{days:this._schedDays,time_from:this._schedFrom,time_to:this._schedTo}};await this.hass.callWS({type:"adguard_pc/policies/update",policy:t}),this.policy=t,this._showAddSchedule=!1}async _removeSchedule(){const t={...this.policy,time_schedule:null};await this.hass.callWS({type:"adguard_pc/policies/update",policy:t}),this.policy=t}async _saveCalendar(){const t={...this.policy,calendar_condition:{calendar_entity:this._calEntity||null,event_match:this._calMatch.split(",").map(e=>e.trim()).filter(Boolean),invert:!1}};await this.hass.callWS({type:"adguard_pc/policies/update",policy:t}),this.policy=t,this._showAddCalendar=!1}async _removeCalendar(){const t={...this.policy,calendar_condition:null};await this.hass.callWS({type:"adguard_pc/policies/update",policy:t}),this.policy=t}async _deletePolicy(){var t;await this.hass.callWS({type:"adguard_pc/policies/delete",policy_id:this.policy.id}),this._showDeleteConfirm=!1,(t=this.onNavigate)==null||t.call(this,"dashboard")}async _assignProfile(t){const e={...this.policy,profile_id:t||null};await this.hass.callWS({type:"adguard_pc/policies/update",policy:e}),this.policy=e}_handleDeleteDialog(){this._showDeleteConfirm=!1}};m.styles=k`
    ha-card { margin-bottom: 8px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
    .name { font-weight: 500; font-size: 1.05em; }
    .card-content { padding: 0 16px 16px; }
    .actions { display: flex; gap: 4px; }
    .meta { color: var(--secondary-text-color); font-size: 0.9em; margin: 0; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th, .data-table td { padding: 10px 8px; text-align: left; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
    .data-table th { font-weight: 500; color: var(--secondary-text-color); font-size: 0.85em; text-transform: uppercase; }
    .target-cell { font-family: var(--code-font-family, monospace); font-size: 0.9em; }
    .badge { padding: 2px 8px; border-radius: 4px; background: var(--code-editor-background-color, #f5f5f5); font-size: 0.85em; }
    .action-block { color: var(--error-color, #f44336); font-weight: 500; }
    .action-allow { color: var(--success-color, #4caf50); font-weight: 500; }
    .empty { color: var(--secondary-text-color); font-style: italic; }
    .add-form { padding: 12px 0; display: flex; flex-direction: column; gap: 8px; }
    .day-chips { display: flex; gap: 6px; flex-wrap: wrap; }
    .chip { padding: 6px 12px; border-radius: 16px; border: 1px solid var(--divider-color, #e0e0e0); background: transparent; cursor: pointer; font-size: 0.85em; }
    .chip.active { background: var(--primary-color, #03a9f4); color: white; border-color: var(--primary-color, #03a9f4); }
    .info-section p { margin: 4px 0; }
    .add-row { margin-top: 8px; }
    ha-select { width: 100%; }
  `;y([h({attribute:!1})],m.prototype,"hass",2);y([h({attribute:!1})],m.prototype,"state",2);y([h({attribute:!1})],m.prototype,"policy",2);y([h({type:Boolean})],m.prototype,"narrow",2);y([h({type:Object})],m.prototype,"onNavigate",2);y([n()],m.prototype,"_showAddRule",2);y([n()],m.prototype,"_newRuleTarget",2);y([n()],m.prototype,"_newRuleAction",2);y([n()],m.prototype,"_newRuleType",2);y([n()],m.prototype,"_showAddSchedule",2);y([n()],m.prototype,"_schedDays",2);y([n()],m.prototype,"_schedFrom",2);y([n()],m.prototype,"_schedTo",2);y([n()],m.prototype,"_showAddCalendar",2);y([n()],m.prototype,"_calEntity",2);y([n()],m.prototype,"_calMatch",2);y([n()],m.prototype,"_showDeleteConfirm",2);m=y([V("policy-view")],m);var it=Object.defineProperty,st=Object.getOwnPropertyDescriptor,M=(t,e,i,a)=>{for(var s=a>1?void 0:a?st(e,i):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(s=(a?l(e,i,s):l(s))||s);return a&&s&&it(e,i,s),s};let x=class extends ${constructor(){super(...arguments),this.narrow=!1,this._selectedTarget="",this._selectedTargetType="client",this._selectedAction="allow_all",this._selectedDuration="30"}render(){return this.state?(this._selectedTargetType==="client"?this.state.clients:this.state.members,o`
      <!-- New Override Form -->
      <ha-card>
        <div class="card-header">
          <div class="name">New Override</div>
        </div>
        <div class="card-content">
          <ha-select
            label="Target Type"
            .value=${this._selectedTargetType}
            @selected=${t=>{this._selectedTargetType=t.detail.value,this._selectedTarget=""}}
          >
            <ha-list-item value="client">Client</ha-list-item>
            <ha-list-item value="member">Member</ha-list-item>
          </ha-select>

          <ha-select
            label="Target"
            .value=${this._selectedTarget}
            @selected=${t=>{this._selectedTarget=t.detail.value}}
          >
            ${this._selectedTargetType==="client"?this.state.clients.map(t=>o`<ha-list-item value="${t.name}">${t.name}</ha-list-item>`):this.state.members.map(t=>o`<ha-list-item value="${t.name}">${t.name}</ha-list-item>`)}
          </ha-select>

          <ha-select
            label="Action"
            .value=${this._selectedAction}
            @selected=${t=>{this._selectedAction=t.detail.value}}
          >
            <ha-list-item value="allow_all">Allow All</ha-list-item>
            <ha-list-item value="block_all">Block All</ha-list-item>
          </ha-select>

          <ha-select
            label="Duration"
            .value=${this._selectedDuration}
            @selected=${t=>{this._selectedDuration=t.detail.value}}
          >
            <ha-list-item value="15">15 minutes</ha-list-item>
            <ha-list-item value="30">30 minutes</ha-list-item>
            <ha-list-item value="60">1 hour</ha-list-item>
            <ha-list-item value="120">2 hours</ha-list-item>
            <ha-list-item value="240">4 hours</ha-list-item>
            <ha-list-item value="480">8 hours</ha-list-item>
          </ha-select>

          <div class="form-actions">
            <mwc-button
              raised
              label="Apply Override"
              @click=${this._applyOverride}
              .disabled=${!this._selectedTarget}
            ></mwc-button>
          </div>
        </div>
      </ha-card>

      <!-- Active Overrides List -->
      <ha-card>
        <div class="card-header">
          <div class="name">Active Overrides</div>
        </div>
        <div class="card-content">
          ${this.state.overrides.length===0?o`<p class="empty">No active overrides</p>`:o`
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Target</th>
                      <th>Action</th>
                      <th>Expires</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.state.overrides.map(t=>o`
                        <tr>
                          <td>${t.target} <span class="badge">${t.target_type}</span></td>
                          <td><span class="badge">${t.action}</span></td>
                          <td>${t.expires?new Date(t.expires).toLocaleTimeString():"∞"}</td>
                          <td>
                            <ha-icon-button
                              label="Clear"
                              .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                              @click=${()=>this._clearOverride(t.id)}
                            ></ha-icon-button>
                          </td>
                        </tr>
                      `)}
                  </tbody>
                </table>
              `}
        </div>
      </ha-card>
    `):o``}async _applyOverride(){var t;if(this._selectedTarget)try{await this.hass.callWS({type:"adguard_pc/overrides/set",target:this._selectedTarget,target_type:this._selectedTargetType,action:this._selectedAction,duration_minutes:parseInt(this._selectedDuration,10)}),this._selectedTarget="",(t=this.onNavigate)==null||t.call(this,"override")}catch(e){console.error("Failed to set override:",e)}}async _clearOverride(t){var e;try{await this.hass.callWS({type:"adguard_pc/overrides/clear",override_id:t}),(e=this.onNavigate)==null||e.call(this,"override")}catch(i){console.error("Failed to clear override:",i)}}};x.styles=k`
    ha-card {
      margin-bottom: 8px;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
    }
    .name {
      font-weight: 500;
      font-size: 1.05em;
    }
    .card-content {
      padding: 0 16px 16px;
    }
    ha-select {
      display: block;
      margin-bottom: 12px;
    }
    .form-actions {
      margin-top: 16px;
      text-align: right;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table th,
    .data-table td {
      padding: 10px 8px;
      text-align: left;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    .data-table th {
      font-weight: 500;
      color: var(--secondary-text-color);
      font-size: 0.85em;
      text-transform: uppercase;
    }
    .badge {
      padding: 2px 8px;
      border-radius: 4px;
      background: var(--code-editor-background-color, #f5f5f5);
      font-size: 0.8em;
    }
    .empty {
      color: var(--secondary-text-color);
      font-style: italic;
    }
  `;M([h({attribute:!1})],x.prototype,"hass",2);M([h({attribute:!1})],x.prototype,"state",2);M([h({type:Boolean})],x.prototype,"narrow",2);M([h({type:Object})],x.prototype,"onNavigate",2);M([n()],x.prototype,"_selectedTarget",2);M([n()],x.prototype,"_selectedTargetType",2);M([n()],x.prototype,"_selectedAction",2);M([n()],x.prototype,"_selectedDuration",2);x=M([V("override-view")],x);var at=Object.defineProperty,lt=Object.getOwnPropertyDescriptor,z=(t,e,i,a)=>{for(var s=a>1?void 0:a?lt(e,i):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(s=(a?l(e,i,s):l(s))||s);return a&&s&&at(e,i,s),s};let H=class extends ${constructor(){super(...arguments),this.narrow=!1,this._showDeleteConfirm=!1}render(){return this.group?o`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.group.name}</div>
          <div class="actions">
            <ha-icon-button label="Delete"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0,0,0 8,21H16A2,2 0,0,0 18,19V7H6V19Z"}
              @click=${()=>{this._showDeleteConfirm=!0}}
            ></ha-icon-button>
          </div>
        </div>
        <div class="card-content">
          <p class="meta">${this.group.member_names.length} members · ${this.group.client_names.length} clients · ${this.group.assigned_policy_ids.length} policies</p>
        </div>
      </ha-card>

      ${this._showDeleteConfirm?o`
        <ha-dialog open @closed=${this._handleDeleteDialog}>
          <p>Delete group "${this.group.name}"?</p>
          <mwc-button slot="secondaryAction" @click=${()=>{this._showDeleteConfirm=!1}}>Cancel</mwc-button>
          <mwc-button slot="primaryAction" @click=${this._deleteGroup}>Delete</mwc-button>
        </ha-dialog>
      `:""}

      <!-- Members -->
      <ha-card>
        <div class="card-header">
          <div class="name">Members (${this.group.member_names.length})</div>
        </div>
        <div class="card-content">
          ${this.group.member_names.length===0?o`<p class="empty">No members assigned</p>`:""}
          ${this.group.member_names.map(t=>o`
              <div class="list-item">
                <span class="item-text">${t}</span>
                <ha-icon-button label="Remove"
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  @click=${()=>this._removeMember(t)}
                ></ha-icon-button>
              </div>
            `)}
          <div class="add-row">
            <ha-select label="Add member" .value=${""}
                @selected=${t=>{t.detail.value&&this._addMember(t.detail.value)}}
              >
                ${this.state.members.filter(t=>!this.group.member_names.includes(t.name)).map(t=>o`<ha-list-item value="${t.name}">${t.name}</ha-list-item>`)}
              </ha-select>
          </div>
        </div>
      </ha-card>

      <!-- Clients -->
      <ha-card>
        <div class="card-header">
          <div class="name">Clients (${this.group.client_names.length})</div>
        </div>
        <div class="card-content">
          ${this.group.client_names.length===0?o`<p class="empty">No clients assigned</p>`:""}
          ${this.group.client_names.map(t=>o`
              <div class="list-item">
                <span class="item-text">${t}</span>
                <ha-icon-button label="Remove"
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  @click=${()=>this._removeClient(t)}
                ></ha-icon-button>
              </div>
            `)}
          <div class="add-row">
            <ha-select label="Add client" .value=${""}
              @selected=${t=>{t.detail.value&&this._addClient(t.detail.value)}}
            >
              ${this.state.clients.filter(t=>!this.group.client_names.includes(t.name)).map(t=>o`<ha-list-item value="${t.name}">${t.name}</ha-list-item>`)}
            </ha-select>
          </div>
        </div>
      </ha-card>

      <!-- Assigned Policies -->
      <ha-card>
        <div class="card-header">
          <div class="name">Assigned Policies (${this.group.assigned_policy_ids.length})</div>
        </div>
        <div class="card-content">
          ${this.group.assigned_policy_ids.length===0?o`<p class="empty">No policies assigned</p>`:""}
          ${this.group.assigned_policy_ids.map(t=>{const e=this.state.policies.find(i=>i.id===t);return o`
                <div class="list-item">
                  <span class="item-text clickable" @click=${()=>{var i;return(i=this.onNavigate)==null?void 0:i.call(this,"policy-detail",e)}}>
                    ${(e==null?void 0:e.name)||t}
                    <ha-icon .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}></ha-icon>
                  </span>
                  <ha-icon-button label="Unassign"
                    .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                    @click=${()=>this._removePolicy(t)}
                  ></ha-icon-button>
                </div>
              `})}
          <div class="add-row">
            <ha-select label="Assign policy" .value=${""}
              @selected=${t=>{t.detail.value&&this._addPolicy(t.detail.value)}}
            >
              ${this.state.policies.filter(t=>!this.group.assigned_policy_ids.includes(t.id)).map(t=>o`<ha-list-item value="${t.id}">${t.name}</ha-list-item>`)}
            </ha-select>
          </div>
        </div>
      </ha-card>
    `:o``}_handleDeleteDialog(){this._showDeleteConfirm=!1}async _addMember(t){if(!t||this.group.member_names.includes(t))return;const e={...this.group,member_names:[...this.group.member_names,t]};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this.group=e}async _removeMember(t){const e={...this.group,member_names:this.group.member_names.filter(i=>i!==t)};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this.group=e}async _addClient(t){if(!t||this.group.client_names.includes(t))return;const e={...this.group,client_names:[...this.group.client_names,t]};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this.group=e}async _removeClient(t){const e={...this.group,client_names:this.group.client_names.filter(i=>i!==t)};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this.group=e}async _addPolicy(t){if(!t||this.group.assigned_policy_ids.includes(t))return;const e={...this.group,assigned_policy_ids:[...this.group.assigned_policy_ids,t]};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this.group=e}async _removePolicy(t){const e={...this.group,assigned_policy_ids:this.group.assigned_policy_ids.filter(i=>i!==t)};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this.group=e}async _deleteGroup(){var t;await this.hass.callWS({type:"adguard_pc/groups/delete",group_id:this.group.id}),this._showDeleteConfirm=!1,(t=this.onNavigate)==null||t.call(this,"dashboard")}};H.styles=k`
    ha-card { margin-bottom: 8px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
    .name { font-weight: 500; font-size: 1.05em; }
    .card-content { padding: 0 16px 16px; }
    .actions { display: flex; gap: 4px; }
    .meta { color: var(--secondary-text-color); font-size: 0.9em; margin: 0; }
    .list-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
    .list-item:last-child { border-bottom: none; }
    .item-text { display: flex; align-items: center; gap: 4px; }
    .clickable { cursor: pointer; color: var(--primary-color, #03a9f4); }
    .empty { color: var(--secondary-text-color); font-style: italic; margin: 0; }
    .add-row { margin-top: 8px; }
    ha-select { width: 100%; }
  `;z([h({attribute:!1})],H.prototype,"hass",2);z([h({attribute:!1})],H.prototype,"state",2);z([h({attribute:!1})],H.prototype,"group",2);z([h({type:Boolean})],H.prototype,"narrow",2);z([h({type:Object})],H.prototype,"onNavigate",2);z([n()],H.prototype,"_showDeleteConfirm",2);H=z([V("group-view")],H);var rt=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,R=(t,e,i,a)=>{for(var s=a>1?void 0:a?ot(e,i):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(s=(a?l(e,i,s):l(s))||s);return a&&s&&rt(e,i,s),s};let S=class extends ${constructor(){super(...arguments),this.narrow=!1,this._newException="",this._showDeleteConfirm=!1}render(){return this.member?o`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.member.name}</div>
          <div class="actions">
            <ha-icon-button label="Delete"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0,0,0 8,21H16A2,2 0,0,0 18,19V7H6V19Z"}
              @click=${()=>{this._showDeleteConfirm=!0}}
            ></ha-icon-button>
          </div>
        </div>
        <div class="card-content">
          <p class="meta">${this.member.client_names.length} clients · ${this.member.assigned_policy_ids.length} policies · ${this.member.exceptions.length} exceptions</p>
        </div>
      </ha-card>

      ${this._showDeleteConfirm?o`
        <ha-dialog open @closed=${this._handleDeleteDialog}>
          <p>Delete member "${this.member.name}"?</p>
          <mwc-button slot="secondaryAction" @click=${()=>{this._showDeleteConfirm=!1}}>Cancel</mwc-button>
          <mwc-button slot="primaryAction" @click=${this._deleteMember}>Delete</mwc-button>
        </ha-dialog>
      `:""}

      <!-- Clients -->
      <ha-card>
        <div class="card-header">
          <div class="name">Clients (${this.member.client_names.length})</div>
        </div>
        <div class="card-content">
          ${this.member.client_names.length===0?o`<p class="empty">No clients assigned</p>`:""}
          ${this.member.client_names.map(t=>o`
              <div class="list-item">
                <span class="item-text clickable" @click=${()=>{var i;const e=this.state.clients.find(a=>a.name===t);e&&((i=this.onNavigate)==null||i.call(this,"client-detail",e))}}>
                  ${t}
                  <ha-icon .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}></ha-icon>
                </span>
                <ha-icon-button label="Remove"
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  @click=${()=>this._removeClient(t)}
                ></ha-icon-button>
              </div>
            `)}
          <div class="add-row">
            <ha-select label="Add client" .value=${""}
              @selected=${t=>{t.detail.value&&this._addClient(t.detail.value)}}
            >
              ${this.state.clients.filter(t=>!this.member.client_names.includes(t.name)).map(t=>o`<ha-list-item value="${t.name}">${t.name}</ha-list-item>`)}
            </ha-select>
          </div>
        </div>
      </ha-card>

      <!-- Assigned Policies -->
      <ha-card>
        <div class="card-header">
          <div class="name">Assigned Policies (${this.member.assigned_policy_ids.length})</div>
        </div>
        <div class="card-content">
          ${this.member.assigned_policy_ids.length===0?o`<p class="empty">No policies assigned</p>`:""}
          ${this.member.assigned_policy_ids.map(t=>{const e=this.state.policies.find(i=>i.id===t);return o`
                <div class="list-item">
                  <span class="item-text clickable" @click=${()=>{var i;return(i=this.onNavigate)==null?void 0:i.call(this,"policy-detail",e)}}>
                    ${(e==null?void 0:e.name)||t}
                    <ha-icon .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}></ha-icon>
                  </span>
                  <ha-icon-button label="Unassign"
                    .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                    @click=${()=>this._removePolicy(t)}
                  ></ha-icon-button>
                </div>
              `})}
          <div class="add-row">
            <ha-select label="Assign policy" .value=${""}
              @selected=${t=>{t.detail.value&&this._addPolicy(t.detail.value)}}
            >
              ${this.state.policies.filter(t=>!this.member.assigned_policy_ids.includes(t.id)).map(t=>o`<ha-list-item value="${t.id}">${t.name}</ha-list-item>`)}
            </ha-select>
          </div>
        </div>
      </ha-card>

      <!-- Exceptions -->
      <ha-card>
        <div class="card-header">
          <div class="name">Exceptions (${this.member.exceptions.length})</div>
        </div>
        <div class="card-content">
          ${this.member.exceptions.map(t=>o`
              <div class="list-item">
                <span class="item-text">${t}</span>
                <ha-icon-button label="Remove"
                  .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                  @click=${()=>this._removeException(t)}
                ></ha-icon-button>
              </div>
            `)}
          <div class="add-row">
            <ha-textfield label="Add exception domain" .value=${this._newException}
              @input=${t=>{this._newException=t.target.value}}
              @keydown=${t=>{t.key==="Enter"&&this._addException()}}
            ></ha-textfield>
            <ha-icon-button label="Add"
              .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
              @click=${this._addException}
            ></ha-icon-button>
          </div>
        </div>
      </ha-card>
    `:o``}_handleDeleteDialog(){this._showDeleteConfirm=!1}async _addClient(t){if(!t||this.member.client_names.includes(t))return;const e={...this.member,client_names:[...this.member.client_names,t]};await this.hass.callWS({type:"adguard_pc/members/update",member:e}),this.member=e}async _removeClient(t){const e={...this.member,client_names:this.member.client_names.filter(i=>i!==t)};await this.hass.callWS({type:"adguard_pc/members/update",member:e}),this.member=e}async _addPolicy(t){if(!t||this.member.assigned_policy_ids.includes(t))return;const e={...this.member,assigned_policy_ids:[...this.member.assigned_policy_ids,t]};await this.hass.callWS({type:"adguard_pc/members/update",member:e}),this.member=e}async _removePolicy(t){const e={...this.member,assigned_policy_ids:this.member.assigned_policy_ids.filter(i=>i!==t)};await this.hass.callWS({type:"adguard_pc/members/update",member:e}),this.member=e}async _addException(){if(!this._newException.trim())return;const t={...this.member,exceptions:[...this.member.exceptions,this._newException.trim()]};await this.hass.callWS({type:"adguard_pc/members/update",member:t}),this.member=t,this._newException=""}async _removeException(t){const e={...this.member,exceptions:this.member.exceptions.filter(i=>i!==t)};await this.hass.callWS({type:"adguard_pc/members/update",member:e}),this.member=e}async _deleteMember(){var t;await this.hass.callWS({type:"adguard_pc/members/delete",member_id:this.member.id}),this._showDeleteConfirm=!1,(t=this.onNavigate)==null||t.call(this,"dashboard")}};S.styles=k`
    ha-card { margin-bottom: 8px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
    .name { font-weight: 500; font-size: 1.05em; }
    .card-content { padding: 0 16px 16px; }
    .actions { display: flex; gap: 4px; }
    .meta { color: var(--secondary-text-color); font-size: 0.9em; margin: 0; }
    .list-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
    .list-item:last-child { border-bottom: none; }
    .item-text { display: flex; align-items: center; gap: 4px; }
    .clickable { cursor: pointer; color: var(--primary-color, #03a9f4); }
    .empty { color: var(--secondary-text-color); font-style: italic; margin: 0; }
    .add-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
    ha-textfield { flex: 1; }
    ha-select { width: 100%; }
  `;R([h({attribute:!1})],S.prototype,"hass",2);R([h({attribute:!1})],S.prototype,"state",2);R([h({attribute:!1})],S.prototype,"member",2);R([h({type:Boolean})],S.prototype,"narrow",2);R([h({type:Object})],S.prototype,"onNavigate",2);R([n()],S.prototype,"_newException",2);R([n()],S.prototype,"_showDeleteConfirm",2);S=R([V("member-view")],S);var nt=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,A=(t,e,i,a)=>{for(var s=a>1?void 0:a?ct(e,i):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(s=(a?l(e,i,s):l(s))||s);return a&&s&&nt(e,i,s),s};let b=class extends ${constructor(){super(...arguments),this.narrow=!1,this._showAddRule=!1,this._newRuleTarget="",this._newRuleAction="block",this._newRuleType="domain",this._showDeleteConfirm=!1}render(){return this.profile?o`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.profile.name}</div>
          <div class="actions">
            <ha-icon-button label="Delete"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0,0,0 8,21H16A2,2 0,0,0 18,19V7H6V19Z"}
              @click=${()=>{this._showDeleteConfirm=!0}}
            ></ha-icon-button>
          </div>
        </div>
        <div class="card-content">
          <div class="meta-row">
            <span class="meta">Default: <strong>${this.profile.default_action}</strong></span>
            <mwc-button dense label="Toggle Default" @click=${this._toggleDefault}></mwc-button>
          </div>
        </div>
      </ha-card>

      ${this._showDeleteConfirm?o`
        <ha-dialog open @closed=${this._handleDeleteDialog}>
          <p>Delete profile "${this.profile.name}"?</p>
          <mwc-button slot="secondaryAction" @click=${()=>{this._showDeleteConfirm=!1}}>Cancel</mwc-button>
          <mwc-button slot="primaryAction" @click=${this._deleteProfile}>Delete</mwc-button>
        </ha-dialog>
      `:""}

      <!-- Rules -->
      <ha-card>
        <div class="card-header">
          <div class="name">Rules (${this.profile.rules.length})</div>
          <ha-icon-button label="Add Rule"
            .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
            @click=${()=>{this._showAddRule=!this._showAddRule}}
          ></ha-icon-button>
        </div>
        <div class="card-content">
          ${this._showAddRule?o`
            <div class="add-form">
              <ha-textfield label="Target (domain)" .value=${this._newRuleTarget}
                @input=${t=>{this._newRuleTarget=t.target.value}}
              ></ha-textfield>
              <ha-select label="Action" .value=${this._newRuleAction}
                @selected=${t=>{this._newRuleAction=t.detail.value}}
              >
                <ha-list-item value="block">Block</ha-list-item>
                <ha-list-item value="allow">Allow</ha-list-item>
              </ha-select>
              <ha-select label="Type" .value=${this._newRuleType}
                @selected=${t=>{this._newRuleType=t.detail.value}}
              >
                <ha-list-item value="domain">Domain</ha-list-item>
                <ha-list-item value="service">Service</ha-list-item>
                <ha-list-item value="category">Category</ha-list-item>
              </ha-select>
              <mwc-button raised label="Add" @click=${this._addRule} .disabled=${!this._newRuleTarget.trim()}></mwc-button>
            </div>
          `:""}
          ${this.profile.rules.length===0?o`<p class="empty">No rules defined</p>`:o`
                <table class="data-table">
                  <thead><tr><th>Type</th><th>Target</th><th>Action</th><th></th></tr></thead>
                  <tbody>
                    ${this.profile.rules.map((t,e)=>o`
                      <tr>
                        <td><span class="badge">${t.rule_type}</span></td>
                        <td class="target-cell">${t.target}</td>
                        <td><span class=${t.action==="block"?"action-block":"action-allow"}>${t.action}</span></td>
                        <td>
                          <ha-icon-button label="Remove"
                            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
                            @click=${()=>this._removeRule(e)}
                          ></ha-icon-button>
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              `}
        </div>
      </ha-card>
    `:o``}_handleDeleteDialog(){this._showDeleteConfirm=!1}async _toggleDefault(){const t=this.profile.default_action==="block"?"allow":"block",e={...this.profile,default_action:t};await this.hass.callWS({type:"adguard_pc/profiles/update",profile:e}),this.profile=e}async _addRule(){if(!this._newRuleTarget.trim())return;const t={target:this._newRuleTarget.trim(),action:this._newRuleAction,rule_type:this._newRuleType},e={...this.profile,rules:[...this.profile.rules,t]};await this.hass.callWS({type:"adguard_pc/profiles/update",profile:e}),this.profile=e,this._newRuleTarget="",this._showAddRule=!1}async _removeRule(t){const e=this.profile.rules.filter((a,s)=>s!==t),i={...this.profile,rules:e};await this.hass.callWS({type:"adguard_pc/profiles/update",profile:i}),this.profile=i}async _deleteProfile(){var t;await this.hass.callWS({type:"adguard_pc/profiles/delete",profile_id:this.profile.id}),this._showDeleteConfirm=!1,(t=this.onNavigate)==null||t.call(this,"dashboard")}};b.styles=k`
    ha-card { margin-bottom: 8px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
    .name { font-weight: 500; font-size: 1.05em; }
    .card-content { padding: 0 16px 16px; }
    .actions { display: flex; gap: 4px; }
    .meta-row { display: flex; justify-content: space-between; align-items: center; }
    .meta { color: var(--secondary-text-color); font-size: 0.9em; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th, .data-table td { padding: 10px 8px; text-align: left; border-bottom: 1px solid var(--divider-color, #e0e0e0); }
    .data-table th { font-weight: 500; color: var(--secondary-text-color); font-size: 0.85em; text-transform: uppercase; }
    .target-cell { font-family: var(--code-font-family, monospace); font-size: 0.9em; }
    .badge { padding: 2px 8px; border-radius: 4px; background: var(--code-editor-background-color, #f5f5f5); font-size: 0.85em; }
    .action-block { color: var(--error-color, #f44336); font-weight: 500; }
    .action-allow { color: var(--success-color, #4caf50); font-weight: 500; }
    .empty { color: var(--secondary-text-color); font-style: italic; margin: 0; }
    .add-form { padding: 12px 0; display: flex; flex-direction: column; gap: 8px; }
  `;A([h({attribute:!1})],b.prototype,"hass",2);A([h({attribute:!1})],b.prototype,"state",2);A([h({attribute:!1})],b.prototype,"profile",2);A([h({type:Boolean})],b.prototype,"narrow",2);A([h({type:Object})],b.prototype,"onNavigate",2);A([n()],b.prototype,"_showAddRule",2);A([n()],b.prototype,"_newRuleTarget",2);A([n()],b.prototype,"_newRuleAction",2);A([n()],b.prototype,"_newRuleType",2);A([n()],b.prototype,"_showDeleteConfirm",2);b=A([V("profile-view")],b);class dt{constructor(e){this.hass=e}async getState(){return this.hass.callWS({type:"adguard_pc/state/get"})}async updateState(e){await this.hass.callWS({type:"adguard_pc/state/update",state:e})}async getStatus(){return this.hass.callWS({type:"adguard_pc/status"})}async sync(){return this.hass.callWS({type:"adguard_pc/sync"})}async listProfiles(){return this.hass.callWS({type:"adguard_pc/profiles/list"})}async createProfile(e){return this.hass.callWS({type:"adguard_pc/profiles/create",profile:e})}async updateProfile(e){return this.hass.callWS({type:"adguard_pc/profiles/update",profile:e})}async deleteProfile(e){await this.hass.callWS({type:"adguard_pc/profiles/delete",profile_id:e})}async listGroups(){return this.hass.callWS({type:"adguard_pc/groups/list"})}async createGroup(e){return this.hass.callWS({type:"adguard_pc/groups/create",group:e})}async updateGroup(e){return this.hass.callWS({type:"adguard_pc/groups/update",group:e})}async deleteGroup(e){await this.hass.callWS({type:"adguard_pc/groups/delete",group_id:e})}async listMembers(){return this.hass.callWS({type:"adguard_pc/members/list"})}async createMember(e){return this.hass.callWS({type:"adguard_pc/members/create",member:e})}async updateMember(e){return this.hass.callWS({type:"adguard_pc/members/update",member:e})}async deleteMember(e){await this.hass.callWS({type:"adguard_pc/members/delete",member_id:e})}async listClients(){return this.hass.callWS({type:"adguard_pc/clients/list"})}async createClient(e){return this.hass.callWS({type:"adguard_pc/clients/create",client:e})}async updateClient(e){return this.hass.callWS({type:"adguard_pc/clients/update",client:e})}async deleteClient(e){await this.hass.callWS({type:"adguard_pc/clients/delete",client_id:e})}async listPolicies(){return this.hass.callWS({type:"adguard_pc/policies/list"})}async createPolicy(e){return this.hass.callWS({type:"adguard_pc/policies/create",policy:e})}async updatePolicy(e){return this.hass.callWS({type:"adguard_pc/policies/update",policy:e})}async deletePolicy(e){await this.hass.callWS({type:"adguard_pc/policies/delete",policy_id:e})}async setOverride(e,i,a,s){return this.hass.callWS({type:"adguard_pc/overrides/set",target:e,target_type:i,action:a,duration_minutes:s})}async clearOverride(e){await this.hass.callWS({type:"adguard_pc/overrides/clear",override_id:e})}}var ht=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,C=(t,e,i,a)=>{for(var s=a>1?void 0:a?pt(e,i):e,r=t.length-1,l;r>=0;r--)(l=t[r])&&(s=(a?l(e,i,s):l(s))||s);return a&&s&&ht(e,i,s),s};let w=class extends ${constructor(){super(...arguments),this._view="dashboard",this._state=null,this._selectedClient=null,this._selectedPolicy=null,this._selectedGroup=null,this._selectedMember=null,this._selectedProfile=null,this._loading=!0,this._api=null,this._navigate=(t,e)=>{this._view=t,t==="client-detail"&&e&&(this._selectedClient=e),t==="policy-detail"&&e&&(this._selectedPolicy=e),t==="group-detail"&&e&&(this._selectedGroup=e),t==="member-detail"&&e&&(this._selectedMember=e),t==="profile-detail"&&e&&(this._selectedProfile=e),(t==="dashboard"||t==="override")&&this._loadState(),this.requestUpdate()}}updated(t){t.has("hass")&&this.hass&&!this._api&&(this._api=new dt(this.hass),this._loadState())}async _loadState(){if(this._api)try{this._state=await this._api.getState()}catch(t){console.error("Failed to load state:",t)}finally{this._loading=!1}}render(){return this._loading?o`
        <ha-card>
          <div class="loading">
            <ha-progress-spinner></ha-progress-spinner>
            <p>Loading AdGuard Parental Control...</p>
          </div>
        </ha-card>
      `:this._state?o`
      <hass-subpage .hass=${this.hass} .narrow=${!1} .header=${this._viewTitle}>
        ${this._view!=="dashboard"?o`
              <ha-icon-button
                slot="toolbar-icon"
                label="Back"
                .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"}
                @click=${()=>this._navigate("dashboard")}
              ></ha-icon-button>
            `:_}
        ${this._renderContent()}
      </hass-subpage>
    `:o`
        <ha-card>
          <div class="loading">
            <p>Failed to load state. Check your AdGuard Home connection.</p>
          </div>
        </ha-card>
      `}get _viewTitle(){var t,e,i,a,s;switch(this._view){case"client-detail":return((t=this._selectedClient)==null?void 0:t.name)||"Client";case"policy-detail":return((e=this._selectedPolicy)==null?void 0:e.name)||"Policy";case"group-detail":return((i=this._selectedGroup)==null?void 0:i.name)||"Group";case"member-detail":return((a=this._selectedMember)==null?void 0:a.name)||"Member";case"profile-detail":return((s=this._selectedProfile)==null?void 0:s.name)||"Profile";case"override":return"Overrides";default:return"Parental Control"}}_renderContent(){switch(this._view){case"dashboard":return o`<dashboard-view
          .state=${this._state}
          .hass=${this.hass}
          .onNavigate=${this._navigate}
        ></dashboard-view>`;case"client-detail":return o`<client-view
          .state=${this._state}
          .hass=${this.hass}
          .client=${this._selectedClient}
          .onNavigate=${this._navigate}
        ></client-view>`;case"policy-detail":return o`<policy-view
          .state=${this._state}
          .hass=${this.hass}
          .policy=${this._selectedPolicy}
          .onNavigate=${this._navigate}
        ></policy-view>`;case"group-detail":return o`<group-view
          .state=${this._state}
          .hass=${this.hass}
          .group=${this._selectedGroup}
          .onNavigate=${this._navigate}
        ></group-view>`;case"member-detail":return o`<member-view
          .state=${this._state}
          .hass=${this.hass}
          .member=${this._selectedMember}
          .onNavigate=${this._navigate}
        ></member-view>`;case"profile-detail":return o`<profile-view
          .state=${this._state}
          .hass=${this.hass}
          .profile=${this._selectedProfile}
          .onNavigate=${this._navigate}
        ></profile-view>`;case"override":return o`<override-view
          .state=${this._state}
          .hass=${this.hass}
          .onNavigate=${this._navigate}
        ></override-view>`;default:return o`<dashboard-view
          .state=${this._state}
          .hass=${this.hass}
          .onNavigate=${this._navigate}
        ></dashboard-view>`}}};w.styles=k`
    :host {
      display: block;
    }
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px;
      gap: 16px;
    }
    ha-progress-spinner {
      --mdc-spinner-size: 48px;
    }
  `;C([h({attribute:!1})],w.prototype,"hass",2);C([n()],w.prototype,"_view",2);C([n()],w.prototype,"_state",2);C([n()],w.prototype,"_selectedClient",2);C([n()],w.prototype,"_selectedPolicy",2);C([n()],w.prototype,"_selectedGroup",2);C([n()],w.prototype,"_selectedMember",2);C([n()],w.prototype,"_selectedProfile",2);C([n()],w.prototype,"_loading",2);w=C([V("adguard-parental-control")],w);

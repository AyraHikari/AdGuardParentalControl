/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const be=globalThis,Ae=be.ShadowRoot&&(be.ShadyCSS===void 0||be.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Se=Symbol(),Pe=new WeakMap;let Be=class{constructor(e,i,s){if(this._$cssResult$=!0,s!==Se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i}get styleSheet(){let e=this.o;const i=this.t;if(Ae&&e===void 0){const s=i!==void 0&&i.length===1;s&&(e=Pe.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Pe.set(i,e))}return e}toString(){return this.cssText}};const Je=t=>new Be(typeof t=="string"?t:t+"",void 0,Se),C=(t,...e)=>{const i=t.length===1?t[0]:e.reduce((s,a,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[n+1],t[0]);return new Be(i,t,Se)},et=(t,e)=>{if(Ae)t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of e){const s=document.createElement("style"),a=be.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}},Te=Ae?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(const s of e.cssRules)i+=s.cssText;return Je(i)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:tt,defineProperty:it,getOwnPropertyDescriptor:st,getOwnPropertyNames:at,getOwnPropertySymbols:ot,getPrototypeOf:rt}=Object,W=globalThis,De=W.trustedTypes,nt=De?De.emptyScript:"",_e=W.reactiveElementPolyfillSupport,ne=(t,e)=>t,ve={toAttribute(t,e){switch(e){case Boolean:t=t?nt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch{i=null}}return i}},Le=(t,e)=>!tt(t,e),ze={attribute:!0,type:String,converter:ve,reflect:!1,useDefault:!1,hasChanged:Le};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),W.litPropertyMetadata??(W.litPropertyMetadata=new WeakMap);let ie=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=ze){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(e,i),!i.noAccessor){const s=Symbol(),a=this.getPropertyDescriptor(e,s,i);a!==void 0&&it(this.prototype,e,a)}}static getPropertyDescriptor(e,i,s){const{get:a,set:n}=st(this.prototype,e)??{get(){return this[i]},set(o){this[i]=o}};return{get:a,set(o){const c=a==null?void 0:a.call(this);n==null||n.call(this,o),this.requestUpdate(e,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ze}static _$Ei(){if(this.hasOwnProperty(ne("elementProperties")))return;const e=rt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ne("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ne("properties"))){const i=this.properties,s=[...at(i),...ot(i)];for(const a of s)this.createProperty(a,i[a])}const e=this[Symbol.metadata];if(e!==null){const i=litPropertyMetadata.get(e);if(i!==void 0)for(const[s,a]of i)this.elementProperties.set(s,a)}this._$Eh=new Map;for(const[i,s]of this.elementProperties){const a=this._$Eu(i,s);a!==void 0&&this._$Eh.set(a,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const i=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const a of s)i.unshift(Te(a))}else e!==void 0&&i.push(Te(e));return i}static _$Eu(e,i){const s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(i=>i(this))}addController(e){var i;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var i;(i=this._$EO)==null||i.delete(e)}_$E_(){const e=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return et(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostConnected)==null?void 0:s.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostDisconnected)==null?void 0:s.call(i)})}attributeChangedCallback(e,i,s){this._$AK(e,s)}_$ET(e,i){var n;const s=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,s);if(a!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:ve).toAttribute(i,s.type);this._$Em=e,o==null?this.removeAttribute(a):this.setAttribute(a,o),this._$Em=null}}_$AK(e,i){var n,o;const s=this.constructor,a=s._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const c=s.getPropertyOptions(a),l=typeof c.converter=="function"?{fromAttribute:c.converter}:((n=c.converter)==null?void 0:n.fromAttribute)!==void 0?c.converter:ve;this._$Em=a;const p=l.fromAttribute(i,c.type);this[a]=p??((o=this._$Ej)==null?void 0:o.get(a))??p,this._$Em=null}}requestUpdate(e,i,s,a=!1,n){var o;if(e!==void 0){const c=this.constructor;if(a===!1&&(n=this[e]),s??(s=c.getPropertyOptions(e)),!((s.hasChanged??Le)(n,i)||s.useDefault&&s.reflect&&n===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(c._$Eu(e,s))))return;this.C(e,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,i,{useDefault:s,reflect:a,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??i??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(i=void 0),this._$AL.set(e,i)),a===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[n,o]of a){const{wrapped:c}=o,l=this[n];c!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,o,l)}}let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(s=this._$EO)==null||s.forEach(a=>{var n;return(n=a.hostUpdate)==null?void 0:n.call(a)}),this.update(i)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(i)}willUpdate(e){}_$AE(e){var i;(i=this._$EO)==null||i.forEach(s=>{var a;return(a=s.hostUpdated)==null?void 0:a.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(i=>this._$ET(i,this[i]))),this._$EM()}updated(e){}firstUpdated(e){}};ie.elementStyles=[],ie.shadowRootOptions={mode:"open"},ie[ne("elementProperties")]=new Map,ie[ne("finalized")]=new Map,_e==null||_e({ReactiveElement:ie}),(W.reactiveElementVersions??(W.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const le=globalThis,Ee=t=>t,fe=le.trustedTypes,Re=fe?fe.createPolicy("lit-html",{createHTML:t=>t}):void 0,Ue="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,Ge="?"+F,lt=`<${Ge}>`,Q=document,ce=()=>Q.createComment(""),de=t=>t===null||typeof t!="object"&&typeof t!="function",Me=Array.isArray,ct=t=>Me(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",we=`[ 	
\f\r]`,re=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ne=/-->/g,Ve=/>/g,U=RegExp(`>|${we}(?:([^\\s"'>=/]+)(${we}*=${we}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qe=/'/g,Oe=/"/g,Ze=/^(?:script|style|textarea|title)$/i,Qe=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),r=Qe(1),N=Qe(2),Y=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),He=new WeakMap,G=Q.createTreeWalker(Q,129);function Ye(t,e){if(!Me(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Re!==void 0?Re.createHTML(e):e}const dt=(t,e)=>{const i=t.length-1,s=[];let a,n=e===2?"<svg>":e===3?"<math>":"",o=re;for(let c=0;c<i;c++){const l=t[c];let p,m,b=-1,H=0;for(;H<l.length&&(o.lastIndex=H,m=o.exec(l),m!==null);)H=o.lastIndex,o===re?m[1]==="!--"?o=Ne:m[1]!==void 0?o=Ve:m[2]!==void 0?(Ze.test(m[2])&&(a=RegExp("</"+m[2],"g")),o=U):m[3]!==void 0&&(o=U):o===U?m[0]===">"?(o=a??re,b=-1):m[1]===void 0?b=-2:(b=o.lastIndex-m[2].length,p=m[1],o=m[3]===void 0?U:m[3]==='"'?Oe:qe):o===Oe||o===qe?o=U:o===Ne||o===Ve?o=re:(o=U,a=void 0);const j=o===U&&t[c+1].startsWith("/>")?" ":"";n+=o===re?l+lt:b>=0?(s.push(p),l.slice(0,b)+Ue+l.slice(b)+F+j):l+F+(b===-2?c:j)}return[Ye(t,n+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class pe{constructor({strings:e,_$litType$:i},s){let a;this.parts=[];let n=0,o=0;const c=e.length-1,l=this.parts,[p,m]=dt(e,i);if(this.el=pe.createElement(p,s),G.currentNode=this.el.content,i===2||i===3){const b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(a=G.nextNode())!==null&&l.length<c;){if(a.nodeType===1){if(a.hasAttributes())for(const b of a.getAttributeNames())if(b.endsWith(Ue)){const H=m[o++],j=a.getAttribute(b).split(F),me=/([.?@])?(.*)/.exec(H);l.push({type:1,index:n,name:me[2],strings:j,ctor:me[1]==="."?ht:me[1]==="?"?gt:me[1]==="@"?ut:xe}),a.removeAttribute(b)}else b.startsWith(F)&&(l.push({type:6,index:n}),a.removeAttribute(b));if(Ze.test(a.tagName)){const b=a.textContent.split(F),H=b.length-1;if(H>0){a.textContent=fe?fe.emptyScript:"";for(let j=0;j<H;j++)a.append(b[j],ce()),G.nextNode(),l.push({type:2,index:++n});a.append(b[H],ce())}}}else if(a.nodeType===8)if(a.data===Ge)l.push({type:2,index:n});else{let b=-1;for(;(b=a.data.indexOf(F,b+1))!==-1;)l.push({type:7,index:n}),b+=F.length-1}n++}}static createElement(e,i){const s=Q.createElement("template");return s.innerHTML=e,s}}function se(t,e,i=t,s){var o,c;if(e===Y)return e;let a=s!==void 0?(o=i._$Co)==null?void 0:o[s]:i._$Cl;const n=de(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==n&&((c=a==null?void 0:a._$AO)==null||c.call(a,!1),n===void 0?a=void 0:(a=new n(t),a._$AT(t,i,s)),s!==void 0?(i._$Co??(i._$Co=[]))[s]=a:i._$Cl=a),a!==void 0&&(e=se(t,a._$AS(t,e.values),a,s)),e}class pt{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:i},parts:s}=this._$AD,a=((e==null?void 0:e.creationScope)??Q).importNode(i,!0);G.currentNode=a;let n=G.nextNode(),o=0,c=0,l=s[0];for(;l!==void 0;){if(o===l.index){let p;l.type===2?p=new he(n,n.nextSibling,this,e):l.type===1?p=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(p=new mt(n,this,e)),this._$AV.push(p),l=s[++c]}o!==(l==null?void 0:l.index)&&(n=G.nextNode(),o++)}return G.currentNode=Q,a}p(e){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,i),i+=s.strings.length-2):s._$AI(e[i])),i++}}class he{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,i,s,a){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=s,this.options=a,this._$Cv=(a==null?void 0:a.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=se(this,e,i),de(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==Y&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ct(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&de(this._$AH)?this._$AA.nextSibling.data=e:this.T(Q.createTextNode(e)),this._$AH=e}$(e){var n;const{values:i,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=pe.createElement(Ye(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===a)this._$AH.p(i);else{const o=new pt(a,this),c=o.u(this.options);o.p(i),this.T(c),this._$AH=o}}_$AC(e){let i=He.get(e.strings);return i===void 0&&He.set(e.strings,i=new pe(e)),i}k(e){Me(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,a=0;for(const n of e)a===i.length?i.push(s=new he(this.O(ce()),this.O(ce()),this,this.options)):s=i[a],s._$AI(n),a++;a<i.length&&(this._$AR(s&&s._$AB.nextSibling,a),i.length=a)}_$AR(e=this._$AA.nextSibling,i){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,i);e!==this._$AB;){const a=Ee(e).nextSibling;Ee(e).remove(),e=a}}setConnected(e){var i;this._$AM===void 0&&(this._$Cv=e,(i=this._$AP)==null||i.call(this,e))}}class xe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,s,a,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=i,this._$AM=a,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(e,i=this,s,a){const n=this.strings;let o=!1;if(n===void 0)e=se(this,e,i,0),o=!de(e)||e!==this._$AH&&e!==Y,o&&(this._$AH=e);else{const c=e;let l,p;for(e=n[0],l=0;l<n.length-1;l++)p=se(this,c[s+l],i,l),p===Y&&(p=this._$AH[l]),o||(o=!de(p)||p!==this._$AH[l]),p===u?e=u:e!==u&&(e+=(p??"")+n[l+1]),this._$AH[l]=p}o&&!a&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ht extends xe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}class gt extends xe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}}class ut extends xe{constructor(e,i,s,a,n){super(e,i,s,a,n),this.type=5}_$AI(e,i=this){if((e=se(this,e,i,0)??u)===Y)return;const s=this._$AH,a=e===u&&s!==u||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==u&&(s===u||a);a&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var i;typeof this._$AH=="function"?this._$AH.call(((i=this.options)==null?void 0:i.host)??this.element,e):this._$AH.handleEvent(e)}}class mt{constructor(e,i,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){se(this,e)}}const $e=le.litHtmlPolyfillSupport;$e==null||$e(pe,he),(le.litHtmlVersions??(le.litHtmlVersions=[])).push("3.3.3");const bt=(t,e,i)=>{const s=(i==null?void 0:i.renderBefore)??e;let a=s._$litPart$;if(a===void 0){const n=(i==null?void 0:i.renderBefore)??null;s._$litPart$=a=new he(e.insertBefore(ce(),n),n,void 0,i??{})}return a._$AI(t),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=globalThis;let $=class extends ie{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;const e=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=e.firstChild),e}update(e){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=bt(i,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Y}};var We;$._$litElement$=!0,$.finalized=!0,(We=Z.litElementHydrateSupport)==null||We.call(Z,{LitElement:$});const Ce=Z.litElementPolyfillSupport;Ce==null||Ce({LitElement:$});(Z.litElementVersions??(Z.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vt={attribute:!0,type:String,converter:ve,reflect:!1,hasChanged:Le},ft=(t=vt,e,i)=>{const{kind:s,metadata:a}=i;let n=globalThis.litPropertyMetadata.get(a);if(n===void 0&&globalThis.litPropertyMetadata.set(a,n=new Map),s==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),s==="accessor"){const{name:o}=i;return{set(c){const l=e.get.call(this);e.set.call(this,c),this.requestUpdate(o,l,t,!0,c)},init(c){return c!==void 0&&this.C(o,void 0,t,c),c}}}if(s==="setter"){const{name:o}=i;return function(c){const l=this[o];e.call(this,c),this.requestUpdate(o,l,t,!0,c)}}throw Error("Unsupported decorator location: "+s)};function g(t){return(e,i)=>typeof i=="object"?ft(t,e,i):((s,a,n)=>{const o=a.hasOwnProperty(n);return a.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(a,n):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function d(t){return g({...t,state:!0,attribute:!1})}const xt=C`
  :host {
    --agpc-bg: #0b0f1a;
    --agpc-bg-alt: #0e1424;
    --agpc-sidebar-bg: #0d1220;
    --agpc-card-bg: #161c2e;
    --agpc-card-bg-alt: #131a2c;
    --agpc-card-hover: #1b2338;
    --agpc-border: #232a41;
    --agpc-border-soft: #1c2338;
    --agpc-text: #e9ecf5;
    --agpc-text-dim: #8a92ab;
    --agpc-text-faint: #5c6480;
    --agpc-blue: #4f8cff;
    --agpc-blue-soft: rgba(79, 140, 255, 0.14);
    --agpc-green: #2ecc71;
    --agpc-green-soft: rgba(46, 204, 113, 0.14);
    --agpc-red: #f4584f;
    --agpc-red-soft: rgba(244, 88, 79, 0.14);
    --agpc-yellow: #f0b429;
    --agpc-yellow-soft: rgba(240, 180, 41, 0.14);
    --agpc-radius-lg: 14px;
    --agpc-radius-md: 10px;
    --agpc-radius-sm: 6px;

    /* Re-point Home Assistant / MWC component variables so ha-card,
       ha-textfield, ha-select, mwc-button, ha-dialog, etc. all render
       in the same dark palette without needing to be rewritten. */
    --primary-background-color: var(--agpc-bg);
    --secondary-background-color: var(--agpc-bg-alt);
    --card-background-color: var(--agpc-card-bg);
    --primary-text-color: var(--agpc-text);
    --secondary-text-color: var(--agpc-text-dim);
    --disabled-text-color: var(--agpc-text-faint);
    --divider-color: var(--agpc-border);
    --primary-color: var(--agpc-blue);
    --accent-color: var(--agpc-green);
    --error-color: var(--agpc-red);
    --success-color: var(--agpc-green);
    --warning-color: var(--agpc-yellow);
    --code-editor-background-color: var(--agpc-card-bg-alt);
    --code-font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    --mdc-theme-primary: var(--agpc-blue);
    --mdc-theme-on-primary: #ffffff;
    --mdc-theme-secondary: var(--agpc-blue);
    --mdc-theme-surface: var(--agpc-card-bg);
    --mdc-theme-on-surface: var(--agpc-text);
    --mdc-theme-text-primary-on-background: var(--agpc-text);
    --mdc-theme-text-secondary-on-background: var(--agpc-text-dim);
    --mdc-select-fill-color: var(--agpc-card-bg-alt);
    --mdc-text-field-fill-color: var(--agpc-card-bg-alt);
    --mdc-dialog-scrim-color: rgba(0, 0, 0, 0.6);

    display: block;
    background: var(--agpc-bg);
    color: var(--agpc-text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    min-height: 100vh;
  }
`,J=C`
  .card {
    background: var(--agpc-card-bg);
    border: 1px solid var(--agpc-border);
    border-radius: var(--agpc-radius-lg);
  }
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
  .badge.blue { background: var(--agpc-blue-soft); color: var(--agpc-blue); }
  .badge.green { background: var(--agpc-green-soft); color: var(--agpc-green); }
  .badge.red { background: var(--agpc-red-soft); color: var(--agpc-red); }
  .badge.yellow { background: var(--agpc-yellow-soft); color: var(--agpc-yellow); }
  .badge.neutral { background: rgba(255,255,255,0.06); color: var(--agpc-text-dim); }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--agpc-border);
    background: var(--agpc-card-bg-alt);
    color: var(--agpc-text);
    border-radius: var(--agpc-radius-sm);
    padding: 8px 14px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s ease, border-color 0.15s ease;
  }
  .btn:hover { background: var(--agpc-card-hover); border-color: #313a56; }
  .btn.primary {
    background: var(--agpc-blue);
    border-color: var(--agpc-blue);
    color: #fff;
  }
  .btn.primary:hover { background: #3f78e8; }
  .btn.danger {
    background: transparent;
    border-color: var(--agpc-red);
    color: var(--agpc-red);
  }
  .btn.danger:hover { background: var(--agpc-red-soft); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn svg { flex-shrink: 0; }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: var(--agpc-radius-sm);
    border: 1px solid transparent;
    background: transparent;
    color: var(--agpc-text-dim);
    cursor: pointer;
    padding: 0;
  }
  .icon-btn:hover { background: var(--agpc-card-hover); color: var(--agpc-text); border-color: var(--agpc-border); }

  input.field, select.field {
    width: 100%;
    box-sizing: border-box;
    background: var(--agpc-card-bg-alt);
    border: 1px solid var(--agpc-border);
    border-radius: var(--agpc-radius-sm);
    color: var(--agpc-text);
    padding: 9px 11px;
    font-size: 13px;
    font-family: inherit;
    outline: none;
  }
  input.field:focus, select.field:focus { border-color: var(--agpc-blue); }
  input.field::placeholder { color: var(--agpc-text-faint); }

  table.table {
    width: 100%;
    border-collapse: collapse;
  }
  table.table th {
    text-align: left;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--agpc-text-faint);
    font-weight: 600;
    padding: 0 12px 10px;
    border-bottom: 1px solid var(--agpc-border);
  }
  table.table td {
    padding: 12px;
    border-bottom: 1px solid var(--agpc-border-soft);
    font-size: 13.5px;
    color: var(--agpc-text);
  }
  table.table tbody tr:last-child td { border-bottom: none; }
  table.table tbody tr.clickable { cursor: pointer; }
  table.table tbody tr.clickable:hover { background: var(--agpc-card-hover); }

  .empty-state { color: var(--agpc-text-faint); font-style: italic; font-size: 13px; padding: 16px 0; }
`,h={shield:"M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z",dashboard:"M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z",groups:"M16.5,12A2.5,2.5 0 0,0 19,9.5A2.5,2.5 0 0,0 16.5,7A2.5,2.5 0 0,0 14,9.5A2.5,2.5 0 0,0 16.5,12M9,12A2.5,2.5 0 0,0 11.5,9.5A2.5,2.5 0 0,0 9,7A2.5,2.5 0 0,0 6.5,9.5A2.5,2.5 0 0,0 9,12M9,14C6.33,14 1,15.34 1,18V20H17V18C17,15.34 11.67,14 9,14M16.5,14C16.29,14 16.06,14 15.82,14C17.16,15 18,16.36 18,18V20H23V18C23,15.34 19.33,14 16.5,14Z",members:"M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z",clients:"M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z",policies:"M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7A2,2 0 0,1 14,9C14,10.11 13.1,11 12,11A2,2 0 0,1 10,9A2,2 0 0,1 12,7M17.75,17C17.75,15.14 15.14,14 12,14C8.86,14 6.25,15.14 6.25,17V18H17.75V17Z",profiles:"M12,12A5,5 0 0,0 17,7A5,5 0 0,0 12,2A5,5 0 0,0 7,7A5,5 0 0,0 12,12M12,14C8.34,14 1,15.79 1,19.5V22H23V19.5C23,15.79 15.66,14 12,14Z",schedules:"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",services:"M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16",overrides:"M9,3L5,6.99H8V14H10V6.99H13M16,17.01V10H14V17.01H11L15,21L19,17.01H16Z",logs:"M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",settings:"M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z",chevronRight:"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",back:"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z",plus:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",close:"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",delete:"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",sync:"M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13.03 17.7,14 17.19,14.79L18.63,16.23C19.5,15 20,13.55 20,12A8,8 0 0,0 12,4M12,18A6,6 0 0,1 6,12C6,10.97 6.3,10 6.81,9.21L5.37,7.77C4.5,9 4,10.45 4,12A8,8 0 0,0 12,20V23L16,19L12,15V18Z",moon:"M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z",dots:"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z",laptop:"M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z",clock:"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",category:"M4,4H10V10H4V4M20,4V10H14V4H20M14,14H20V20H14V14M4,14H10V20H4V14Z",domain:"M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"};var yt=Object.defineProperty,_t=Object.getOwnPropertyDescriptor,ge=(t,e,i,s)=>{for(var a=s>1?void 0:s?_t(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&yt(e,i,a),a};let K=class extends ${constructor(){super(...arguments),this._collapsedGroups=new Set}_icon(t,e=20){return N`<svg viewBox="0 0 24 24" width="${e}" height="${e}"><path fill="currentColor" d="${t}"></path></svg>`}_ownerFor(t){const e=this.state.members.find(s=>s.client_names.includes(t.name));if(e)return e.name;const i=this.state.groups.find(s=>s.client_names.includes(t.name));return i?i.name:"Unassigned"}_toggleGroup(t){const e=new Set(this._collapsedGroups);e.has(t)?e.delete(t):e.add(t),this._collapsedGroups=e}_rowFor(t){var s;const e=t.assigned_policy_ids.length>0,i=e?this.state.policies.find(a=>a.id===t.assigned_policy_ids[0]):void 0;return{client:t,owner:this._ownerFor(t),restricted:e,currentPolicy:i?i.name:"Default",nextChange:((s=i==null?void 0:i.time_schedule)==null?void 0:s.time_to)||"-"}}_groupedClients(){const t=new Set,e=[];for(const s of this.state.groups){const a=s.client_names.map(n=>this.state.clients.find(o=>o.name===n)).filter(Boolean).map(n=>this._rowFor(n));a.length!==0&&(a.forEach(n=>t.add(n.client.name)),e.push({name:s.name,groupId:s.id,rows:a,collapsed:this._collapsedGroups.has(s.id)}))}const i=this.state.clients.filter(s=>!t.has(s.name)).map(s=>this._rowFor(s));return i.length>0&&e.push({name:"Ungrouped",groupId:null,rows:i,collapsed:this._collapsedGroups.has("__ungrouped__")}),e}_clientRows(){return this.state.clients.map(t=>{var a;const e=t.assigned_policy_ids.length>0,i=e?this.state.policies.find(n=>n.id===t.assigned_policy_ids[0]):void 0;let s="-";return(a=i==null?void 0:i.time_schedule)!=null&&a.time_to&&(s=i.time_schedule.time_to),{client:t,owner:this._ownerFor(t),restricted:e,currentPolicy:i?i.name:"Default",nextChange:s}})}_blockedCategoryRules(){const t=new Map;for(const e of this.state.policies)for(const i of e.rules)i.rule_type==="category"&&i.action==="block"&&t.set(i.target,(t.get(i.target)||0)+1);for(const e of this.state.profiles)for(const i of e.rules)i.rule_type==="category"&&i.action==="block"&&t.set(i.target,(t.get(i.target)||0)+1);return Array.from(t.entries()).map(([e,i])=>({target:e,count:i})).sort((e,i)=>i.count-e.count).slice(0,5)}_blockedDomainRules(){const t=[];for(const e of this.state.policies)for(const i of e.rules)i.rule_type==="domain"&&i.action==="block"&&t.push({target:i.target,source:e.name});for(const e of this.state.profiles)for(const i of e.rules)i.rule_type==="domain"&&i.action==="block"&&t.push({target:i.target,source:e.name});return t.slice(0,6)}_totalRules(){const t=this.state.policies.reduce((i,s)=>i+s.rules.length,0),e=this.state.profiles.reduce((i,s)=>i+s.rules.length,0);return t+e}render(){if(!this.state)return r``;const t=this._clientRows(),e=t.filter(n=>n.restricted).length,i=this.state.policies.filter(n=>n.rules.length>0||n.profile_id),s=this._blockedCategoryRules(),a=this._blockedDomainRules();return r`
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-top">
            <div class="stat-value">${this.state.clients.length}</div>
            <div class="stat-icon blue">${this._icon(h.clients)}</div>
          </div>
          <div class="stat-label">Clients</div>
          <div class="stat-sub">Online ${e}</div>
        </div>
        <div class="stat-card">
          <div class="stat-top">
            <div class="stat-value">${this.state.policies.length}</div>
            <div class="stat-icon green">${this._icon(h.policies)}</div>
          </div>
          <div class="stat-label">Policies</div>
          <div class="stat-sub">Active ${i.length}</div>
        </div>
        <div class="stat-card">
          <div class="stat-top">
            <div class="stat-value">${this._totalRules()}</div>
            <div class="stat-icon yellow">${this._icon(h.shield)}</div>
          </div>
          <div class="stat-label">Rules</div>
          <div class="stat-sub">In Effect</div>
        </div>
        <div class="stat-card">
          <div class="stat-top">
            <div class="stat-value">${this.state.overrides.length}</div>
            <div class="stat-icon purple">${this._icon(h.clock)}</div>
          </div>
          <div class="stat-label">Overrides</div>
          <div class="stat-sub">Active</div>
        </div>
      </div>

      <div class="card clients-card">
        <div class="card-head">
          <h2>Clients Status</h2>
          <button class="link-btn" @click=${()=>{var n;return(n=this.onNavigate)==null?void 0:n.call(this,"clients")}}>View all</button>
        </div>
        ${t.length===0?r`<div class="empty-state">No clients configured yet.</div>`:this._groupedClients().map(n=>r`
              <div class="group-section">
                <div class="group-header" @click=${()=>this._toggleGroup(n.groupId??"__ungrouped__")}>
                  <span class="group-chevron">${n.collapsed?"▸":"▾"}</span>
                  <span class="group-name">${n.name}</span>
                  <span class="group-count">${n.rows.length}</span>
                </div>
                ${n.collapsed?"":r`
                <table class="table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Member</th>
                      <th>Status</th>
                      <th>Current Policy</th>
                      <th>Next Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${n.rows.map(o=>r`
                      <tr class="clickable" @click=${()=>{var c;return(c=this.onNavigate)==null?void 0:c.call(this,"client-detail",o.client)}}>
                        <td>
                          <div class="client-cell">
                            <span class="client-icon">${this._icon(h.laptop,16)}</span>
                            <div>
                              <div class="client-name">${o.client.name}</div>
                              <div class="client-ip">${o.client.ids[0]||"—"}</div>
                            </div>
                          </div>
                        </td>
                        <td>${o.owner}</td>
                        <td>
                          <span class="badge ${o.restricted?"red":"green"}">
                            ${o.restricted?"Restricted":"Unrestricted"}
                          </span>
                        </td>
                        <td>${o.currentPolicy}</td>
                        <td>${o.nextChange}</td>
                      </tr>
                    `)}
                  </tbody>
                </table>
                `}
              </div>
            `)}
      </div>

      <div class="bottom-grid">
        <div class="card mini-card">
          <div class="card-head"><h2>Active Policies</h2></div>
          <div class="mini-body">
            <div class="mini-icon blue">${this._icon(h.schedules,22)}</div>
            <div>
              <div class="mini-value">${i.length} <span class="mini-of">/ ${this.state.policies.length}</span></div>
              <div class="mini-caption">${i.slice(0,2).map(n=>n.name).join(", ")||"No active policies"}</div>
            </div>
          </div>
        </div>

        <div class="card mini-card">
          <div class="card-head"><h2>Top Blocked Categories</h2></div>
          ${s.length===0?r`<div class="empty-state">No blocked categories yet.</div>`:r`
                <ul class="rank-list">
                  ${s.map(n=>r`
                      <li>
                        <span class="rank-icon">${this._icon(h.category,16)}</span>
                        <span class="rank-label">${n.target}</span>
                        <span class="rank-count">${n.count}</span>
                      </li>
                    `)}
                </ul>
              `}
        </div>

        <div class="card mini-card">
          <div class="card-head"><h2>Top Blocked Domains</h2></div>
          ${a.length===0?r`<div class="empty-state">No blocked domains yet.</div>`:r`
                <ul class="rank-list">
                  ${a.map(n=>r`
                      <li>
                        <span class="rank-icon">${this._icon(h.domain,16)}</span>
                        <span class="rank-label">${n.target}</span>
                        <span class="rank-count muted">${n.source}</span>
                      </li>
                    `)}
                </ul>
              `}
        </div>
      </div>
    `}};K.styles=[J,C`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }

      .stat-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
        gap: 16px;
        margin-bottom: 20px;
      }
      .stat-card {
        background: var(--agpc-card-bg);
        border: 1px solid var(--agpc-border);
        border-radius: var(--agpc-radius-lg);
        padding: 18px 18px 16px;
      }
      .stat-top { display: flex; align-items: flex-start; justify-content: space-between; }
      .stat-value { font-size: 28px; font-weight: 700; color: var(--agpc-text); line-height: 1; }
      .stat-icon {
        width: 38px; height: 38px; border-radius: 10px;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
      }
      .stat-icon.blue { background: var(--agpc-blue-soft); color: var(--agpc-blue); }
      .stat-icon.green { background: var(--agpc-green-soft); color: var(--agpc-green); }
      .stat-icon.yellow { background: var(--agpc-yellow-soft); color: var(--agpc-yellow); }
      .stat-icon.purple { background: rgba(167,139,250,0.14); color: #a78bfa; }
      .stat-label { margin-top: 10px; font-size: 13px; color: var(--agpc-text-dim); font-weight: 600; }
      .stat-sub { margin-top: 2px; font-size: 12px; color: var(--agpc-text-faint); }

      .card { padding: 18px 20px 8px; margin-bottom: 18px; }
      .card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
      .card-head h2 { font-size: 15px; font-weight: 700; margin: 0; color: var(--agpc-text); }
      .link-btn {
        border: none; background: transparent; color: var(--agpc-blue);
        font-size: 12.5px; font-weight: 600; cursor: pointer; font-family: inherit;
      }
      .link-btn:hover { text-decoration: underline; }

      .clients-card .table { margin-top: 6px; }
      .group-section { border-top: 1px solid var(--agpc-border); }
      .group-section:first-of-type { border-top: none; }
      .group-header { display:flex; align-items:center; gap:8px; padding:10px 4px; cursor:pointer; user-select:none; font-size:13px; font-weight:600; color:var(--agpc-text); }
      .group-header:hover { color:var(--agpc-blue); }
      .group-chevron { width:14px; text-align:center; font-size:11px; color:var(--agpc-text-dim); transition:transform .15s; }
      .group-name { flex:1; }
      .group-count { font-size:11px; font-weight:500; color:var(--agpc-text-faint); background:var(--agpc-card-bg); padding:2px 7px; border-radius:8px; border:1px solid var(--agpc-border); }
      .client-cell { display: flex; align-items: center; gap: 10px; }
      .client-icon {
        width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,0.05);
        display: flex; align-items: center; justify-content: center; color: var(--agpc-text-dim); flex-shrink: 0;
      }
      .client-name { font-weight: 600; color: var(--agpc-text); font-size: 13.5px; }
      .client-ip { font-size: 11.5px; color: var(--agpc-text-faint); font-family: var(--code-font-family); }
      .menu-cell { text-align: right; }

      .bottom-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: 16px;
      }
      .mini-card { padding-bottom: 16px; }
      .mini-body { display: flex; align-items: center; gap: 14px; margin-top: 6px; }
      .mini-icon {
        width: 44px; height: 44px; border-radius: 10px;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      }
      .mini-icon.blue { background: var(--agpc-blue-soft); color: var(--agpc-blue); }
      .mini-value { font-size: 22px; font-weight: 700; color: var(--agpc-text); }
      .mini-of { font-size: 15px; color: var(--agpc-text-faint); font-weight: 500; }
      .mini-caption { font-size: 12px; color: var(--agpc-text-dim); margin-top: 2px; }

      .rank-list { list-style: none; margin: 4px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
      .rank-list li { display: flex; align-items: center; gap: 10px; }
      .rank-icon { color: var(--agpc-text-dim); display: flex; flex-shrink: 0; }
      .rank-label { flex: 1; font-size: 13px; color: var(--agpc-text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .rank-count { font-size: 12.5px; font-weight: 700; color: var(--agpc-text); }
      .rank-count.muted { font-weight: 500; color: var(--agpc-text-faint); font-size: 11.5px; }
    `];ge([g({attribute:!1})],K.prototype,"hass",2);ge([g({attribute:!1})],K.prototype,"state",2);ge([g({type:Object})],K.prototype,"onNavigate",2);ge([d()],K.prototype,"_collapsedGroups",2);K=ge([L("dashboard-view")],K);function M(t){var e,i;return((e=t.question)==null?void 0:e.name)||((i=t.question)==null?void 0:i.host)||""}class wt{constructor(e){this.hass=e}async getState(){return this.hass.callWS({type:"adguard_pc/state/get"})}async updateState(e){await this.hass.callWS({type:"adguard_pc/state/update",state:e})}async getStatus(){return this.hass.callWS({type:"adguard_pc/status"})}async sync(){return this.hass.callWS({type:"adguard_pc/sync"})}async listProfiles(){return this.hass.callWS({type:"adguard_pc/profiles/list"})}async createProfile(e){return this.hass.callWS({type:"adguard_pc/profiles/create",profile:e})}async updateProfile(e){return this.hass.callWS({type:"adguard_pc/profiles/update",profile:e})}async deleteProfile(e){await this.hass.callWS({type:"adguard_pc/profiles/delete",profile_id:e})}async listGroups(){return this.hass.callWS({type:"adguard_pc/groups/list"})}async createGroup(e){return this.hass.callWS({type:"adguard_pc/groups/create",group:e})}async updateGroup(e){return this.hass.callWS({type:"adguard_pc/groups/update",group:e})}async deleteGroup(e){await this.hass.callWS({type:"adguard_pc/groups/delete",group_id:e})}async listMembers(){return this.hass.callWS({type:"adguard_pc/members/list"})}async createMember(e){return this.hass.callWS({type:"adguard_pc/members/create",member:e})}async updateMember(e){return this.hass.callWS({type:"adguard_pc/members/update",member:e})}async deleteMember(e){await this.hass.callWS({type:"adguard_pc/members/delete",member_id:e})}async getMemberQueryLog(e,i={}){return this.hass.callWS({type:"adguard_pc/members/querylog",member_id:e,limit:i.limit??50,search:i.search??"",response_status:i.responseStatus??"",older_than:i.olderThan??""})}async getClientQueryLog(e,i={}){return this.hass.callWS({type:"adguard_pc/clients/querylog",client_id:e,limit:i.limit??100,search:i.search??"",response_status:i.responseStatus??"",older_than:i.olderThan??""})}async listClients(){return this.hass.callWS({type:"adguard_pc/clients/list"})}async createClient(e){return this.hass.callWS({type:"adguard_pc/clients/create",client:e})}async updateClient(e){return this.hass.callWS({type:"adguard_pc/clients/update",client:e})}async deleteClient(e){await this.hass.callWS({type:"adguard_pc/clients/delete",client_id:e})}async listPolicies(){return this.hass.callWS({type:"adguard_pc/policies/list"})}async createPolicy(e){return this.hass.callWS({type:"adguard_pc/policies/create",policy:e})}async updatePolicy(e){return this.hass.callWS({type:"adguard_pc/policies/update",policy:e})}async deletePolicy(e){await this.hass.callWS({type:"adguard_pc/policies/delete",policy_id:e})}async setOverride(e,i,s,a){return this.hass.callWS({type:"adguard_pc/overrides/set",target:e,target_type:i,action:s,duration_minutes:a})}async clearOverride(e){await this.hass.callWS({type:"adguard_pc/overrides/clear",override_id:e})}async listServices(){return this.hass.callWS({type:"adguard_pc/services/list"})}async getBlockedServices(){return this.hass.callWS({type:"adguard_pc/services/blocked"})}async updateBlockedServices(e){await this.hass.callWS({type:"adguard_pc/services/update",blocked_ids:e})}}const $t=[{name:"YouTube",icon:"M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.13L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.87L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z",color:"#FF0000",domains:["youtube.com","youtube-nocookie.com","googlevideo.com","ytimg.com","youtubei.googleapis.com","youtu.be"]},{name:"Netflix",icon:"M5.39,5.31C5.44,5.31 12,5.31 12,5.31V20.85C12,20.85 5.5,20.85 5.39,20.73C5.28,20.63 5.28,19.87 5.28,19.87V5.93C5.28,5.93 5.28,5.31 5.39,5.31M18.63,5.31C18.58,5.31 12,5.31 12,5.31V20.85C12,20.85 18.5,20.85 18.63,20.73C18.75,20.63 18.75,19.87 18.75,19.87V5.93C18.75,5.93 18.75,5.31 18.63,5.31Z",color:"#E50914",domains:["netflix.com","nflxvideo.net","nflximg.net","nflxext.com","netflixdnstest0.com","netflixdnstest1.com","netflixdnstest2.com","netflixdnstest3.com","netflixdnstest4.com","netflixdnstest5.com","netflixdnstest6.com","netflixdnstest7.com","netflixdnstest8.com","netflixdnstest9.com"]},{name:"Disney+",icon:"M12.17,2L21.17,11L12.17,20L3.17,11L12.17,2Z",color:"#0063E5",domains:["disneyplus.com","disney-plus.net","disney.com","registerdisney.go.com","cdn.registerdisney.go.com"]},{name:"Twitch",icon:"M11.64,5.93H13.06V10.95H11.64M15.07,5.93H16.5V10.95H15.07M7.45,5.93H10.27V10.95H7.45M21.42,1.33L18.21,4.54H13.63V10.95H15.07V6.38H18.21L21.42,3.17V1.33M2.58,0V16.91H6.82V21.15L11.06,16.91H15.3L21.42,10.79V0H2.58Z",color:"#9146FF",domains:["twitch.tv","twitchcdn.net","jtvnw.net","ttvnw.net","usher.ttvnw.net"]},{name:"TikTok",icon:"M16.6,5.82s0.51,0-0.42,0C13.8,5.64,12.25,5,11.3,5v7.6c0,2.08-1.56,3.69-3.6,3.69C5.48,16.39,4,14.83,4,12.75s1.48-3.64,3.7-3.64c0.37,0,0.73,0.05,1.07,0.14V8.03c-0.36-0.07-0.72-0.11-1.07-0.11C4.58,7.92,1,11.46,1,15.79s3.58,7.87,7.9,7.87c4.34,0,7.85-3.54,7.85-7.87V9.56c1.29,0.92,2.86,1.48,4.55,1.48V7.26C19.78,7.26,18.12,6.54,16.6,5.82z",color:"#00F2EA",domains:["tiktok.com","tiktokcdn.com","tiktokv.com","tiktokcdn.com","byteoversea.com","bytedance.com"]},{name:"Spotify",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M16.59,16.73C16.41,17.03 16.07,17.11 15.77,16.93C13.24,15.41 10.05,15 6,16C5.64,16.05 5.28,15.85 5.12,15.5C4.96,15.15 5.08,14.73 5.41,14.56C9.79,13.93 13.45,14.4 16.29,16.12C16.59,16.3 16.68,16.68 16.59,16.73M17.97,13.53C17.75,13.88 17.34,14 16.99,13.78C14.05,12 9.84,11.44 5.82,12.48C5.42,12.59 5,12.38 4.89,11.98C4.78,11.58 5,11.21 5.35,11.1C9.94,9.94 14.67,10.54 18.04,12.58C18.37,12.79 18.48,13.2 18.28,13.53M18.42,10.15C15.18,8.23 9.48,8.03 5.56,9.07C5.05,9.21 4.5,8.9 4.36,8.39C4.21,7.88 4.53,7.33 5.04,7.19C9.61,5.97 15.92,6.2 19.75,8.48C20.15,8.73 20.28,9.25 20.03,9.65C19.78,10.05 19.26,10.18 18.86,9.93L18.42,10.15Z",color:"#1DB954",domains:["spotify.com","spotifycdn.com","scdn.co","spoti.fi","spotify.design"]},{name:"Apple Music",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M12,16.5A1.5,1.5 0 0,1 10.5,15A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 13.5,15A1.5,1.5 0 0,1 12,16.5M9.89,13.27L8.47,14.69V16.11L9.89,14.69L11.31,16.11V14.69L9.89,13.27M14.11,13.27L12.69,14.69V16.11L14.11,14.69L15.53,16.11V14.69L14.11,13.27Z",color:"#FC3C44",domains:["music.apple.com","apple.com","mzstatic.com","apps.apple.com"]},{name:"Facebook",icon:"M12,2.04C6.5,2.04 2,6.53 2,12.06C2,17.06 5.66,21.21 10.44,21.96V14.96H7.9V12.06H10.44V9.85C10.44,7.34 11.93,5.93 14.22,5.93C15.31,5.93 16.45,6.13 16.45,6.13V8.62H15.19C13.95,8.62 13.56,9.39 13.56,10.18V12.06H16.34L15.89,14.96H13.56V21.96A10,10 0 0,0 22,12.06C22,6.53 17.5,2.04 12,2.04Z",color:"#1877F2",domains:["facebook.com","fbcdn.net","fb.com","fb.gg","fbsbx.com","facebook.net"]},{name:"Instagram",icon:"M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z",color:"#E1306C",domains:["instagram.com","cdninstagram.com"]},{name:"X / Twitter",icon:"M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.33C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z",color:"#1DA1F2",domains:["twitter.com","x.com","twimg.com","t.co","pbs.twimg.com","video.twimg.com"]},{name:"WhatsApp",icon:"M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.61 20.13 12.05 20.13C10.76 20.13 9.51 19.81 8.4 19.19L4.73 20.22L5.72 16.73C4.95 15.41 4.52 13.88 4.52 12.33C4.52 7.79 8.19 4.12 12.05 4.12M8.11 7.34C8.23 7.34 8.35 7.35 8.45 7.41C8.68 7.53 8.77 7.82 8.71 8.08C8.44 9.17 8.33 9.74 8.46 11.18C8.59 12.63 8.87 13.86 9.33 14.84C9.46 15.1 9.43 15.43 9.26 15.66L8.52 16.62L10.08 16.12C10.35 15.96 10.67 15.83 11 15.74C12.62 15.28 13.51 14.34 13.79 12.82C13.88 12.32 13.84 11.84 13.7 11.38C13.52 10.78 13.12 10.22 12.57 9.81C12.07 9.44 11.45 9.22 10.84 9.24C10.44 9.25 10.05 9.36 9.72 9.57L9.27 9.31C8.78 8.93 8.48 8.4 8.45 7.82C8.44 7.65 8.11 7.34 8.11 7.34Z",color:"#25D366",domains:["whatsapp.com","whatsapp.net","wa.me","whatsapp.org"]},{name:"Discord",icon:"M20.317,4.37a19.791,19.791 0 0,0-4.885-1.515A0.074,0.074 0 0,0 19.406,2.58a12.2,12.2 0 0,0-5.316,2.574A19.733,19.733 0 0,0 9.178,4.46a0.077,0.077 0 0,0-0.083,0.038C8.417,6.257,7.72,8.09,7.16,9.9a12.843,12.843 0 0,0-3.023,5.554A0.07,0.07 0 0,0 4.2,17.53c1.962,1.358,4.046,2.176,6.172,2.718a0.077,0.077 0 0,0,0.084-0.028c0.462-.63,0.874-1.295,1.226-1.994a0.076,0.076 0 0,0-0.041-0.106,13.107,13.107 0 0,1-1.872-0.892,0.077,0.077 0 0,1-0.008-0.128,10.2,10.2 0 0,0,.372-.292,0.074,0.074 0 0,1,0.077-0.01c3.928,1.793,8.18,1.793,12.062,0a0.074,0.074 0 0,1,0.078.01c0.12,0.098,0.246.198,0.373,0.292a0.077,0.077 0 0,1-0.006,0.127,12.299,12.299 0 0,1-1.873,0.892,0.077,0.077 0 0,0-0.041,0.107c.36,.698,0.772,1.362,1.225,1.993a0.076,0.076 0 0,0,0.084,0.028c2.146-0.543,4.23-1.361,6.193-2.72a0.077,0.077 0 0,0,0.042-0.054c0.72-2.771,1.086-5.71,0.372-8.554A0.078,0.078 0 0,0 20.317,4.37Z",color:"#5865F2",domains:["discord.com","discordapp.com","discord.gg","discord.media","discordapp.net"]},{name:"Telegram",icon:"M9.78,18.65L10.06,14.42L17.71,7.5L15.39,16.25L9.78,18.65M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M16.59,8.94L14.42,9.94L14.42,13.1L16.59,12.1L16.59,8.94Z",color:"#0088CC",domains:["telegram.org","t.me","telegram.me","telegra.ph","telesco.pe"]},{name:"Snapchat",icon:"M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.855-.21.063-.042.12-.072.18-.102.18-.09.33-.132.48-.132.21 0 .39.09.531.24.42.39.57.93.59 1.08.045.3-.045.585-.15.765-.27.465-.72.81-1.14 1.065-.15.09-.285.165-.42.24-.33.18-.63.345-.885.54-.21.15-.36.36-.45.57-.06.15-.09.285-.12.42l-.006.03c-.015.18-.03.33-.12.51-.255.495-.72.78-1.14.9-.285.075-.54.105-.81.12-.06.015-.12.015-.21.03-.195.045-.39.12-.615.21-.57.225-1.23.48-2.55.63l-.06.006c-.165.015-.33.03-.51.03-.195-.015-.39-.03-.585-.03-.315 0-.585.015-.885.045l-.09.006c-1.365.15-2.025.405-2.595.63-.21.075-.42.15-.6.2-.42.12-.63.135-.765.12-.405-.12-.795-.39-1.11-.72-.195-.195-.33-.435-.42-.66-.045-.12-.075-.24-.105-.36l-.015-.075c-.015-.075-.03-.15-.045-.225-.105-.33-.18-.57-.405-.72-.135-.09-.285-.135-.435-.135-.195 0-.375.06-.54.12-.105.045-.21.09-.315.12-.195.075-.345.09-.495.075-.345-.045-.645-.21-.87-.42-.48-.42-.72-1.065-.72-1.59 0-.15.015-.3.045-.45.12-.675.465-1.275.825-1.71.36-.435.735-.75 1.11-.95.15-.075.3-.135.435-.165.12-.03.225-.045.33-.06.135-.015.24-.045.36-.09.06-.015.12-.045.195-.075.165-.045.315-.06.465-.06.075 0 .15.015.21.03.045.015.105.015.165.03l.045.006c.18.045.33.15.45.27.36.375.54.885.54 1.275 0 .3-.075.585-.21.84-.135.27-.27.42-.39.54-.135.12-.255.225-.375.33-.075.06-.12.135-.18.21-.045.075-.075.135-.12.195-.075.135-.12.21-.165.285-.09.165-.165.285-.24.375a1.36 1.36 0 0,1-.33.27c-.075.045-.135.075-.21.105l-.06.015c-.225.075-.33.165-.405.255-.075.09-.135.195-.165.3-.015.06-.03.12-.045.18",color:"#FFFC00",domains:["snapchat.com","sc-cdn.net","snap.com"]},{name:"Reddit",icon:"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12A7.98,7.98 0 0,1 6.57,8.38C6.24,9.22 6,10.09 6,11A6,6 0 0,0 12,17C13.38,17 14.64,16.45 15.54,15.54L14,14A2.43,2.43 0 0,0 14.23,12.59C14.23,11.93 13.78,11.39 13.18,11.22C12.44,11 11.66,11.27 11.24,11.83L10,11C10.12,9.79 11.09,8.8 12.31,8.56C14.04,8.22 15.64,9.54 15.79,11.24C17.34,11.37 18.56,12.71 18.56,14.34C18.56,15.85 17.32,17.08 15.81,17.14C17,18.55 18.76,19.22 18.76,19.22C18.83,19.19 18.94,19.27 18.91,19.38L18.35,22.67C18.35,22.67 17,22.23 15.59,21.17C14.54,21.72 13.31,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22Z",color:"#FF4500",domains:["reddit.com","redd.it","redditstatic.com","redditmedia.com","reddit.map.fastly.net"]},{name:"LinkedIn",icon:"M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z",color:"#0A66C2",domains:["linkedin.com","licdn.com","linkedin.cn"]},{name:"Google",icon:"M12.24,10.285V14.4H6.8C6.47,15.92 5.75,17.19 4.72,18.04C3.26,19.24 1.41,19.95 0,20.06L0,20.06L0,20.06C2.81,18.72 6.14,17.86 12.24,17.86C14.87,17.86 17.1,16.88 18.7,15.3L18.7,15.3L18.7,15.3C20.26,13.83 21.16,11.73 21.16,9.36C21.16,8.67 21.08,7.99 20.94,7.35L12.24,10.285Z",color:"#4285F4",domains:["google.com","googleapis.com","gstatic.com","googleusercontent.com","google.co.uk","google.de","google.fr","google.it","google.es","google.nl","google.ca","google.com.au","google.co.jp","google.co.in","google.com.br","google.ru","google.cn","google.pl","google.be","google.ch","google.at","google.se","google.no","google.dk","google.fi","google.pt","google.gr","google.cz","google.ro","google.hu","google.ie","google.co.kr","google.com.hk","google.com.tw","google.com.mx","google.com.ar","google.com.sg","google.com.ng","google.co.za"]},{name:"Google Search",icon:"M21.35,11.1H12.18V13.83H17.84C17.57,16.24 15.39,17.92 12.18,17.92C8.72,17.92 5.93,15.14 5.93,11.62C5.93,8.1 8.72,5.32 12.18,5.32C13.77,5.32 15.19,5.89 16.3,6.87L18.5,4.67C16.68,2.97 14.5,2 12.18,2C6.76,2 2.35,6.42 2.35,11.84C2.35,17.26 6.76,21.68 12.18,21.68C17.42,21.68 21.5,17.72 21.5,12.14C21.5,11.76 21.46,11.43 21.35,11.1Z",color:"#34A853",domains:["www.google.com"]},{name:"Google Play",icon:"M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z",color:"#00C853",domains:["play.google.com"]},{name:"Google Maps",icon:"M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5Z",color:"#34A853",domains:["maps.google.com","maps.googleapis.com"]},{name:"GitHub",icon:"M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z",color:"#6e40c9",domains:["github.com","github.io","githubusercontent.com","githubassets.com"]},{name:"Microsoft",icon:"M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.97V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13V21.5L10,20.69V13.21L20,13Z",color:"#00A4EF",domains:["microsoft.com","windows.com","windows.net","live.com","office.com","office365.com","outlook.com","azure.com","skype.com","aka.ms","msedge.net","msn.com","bing.com","bing.net","msauth.net","microsoftonline.com"]},{name:"Amazon",icon:"M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.44-2.186 1.44-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.683zm3.186 7.705a.659.659 0 01-.749.075c-1.053-.876-1.242-1.277-1.818-2.108-1.738 1.772-2.969 2.302-5.218 2.302-2.666 0-4.744-1.645-4.744-4.94 0-2.572 1.394-4.308 3.379-5.164 1.72-.755 4.124-.891 5.963-1.095v-.41c0-.753.058-1.644-.384-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.619-2.54 1.897-.054.285-.261.567-.549.582l-3.065-.33c-.259-.058-.546-.266-.472-.66C5.771 4.48 8.995 3.155 11.605 3.155c1.437 0 3.29.369 4.404 1.42 1.399 1.317 1.262 3.071 1.262 4.971v4.489c0 1.335.554 1.925 1.075 2.648.18.257.22.567-.008.757-.578.478-1.617 1.363-2.165 1.869l-.132-.623z",color:"#FF9900",domains:["amazon.com","amazonaws.com","cloudfront.net","ssl-images-amazon.com","media-amazon.com","images-amazon.com","amazonvideo.com","amazonaws.cn"]},{name:"Cloudflare",icon:"M17.5 10C17.5 7.64 15.55 5.67 13.12 5.63L12.93 5.62C12.59 5.56 12.27 5.45 11.97 5.3C11.37 5 10.73 4.85 10.09 4.85C7.25 4.85 4.87 7.07 4.6 9.86C3.09 10.26 2 11.64 2 13.28C2 15.18 3.55 16.73 5.45 16.73H17.09C19.25 16.73 21 14.98 21 12.82C21 10.73 19.29 9.07 17.21 9C17.33 9.32 17.5 9.65 17.5 10Z",color:"#F38020",domains:["cloudflare.com","cloudflare-dns.com","cloudflareinsights.com","cdnjs.cloudflare.com","cf-cdn.com","1.1.1.1","1.0.0.1"]},{name:"OpenAI",icon:"M22.282 9.821a5.985 5.985 0 0,0-.516-4.91 6.046 6.046 0 0,0-6.51-2.9A6.065 6.065 0 0,0 4.981 4.18a5.985 5.985 0 0,0-3.998 2.9 6.046 6.046 0 0,0 .743 7.097 5.98 5.98 0 0,0 .51 4.911 6.051 6.051 0 0,0 6.515 2.9A5.985 5.985 0 0,0 13.26 24a6.056 6.056 0 0,0 5.772-4.206 5.99 5.99 0 0,0 3.997-2.9 6.056 6.056 0 0,0-.747-7.073zM13.26 22.43a4.476 4.476 0 0,1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0,0 .392-.681v-6.737l2.02 1.168a.071.071 0 0,1 .038.053v5.583a4.504 4.504 0 0,1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0,1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0,0 .78 0l5.843-3.369v2.332a.08.08 0 0,1-.033.062L9.74 19.95a4.5 4.5 0 0,1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0,1 2.366-1.973V11.6a.766.766 0 0,0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0,1-.071 0l-4.83-2.786A4.504 4.504 0 0,1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0,1 .071 0l4.83 2.791a4.494 4.494 0 0,1-.676 8.105v-5.678a.79.79 0 0,0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0,0-.785 0L9.409 9.23V6.897a.066.066 0 0,1,.028-.061l4.83-2.787a4.5 4.5 0 0,1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0,1-.038-.057V6.075a4.5 4.5 0 0,1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0,0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v3.005l-2.607 1.5-2.602-1.5z",color:"#412991",domains:["openai.com","chatgpt.com","auth0.openai.com","cdn.oaistatic.com","chat.openai.com"]},{name:"Steam",icon:"M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M15.97,7.56L13.19,8.92L13.19,14.21L15.81,13.08L15.97,7.56Z",color:"#1B2838",domains:["steampowered.com","steamcommunity.com","steamgames.com","steamusercontent.com","steamstatic.com","valvesoftware.com"]},{name:"Epic Games",icon:"M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",color:"#0078F2",domains:["epicgames.com","unrealengine.com","epic-games.store"]},{name:"Wikipedia",icon:"M12.09,13.119C9.519,13.119,7.771,11.062,7.771,8.337c0-2.726,1.748-4.782,4.32-4.782c2.571,0,4.319,2.056,4.319,4.782C16.41,11.062,14.663,13.119,12.09,13.119M12,5.354c-1.606,0-2.87,1.567-2.87,2.983c0,1.417,1.264,2.984,2.87,2.984c1.605,0,2.87-1.567,2.87-2.984C14.87,6.921,13.605,5.354,12,5.354M19.228,18.732L17.756,17.26c-0.617,0.767-2.291,1.96-3.693,1.96c-1.013,0-1.786-0.453-1.786-0.453l-1.935,1.936c0.566,0.345,2.097,1.088,3.746,1.088c1.901,0,3.177-1.139,3.946-2.023l-0.279-0.284c0.685-0.137,0.732-0.367,0.732-0.546C17.941,18.324,19.143,18.23,19.228,18.732z",color:"#636466",domains:["wikipedia.org","wikimedia.org","wikidata.org"]},{name:"Coursera",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 1,1 20,12A8,8 0 0,1 12,20Z",color:"#0056D2",domains:["coursera.org","coursera.com"]},{name:"Zoom",icon:"M17,10.5V7C17,6.45 16.55,6 16,6H4C3.45,6 3,6.45 3,7V17C3,17.55 3.45,18 4,18H16C16.55,18 17,17.55 17,17V13.5L21,17.5V6.5L17,10.5Z",color:"#2D8CFF",domains:["zoom.us","zoom.com","zoominfo.com"]},{name:"Slack",icon:"M5.042,15.165a2.528,2.528 0 0,1-2.52,2.523A2.528,2.528 0 0,1 0,15.165a2.527,2.527 0 0,1 2.522-2.52h2.52v2.52zM6.313,15.165a2.527,2.527 0 0,1 2.521-2.52 2.527,2.527 0 0,1 2.521,2.52v6.313A2.528,2.528 0 0,1 8.834,24a2.528,2.528 0 0,1-2.521-2.522v-6.313zM8.834,5.042a2.528,2.528 0 0,1-2.521-2.52A2.528,2.528 0 0,1 8.834,0a2.528,2.528 0 0,1 2.521,2.522v2.52H8.834zM8.834,6.313a2.528,2.528 0 0,1 2.521,2.521 2.528,2.528 0 0,1-2.521,2.521H2.522A2.528,2.528 0 0,1 0,8.834a2.528,2.528 0 0,1 2.522-2.521h6.312zM18.956,8.834a2.528,2.528 0 0,1 2.522-2.521A2.528,2.528 0 0,1 24,8.834a2.528,2.528 0 0,1-2.522,2.521h-2.522V8.834zM17.688,8.834a2.528,2.528 0 0,1-2.523,2.521 2.527,2.527 0 0,1-2.52-2.521V2.522A2.527,2.527 0 0,1 15.165,0a2.528,2.528 0 0,1 2.523,2.522v6.312zM15.165,18.956a2.528,2.528 0 0,1 2.523,2.522A2.528,2.528 0 0,1 15.165,24a2.527,2.527 0 0,1-2.52-2.522v-2.522h2.52zM15.165,17.688a2.527,2.527 0 0,1-2.52-2.523 2.526,2.526 0 0,1 2.52-2.52h6.313A2.527,2.527 0 0,1 24,15.165a2.528,2.528 0 0,1-2.522,2.523h-6.313z",color:"#611f69",domains:["slack.com","slack-edge.com","slack-msgs.com"]},{name:"Microsoft Teams",icon:"M19.239,5.417C19.087,5.157 18.789,5 18.469,5H15V3H13V5H9V3H7V5H4.5C3.673,5 3,5.673 3,6.5V19.5C3,20.327 3.673,21 4.5,21H10.5V17.391L12,18.391L13.5,17.391V21H19.5C20.327,21 21,20.327 21,19.5V6.5C21,5.733 20.483,5.101 19.776,5.011L19.239,5.417Z",color:"#6264A7",domains:["teams.microsoft.com","teams.cdn.office.net","msedge.net"]},{name:"SoundCloud",icon:"M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.057-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.282c.013.06.044.094.104.094.057 0 .09-.037.1-.094l.21-1.282-.21-1.332c-.01-.057-.043-.094-.1-.094m1.82-1.131c-.065 0-.108.049-.116.104l-.216 2.463.216 2.385c.008.057.051.104.116.104.064 0 .107-.047.114-.104l.244-2.385-.244-2.463c-.007-.055-.05-.104-.114-.104m.898-.447c-.074 0-.12.054-.127.112l-.2 2.91.2 2.76c.007.06.053.112.127.112.072 0 .119-.053.126-.112l.227-2.76-.227-2.91c-.007-.058-.054-.112-.126-.112m.897-.446c-.084 0-.132.06-.138.12l-.184 3.356.184 3.182c.006.065.054.12.138.12.084 0 .133-.055.14-.12l.207-3.182-.207-3.356c-.007-.06-.056-.12-.14-.12m.9 0c-.091 0-.14.066-.146.132l-.168 3.356.168 3.181c.006.07.055.132.146.132.089 0 .139-.063.146-.132l.189-3.181-.189-3.356c-.007-.066-.057-.132-.146-.132m.897-.224c-.099 0-.15.074-.154.144l-.152 3.58.152 3.18c.004.078.055.144.154.144.098 0 .148-.066.154-.144l.171-3.18-.171-3.58c-.006-.07-.056-.144-.154-.144m.9-.226c-.108 0-.16.08-.164.155l-.137 3.806.137 3.178c.004.084.056.156.164.156.108 0 .158-.072.164-.156l.154-3.178-.154-3.806c-.006-.075-.056-.155-.164-.155m.899-.226c-.116 0-.17.087-.174.168l-.12 4.032.12 3.176c.004.09.058.168.174.168.117 0 .17-.078.176-.168l.136-3.176-.136-4.032c-.006-.081-.059-.168-.176-.168m.9-.225c-.125 0-.18.094-.184.18l-.104 4.257.104 3.175c.004.095.059.18.184.18.124 0 .18-.085.186-.18l.117-3.175-.117-4.257c-.006-.086-.062-.18-.186-.18m.901-.18c-.134 0-.19.1-.194.193l-.088 4.437.088 3.173c.004.1.06.193.194.193.133 0 .19-.093.195-.193l.099-3.173-.099-4.437c-.005-.093-.062-.193-.195-.193m.9 0c-.142 0-.199.106-.203.206l-.072 4.437.072 3.172c.004.105.061.206.203.206.142 0 .198-.101.204-.206l.082-3.172-.082-4.437c-.006-.1-.062-.206-.204-.206m3.789-1.748c-.28 0-.56.047-.823.137-.219-2.462-2.264-4.368-4.757-4.368-.58 0-1.135.113-1.639.318-.192.08-.243.16-.247.317v8.67c.004.164.135.3.299.315h7.167c1.456 0 2.638-1.182 2.638-2.638 0-1.457-1.182-2.638-2.638-2.638",color:"#FF5500",domains:["soundcloud.com","sndcdn.com"]},{name:"Pandora",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 1,1 20,12A8,8 0 0,1 12,20Z",color:"#3668FF",domains:["pandora.com"]},{name:"eBay",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 1,1 20,12A8,8 0 0,1 12,20Z",color:"#E53238",domains:["ebay.com","ebaystatic.com","ebaycdn.net"]},{name:"Shopee",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 1,1 20,12A8,8 0 0,1 12,20Z",color:"#EE4D2D",domains:["shopee.com","shopee.sg","shopee.vn","shopee.co.th","shopee.com.my","shopee.co.id","shopee.com.tw","shopee.com.br","shopee.ph","shopee.sg"]},{name:"Lazada",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 1,1 20,12A8,8 0 0,1 12,20Z",color:"#0F146D",domains:["lazada.com","lazada.sg","lazada.vn","lazada.co.th","lazada.com.my","lazada.co.id","lazada.com.ph"]},{name:"CNN",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 1,1 20,12A8,8 0 0,1 12,20Z",color:"#CC0000",domains:["cnn.com","cnn.io"]},{name:"BBC",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 1,1 20,12A8,8 0 0,1 12,20Z",color:"#BB1919",domains:["bbc.com","bbc.co.uk","bbci.co.uk","bbc.in"]},{name:"The Verge",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 1,1 20,12A8,8 0 0,1 12,20Z",color:"#FA4B2A",domains:["theverge.com","verge.com"]},{name:"NordVPN",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 1,1 20,12A8,8 0 0,1 12,20Z",color:"#4687FF",domains:["nordvpn.com"]},{name:"ExpressVPN",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 1,1 20,12A8,8 0 0,1 12,20Z",color:"#D62027",domains:["expressvpn.com"]},{name:"Surfshark",icon:"M12,2A10,10 0 1,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 1,1 20,12A8,8 0 0,1 12,20Z",color:"#172F4E",domains:["surfshark.com","surfshark.me"]}];function Ke(t){const e=t.toLowerCase().replace(/\.$/,"");for(const i of $t)for(const s of i.domains)if(e===s||e.endsWith("."+s))return i;return null}function Xe(t,e=20){const i=Ke(t);return i?N`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="${i.color}" opacity="0.15"/><path d="${i.icon}" fill="${i.color}"/></svg>`:N`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" opacity="0.35"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" fill="currentColor" opacity="0.25"/><path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="currentColor" opacity="0.2"/></svg>`}var Ct=Object.defineProperty,kt=Object.getOwnPropertyDescriptor,x=(t,e,i,s)=>{for(var a=s>1?void 0:s?kt(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Ct(e,i,a),a};const Ie=()=>new Date(Date.now()-24*60*60*1e3).toISOString();let v=class extends ${constructor(){super(...arguments),this._tab="policies",this._queryLogs=[],this._queryLoading=!1,this._queryLive=!0,this._queryError="",this._querySearch="",this._queryOldest="",this._queryFullyLoaded=!1,this._selectedPolicyId=null,this._showDeleteConfirm=!1,this._showAddPolicy=!1,this._showAddRule=!1,this._newRuleTarget="",this._newRuleAction="block",this._newRuleType="domain",this._newRulePolicyId="",this._topDetail=null}connectedCallback(){super.connectedCallback(),this._startQueryPolling()}disconnectedCallback(){super.disconnectedCallback(),this._stopQueryPolling()}updated(t){var e,i;t.has("client")&&(this._selectedPolicyId=((i=(e=this.client)==null?void 0:e.assigned_policy_ids)==null?void 0:i[0])||null,this._queryLogs=[],this._queryOldest="",this._queryFullyLoaded=!1,this._loadQueryLog())}_icon(t,e=16){return N`<svg viewBox="0 0 24 24" width="${e}" height="${e}"><path fill="currentColor" d="${t}"></path></svg>`}get _group(){return this.state.groups.find(t=>t.client_names.includes(this.client.name))||null}get _member(){return this.state.members.find(t=>t.client_names.includes(this.client.name))||null}get _policies(){return this.client.assigned_policy_ids.map(t=>this.state.policies.find(e=>e.id===t)).filter(Boolean)}_policyActive(t){const e=t.time_schedule;if(!e)return!0;const i=new Date,s=["sun","mon","tue","wed","thu","fri","sat"][i.getDay()];if(e.days.length&&!e.days.some(b=>b.toLowerCase().startsWith(s)))return!1;if(!e.time_from||!e.time_to)return!0;const[a,n]=e.time_from.split(":").map(Number),[o,c]=e.time_to.split(":").map(Number),l=i.getHours()*60+i.getMinutes(),p=a*60+n,m=o*60+c;return p<=m?l>=p&&l<m:l>=p||l<m}get _activePolicy(){return this._policies.find(t=>this._policyActive(t))||this._policies[0]||null}_mode(t){if(!t)return"NORMAL";const e=t.rules.some(s=>s.action==="allow"),i=t.rules.some(s=>s.action==="block");return e&&!i?"ALLOW ONLY":e&&i?"CUSTOM":i?"RESTRICTED":"NORMAL"}_schedule(t){const e=t==null?void 0:t.time_schedule;return e&&e.time_from&&e.time_to?`${e.time_from} - ${e.time_to}`:"All day"}_days(t){var i;const e=(i=t==null?void 0:t.time_schedule)==null?void 0:i.days;return e!=null&&e.length?e.map(s=>s.slice(0,3)).join(" · "):"Every day"}_next(t){const e=t==null?void 0:t.time_schedule;if(!(e!=null&&e.time_from)||!e.time_to)return"—";const i=new Date,s=i.getHours()*60+i.getMinutes(),[a,n]=e.time_from.split(":").map(Number),[o,c]=e.time_to.split(":").map(Number),l=a*60+n,p=o*60+c;return(l<=p?s>=l&&s<p:s>=l||s<p)?e.time_to:e.time_from}_blockedServices(){return[...new Set(this._policies.flatMap(t=>t.rules.filter(e=>e.rule_type==="service"&&e.action==="block").map(e=>e.target)))]}_allowedServices(){return[...new Set(this._policies.flatMap(t=>t.rules.filter(e=>e.rule_type==="service"&&e.action==="allow").map(e=>e.target)))]}_blocked(t){const e=(t.reason||"").toLowerCase();return/filtered\/(blocked|blacklist|safebrowsing|parental|safesearch|service)/.test(e)||/\bblocked\b/.test(e)||/\bblacklist\b/.test(e)}_time(t){const e=new Date(t);return Number.isNaN(e.getTime())?t.slice(11,19):e.toLocaleTimeString([],{hour12:!1})}_response(t){var e,i;return((i=(e=t.answer)==null?void 0:e[0])==null?void 0:i.value)||t.status||"—"}_ms(t){const e=Number.parseFloat(t.elapsedMs||"");return Number.isFinite(e)?`${Math.round(e)} ms`:t.elapsedMs||"—"}_logs(){const t=this._querySearch.toLowerCase().trim();return this._queryLogs.filter(e=>!t||M(e).toLowerCase().includes(t))}_topDomains(){const t=new Map;for(const e of this._queryLogs){const i=M(e)||"unknown",s=t.get(i)||{requests:0,blocked:0,processed:0,totalMs:0};if(s.requests++,this._blocked(e))s.blocked++;else{s.processed++;const a=Number.parseFloat(e.elapsedMs||"");Number.isFinite(a)&&(s.totalMs+=a)}t.set(i,s)}return[...t.entries()].sort((e,i)=>i[1].requests-e[1].requests).slice(0,5)}_topServices(){const t=new Map;for(const e of this._queryLogs){const i=Ke(M(e)),s=(i==null?void 0:i.name)||M(e)||"unknown",a=t.get(s)||{service:i,requests:0,blocked:0,processed:0,totalMs:0};if(a.requests++,this._blocked(e))a.blocked++;else{a.processed++;const n=Number.parseFloat(e.elapsedMs||"");Number.isFinite(n)&&(a.totalMs+=n)}t.set(s,a)}return[...t.entries()].sort((e,i)=>i[1].requests-e[1].requests).slice(0,5)}_serviceIcon(t,e=21){return Xe(t,e)}_startQueryPolling(){this._stopQueryPolling(),this._queryLive&&(this._loadQueryLog(),this._queryTimer=window.setInterval(()=>this._loadQueryLog(),5e3))}_stopQueryPolling(){this._queryTimer&&window.clearInterval(this._queryTimer),this._queryTimer=void 0}async _loadQueryLog(){if(!(!this.client||!this.hass||this._queryLoading)){this._queryLoading=!0;try{const t=this._queryLogs.length===0,e=t?200:120,i=t?"":this._queryOldest,s=await this.hass.callWS({type:"adguard_pc/clients/querylog",client_id:this.client.name,limit:e,search:"",response_status:"",older_than:i}),a=(s==null?void 0:s.data)||[],n=(s==null?void 0:s.oldest)||"";if(t){this._queryLogs=a,this._queryOldest=n;const o=new Date(Ie()).getTime();let c=n,l=a;for(;c&&l.length>=e&&l.length>0;){const p=l[l.length-1];if(new Date(p.time).getTime()<=o)break;const m=await this.hass.callWS({type:"adguard_pc/clients/querylog",client_id:this.client.name,limit:e,search:"",response_status:"",older_than:c}),b=(m==null?void 0:m.data)||[];if(!b.length||(this._queryLogs=[...this._queryLogs,...b],c=(m==null?void 0:m.oldest)||"",this._queryOldest=c,l=b,new Date(b[b.length-1].time).getTime()<=o)||!(m!=null&&m.oldest))break}this._queryFullyLoaded=!0}else if(a.length){const o=new Set(this._queryLogs.map(l=>{var p;return`${l.time}|${M(l)}|${(p=l.question)==null?void 0:p.type}`})),c=a.filter(l=>{var p;return!o.has(`${l.time}|${M(l)}|${(p=l.question)==null?void 0:p.type}`)});if(c.length){const l=new Date(Ie()).getTime();this._queryLogs=[...c,...this._queryLogs].filter(p=>new Date(p.time).getTime()>l)}}this._queryError=""}catch(t){this._queryError=t instanceof Error?t.message:"Unable to load AdGuard query log"}finally{this._queryLoading=!1}}}render(){var n;if(!this.client)return r``;const t=this._activePolicy,e=this._group,i=this._member,s=t!=null&&t.profile_id?this.state.profiles.find(o=>o.id===t.profile_id):null,a=!!t&&this._mode(t)!=="NORMAL";return r`
    <div class="page">
      <div class="breadcrumb"><span @click=${()=>{var o;return(o=this.onNavigate)==null?void 0:o.call(this,"clients")}}>Clients</span><span>›</span><strong>${this.client.name}</strong></div>
      <section class="hero card">
        <div class="device-hero-icon">${this._icon(h.laptop,34)}</div><div class="hero-main"><div class="title-line"><h1>${this.client.name}</h1><span class="pill green">Online</span></div><div class="hero-line">${this.client.ids[0]||"No IP"} <span>•</span> Primary device</div><div class="hero-sub">AdGuard Client: ${this.client.ids[1]||this.client.name}</div></div>
        <div class="hero-metric"><small>Status</small><span class="pill ${a?"yellow-pill":"green"}">${a?"RESTRICTED":"UNRESTRICTED"}</span></div><div class="hero-metric"><small>Current Policy</small><strong>${(t==null?void 0:t.name)||"Default"} ${a?"☾":""}</strong></div><div class="hero-metric"><small>Next Change</small><strong>${this._next(t)}</strong><small>${t?"scheduled":"—"}</small></div><div class="hero-metric"><small>Group</small><strong>${(e==null?void 0:e.name)||"—"}</strong></div><div class="hero-metric"><small>Member</small><strong>${(i==null?void 0:i.name)||"—"}</strong></div><div class="hero-metric"><small>Profile</small><strong>${(s==null?void 0:s.name)||"—"}</strong></div><div class="hero-actions"><button class="btn" @click=${()=>this._tab="general"}>✎ Edit Client</button><button class="btn btn-hero-delete" @click=${()=>this._showDeleteConfirm=!0}>Delete</button></div>
      </section>
      <div class="tabs">${["general","policies","rules","overrides","activity"].map(o=>r`<button class="tab ${this._tab===o?"active":""}" @click=${()=>this._tab=o}>${o[0].toUpperCase()+o.slice(1)}</button>`)}</div>
      <div class="content-grid"><main class="main-column">
        ${this._tab==="general"?this._general(e,i,s):u}
        ${this._tab==="policies"?this._policiesView(t):u}
        ${this._tab==="rules"?this._rulesView():u}
        ${this._tab==="overrides"?this._overridesView():u}
        ${this._tab==="activity"?this._activityView():u}
        ${this._tab==="policies"?r`<section class="card preview-card"><div class="section-head"><h2>Policy Preview <span>(Now)</span></h2><button class="btn small">◉ Preview Full Details</button></div><div class="preview-grid"><div><small>Effective Mode</small><strong class="pill purple">${this._mode(t)}</strong></div><div><small>Active Policy</small><strong>${(t==null?void 0:t.name)||"Default"}</strong><span>${this._schedule(t)}</span></div><div><small>Matching Conditions</small><strong>✓ Time: ${new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:!1})}</strong><span>✓ Day: ${new Date().toLocaleDateString([],{weekday:"long"})}</span></div></div></section>`:u}
        <div class="bottom-grid">${this._topTable("Top Services",this._topServices(),!0)}${this._topTable("Top Domains",this._topDomains(),!1)}</div>
      </main>
      <aside class="query-panel card"><div class="query-head"><div><h2>Service / Domain History</h2><small>Latest DNS queries for this client</small></div><div class="query-actions"><select class="compact-select"><option>Last 24 hours</option></select><button class="icon-btn" @click=${this._loadQueryLog}>↻</button></div></div>
        <div class="query-search"><input class="field" placeholder="Search domain…" .value=${this._querySearch} @input=${o=>this._querySearch=o.target.value}></div>
        <div class="query-table-wrap"><table class="table query-table"><thead><tr><th>TIME</th><th>DOMAIN / SERVICE</th><th>TYPE</th><th>RESPONSE</th><th>STATUS</th><th>DETAILS</th></tr></thead><tbody>${this._logs().slice(0,12).map(o=>{var c;return r`<tr><td class="time">${this._time(o.time)}</td><td><div class="domain-cell">${this._serviceIcon(M(o))}<strong>${M(o)||"—"}</strong></div></td><td>${((c=o.question)==null?void 0:c.type)||"A"}</td><td class="response">${this._response(o)}</td><td>${this._blocked(o)?r`<span class="pill red">Blocked</span>`:r`<span class="pill green">Processed</span>`}</td><td class="details">${this._blocked(o)?"✕ Blocklist":this._ms(o)}</td></tr>`})}</tbody></table>${this._queryLoading&&!this._queryLogs.length?r`<div class="empty">Loading query log…</div>`:u}${this._queryError?r`<div class="query-error">${this._queryError}</div>`:u}${!this._queryLoading&&!this._logs().length?r`<div class="empty">No DNS queries found for this client.</div>`:u}</div>
        <div class="query-foot"><span class="live-label"><i class=${this._queryLive?"on":""}></i>${this._queryLive?"Live":"Paused"}</span><button class="icon-btn" @click=${()=>{this._queryLive=!this._queryLive,this._queryLive?this._startQueryPolling():this._stopQueryPolling()}}>${this._queryLive?"Ⅱ":"▶"}</button><button class="btn small" @click=${()=>{var o;return(o=this.onNavigate)==null?void 0:o.call(this,"logs")}}>View Full Query Log</button></div>
      </aside></div>
    </div>
    ${this._showDeleteConfirm?r`<div class="modal-scrim" @click=${()=>this._showDeleteConfirm=!1}><div class="modal" @click=${o=>o.stopPropagation()}><h3>Delete client "${this.client.name}"?</h3><p>This action cannot be undone. All associated policies and data will be removed.</p><div class="modal-actions"><button class="btn" @click=${()=>this._showDeleteConfirm=!1}>Cancel</button><button class="btn btn-danger" @click=${this._deleteClient}>Delete</button></div></div></div>`:u}
    ${this._showAddPolicy?this._renderAddPolicyModal():u}
    ${this._showAddRule?this._renderAddRuleModal():u}
    ${this._topDetail?r`<div class="modal-scrim" @click=${()=>this._topDetail=null}><div class="modal detail-modal" @click=${o=>o.stopPropagation()}><h3>${this._topDetail.key}</h3><div class="detail-grid"><div class="detail-row"><span>Total Requests</span><strong>${this._topDetail.requests}</strong></div><div class="detail-row"><span>Processed</span><strong class="green-text">${this._topDetail.processed} <small>(${this._topDetail.requests?Math.round(this._topDetail.processed/this._topDetail.requests*100):0}%)</small></strong></div><div class="detail-row"><span>Blocked</span><strong class="red-text">${this._topDetail.blocked} <small>(${this._topDetail.requests?Math.round(this._topDetail.blocked/this._topDetail.requests*100):0}%)</small></strong></div><div class="detail-row"><span>Avg Response</span><strong>${this._topDetail.processed?`${Math.round(this._topDetail.totalMs/this._topDetail.processed)} ms`:"—"}</strong></div>${this._topDetail.service?r`<div class="detail-row"><span>Service ID</span><strong class="mono">${this._topDetail.service.id}</strong></div><div class="detail-row"><span>Categories</span><strong>${((n=this._topDetail.service.categories)==null?void 0:n.join(", "))||"—"}</strong></div>`:r`<div class="detail-row"><span>Full Domain</span><strong class="mono">${this._topDetail.key}</strong></div>`}</div><div class="modal-actions"><button class="btn" @click=${()=>this._topDetail=null}>Close</button></div></div></div>`:u}`}_general(t,e,i){return r`<section class="card section-card"><div class="section-head"><h2>Client Identity</h2><button class="btn small" @click=${this._saveIdentity}>Save</button></div><div class="form-grid"><label>Name<input class="field" .value=${this.client.name} readonly></label><label>IP Address<input class="field" .value=${this.client.ids[0]||""} readonly></label><label>AdGuard Client<input class="field" .value=${this.client.ids[1]||""} readonly></label><label>Group<input class="field" .value=${(t==null?void 0:t.name)||"—"} readonly></label><label>Member<input class="field" .value=${(e==null?void 0:e.name)||"—"} readonly></label><label>Profile<input class="field" .value=${(i==null?void 0:i.name)||"—"} readonly></label></div></section>`}_policiesView(t){return r`<section class="card section-card"><div class="section-head"><div><h2>Assigned Policies</h2><small>Policies applied to this client (top to bottom = priority)</small></div><button class="btn primary small" @click=${()=>{this._showAddPolicy=!0}}>＋ Assign Policy</button></div><table class="table"><thead><tr><th>PRIORITY</th><th>POLICY</th><th>SCHEDULE</th><th>STATUS</th><th>ACTIONS</th></tr></thead><tbody>${this._policies.map((e,i)=>r`<tr class=${e.id===(t==null?void 0:t.id)?"active-row":""}><td>${i+1}</td><td><strong>☾ ${e.name}</strong><span class="pill purple mode-pill">${this._mode(e)}</span></td><td>${this._schedule(e)}<small>${this._days(e)}</small></td><td><span class="pill ${this._policyActive(e)?"green":"gray"}">${this._policyActive(e)?"ACTIVE":"INACTIVE"}</span></td><td>⋮</td></tr>`)}</tbody></table>${this._policies.length?r`<div class="info-note">ⓘ Policies are evaluated from top to bottom. The first matching policy is applied unless overridden.</div>`:r`<div class="empty">No policies assigned.</div>`}</section>`}_rulesView(){const t=this._policies.flatMap(e=>e.rules.map(i=>({...i,policy:e.name})));return r`<section class="card section-card"><div class="section-head"><div><h2>Client Rules</h2><small>Rules inherited from assigned policies</small></div><button class="btn primary small" @click=${()=>{var e;this._newRulePolicyId=((e=this._policies[0])==null?void 0:e.id)||"",this._showAddRule=!0}}>＋ Add Rule</button></div><table class="table"><thead><tr><th>POLICY</th><th>TYPE</th><th>TARGET</th><th>ACTION</th></tr></thead><tbody>${t.map(e=>r`<tr><td>${e.policy}</td><td>${e.rule_type}</td><td class="mono">${e.target}</td><td><span class="pill ${e.action==="allow"?"green":"red"}">${e.action.toUpperCase()}</span></td></tr>`)}</tbody></table>${t.length?u:r`<div class="empty">No rules defined.</div>`}</section>`}_overridesView(){const t=this.state.overrides.filter(e=>e.target_type==="client"&&e.target===this.client.name&&(!e.expires||new Date(e.expires).getTime()>Date.now()));return r`<section class="card section-card"><div class="section-head"><h2>Overrides (${t.length})</h2><button class="btn primary small">＋ New Override</button></div>${t.length?t.map(e=>r`<div class="override-row"><strong>${e.action.replaceAll("_"," ")}</strong><span>${e.expires||"No expiry"}</span></div>`):r`<div class="empty">No active overrides.</div>`}</section>`}_activityView(){return r`<section class="card section-card"><div class="section-head"><h2>Activity</h2><button class="btn small" @click=${this._loadQueryLog}>↻ Refresh</button></div><div class="activity-summary"><strong>${this._queryLogs.length}</strong><span>recent DNS queries loaded from AdGuard Home</span></div></section>`}_topTable(t,e,i){return r`<section class="card section-card top-table"><div class="section-head"><h2>${t} <span>(Last 24 hours)</span></h2></div><table class="table"><thead><tr><th>${i?"SERVICE":"DOMAIN"}</th><th>REQUESTS</th><th>PROCESSED</th><th>BLOCKED</th></tr></thead><tbody>${e.map(([s,a])=>{const n=a.requests?Math.round(a.processed/a.requests*100):0,o=a.requests?Math.round(a.blocked/a.requests*100):0;return r`<tr><td><div class="domain-cell top-cell" @click=${()=>this._topDetail={key:s,requests:a.requests,processed:a.processed,blocked:a.blocked,totalMs:a.totalMs,service:a.service||null}}>${i&&a.service?this._serviceIcon(a.service.domains[0],20):u}<strong>${s}</strong></div></td><td>${a.requests}</td><td class="processed">${a.processed||"—"}<small>${n}%</small></td><td class="blocked-count">${a.blocked||"—"}<small>${o}%</small></td></tr>`})}</tbody></table>${e.length?u:r`<div class="empty">No query data yet.</div>`}</section>`}_renderAddPolicyModal(){const t=new Set(this.client.assigned_policy_ids),e=this.state.policies.filter(i=>!t.has(i.id));return r`<div class="modal-scrim" @click=${()=>this._showAddPolicy=!1}></div><div class="modal wide-modal" @click=${i=>i.stopPropagation()}><h3>Assign Policy to ${this.client.name}</h3><p>Select a policy to assign to this client.</p><div class="modal-list">${e.length?e.sort((i,s)=>s.priority-i.priority).map(i=>r`<button class="modal-list-item" @click=${async()=>{var a;const s={...this.client,assigned_policy_ids:[...this.client.assigned_policy_ids,i.id]};await this.hass.callWS({type:"adguard_pc/clients/update",client:s}),this._showAddPolicy=!1,await((a=this.onStateChanged)==null?void 0:a.call(this))}}><span><strong>${i.name}</strong><small>Priority ${i.priority} · ${i.rules.length} rules</small></span></button>`):r`<div class="empty">All policies are already assigned.</div>`}</div><div class="modal-actions"><button class="btn" @click=${()=>this._showAddPolicy=!1}>Cancel</button></div></div>`}_renderAddRuleModal(){const t=this._policies;return r`<div class="modal-scrim" @click=${()=>this._showAddRule=!1}></div><div class="modal wide-modal" @click=${e=>e.stopPropagation()}><h3>Add Rule to ${this.client.name}</h3><p>Add a custom rule to one of the client's assigned policies.</p><div class="rule-form"><label>Policy<select class="field" @change=${e=>this._newRulePolicyId=e.target.value}>${t.map(e=>r`<option value=${e.id} ?selected=${e.id===this._newRulePolicyId}>${e.name}</option>`)}</select></label><label>Target<input class="field" placeholder="example.com" .value=${this._newRuleTarget} @input=${e=>this._newRuleTarget=e.target.value}></label><label>Type<select class="field" @change=${e=>this._newRuleType=e.target.value}><option value="domain" ?selected=${this._newRuleType==="domain"}>Domain</option><option value="service" ?selected=${this._newRuleType==="service"}>Service</option><option value="category" ?selected=${this._newRuleType==="category"}>Category</option></select></label><label>Action<select class="field" @change=${e=>this._newRuleAction=e.target.value}><option value="block" ?selected=${this._newRuleAction==="block"}>Block</option><option value="allow" ?selected=${this._newRuleAction==="allow"}>Allow</option></select></label></div><div class="modal-actions"><button class="btn" @click=${()=>this._showAddRule=!1}>Cancel</button><button class="btn primary" @click=${this._addRule} ?disabled=${!this._newRuleTarget||!this._newRulePolicyId}>Add Rule</button></div></div>`}async _addRule(){var i;if(!this._newRuleTarget||!this._newRulePolicyId)return;const t=this.state.policies.find(s=>s.id===this._newRulePolicyId);if(!t)return;const e=[...t.rules.map(s=>({target:s.target,action:s.action,rule_type:s.rule_type,is_regex:s.is_regex})),{target:this._newRuleTarget,action:this._newRuleAction,rule_type:this._newRuleType}];await this.hass.callWS({type:"adguard_pc/policies/update",policy:{...t,rules:e}}),this._newRuleTarget="",this._showAddRule=!1,await((i=this.onStateChanged)==null?void 0:i.call(this))}async _saveIdentity(){var t;await this.hass.callWS({type:"adguard_pc/clients/update",client:this.client}),(t=this.onStateChanged)==null||t.call(this)}async _deleteClient(){var t,e;await this.hass.callWS({type:"adguard_pc/clients/delete",client_id:this.client.name}),this._showDeleteConfirm=!1,(t=this.onStateChanged)==null||t.call(this),(e=this.onNavigate)==null||e.call(this,"clients")}};v.styles=[J,C`
    :host{display:block;color:var(--agpc-text,#eef2ff)}.page{padding:0 14px 30px;max-width:1680px;margin:0 auto}.card{background:var(--agpc-card-bg,#151c31);border:1px solid var(--agpc-border,#27304a);border-radius:12px;box-sizing:border-box}.breadcrumb{height:42px;display:flex;align-items:center;gap:9px;color:#71809f;font-size:13px}.breadcrumb span:first-child{cursor:pointer}.breadcrumb strong{color:#eef2ff}.hero{min-height:112px;padding:17px 18px;display:flex;align-items:center;gap:16px}.device-hero-icon{width:68px;height:68px;border-radius:14px;background:#121d35;border:1px solid #2c3a59;color:#75a5ff;display:grid;place-items:center;flex:none}.hero-main{min-width:250px;flex:1}.title-line{display:flex;align-items:center;gap:10px}.title-line h1{margin:0;font-size:21px}.hero-line{font-size:12px;color:#c5cee0;margin-top:7px}.hero-sub{font-size:10px;color:#68758f;margin-top:4px}.hero-metric{min-width:82px}.hero-metric small{display:block;color:#66738e;font-size:9px;text-transform:uppercase;letter-spacing:.04em;margin-bottom:7px}.hero-metric strong{font-size:12px;color:#e7ecf8}.hero-actions{display:flex;align-self:flex-start;gap:6px;margin-left:auto}.tabs{display:flex;gap:4px;padding:0 8px;border-bottom:1px solid #27304a;margin-top:4px}.tab{border:0;background:transparent;color:#75839e;font:600 12px inherit;padding:12px 14px;border-bottom:2px solid transparent;cursor:pointer}.tab.active{color:#4e8cff;border-bottom-color:#4e8cff}.content-grid{display:grid;grid-template-columns:minmax(0,1fr) 640px;gap:12px;margin-top:12px;align-items:start}.main-column{min-width:0}.section-card{padding:16px;margin-bottom:12px}.section-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:13px}.section-head h2{margin:0;font-size:15px}.section-head small{display:block;color:#68758f;font-size:10px;margin-top:4px}.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid #2e3853;background:#151e34;color:#d8dff0;border-radius:7px;padding:8px 11px;font:600 11px inherit;cursor:pointer}.btn:hover{background:#1b2741}.btn.primary{background:#397cf5;border-color:#397cf5;color:#fff}.btn.small{padding:6px 9px;font-size:10px}.btn.danger{background:#4a202a;border-color:#71313d;color:#ff7582}.btn-hero-delete{background:#451d24;border-color:#6b2832;color:#ff6875}.btn-hero-delete:hover{background:#5c2430}.btn-danger{background:#b94650;border-color:#b94650;color:#fff}.btn-danger:hover{background:#a03c45}.icon-btn{width:30px;height:30px;display:grid;place-items:center;border:1px solid transparent;border-radius:7px;background:transparent;color:#8390aa;cursor:pointer}.icon-btn:hover{background:#1b253e;color:#eaf0ff;border-color:#2d3853}.pill{display:inline-flex;align-items:center;padding:3px 8px;border-radius:6px;font-size:9px;font-weight:800;letter-spacing:.04em}.pill.green{background:#103c31;color:#34db95}.pill.red{background:#441d28;color:#ff6875}.pill.yellow-pill{background:#45381b;color:#f0bd35}.pill.purple{background:#32294e;color:#bd9bff}.pill.gray{background:#252d40;color:#8b96aa}.mode-pill{margin-left:8px}.active-row{background:#10182d}.info-note{margin-top:12px;padding:9px 11px;border:1px solid #293452;border-radius:8px;color:#8b98b2;font-size:10px;background:#10182d}.table{width:100%;border-collapse:collapse}.table th{text-align:left;font-size:9px;color:#65728f;font-weight:700;letter-spacing:.05em;padding:0 8px 9px;border-bottom:1px solid #29324a}.table td{padding:10px 8px;border-bottom:1px solid #202942;font-size:11px;color:#cdd5e8}.table tbody tr:last-child td{border-bottom:0}.table tbody tr:hover{background:#18213a}.table td small{display:block;color:#65728f;font-size:9px;margin-top:3px}.mono{font-family:ui-monospace,SFMono-Regular,Consolas,monospace}.preview-card{padding:16px;margin-bottom:12px}.preview-card h2 span,.top-table h2 span{color:#68758f;font-weight:500;font-size:11px}.preview-grid{display:grid;grid-template-columns:1fr 1.2fr 1.4fr;gap:1px;background:#29324a;border:1px solid #29324a;border-radius:8px;overflow:hidden}.preview-grid>div{background:#11182b;padding:12px}.preview-grid small{display:block;color:#65728f;font-size:9px;margin-bottom:7px}.preview-grid strong{display:block;font-size:12px}.preview-grid span{display:block;color:#76839d;font-size:10px;margin-top:4px}.bottom-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.top-table{min-width:0}.processed{color:#4be09b!important}.blocked-count{color:#ff6670!important}.blocked-count span{color:#a95d66}.domain-cell{display:flex;align-items:center;gap:8px;min-width:0}.domain-cell strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:180px}.top-cell{cursor:pointer}.top-cell:hover strong{color:#4e8cff}.detail-modal{width:380px}.detail-grid{display:flex;flex-direction:column;gap:1px;background:#29324a;border-radius:8px;overflow:hidden;margin-bottom:16px}.detail-row{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#11182b;font-size:12px}.detail-row span{color:#65728f}.detail-row strong{color:#e0e6f0}.detail-row small{color:#65728f;font-size:10px}.green-text{color:#4be09b!important}.red-text{color:#ff6670!important}.service-icon,.service-fallback{display:inline-grid;place-items:center;flex:none;border-radius:7px;background:color-mix(in srgb,var(--service-color,#52607b) 20%,#11182b);color:var(--service-color,#9aa6bd);font-weight:900;font-size:11px}.service-fallback{background:#1d263b;color:#8290a9}.query-panel{position:sticky;top:12px;overflow:hidden}.query-head{display:flex;justify-content:space-between;gap:10px;padding:15px;border-bottom:1px solid #29324a}.query-head h2{margin:0;font-size:15px}.query-head small{display:block;color:#68758f;font-size:10px;margin-top:4px}.query-actions{display:flex;align-items:center;gap:5px}.compact-select{background:#11182b;border:1px solid #2a3550;color:#bfc8da;border-radius:7px;padding:7px 8px;font:10px inherit}.query-search{padding:9px 10px;border-bottom:1px solid #29324a}.query-search .field{width:100%}.query-table-wrap{max-height:690px;overflow:auto}.query-table{min-width:700px}.query-table th{position:sticky;top:0;background:#151c31;z-index:1}.query-table td{white-space:nowrap}.query-table .time{color:#7f8ca7;font-variant-numeric:tabular-nums}.query-table .response{max-width:120px;overflow:hidden;text-overflow:ellipsis}.details{color:#8490a8!important}.query-foot{display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:10px;border-top:1px solid #29324a}.live-label{margin-right:auto;display:flex;align-items:center;gap:6px;color:#7f8ca7;font-size:10px}.live-label i{width:7px;height:7px;border-radius:50%;background:#68758f}.live-label i.on{background:#35dc92;box-shadow:0 0 8px #35dc92}.query-error{margin:8px 10px;padding:8px;background:#3a1e2a;border-radius:7px;color:#ff8c9c;font-size:11px}.empty{padding:22px;text-align:center;color:#687691;font-size:12px;font-style:italic}.form-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.form-grid label{font-size:10px;color:#68758f}.field{display:block;width:100%;margin-top:6px;background:#10172a;border:1px solid #2b3550;color:#e9edf8;border-radius:7px;padding:9px;box-sizing:border-box;font:inherit;outline:none}.override-row{display:flex;justify-content:space-between;padding:11px 0;border-bottom:1px solid #202942;font-size:12px}.activity-summary{padding:18px;background:#10182d;border-radius:8px}.activity-summary strong{font-size:26px;display:block}.activity-summary span{font-size:11px;color:#68758f}.modal-scrim{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:100}.modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);background:#151c31;border:1px solid #27304a;border-radius:12px;padding:20px;width:330px;box-shadow:0 15px 50px rgba(0,0,0,.45)}.modal h3{margin:0 0 7px;font-size:15px}.modal p{margin:0 0 18px;color:#7c88a0;font-size:12px}.modal-actions{display:flex;justify-content:flex-end;gap:8px}.wide-modal{min-width:420px;max-width:520px}.modal-list{margin-top:10px;max-height:55vh;overflow-y:auto}.modal-list-item{width:100%;display:flex;justify-content:space-between;align-items:center;padding:12px;margin-bottom:7px;background:rgba(255,255,255,.02);border:1px solid #2b3550;border-radius:10px;color:#d8dff0;cursor:pointer;text-align:left;font:inherit;font-size:13px}.modal-list-item:hover{background:rgba(255,255,255,.05)}.modal-list-item span{display:grid;gap:4px}.modal-list-item small{color:#68758f;font-size:11px}.rule-form{display:grid;gap:12px;margin-bottom:4px}.rule-form label{display:block;font-size:12px;color:#7c88a0}.rule-form select.field,.rule-form input.field{margin-top:4px}@media(max-width:1350px){.content-grid{grid-template-columns:minmax(0,1fr) 520px}.hero-metric{display:none}.bottom-grid{grid-template-columns:1fr}.form-grid{grid-template-columns:1fr 1fr}}@media(max-width:1050px){.content-grid{grid-template-columns:1fr}.query-panel{position:relative;top:auto}.query-table-wrap{max-height:500px}.hero{flex-wrap:wrap}.hero-metric{display:block}}@media(max-width:700px){.page{padding:0 8px 20px}.hero-metric{display:none}.form-grid{grid-template-columns:1fr}.preview-grid{grid-template-columns:1fr}.tabs{overflow:auto}.tab{white-space:nowrap}}
  `];x([g({attribute:!1})],v.prototype,"hass",2);x([g({attribute:!1})],v.prototype,"state",2);x([g({attribute:!1})],v.prototype,"client",2);x([g({type:Object})],v.prototype,"onNavigate",2);x([g({type:Object})],v.prototype,"onStateChanged",2);x([d()],v.prototype,"_tab",2);x([d()],v.prototype,"_queryLogs",2);x([d()],v.prototype,"_queryLoading",2);x([d()],v.prototype,"_queryLive",2);x([d()],v.prototype,"_queryError",2);x([d()],v.prototype,"_querySearch",2);x([d()],v.prototype,"_queryOldest",2);x([d()],v.prototype,"_queryFullyLoaded",2);x([d()],v.prototype,"_selectedPolicyId",2);x([d()],v.prototype,"_showDeleteConfirm",2);x([d()],v.prototype,"_showAddPolicy",2);x([d()],v.prototype,"_showAddRule",2);x([d()],v.prototype,"_newRuleTarget",2);x([d()],v.prototype,"_newRuleAction",2);x([d()],v.prototype,"_newRuleType",2);x([d()],v.prototype,"_newRulePolicyId",2);x([d()],v.prototype,"_topDetail",2);v=x([L("client-view")],v);var At=Object.defineProperty,St=Object.getOwnPropertyDescriptor,_=(t,e,i,s)=>{for(var a=s>1?void 0:s?St(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&At(e,i,a),a};let f=class extends ${constructor(){super(...arguments),this.narrow=!1,this._tab="general",this._draft=null,this._dirty=!1,this._showDeleteConfirm=!1,this._showAddRule=!1,this._showAddException=!1,this._newRuleTarget="",this._newRuleAction="block",this._newRuleType="domain",this._newRuleIsRegex=!1,this._newExceptionTarget="",this._newExceptionType="domain",this._newExceptionIsRegex=!1,this._availableServices=[],this._onNameInput=t=>this._markDirty({...this._p,name:t.target.value}),this._onDescriptionInput=t=>this._markDirty({...this._p,description:t.target.value}),this._onPriorityInput=t=>this._markDirty({...this._p,priority:Number(t.target.value||0)}),this._setPriority=t=>this._markDirty({...this._p,priority:t}),this._onProfileChange=t=>this._markDirty({...this._p,profile_id:t.target.value||null}),this._onEnabledChange=t=>this._markDirty({...this._p,enabled:t.target.checked}),this._onTagKeydown=t=>{t.key==="Enter"&&(t.preventDefault(),this._addTagFromInput())},this._removeTag=t=>this._markDirty({...this._p,tags:(this._p.tags||[]).filter(e=>e!==t)}),this._clearSchedule=async()=>this._persist({...this._p,time_schedule:null})}connectedCallback(){super.connectedCallback(),this._loadServices()}updated(t){t.has("policy")&&(this._draft=this._clonePolicy(this.policy),this._dirty=!1),t.has("hass")&&this.hass&&!this._availableServices.length&&this._loadServices()}get _p(){return this._draft||this.policy}render(){return this.policy?r`
      <div class="page">
        ${this._renderHeader()}
        ${this._renderTabs()}
        <div class="content">
          ${this._tab==="general"?this._renderGeneral():""}
          ${this._tab==="rules"?this._renderRules():""}
          ${this._tab==="schedule"?this._renderSchedule():""}
          ${this._tab==="calendar"?this._renderCalendar():""}
          ${this._tab==="exceptions"?this._renderExceptions():""}
          ${this._tab==="preview"?this._renderPreview():""}
        </div>
      </div>

      ${this._showDeleteConfirm?r`
        <div class="modal-scrim" @click=${()=>this._showDeleteConfirm=!1}></div>
        <div class="modal" role="dialog" aria-modal="true">
          <h3>Delete policy?</h3>
          <p>"${this._p.name}" will be removed and unassigned from all groups, members and clients.</p>
          <div class="modal-actions">
            <button class="btn" @click=${()=>this._showDeleteConfirm=!1}>Cancel</button>
            <button class="btn btn-danger" @click=${this._deletePolicy}>Delete</button>
          </div>
        </div>
      `:""}
    `:r``}_renderHeader(){var t;return r`
      <div class="breadcrumb"><span @click=${()=>{var e;return(e=this.onNavigate)==null?void 0:e.call(this,"policies")}}>Policies</span><span>›</span><strong>${this._p.name||"Untitled"}</strong></div>
      <section class="hero card">
        <div class="hero-icon">☾</div>
        <div class="hero-main">
          <div class="title-line">
            <h1>${this._p.name||"Untitled"}</h1>
            <span class="pill ${this._p.enabled!==!1?"green":"red-pill"}">${this._p.enabled!==!1?"ENABLED":"DISABLED"}</span>
          </div>
          <div class="hero-meta">
            <span>Priority: ${this._p.priority}</span>
            <span>Profile: ${this._getProfileName()}</span>
            <span>Rules: ${this._p.rules.length}${(t=this._p.exceptions)!=null&&t.length?` + ${this._p.exceptions.length} exceptions`:""}</span>
            <span>Applies to: ${this._getAppliesTo()}</span>
          </div>
        </div>
        <div class="hero-actions">
          <button class="btn" @click=${()=>this._resetDraft()} ?disabled=${!this._dirty}>Cancel</button>
          <button class="btn primary" @click=${this._saveDraft} ?disabled=${!this._dirty}>Save</button>
          <button class="btn btn-hero-delete" @click=${()=>this._showDeleteConfirm=!0}>Delete</button>
        </div>
      </section>
    `}_renderTabs(){var e;const t=[["general","General"],["rules",`Rules${this._p.rules.length?` (${this._p.rules.length})`:""}`],["schedule","Schedule"],["calendar","Calendar Condition"],["exceptions",`Exceptions${(e=this._p.exceptions)!=null&&e.length?` (${this._p.exceptions.length})`:""}`],["preview","Preview"]];return r`
      <nav class="tabs" aria-label="Policy sections">
        ${t.map(([i,s])=>r`
          <button class=${this._tab===i?"tab active":"tab"} @click=${()=>this._tab=i}>${s}</button>
        `)}
      </nav>
    `}_renderGeneral(){var e;const t=this._getAppliesTo();return r`
      <div class="grid">
        <section class="card">
          <div class="card-title">Basic Information</div>
          <div class="card-body">
            <label>Name</label>
            <input class="input" .value=${this._p.name} @input=${this._onNameInput} />
            <label>Description <span class="muted">optional</span></label>
            <textarea class="textarea" maxlength="200" .value=${this._p.description||""} @input=${this._onDescriptionInput}></textarea>
            <div class="form-row three">
              <div>
                <label>Priority</label>
                <div class="stepper">
                  <input class="input" type="number" .value=${String(this._p.priority)} @input=${this._onPriorityInput} />
                  <button @click=${()=>this._setPriority(this._p.priority-1)}>−</button>
                  <button @click=${()=>this._setPriority(this._p.priority+1)}>+</button>
                </div>
              </div>
              <div>
                <label>Profile</label>
                <select class="select" .value=${this._p.profile_id||""} @change=${this._onProfileChange}>
                  <option value="">None</option>
                  ${this.state.profiles.map(i=>r`<option value=${i.id}>${i.name}</option>`)}
                </select>
              </div>
              <div>
                <label>Status</label>
                <label class="toggle-line">
                  <input type="checkbox" .checked=${this._p.enabled!==!1} @change=${this._onEnabledChange} />
                  <span>Enabled</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        <section class="card summary-card">
          <div class="card-title">Policy Summary</div>
          <div class="card-body summary">
            <div><span>State</span><b class=${this._p.enabled!==!1?"green":"red"}>${this._p.enabled!==!1?"Enabled":"Disabled"}</b></div>
            <div><span>Priority</span><b>${this._p.priority}</b></div>
            <div><span>Profile</span><b>${this._getProfileName()}</b></div>
            <div><span>Applies to</span><b>${t}</b></div>
            <div><span>Schedule</span><b>${this._scheduleText()}</b></div>
            <div><span>Calendar</span><b>${this._calendarText()}</b></div>
            <div><span>Rules</span><b>${this._p.rules.length}${(e=this._p.exceptions)!=null&&e.length?` + ${this._p.exceptions.length} exception${this._p.exceptions.length===1?"":"s"}`:""}</b></div>
            <button class="wide-btn" @click=${()=>this._tab="preview"}>Preview Effective Policy</button>
          </div>
        </section>

        <section class="card">
          <div class="card-title">Applies To</div>
          <div class="card-body">
            <p class="help">Policy assignments are managed from Groups, Members and Clients. This view shows where this policy is currently assigned.</p>
            <div class="assignment-grid">
              <div><span class="eyebrow">Groups</span><div class="chip-list">${this._getAssignedGroups().length?this._getAssignedGroups().map(i=>r`<span class="chip">${i}</span>`):r`<span class="muted">None</span>`}</div></div>
              <div><span class="eyebrow">Members</span><div class="chip-list">${this._getAssignedMembers().length?this._getAssignedMembers().map(i=>r`<span class="chip">${i}</span>`):r`<span class="muted">None</span>`}</div></div>
              <div><span class="eyebrow">Clients</span><div class="chip-list">${this._getAssignedClients().length?this._getAssignedClients().map(i=>r`<span class="chip">${i}</span>`):r`<span class="muted">None</span>`}</div></div>
            </div>
          </div>
        </section>

        <section class="card">
          <div class="card-title">Tags <span class="muted">optional</span></div>
          <div class="card-body">
            <div class="chip-list editable">
              ${(this._p.tags||[]).map(i=>r`<span class="chip">${i}<button @click=${()=>this._removeTag(i)}>×</button></span>`)}
            </div>
            <div class="tag-add"><input id="tag-input" class="input" placeholder="Add tag..." @keydown=${this._onTagKeydown} /><button class="btn" @click=${this._addTagFromInput}>Add</button></div>
          </div>
        </section>

      </div>
    `}_renderRules(){return r`
      <section class="card">
        <div class="card-title row-between"><span>Rules</span><button class="btn primary" @click=${()=>this._showAddRule=!this._showAddRule}>＋ Add Rule</button></div>
        <div class="card-body">
          ${this._showAddRule?this._renderRuleForm(!1):""}
          ${this._p.rules.length?r`
            <table class="data-table"><thead><tr><th>Type</th><th>Target</th><th>Action</th><th></th></tr></thead><tbody>
              ${this._p.rules.map((t,e)=>r`<tr>
                <td><span class="badge">${t.rule_type}</span></td>
                <td class="mono">${t.target}${t.is_regex?r` <span class="regex-badge">.*</span>`:""}</td>
                <td><span class=${t.action==="block"?"status-dot blocked":"status-dot allowed"}>${t.action}</span></td>
                <td class="end"><button class="text-btn danger-text" @click=${()=>this._removeRule(e)}>Remove</button></td>
              </tr>`)}
            </tbody></table>
          `:r`<div class="empty-box">No rules defined. This policy currently contributes no explicit domain, service or category rules.</div>`}
        </div>
      </section>

      <section class="card hint-card">
        <div class="hint-title">Rule behavior</div>
        <p>Rules are evaluated with the policy priority and then merged with profile, member and client rules. Use the Exceptions tab for explicit allow rules that should override a block.</p>
      </section>
    `}_renderRuleForm(t){const e=t?this._newExceptionType:this._newRuleType,i=e==="service",s=t?this._newExceptionTarget:this._newRuleTarget,a=t?this._newExceptionIsRegex:this._newRuleIsRegex,n=p=>{const m=p.target.value;t?this._newExceptionType=m:this._newRuleType=m,t?this._newExceptionTarget="":this._newRuleTarget="",m==="service"&&this._loadServices()},o=p=>{const m=p.target.value;t?this._newExceptionTarget=m:this._newRuleTarget=m},c=p=>{const m=p.target.checked;t?this._newExceptionIsRegex=m:this._newRuleIsRegex=m},l=i&&!a?r`<select class="select" .value=${s} @change=${o}>
          <option value="">Select service…</option>
          ${this._availableServices.sort((p,m)=>p.name.localeCompare(m.name)).map(p=>r`<option value=${p.id} ?selected=${p.id===s}>${p.name}</option>`)}
        </select>`:r`<input class="input" .value=${s} @input=${o}
          placeholder=${a?"/regex_pattern/":t?"whatsapp.com":"example.com"} />`;return r`
      <div class="inline-form rule-form">
        <div><label>Type</label><select class="select" .value=${e} @change=${n}>
          <option value="domain">Domain</option><option value="service">Service</option><option value="category">Category</option>
        </select></div>
        <div class="grow"><label>${t?"Allowed target":"Target"}</label>${l}</div>
        <div class="regex-toggle"><label class="toggle-line"><input type="checkbox" .checked=${a} @change=${c} /><span>Regex</span></label></div>
        ${t?r``:r`<div><label>Action</label><select class="select" .value=${this._newRuleAction} @change=${p=>this._newRuleAction=p.target.value}><option value="block">Block</option><option value="allow">Allow</option></select></div>`}
        <button class="btn primary" @click=${t?this._addException:this._addRule}>Add</button>
        <button class="btn" @click=${()=>t?this._showAddException=!1:this._showAddRule=!1}>Cancel</button>
      </div>
    `}_renderSchedule(){const t=this._p.time_schedule,e=["mon","tue","wed","thu","fri","sat","sun"];return r`
      <section class="card">
        <div class="card-title row-between"><span>Schedule</span>${t?r`<button class="text-btn danger-text" @click=${this._removeSchedule}>Remove</button>`:""}</div>
        <div class="card-body">
          <div class="schedule-type">
            <button class=${t?"mode-btn":"mode-btn active"} @click=${()=>this._clearSchedule()}>Always active</button>
            <button class=${t?"mode-btn active":"mode-btn"} @click=${()=>this._ensureSchedule()}>Time range</button>
          </div>
          ${t?r`
            <div class="form-grid">
              <div class="full"><label>Days</label><div class="day-chips">${e.map(i=>r`<button class=${t.days.includes(i)?"day active":"day"} @click=${()=>this._toggleScheduleDay(i)}>${i.slice(0,1).toUpperCase()+i.slice(1)}</button>`)}</div></div>
              <div><label>From</label><input class="input" type="time" .value=${t.time_from||"00:00"} @input=${i=>this._updateSchedule("time_from",i.target.value)} /></div>
              <div><label>To</label><input class="input" type="time" .value=${t.time_to||"23:59"} @input=${i=>this._updateSchedule("time_to",i.target.value)} /></div>
              <div class="schedule-preview full"><span class="icon">◷</span><div><b>${this._scheduleText()}</b><div class="muted">${this._crossesMidnight()?"Ends on the next day":"Same-day window"}</div></div></div>
            </div>
          `:r`<div class="empty-box">This policy is active at all times unless a calendar condition prevents it.</div>`}
        </div>
      </section>
    `}_renderCalendar(){const t=this._p.calendar_condition;return r`
      <section class="card">
        <div class="card-title row-between"><span>Calendar Condition</span>${t?r`<button class="text-btn danger-text" @click=${this._removeCalendar}>Remove</button>`:""}</div>
        <div class="card-body">
          ${t?r`
            <div class="form-grid">
              <div class="full"><label>Calendar entity</label><select class="select" .value=${t.calendar_entity||""} @change=${e=>this._updateCalendar("calendar_entity",e.target.value)}>
                <option value="">Any configured calendar</option>
                ${this.state.calendar_entities.map(e=>r`<option value=${e}>${e}</option>`)}
              </select></div>
              <div class="full"><label>Event keywords</label><input class="input" .value=${t.event_match.join(", ")} @input=${e=>this._updateCalendar("event_match",e.target.value.split(",").map(i=>i.trim()).filter(Boolean))} placeholder="Holiday, School Break" /></div>
              <div class="condition-toggle"><label class="toggle-line"><input type="checkbox" .checked=${t.invert} @change=${e=>this._updateCalendar("invert",e.target.checked)} /><span>Invert condition</span></label><span class="muted">Activate when matching events are not present.</span></div>
            </div>
          `:r`
            <div class="empty-box"><b>No calendar condition.</b><span>Policy is controlled only by its schedule.</span><button class="btn" @click=${this._createCalendar}>＋ Add calendar condition</button></div>
          `}
        </div>
      </section>
    `}_renderExceptions(){const t=this._p.exceptions||[];return r`
      <section class="card">
        <div class="card-title row-between"><span>Exceptions</span><button class="btn primary" @click=${()=>this._showAddException=!this._showAddException}>＋ Add Exception</button></div>
        <div class="card-body">
          <p class="help">Exceptions are explicit allow rules that override a matching block from this policy.</p>
          ${this._showAddException?this._renderRuleForm(!0):""}
          ${t.length?r`<table class="data-table"><thead><tr><th>Type</th><th>Allowed target</th><th></th></tr></thead><tbody>
            ${t.map((e,i)=>r`<tr><td><span class="badge">${e.rule_type}</span></td><td class="mono">${e.target}${e.is_regex?r` <span class=\"regex-badge\">.*</span>`:""}</td><td class="end"><button class="text-btn danger-text" @click=${()=>this._removeException(i)}>Remove</button></td></tr>`)}
          </tbody></table>`:r`<div class="empty-box">No policy-specific exceptions.</div>`}
        </div>
      </section>
    `}_renderPreview(){this._p.time_schedule;const t=this._p.rules,e=this._p.exceptions||[],i=[...this._getAssignedGroups(),...this._getAssignedMembers(),...this._getAssignedClients()];return r`
      <div class="preview-grid">
        <section class="card hero-preview">
          <div class="eyebrow">Policy Preview</div>
          <h2>${this._p.name}</h2>
          <div class="preview-pills"><span class="pill blue">${this._p.enabled===!1?"Disabled":"Enabled"}</span><span class="pill">Priority ${this._p.priority}</span><span class="pill">${this._getProfileName()}</span></div>
          <p class="lead">${this._p.description||"No description provided."}</p>
          <div class="preview-flow">
            <div class="flow-card"><span>WHEN</span><b>${this._scheduleText()}</b><small>${this._calendarText()}</small></div>
            <div class="arrow">→</div>
            <div class="flow-card"><span>RULES</span><b>${t.length} rule${t.length===1?"":"s"}</b><small>${e.length?`${e.length} exception${e.length===1?"":"s"}`:"No exceptions"}</small></div>
            <div class="arrow">→</div>
            <div class="flow-card accent"><span>APPLIES TO</span><b>${i.length||"No assignments"}</b><small>${Lt(i.length)}</small></div>
          </div>
        </section>

        <section class="card">
          <div class="card-title">Effective Rule Summary</div>
          <div class="card-body">
            ${t.length?r`<div class="rule-summary">${t.map(s=>r`<div class="rule-line"><span class=${s.action==="block"?"dot red":"dot green"}></span><span class="badge">${s.rule_type}</span><span class="mono">${s.target}${s.is_regex?r` <span class=\"regex-badge\">.*</span>`:""}</span><b class=${s.action==="block"?"red":"green"}>${s.action.toUpperCase()}</b></div>`)}</div>`:r`<div class="empty-box">No explicit rules.</div>`}
            ${e.length?r`<div class="exception-preview"><div class="eyebrow">Exceptions</div>${e.map(s=>r`<div class="rule-line"><span class="dot green"></span><span class="mono">${s.target}</span><b class="green">ALLOW</b></div>`)}</div>`:""}
          </div>
        </section>

        <section class="card">
          <div class="card-title">Why this policy applies</div>
          <div class="card-body checklist">
            <div>✓ Policy is <b>${this._p.enabled===!1?"disabled":"enabled"}</b></div>
            <div>✓ Schedule: <b>${this._scheduleText()}</b></div>
            <div>✓ Calendar: <b>${this._calendarText()}</b></div>
            <div>✓ Profile: <b>${this._getProfileName()}</b></div>
            <div>✓ Assigned to: <b>${i.length?i.join(", "):"nothing yet"}</b></div>
          </div>
        </section>
      </div>
    `}_clonePolicy(t){return JSON.parse(JSON.stringify({...t,description:t.description||"",enabled:t.enabled!==!1,tags:t.tags||[],exceptions:t.exceptions||[]}))}_markDirty(t){this._draft=t,this._dirty=!0}async _saveDraft(){var e;if(!this._draft)return;const t=await this.hass.callWS({type:"adguard_pc/policies/update",policy:this._draft});this.policy=t||this._draft,this._draft=this._clonePolicy(this.policy),this._dirty=!1,(e=this.onStateChanged)==null||e.call(this)}_resetDraft(){this._draft=this._clonePolicy(this.policy),this._dirty=!1}_addTagFromInput(){const t=this.renderRoot.querySelector("#tag-input"),e=t==null?void 0:t.value.trim();if(!e)return;const i=Array.from(new Set([...this._p.tags||[],e]));this._markDirty({...this._p,tags:i}),t&&(t.value="")}async _loadServices(){if(!(!this.hass||this._availableServices.length))try{this._availableServices=await this.hass.callWS({type:"adguard_pc/services/list"})}catch(t){console.error("Failed to load services:",t)}}async _addRule(){if(await this._loadServices(),!this._newRuleTarget.trim())return;const t=[...this._p.rules,{target:this._newRuleTarget.trim(),action:this._newRuleAction,rule_type:this._newRuleType,...this._newRuleIsRegex?{is_regex:!0}:{}}];await this._persist({...this._p,rules:t}),this._newRuleTarget="",this._showAddRule=!1,this._newRuleIsRegex=!1}async _removeRule(t){const e=this._p.rules.filter((i,s)=>s!==t);await this._persist({...this._p,rules:e})}async _addException(){if(await this._loadServices(),!this._newExceptionTarget.trim())return;const t=[...this._p.exceptions||[],{target:this._newExceptionTarget.trim(),action:"allow",rule_type:this._newExceptionType,...this._newExceptionIsRegex?{is_regex:!0}:{}}];await this._persist({...this._p,exceptions:t}),this._newExceptionTarget="",this._showAddException=!1,this._newExceptionIsRegex=!1}async _removeException(t){const e=(this._p.exceptions||[]).filter((i,s)=>s!==t);await this._persist({...this._p,exceptions:e})}async _persist(t){var i;const e=await this.hass.callWS({type:"adguard_pc/policies/update",policy:t});this.policy=e||t,this._draft=this._clonePolicy(this.policy),this._dirty=!1,(i=this.onStateChanged)==null||i.call(this)}_ensureSchedule(){this._p.time_schedule||this._markDirty({...this._p,time_schedule:{days:["mon","tue","wed","thu","fri"],time_from:"21:00",time_to:"05:00"}})}_toggleScheduleDay(t){const e=this._p.time_schedule||{days:[],time_from:"00:00",time_to:"23:59"},i=e.days.includes(t)?e.days.filter(s=>s!==t):[...e.days,t];this._markDirty({...this._p,time_schedule:{...e,days:i}})}_updateSchedule(t,e){const i=this._p.time_schedule||{days:[],time_from:"00:00",time_to:"23:59"};this._markDirty({...this._p,time_schedule:{...i,[t]:e}})}async _removeSchedule(){await this._persist({...this._p,time_schedule:null})}_createCalendar(){this._markDirty({...this._p,calendar_condition:{calendar_entity:this.state.calendar_entities[0]||null,event_match:["Holiday"],invert:!1}})}_updateCalendar(t,e){const i=this._p.calendar_condition||{calendar_entity:null,event_match:[],invert:!1};this._markDirty({...this._p,calendar_condition:{...i,[t]:e}})}async _removeCalendar(){await this._persist({...this._p,calendar_condition:null})}_scheduleText(){const t=this._p.time_schedule;if(!t)return"Always active";const e=t.days.length===7?"Every day":t.days.map(i=>i.slice(0,1).toUpperCase()+i.slice(1,3)).join(" · ");return`${t.time_from||"00:00"}–${t.time_to||"23:59"} (${e})`}_calendarText(){const t=this._p.calendar_condition;if(!t)return"None";const e=t.event_match.length?t.event_match.join(", "):"Any event";return`${t.invert?"NOT ":""}${e}`}_crossesMidnight(){const t=this._p.time_schedule;return!!t&&!!t.time_from&&!!t.time_to&&t.time_to<t.time_from}_getProfileName(){var e;const t=this._p.profile_id;return t?((e=this.state.profiles.find(i=>i.id===t))==null?void 0:e.name)||t:"None"}_getAssignedGroups(){return this.state.groups.filter(t=>t.assigned_policy_ids.includes(this._p.id)).map(t=>t.name)}_getAssignedMembers(){return this.state.members.filter(t=>t.assigned_policy_ids.includes(this._p.id)).map(t=>t.name)}_getAssignedClients(){return this.state.clients.filter(t=>t.assigned_policy_ids.includes(this._p.id)).map(t=>t.name)}_getAppliesTo(){const t=this._getAssignedGroups().length+this._getAssignedMembers().length+this._getAssignedClients().length;return t?`${t} assignment${t===1?"":"s"}`:"None"}async _deletePolicy(){var t,e;await this.hass.callWS({type:"adguard_pc/policies/delete",policy_id:this._p.id}),this._showDeleteConfirm=!1,(t=this.onStateChanged)==null||t.call(this),(e=this.onNavigate)==null||e.call(this,"policies")}};f.styles=C`
    :host { display:block; color:var(--agpc-text,#eef2ff); }
    * { box-sizing:border-box; }
    .page { padding:0 14px 30px; max-width:1680px; margin:0 auto; }
    .breadcrumb { height:42px; display:flex; align-items:center; gap:9px; color:#71809f; font-size:13px; }
    .breadcrumb span:first-child { cursor:pointer; }
    .breadcrumb strong { color:#eef2ff; }
    .hero { min-height:112px; padding:17px 18px; display:flex; align-items:center; gap:16px; }
    .hero-icon { width:68px; height:68px; border-radius:14px; background:#121d35; border:1px solid #2c3a59; color:#c5a6ff; display:grid; place-items:center; font-size:30px; flex:none; }
    .hero-main { min-width:250px; flex:1; }
    .title-line { display:flex; align-items:center; gap:10px; }
    .title-line h1 { margin:0; font-size:21px; }
    .hero-meta { display:flex; flex-wrap:wrap; gap:20px; color:#9aa6c0; font-size:12px; margin-top:12px; }
    .hero-actions { display:flex; align-self:flex-start; gap:6px; margin-left:auto; }
    .btn, .icon-btn, .wide-btn, .mode-btn, .day, .tab, .text-btn { font:inherit; }
    .btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; border:1px solid #2e3853; background:#151e34; color:#d8dff0; border-radius:7px; padding:8px 11px; font:600 11px inherit; cursor:pointer; }
    .btn:hover { background:#1b2741; }
    .btn.primary { background:var(--agpc-blue,#4e8cff); border-color:var(--agpc-blue,#4e8cff); color:#fff; }
    .btn:disabled { opacity:.45; cursor:default; }
    .btn-hero-delete { background:#451d24; color:#ff6875; border:1px solid #6b2832; border-radius:7px; padding:8px 11px; font:600 11px inherit; cursor:pointer; }
    .btn-hero-delete:hover { background:#5c2430; }
    .icon-btn { width:38px; height:38px; border:0; background:transparent; color:var(--agpc-text-dim,#71809f); cursor:pointer; border-radius:8px; }
    .icon-btn:hover { background:rgba(255,255,255,.06); color:#fff; }
    .pill { display:inline-flex; align-items:center; padding:3px 8px; border-radius:6px; font-size:9px; font-weight:800; letter-spacing:.04em; }
    .pill.green { background:#103c31; color:#34db95; }
    .red-pill { background:#441d28; color:#ff6875; }
    .card { background:var(--agpc-card-bg,#151c31); border:1px solid var(--agpc-border,#27304a); border-radius:12px; box-sizing:border-box; }
    .tabs { display:flex; gap:6px; padding:0 6px; border-bottom:1px solid #27304a; margin:2px 0 10px; overflow-x:auto; }
    .tab { border:0; background:transparent; color:#75839e; font:600 12px inherit; padding:12px 16px; border-bottom:2px solid transparent; cursor:pointer; }
    .tab.active { color:#4e8cff; border-bottom-color:#4e8cff; }
    .content { padding:0 0 24px; }
    .grid { display:grid; grid-template-columns:minmax(0,1.65fr) minmax(320px,.9fr); gap:14px; align-items:start; }
    .card.full { grid-column:1/-1; }
    .card-title { padding:17px 18px 0; font-weight:650; font-size:16px; }
    .card-body { padding:16px 18px 18px; }
    .row-between { display:flex; align-items:center; justify-content:space-between; gap:12px; }
    .summary-card .card-body { padding-top:8px; }
    .summary > div { display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid rgba(255,255,255,.06); font-size:13px; }
    .summary > div span { color:#7e8aa4; }
    .summary b { font-weight:550; text-align:right; }
    .green { color:#44d589; } .red { color:#ff6969; }
    label { display:block; font-size:12px; color:#7e8aa4; margin:0 0 6px; }
    .muted { color:#7e8aa4; font-weight:400; }
    .tiny { font-size:11px; }
    .input, .textarea, .select { width:100%; border:1px solid #2b3448; background:#0f1524; color:#f3f6fb; border-radius:8px; padding:10px 11px; outline:none; }
    .input:focus, .textarea:focus, .select:focus { border-color:#2c86ff; box-shadow:0 0 0 1px rgba(44,134,255,.25); }
    .textarea { min-height:86px; resize:vertical; }
    .notes { min-height:110px; }
    .form-row.three { display:grid; grid-template-columns:1fr 1.3fr 1fr; gap:12px; margin-top:14px; }
    .stepper { display:grid; grid-template-columns:1fr 38px 38px; gap:4px; }
    .stepper button { border:1px solid #2b3448; background:#151d2e; color:#fff; border-radius:7px; cursor:pointer; }
    .toggle-line { display:flex; align-items:center; gap:9px; margin-top:9px; color:#f3f6fb; }
    .toggle-line input { width:17px; height:17px; accent-color:#20c879; }
    .wide-btn { width:100%; border:1px solid #2d3b52; background:#101829; color:#eaf0f8; border-radius:8px; padding:10px; margin-top:13px; cursor:pointer; }
    .assignment-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
    .eyebrow { display:block; font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:#8e9ab1; margin-bottom:7px; }
    .chip-list { display:flex; flex-wrap:wrap; gap:6px; min-height:29px; }
    .chip { display:inline-flex; align-items:center; gap:5px; background:#28364e; color:#dbe8ff; padding:6px 9px; border-radius:7px; font-size:12px; }
    .chip button { border:0; background:none; color:#9eb0cc; cursor:pointer; padding:0; }
    .tag-add { display:flex; gap:8px; margin-top:10px; }
    .tag-add .input { flex:1; }
    .help { color:#7e8aa4; font-size:13px; line-height:1.45; margin:0 0 14px; }
    .inline-form { display:grid; grid-template-columns:150px minmax(220px,1fr) auto 140px auto auto; gap:8px; align-items:end; padding:13px; background:#101726; border:1px solid #253047; border-radius:9px; margin-bottom:13px; }
    .regex-toggle { display:flex; align-items:end; padding-bottom:4px; }
    .regex-toggle label { margin:0; }
    .regex-badge { display:inline-block; background:#1a3a5c; color:#6aafef; font-size:10px; padding:1px 4px; border-radius:3px; font-weight:600; vertical-align:middle; }
    .grow { min-width:0; }
    .data-table { width:100%; border-collapse:collapse; }
    .data-table th,.data-table td { text-align:left; padding:11px 8px; border-bottom:1px solid rgba(255,255,255,.07); font-size:13px; }
    .data-table th { color:#8290a7; font-size:11px; text-transform:uppercase; letter-spacing:.06em; font-weight:600; }
    .data-table .end { text-align:right; }
    .mono { font-family:var(--code-font-family,ui-monospace,monospace); font-size:12px; }
    .badge,.pill { background:#27344c; border-radius:999px; padding:4px 8px; font-size:11px; color:#cdd8eb; }
    .status-dot { font-size:12px; font-weight:650; }
    .status-dot.blocked { color:#ff6666; }.status-dot.allowed{color:#43d786;}
    .text-btn { background:none; border:0; color:#55a5ff; cursor:pointer; padding:6px 8px; }
    .danger-text { color:#ff6c6c; }
    .empty-box { border:1px dashed #2b364c; background:#101726; border-radius:9px; padding:24px; color:#7e8aa4; display:flex; flex-direction:column; gap:8px; align-items:flex-start; }
    .hint-card { padding:15px 18px; background:rgba(31,111,235,.06); }
    .hint-title { font-weight:650; }
    .hint-card p { margin:5px 0 0; color:#7e8aa4; font-size:13px; line-height:1.5; }
    .schedule-type { display:flex; gap:8px; margin-bottom:18px; }
    .mode-btn { border:1px solid #2b3448; background:#101726; color:#bac6da; border-radius:8px; padding:9px 13px; cursor:pointer; }
    .mode-btn.active { background:#102d52; border-color:#2d88ff; color:#5da9ff; }
    .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    .form-grid .full { grid-column:1/-1; }
    .day-chips { display:flex; flex-wrap:wrap; gap:7px; }
    .day { border:1px solid #2b3448; background:#101726; color:#b8c4d8; border-radius:7px; padding:8px 11px; cursor:pointer; }
    .day.active { background:#1677ff; border-color:#1677ff; color:#fff; }
    .schedule-preview { display:flex; gap:11px; align-items:center; padding:13px 14px; background:#101726; border-radius:9px; }
    .schedule-preview .icon { font-size:22px; color:#62a9ff; }
    .condition-toggle { display:flex; flex-direction:column; gap:3px; }
    .preview-grid { display:grid; grid-template-columns:1.35fr .9fr; gap:14px; align-items:start; }
    .hero-preview { grid-column:1/-1; }
    .hero-preview .card-body { min-height:0; }
    .preview-pills { display:flex; gap:7px; margin:10px 0; }.pill.blue { background:#102f57; color:#62aeff; }
    .lead { color:var(--secondary-text-color); max-width:780px; }
    .preview-flow { display:grid; grid-template-columns:1fr 30px 1fr 30px 1fr; align-items:center; gap:8px; margin-top:18px; }
    .flow-card { border:1px solid #2a344a; background:#0f1625; border-radius:10px; padding:14px; min-height:105px; }
    .flow-card span { display:block; color:#7f8ca4; font-size:10px; letter-spacing:.09em; margin-bottom:9px; }
    .flow-card b { display:block; font-size:15px; }.flow-card small{display:block;color:#8794a9;margin-top:6px;}.flow-card.accent { border-color:#1f77e8; background:#10203a; }
    .arrow { color:#5485bb; text-align:center; }
    .rule-summary { display:flex; flex-direction:column; gap:9px; }.rule-line { display:grid; grid-template-columns:9px auto minmax(0,1fr) auto; align-items:center; gap:8px; font-size:12px; }.dot{width:7px;height:7px;border-radius:50%;display:inline-block}.dot.red{background:#ff5e67}.dot.green{background:#41d486}.exception-preview{border-top:1px solid rgba(255,255,255,.08);margin-top:14px;padding-top:14px;}
    .checklist { display:flex; flex-direction:column; gap:10px; font-size:13px; }
    .modal-scrim { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:999; }
    .modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:1000; background:var(--agpc-card-bg,#151c31); border:1px solid var(--agpc-border,#27304a); border-radius:12px; padding:20px; min-width:320px; max-width:420px; box-shadow:0 8px 32px rgba(0,0,0,0.4); }
    .modal h3 { margin:0 0 8px; }
    .modal p { color:#7e8aa4; line-height:1.5; font-size:13px; }
    .modal-actions { display:flex; gap:8px; justify-content:flex-end; margin-top:18px; }
    .btn-danger { background:#b94650; color:#fff; border-color:#b94650; }
    .btn-danger:hover { opacity:0.9; }
    @media (max-width: 1000px) { .grid,.preview-grid{grid-template-columns:1fr}.form-row.three,.assignment-grid{grid-template-columns:1fr}.inline-form{grid-template-columns:1fr 1fr}.preview-flow{grid-template-columns:1fr}.arrow{transform:rotate(90deg)} }
  `;_([g({attribute:!1})],f.prototype,"hass",2);_([g({attribute:!1})],f.prototype,"state",2);_([g({attribute:!1})],f.prototype,"policy",2);_([g({type:Boolean})],f.prototype,"narrow",2);_([g({type:Object})],f.prototype,"onNavigate",2);_([g({type:Object})],f.prototype,"onStateChanged",2);_([d()],f.prototype,"_tab",2);_([d()],f.prototype,"_draft",2);_([d()],f.prototype,"_dirty",2);_([d()],f.prototype,"_showDeleteConfirm",2);_([d()],f.prototype,"_showAddRule",2);_([d()],f.prototype,"_showAddException",2);_([d()],f.prototype,"_newRuleTarget",2);_([d()],f.prototype,"_newRuleAction",2);_([d()],f.prototype,"_newRuleType",2);_([d()],f.prototype,"_newRuleIsRegex",2);_([d()],f.prototype,"_newExceptionTarget",2);_([d()],f.prototype,"_newExceptionType",2);_([d()],f.prototype,"_newExceptionIsRegex",2);_([d()],f.prototype,"_availableServices",2);f=_([L("policy-view")],f);function Lt(t){return t?t===1?"1 assignment":`${t} assignments`:"No groups, members or clients assigned"}var Mt=Object.defineProperty,Pt=Object.getOwnPropertyDescriptor,V=(t,e,i,s)=>{for(var a=s>1?void 0:s?Pt(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Mt(e,i,a),a};let D=class extends ${constructor(){super(...arguments),this.narrow=!1,this._selectedTarget="",this._selectedTargetType="client",this._selectedAction="allow_all",this._selectedDuration="30"}render(){return this.state?(this._selectedTargetType==="client"?this.state.clients:this.state.members,r`
      <!-- New Override Form -->
      <ha-card>
        <div class="card-header">
          <div class="name">New Override</div>
        </div>
        <div class="card-content">
          <ha-select
            label="Target Type"
            .value=${this._selectedTargetType}
            @change=${t=>{this._selectedTargetType=t.target.value,this._selectedTarget=""}}
          >
            <ha-list-item value="client">Client</ha-list-item>
            <ha-list-item value="member">Member</ha-list-item>
          </ha-select>

          <ha-select
            label="Target"
            .value=${this._selectedTarget}
            @change=${t=>{this._selectedTarget=t.target.value}}
          >
            ${this._selectedTargetType==="client"?this.state.clients.map(t=>r`<ha-list-item value="${t.name}">${t.name}</ha-list-item>`):this.state.members.map(t=>r`<ha-list-item value="${t.name}">${t.name}</ha-list-item>`)}
          </ha-select>

          <ha-select
            label="Action"
            .value=${this._selectedAction}
            @change=${t=>{this._selectedAction=t.target.value}}
          >
            <ha-list-item value="allow_all">Allow All</ha-list-item>
            <ha-list-item value="block_all">Block All</ha-list-item>
          </ha-select>

          <ha-select
            label="Duration"
            .value=${this._selectedDuration}
            @change=${t=>{this._selectedDuration=t.target.value}}
          >
            <ha-list-item value="15">15 minutes</ha-list-item>
            <ha-list-item value="30">30 minutes</ha-list-item>
            <ha-list-item value="60">1 hour</ha-list-item>
            <ha-list-item value="120">2 hours</ha-list-item>
            <ha-list-item value="240">4 hours</ha-list-item>
            <ha-list-item value="480">8 hours</ha-list-item>
          </ha-select>

          <div class="form-actions">
            <button
              class="btn btn-primary"
              @click=${this._applyOverride}
              ?disabled=${!this._selectedTarget}
            >Apply Override</button>
          </div>
        </div>
      </ha-card>

      <!-- Active Overrides List -->
      <ha-card>
        <div class="card-header">
          <div class="name">Active Overrides</div>
        </div>
        <div class="card-content">
          ${this.state.overrides.length===0?r`<p class="empty">No active overrides</p>`:r`
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
                    ${this.state.overrides.map(t=>r`
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
    `):r``}async _applyOverride(){var t,e;if(this._selectedTarget)try{await this.hass.callWS({type:"adguard_pc/overrides/set",target:this._selectedTarget,target_type:this._selectedTargetType,action:this._selectedAction,duration_minutes:parseInt(this._selectedDuration,10)}),this._selectedTarget="",(t=this.onStateChanged)==null||t.call(this),(e=this.onNavigate)==null||e.call(this,"override")}catch(i){console.error("Failed to set override:",i)}}async _clearOverride(t){var e,i;try{await this.hass.callWS({type:"adguard_pc/overrides/clear",override_id:t}),(e=this.onStateChanged)==null||e.call(this),(i=this.onNavigate)==null||i.call(this,"override")}catch(s){console.error("Failed to clear override:",s)}}};D.styles=C`
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
    .btn {
      display: inline-flex; align-items: center; padding: 8px 16px;
      border-radius: 8px; border: 1px solid var(--divider-color, #333);
      background: var(--card-background-color, #2a2a2a); color: var(--primary-text-color, #eee);
      cursor: pointer; font-size: 13px;
    }
    .btn:hover { background: var(--secondary-background-color, #333); }
    .btn:disabled { opacity: 0.4; cursor: default; }
    .btn-primary { background: var(--primary-color, #03a9f4); color: #fff; border-color: var(--primary-color, #03a9f4); }
    .btn-primary:hover { opacity: 0.9; }
  `;V([g({attribute:!1})],D.prototype,"hass",2);V([g({attribute:!1})],D.prototype,"state",2);V([g({type:Boolean})],D.prototype,"narrow",2);V([g({type:Object})],D.prototype,"onNavigate",2);V([g({type:Object})],D.prototype,"onStateChanged",2);V([d()],D.prototype,"_selectedTarget",2);V([d()],D.prototype,"_selectedTargetType",2);V([d()],D.prototype,"_selectedAction",2);V([d()],D.prototype,"_selectedDuration",2);D=V([L("override-view")],D);var Tt=Object.defineProperty,Dt=Object.getOwnPropertyDescriptor,P=(t,e,i,s)=>{for(var a=s>1?void 0:s?Dt(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Tt(e,i,a),a};const je="M3,17.25V21H6.75L17.81,9.94L14.06,6.19L3,17.25M20.71,7.04C21.1,6.65 21.1,6 20.71,5.61L18.39,3.29C18,2.9 17.35,2.9 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04Z",zt="M3,13H5V11H3V13M3,17H5V15H3V17M3,9H5V7H3V9M7,13H21V11H7V13M7,17H21V15H7V17M7,7V9H21V7H7Z",Et="M14,3V5H17.59L7.5,15.09L8.91,16.5L19,6.41V10H21V3H14M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V12H19V19Z";let k=class extends ${constructor(){super(...arguments),this.narrow=!1,this._showDeleteConfirm=!1,this._showAddClient=!1,this._showAddMember=!1,this._showAddPolicy=!1,this._showDeleteMemberConfirm=null,this._tab="overview"}_icon(t,e=18){return N`<svg viewBox="0 0 24 24" width="${e}" height="${e}" aria-hidden="true"><path fill="currentColor" d="${t}"></path></svg>`}get _members(){return this.group?this.state.members.filter(t=>this.group.member_names.includes(t.name)):[]}get _clients(){return this.group?this.state.clients.filter(t=>this.group.client_names.includes(t.name)):[]}get _policies(){return this.group?this.state.policies.filter(t=>this.group.assigned_policy_ids.includes(t.id)):[]}_setTab(t){this._tab=t}render(){return this.group?r`
      <div class="page">
        ${this._renderHeader()}
        ${this._renderTabs()}
        ${this._tab==="overview"?this._renderOverview():u}
        ${this._tab==="members"?this._renderMembersTab():u}
        ${this._tab==="clients"?this._renderClientsTab():u}
        ${this._tab==="policies"?this._renderPoliciesTab():u}
        ${this._tab==="overrides"?this._renderOverridesTab():u}
        ${this._tab==="activity"?this._renderActivityTab():u}
      </div>

      ${this._showDeleteConfirm?this._renderDeleteModal():u}
      ${this._showAddClient?this._renderAddClientModal():u}
      ${this._showAddMember?this._renderAddMemberModal():u}
      ${this._showAddPolicy?this._renderAddPolicyModal():u}
      ${this._showDeleteMemberConfirm?this._renderDeleteMemberModal():u}
    `:r``}_renderHeader(){return r`
      <section class="hero card">
        <div class="hero-main">
          <div class="hero-icon">${this._icon(h.groups,32)}</div>
          <div class="hero-copy">
            <div class="title-line">
              <h1>${this.group.name}</h1>
              <span class="status-badge active">Active</span>
            </div>
            <div class="description">
              ${this.group.name==="Parents"?"Group for parents and adults in the family.":"Group for related members and clients."}
            </div>

            <div class="stats">
              <div class="stat">
                <span class="stat-icon">${this._icon(h.members,16)}</span>
                <div><b>${this._members.length}</b><span>Members</span></div>
              </div>
              <div class="stat">
                <span class="stat-icon">${this._icon(h.clients,16)}</span>
                <div><b>${this._clients.length}</b><span>Clients</span></div>
              </div>
              <div class="stat">
                <span class="stat-icon">${this._icon(h.policies,16)}</span>
                <div><b>${this._policies.length}</b><span>Policies</span></div>
              </div>
              <div class="stat">
                <span class="stat-icon">${this._icon(h.overrides,16)}</span>
                <div><b>0</b><span>Overrides</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-actions">
          <button class="btn" @click=${()=>this._tab="overview"}>${this._icon(je,15)} Edit Group</button>
          <button class="btn danger" @click=${()=>{this._showDeleteConfirm=!0}}>
            ${this._icon(h.delete,15)} Delete Group
          </button>
        </div>
      </section>
    `}_renderTabs(){return r`
      <nav class="tabs" aria-label="Group sections">
        ${[["overview","Overview"],["members","Members"],["clients","Clients"],["policies","Policies"],["overrides","Override Rules"],["activity","Activity"]].map(([e,i])=>r`
          <button class=${this._tab===e?"tab active":"tab"} @click=${()=>this._setTab(e)}>
            ${i}
          </button>
        `)}
      </nav>
    `}_renderOverview(){const t=this._policies[0];return r`
      <div class="overview-grid">
        <section class="card info-card">
          <div class="section-head">
            <div><h2>Group Information</h2></div>
            <button class="icon-text-btn">${this._icon(je,14)} Edit</button>
          </div>
          <div class="kv">
            <div><span>Name</span><strong>${this.group.name}</strong></div>
            <div><span>Description</span><strong>${this.group.name==="Parents"?"Group for parents and adults in the family.":"Group for related members and clients."}</strong></div>
            <div><span>Status</span><strong><span class="status-badge active">Active</span></strong></div>
            <div><span>Priority</span><strong>0</strong></div>
            <div><span>Default Profile</span><strong>None</strong></div>
          </div>
        </section>

        <section class="card policy-card">
          <div class="section-head">
            <div><h2>Default Policy</h2><p>Policy inherited by members and clients in this group.</p></div>
          </div>
          ${t?r`
            <div class="default-policy">
              <div class="default-policy-icon">${this._icon(h.policies,26)}</div>
              <div class="default-policy-copy">
                <strong>${t.name}</strong>
                <span>${t.rules.length} rule${t.rules.length===1?"":"s"} · Priority ${t.priority}</span>
              </div>
              <button class="btn primary" @click=${()=>{var e;return(e=this.onNavigate)==null?void 0:e.call(this,"policy-detail",t)}}>View Policy</button>
            </div>
          `:r`
            <div class="empty-large">
              <div class="empty-icon">${this._icon(h.policies,28)}</div>
              <strong>No default policy assigned</strong>
              <span>New clients and members in this group will not have a default policy.</span>
              <button class="btn primary" @click=${()=>this._tab="policies"}>
                ${this._icon(h.plus,15)} Assign Default Policy
              </button>
            </div>
          `}
        </section>

        <section class="card clients-card">
          <div class="section-head">
            <div><h2>Clients (${this._clients.length})</h2></div>
            <button class="icon-text-btn" @click=${()=>this._setTab("clients")}>Manage Clients ${this._icon(h.chevronRight,14)}</button>
          </div>
          ${this._clients.length?this._clients.slice(0,4).map((e,i)=>{var s;return r`
                <div class="client-row" @click=${()=>{var a;return(a=this.onNavigate)==null?void 0:a.call(this,"client-detail",e)}}>
                  <div class="client-avatar">${this._icon(h.clients,18)}</div>
                  <div class="client-main">
                    <strong>${e.name}</strong>
                    ${i===0?r`<span class="primary-pill">Primary device</span>`:u}
                    <span>${((s=e.ids)==null?void 0:s[0])||"No ID"}</span>
                  </div>
                  <div class=${"online "+(i===0?"on":"off")}>${i===0?"Online":"Offline"} <i></i></div>
                  ${this._icon(h.chevronRight,14)}
                </div>
              `}):r`<div class="empty-inline">No clients assigned.</div>`}
          <button class="btn small" @click=${()=>this._showAddClient=!0}>${this._icon(h.plus,14)} Add Client</button>
        </section>

        <section class="card inheritance-card">
          <div class="section-head"><div><h2>Inheritance</h2><p>Settings inherited by members and clients.</p></div></div>
          ${[["Profile","None"],["Allowed Services","Inherit from policies"],["Blocked Services","Inherit from policies"],["Safe Search","Inherit from policies"],["YouTube Restricted Mode","Inherit from policies"],["DNS Blocklists","Inherit from system"]].map(([e,i])=>r`
            <div class="inherit-row">
              <span>${e}</span>
              <div><strong>${i}</strong>${this._icon(h.chevronRight,14)}</div>
            </div>
          `)}
        </section>

        <section class="card quick-card">
          <div class="section-head"><h2>Quick Actions</h2></div>
          ${[["Add Member","Add a member to this group",h.members,()=>this._setTab("members")],["Assign Policy","Assign a policy to this group",h.policies,()=>this._setTab("policies")],["Add Override","Add an override rule for this group",h.overrides,()=>this._setTab("overrides")],["View Activity","View group activity and logs",zt,()=>this._setTab("activity")]].map(([e,i,s,a])=>r`
            <button class="quick-action" @click=${a}>
              <span class="quick-icon">${this._icon(s,18)}</span>
              <span class="quick-copy"><strong>${e}</strong><small>${i}</small></span>
              ${this._icon(h.chevronRight,14)}
            </button>
          `)}
        </section>

        <section class="card activity-card">
          <div class="section-head"><div><h2>Recent Activity</h2></div></div>
          <div class="timeline">
            <div class="timeline-item"><span class="dot green"></span><div><strong>Group loaded</strong><small>Current group configuration</small></div></div>
            ${this._clients.slice(0,3).map(e=>r`
              <div class="timeline-item"><span class="dot blue"></span><div><strong>${e.name} in group</strong><small>Configured client</small></div></div>
            `)}
            ${this._policies.slice(0,2).map(e=>r`
              <div class="timeline-item"><span class="dot blue"></span><div><strong>${e.name} assigned</strong><small>Policy currently associated</small></div></div>
            `)}
          </div>
          <button class="full-link" @click=${()=>this._setTab("activity")}>View Full Activity ${this._icon(Et,13)}</button>
        </section>
      </div>
    `}_renderMembersTab(){return r`
      <section class="card tab-card">
        <div class="section-head">
          <div><h2>Members (${this._members.length})</h2><p>People assigned to this group.</p></div>
          <button class="btn primary" @click=${()=>this._showAddMember=!0}>${this._icon(h.plus,15)} Add Member</button>
        </div>
        ${this._members.length?this._members.map(t=>r`
          <div class="tab-row" @click=${()=>{var e;return(e=this.onNavigate)==null?void 0:e.call(this,"member-detail",t)}}>
            <div class="row-icon">${this._icon(h.members,18)}</div>
            <div class="row-main"><strong>${t.name}</strong><span>${t.client_names.length} clients · ${t.assigned_policy_ids.length} policies</span></div>
            <button class="icon-btn" @click=${e=>{e.stopPropagation(),this._showDeleteMemberConfirm=t.name}}>${this._icon(h.delete,16)}</button>
            ${this._icon(h.chevronRight,15)}
          </div>
        `):r`<div class="empty-state">No members assigned.</div>`}
      </section>
    `}_renderClientsTab(){return r`
      <section class="card tab-card">
        <div class="section-head">
          <div><h2>Clients (${this._clients.length})</h2><p>Devices directly assigned to this group.</p></div>
          <button class="btn primary" @click=${()=>this._showAddClient=!0}>${this._icon(h.plus,15)} Add Client</button>
        </div>
        ${this._clients.length?this._clients.map(t=>{var e;return r`
          <div class="tab-row" @click=${()=>{var i;return(i=this.onNavigate)==null?void 0:i.call(this,"client-detail",t)}}>
            <div class="row-icon">${this._icon(h.clients,18)}</div>
            <div class="row-main"><strong>${t.name}</strong><span>${((e=t.ids)==null?void 0:e.join(", "))||"No ID"}</span></div>
            <button class="icon-btn" @click=${i=>{i.stopPropagation(),this._removeClient(t.name)}}>${this._icon(h.close,16)}</button>
          </div>
        `}):r`<div class="empty-state">No clients assigned.</div>`}
      </section>
    `}_renderPoliciesTab(){return r`
      <section class="card tab-card">
        <div class="section-head">
          <div><h2>Policies (${this._policies.length})</h2><p>Policies assigned to this group.</p></div>
          <button class="btn primary" @click=${()=>this._showAddPolicy=!0}>${this._icon(h.plus,15)} Add Policy</button>
        </div>
        ${this._policies.length?this._policies.map((t,e)=>r`
          <div class="policy-row" @click=${()=>{var i;return(i=this.onNavigate)==null?void 0:i.call(this,"policy-detail",t)}}>
            <div class="priority">${e+1}</div>
            <div class="row-main"><strong>${t.name}</strong><span>${t.rules.length} rules · Priority ${t.priority}</span></div>
            <span class="status-badge active">Assigned</span>
            ${this._icon(h.chevronRight,15)}
          </div>
        `):r`
          <div class="empty-large compact">
            <div class="empty-icon">${this._icon(h.policies,24)}</div>
            <strong>No policies assigned</strong>
            <span>Assign a policy to control this group's inherited behavior.</span>
          </div>
        `}
      </section>
    `}_renderOverridesTab(){return r`
      <section class="card tab-card">
        <div class="section-head">
          <div><h2>Override Rules</h2><p>Temporary or high-priority group overrides.</p></div>
        </div>
        <div class="empty-large compact">
          <div class="empty-icon">${this._icon(h.overrides,24)}</div>
          <strong>No group overrides</strong>
          <span>Current model applies overrides at member/client scope.</span>
        </div>
      </section>
    `}_renderActivityTab(){return r`
      <section class="card tab-card">
        <div class="section-head">
          <div><h2>Activity</h2><p>Current configuration activity for this group.</p></div>
        </div>
        <div class="activity-list">
          <div class="activity-row"><span class="dot green"></span><div><strong>Group is active</strong><small>${this._members.length} members · ${this._clients.length} clients · ${this._policies.length} policies</small></div></div>
          ${this._clients.map(t=>{var e;return r`
            <div class="activity-row"><span class="dot blue"></span><div><strong>${t.name}</strong><small>Assigned client · ${((e=t.ids)==null?void 0:e.join(", "))||"No ID"}</small></div></div>
          `})}
          ${this._policies.map(t=>r`
            <div class="activity-row"><span class="dot purple"></span><div><strong>${t.name}</strong><small>Assigned policy · ${t.rules.length} rules</small></div></div>
          `)}
        </div>
      </section>
    `}_renderDeleteModal(){return r`
      <div class="modal-scrim" @click=${()=>this._showDeleteConfirm=!1}></div>
      <div class="modal" @click=${t=>t.stopPropagation()}>
        <div class="modal-head"><h3>Delete group "${this.group.name}"?</h3></div>
        <div class="modal-body"><p>This cannot be undone.</p></div>
        <div class="modal-actions">
          <button class="btn" @click=${()=>this._showDeleteConfirm=!1}>Cancel</button>
          <button class="btn danger" @click=${this._deleteGroup}>Delete</button>
        </div>
      </div>
    `}_renderAddClientModal(){const t=this.state.clients.filter(e=>!this.group.client_names.includes(e.name));return r`
      <div class="modal-scrim" @click=${()=>this._showAddClient=!1}></div>
      <div class="modal wide-modal" @click=${e=>e.stopPropagation()}>
        <div class="modal-head"><h3>Add Client to ${this.group.name}</h3></div>
        <div class="modal-body">
          ${t.length===0?r`<div class="empty-state">No available clients.</div>`:t.map(e=>{var i;return r`
                <button class="modal-list-item" @click=${()=>{this._addClient(e.name),this._showAddClient=!1}}>
                  <span><strong>${e.name}</strong><small>${((i=e.ids)==null?void 0:i.join(", "))||"No ID"}</small></span>
                  ${this._icon(h.chevronRight,15)}
                </button>
              `})}
        </div>
        <div class="modal-actions"><button class="btn" @click=${()=>this._showAddClient=!1}>Cancel</button></div>
      </div>
    `}async _addClient(t){var i;if(!t||this.group.client_names.includes(t))return;const e={...this.group,client_names:[...this.group.client_names,t]};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),await((i=this.onStateChanged)==null?void 0:i.call(this))}async _removeClient(t){var i;const e={...this.group,client_names:this.group.client_names.filter(s=>s!==t)};for(const s of this._members)if(s.client_names.filter(n=>e.client_names.includes(n)).length===0){e.member_names=e.member_names.filter(n=>n!==s.name);try{await this.hass.callWS({type:"adguard_pc/members/delete",member_id:s.id})}catch{}}await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),await((i=this.onStateChanged)==null?void 0:i.call(this))}async _deleteGroup(){var t,e;await this.hass.callWS({type:"adguard_pc/groups/delete",group_id:this.group.id}),this._showDeleteConfirm=!1,await((t=this.onStateChanged)==null?void 0:t.call(this)),(e=this.onNavigate)==null||e.call(this,"groups")}_renderAddMemberModal(){const t=this.state.members.filter(e=>!this.group.member_names.includes(e.name));return r`
      <div class="modal-scrim" @click=${()=>this._showAddMember=!1}></div>
      <div class="modal wide-modal" @click=${e=>e.stopPropagation()}>
        <div class="modal-head"><h3>Add Member to ${this.group.name}</h3></div>
        <div class="modal-body">
          ${t.length===0?r`<div class="empty-state">No available members.</div>`:t.map(e=>r`
                <button class="modal-list-item" @click=${()=>{this._addMember(e.name),this._showAddMember=!1}}>
                  <span><strong>${e.name}</strong><small>${e.client_names.length} clients · ${e.assigned_policy_ids.length} policies</small></span>
                  ${this._icon(h.chevronRight,15)}
                </button>
              `)}
        </div>
        <div class="modal-actions"><button class="btn" @click=${()=>this._showAddMember=!1}>Cancel</button></div>
      </div>
    `}async _addMember(t){var i;if(!t||this.group.member_names.includes(t))return;const e={...this.group,member_names:[...this.group.member_names,t]};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),await((i=this.onStateChanged)==null?void 0:i.call(this))}_renderAddPolicyModal(){const t=this.state.policies.filter(e=>!this.group.assigned_policy_ids.includes(e.id));return r`
      <div class="modal-scrim" @click=${()=>this._showAddPolicy=!1}></div>
      <div class="modal wide-modal" @click=${e=>e.stopPropagation()}>
        <div class="modal-head"><h3>Add Policy to ${this.group.name}</h3></div>
        <div class="modal-body">
          ${t.length===0?r`<div class="empty-state">No available policies.</div>`:t.sort((e,i)=>i.priority-e.priority).map(e=>r`
                <button class="modal-list-item" @click=${async()=>{try{await this._addPolicy(e.id),this._showAddPolicy=!1}catch(i){console.error("Failed to assign policy to group",i)}}}>
                  <span><strong>${e.name}</strong><small>Priority ${e.priority} · ${e.rules.length} rules</small></span>
                  ${this._icon(h.chevronRight,15)}
                </button>
              `)}
        </div>
        <div class="modal-actions"><button class="btn" @click=${()=>this._showAddPolicy=!1}>Cancel</button></div>
      </div>
    `}async _addPolicy(t){var e;!t||this.group.assigned_policy_ids.includes(t)||(await this.hass.callWS({type:"adguard_pc/groups/assign_policy",group_id:this.group.id,policy_id:t}),await((e=this.onStateChanged)==null?void 0:e.call(this)))}async _deleteMember(t){var i;if(!this.group.member_names.includes(t))return;const e={...this.group,member_names:this.group.member_names.filter(s=>s!==t)};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this._showDeleteMemberConfirm=null,await((i=this.onStateChanged)==null?void 0:i.call(this))}_renderDeleteMemberModal(){return r`
      <div class="modal-scrim" @click=${()=>this._showDeleteMemberConfirm=null}></div>
      <div class="modal" @click=${t=>t.stopPropagation()}>
        <div class="modal-head"><h3>Remove member "${this._showDeleteMemberConfirm}"?</h3></div>
        <div class="modal-body"><p>This only removes the member from this group. The member, their clients, policies, and exceptions will remain unchanged.</p></div>
        <div class="modal-actions">
          <button class="btn" @click=${()=>this._showDeleteMemberConfirm=null}>Cancel</button>
          <button class="btn danger" @click=${()=>this._showDeleteMemberConfirm&&this._deleteMember(this._showDeleteMemberConfirm)}>Remove from Group</button>
        </div>
      </div>
    `}};k.styles=[J,C`
      :host { display:block; padding: 0 0 34px; color: var(--agpc-text); }
      .page { max-width: 1480px; margin: 0 auto; padding: 0 14px 34px; box-sizing: border-box; }
      .card { background:var(--agpc-card-bg, #151c31); border:1px solid var(--agpc-border, #27304a); border-radius:12px; box-shadow: 0 8px 24px rgba(0,0,0,.14); }
      .hero { padding: 22px 24px 20px; display:flex; justify-content:space-between; gap:24px; margin-bottom: 0; }
      .hero-main { display:flex; gap:18px; min-width:0; }
      .hero-icon { width:88px; height:88px; border-radius:50%; display:grid; place-items:center; background: linear-gradient(145deg,#2fcf67,#1f9c4c); color:#fff; flex:0 0 auto; box-shadow:0 10px 28px rgba(38,193,96,.22); }
      .hero-copy { min-width:0; }
      .title-line { display:flex; align-items:center; gap:10px; }
      h1 { margin:0; font-size:28px; letter-spacing:-.02em; }
      .description { margin-top:8px; color:var(--agpc-text-dim); font-size:14px; }
      .status-badge { display:inline-flex; align-items:center; padding:5px 9px; border-radius:8px; font-size:11px; font-weight:700; }
      .status-badge.active { color:#49e187; background:rgba(52,211,112,.12); }
      .stats { display:flex; gap:24px; margin-top:18px; flex-wrap:wrap; }
      .stat { display:flex; align-items:center; gap:8px; padding-right:24px; border-right:1px solid var(--agpc-border); }
      .stat:last-child { border-right:none; }
      .stat-icon { color:var(--agpc-text-dim); display:grid; }
      .stat div { display:grid; gap:2px; }
      .stat b { font-size:16px; }
      .stat span { font-size:12px; color:var(--agpc-text-dim); }
      .hero-actions { display:flex; gap:10px; align-items:flex-start; }
      .btn { display:inline-flex; align-items:center; gap:8px; padding:9px 13px; border:1px solid var(--agpc-border); background:rgba(255,255,255,.02); color:var(--agpc-text); border-radius:9px; cursor:pointer; font:inherit; font-size:13px; }
      .btn:hover { background:rgba(255,255,255,.05); }
      .btn.primary { background:var(--agpc-blue); border-color:var(--agpc-blue); color:#fff; }
      .btn.danger { border-color:rgba(248,113,113,.35); color:#ff8d8d; background:rgba(248,113,113,.04); }
      .btn.small { margin-top:12px; padding:7px 10px; font-size:12px; }
      .tabs { display:flex; gap:28px; padding:0 12px; border-bottom:1px solid var(--agpc-border); margin:2px 0 20px; }
      .tab { position:relative; border:0; background:none; color:var(--agpc-text-dim); padding:14px 6px 12px; cursor:pointer; font:inherit; font-size:13px; }
      .tab.active { color:var(--agpc-blue); }
      .tab.active::after { content:""; position:absolute; left:0; right:0; bottom:-1px; height:2px; background:var(--agpc-blue); border-radius:2px; }
      .overview-grid { display:grid; grid-template-columns: 1.1fr 1.1fr 1.1fr; gap:16px; }
      .info-card,.policy-card,.clients-card,.inheritance-card,.quick-card,.activity-card,.tab-card { padding:16px; }
      .inheritance-card { grid-column: 1; }
      .quick-card { grid-column: 2; }
      .activity-card { grid-column: 3; }
      .section-head { display:flex; align-items:flex-start; justify-content:space-between; gap:14px; margin-bottom:14px; }
      .section-head h2 { margin:0; font-size:17px; }
      .section-head p { margin:5px 0 0; color:var(--agpc-text-dim); font-size:12px; }
      .icon-text-btn { background:none; border:0; color:var(--agpc-blue); cursor:pointer; display:inline-flex; gap:5px; align-items:center; font:inherit; font-size:12px; padding:3px 0; }
      .kv { display:grid; gap:16px; }
      .kv > div { display:grid; gap:5px; }
      .kv span { color:var(--agpc-text-dim); font-size:12px; }
      .kv strong { font-size:14px; font-weight:500; }
      .default-policy { display:flex; align-items:center; gap:14px; min-height:170px; padding:18px; background:rgba(255,255,255,.015); border:1px solid var(--agpc-border); border-radius:12px; }
      .default-policy-icon { width:52px; height:52px; border-radius:14px; display:grid; place-items:center; background:rgba(44,126,255,.14); color:var(--agpc-blue); flex:0 0 auto; }
      .default-policy-copy { flex:1; display:grid; gap:5px; min-width:0; }
      .default-policy-copy strong { font-size:14px; }
      .default-policy-copy span { color:var(--agpc-text-dim); font-size:12px; }
      .empty-large { min-height:170px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; text-align:center; color:var(--agpc-text-dim); }
      .empty-large strong { color:var(--agpc-text); font-size:14px; }
      .empty-large span { max-width:300px; font-size:12px; }
      .empty-large.compact { min-height:250px; }
      .empty-icon { width:52px; height:52px; border-radius:14px; background:rgba(44,126,255,.10); color:var(--agpc-blue); display:grid; place-items:center; margin-bottom:4px; }
      .client-row { display:flex; align-items:center; gap:10px; padding:11px 0; border-bottom:1px solid var(--agpc-border); cursor:pointer; }
      .client-row:last-of-type { border-bottom:none; }
      .client-avatar { width:34px; height:34px; border-radius:9px; background:rgba(255,255,255,.05); display:grid; place-items:center; color:var(--agpc-text-dim); }
      .client-main { flex:1; min-width:0; display:grid; gap:3px; }
      .client-main strong { font-size:13px; }
      .client-main span { font-size:11px; color:var(--agpc-text-dim); }
      .primary-pill { display:inline-flex; width:max-content; padding:2px 6px; border-radius:6px; background:rgba(44,126,255,.12); color:#7eb3ff !important; }
      .online { font-size:11px; display:flex; align-items:center; gap:5px; white-space:nowrap; }
      .online i { width:7px; height:7px; border-radius:50%; background:#6d7687; display:block; }
      .online.on { color:#41d97d; }
      .online.on i { background:#2bd36f; }
      .online.off { color:var(--agpc-text-dim); }
      .inherit-row { display:flex; justify-content:space-between; gap:10px; padding:10px 0; border-bottom:1px solid var(--agpc-border); font-size:12px; }
      .inherit-row:last-child { border-bottom:none; }
      .inherit-row > span { color:var(--agpc-text-dim); }
      .inherit-row div { display:flex; align-items:center; gap:8px; text-align:right; }
      .inherit-row strong { font-size:12px; font-weight:500; }
      .quick-action { width:100%; display:flex; align-items:center; gap:11px; padding:11px 0; border:0; background:none; color:var(--agpc-text); border-bottom:1px solid var(--agpc-border); cursor:pointer; text-align:left; }
      .quick-action:last-child { border-bottom:none; }
      .quick-icon { width:34px; height:34px; border-radius:9px; display:grid; place-items:center; color:var(--agpc-blue); background:rgba(44,126,255,.10); flex:0 0 auto; }
      .quick-copy { flex:1; display:grid; gap:3px; }
      .quick-copy strong { font-size:13px; }
      .quick-copy small { color:var(--agpc-text-dim); font-size:11px; }
      .timeline-item { display:flex; gap:10px; padding:0 0 14px; }
      .dot { width:8px; height:8px; border-radius:50%; margin-top:5px; flex:0 0 auto; }
      .dot.green { background:#38d979; }
      .dot.blue { background:#4d8bff; }
      .dot.purple { background:#9b7cff; }
      .timeline-item div { display:grid; gap:3px; }
      .timeline-item strong { font-size:12px; }
      .timeline-item small { color:var(--agpc-text-dim); font-size:11px; }
      .full-link { width:100%; margin-top:4px; padding-top:11px; border:0; border-top:1px solid var(--agpc-border); background:none; color:var(--agpc-text); cursor:pointer; font:inherit; font-size:12px; }
      .tab-card { min-height:420px; }
      .btn-danger { background:#b94650; color:#fff; border-color:#b94650; }
      .btn-danger:hover { opacity:0.9; }
      .tab-row,.policy-row { display:flex; align-items:center; gap:12px; padding:14px 4px; border-bottom:1px solid var(--agpc-border); cursor:pointer; }
      .tab-row:last-child,.policy-row:last-child { border-bottom:none; }
      .row-icon { width:34px; height:34px; border-radius:9px; display:grid; place-items:center; background:rgba(255,255,255,.05); color:var(--agpc-text-dim); }
      .row-main { flex:1; display:grid; gap:4px; min-width:0; }
      .row-main strong { font-size:13px; }
      .row-main span { color:var(--agpc-text-dim); font-size:11px; }
      .icon-btn { border:0; background:none; color:var(--agpc-text-dim); cursor:pointer; display:grid; place-items:center; padding:5px; }
      .priority { width:24px; height:24px; border-radius:7px; display:grid; place-items:center; background:rgba(255,255,255,.05); color:var(--agpc-text-dim); font-size:11px; }
      .empty-state,.empty-inline { color:var(--agpc-text-dim); font-size:12px; padding:18px 0; }
      .activity-row { display:flex; gap:12px; padding:12px 0; border-bottom:1px solid var(--agpc-border); }
      .activity-row:last-child { border-bottom:none; }
      .activity-row > div { display:grid; gap:3px; }
      .activity-row strong { font-size:13px; }
      .activity-row small { color:var(--agpc-text-dim); font-size:11px; }
      .modal-scrim { position:fixed; inset:0; background:rgba(0,0,0,.58); z-index:999; }
      .modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:1000; background:var(--agpc-card,#121827); border:1px solid var(--agpc-border,#26324a); border-radius:14px; padding:20px; min-width:340px; max-width:420px; box-shadow:0 18px 64px rgba(0,0,0,.45); }
      .wide-modal { min-width:420px; max-width:520px; }
      .modal-head h3 { margin:0; font-size:16px; }
      .modal-body { margin-top:14px; max-height:60vh; overflow-y:auto; }
      .modal-body p { margin:0; color:var(--agpc-text-dim); font-size:12px; }
      .modal-actions { display:flex; gap:8px; justify-content:flex-end; margin-top:18px; }
      .modal-list-item { width:100%; display:flex; justify-content:space-between; align-items:center; padding:12px; margin-bottom:7px; background:rgba(255,255,255,.02); border:1px solid var(--agpc-border); border-radius:10px; color:var(--agpc-text); cursor:pointer; text-align:left; }
      .modal-list-item:hover { background:rgba(255,255,255,.05); }
      .modal-list-item span { display:grid; gap:4px; }
      .modal-list-item small { color:var(--agpc-text-dim); font-size:11px; }
      @media (max-width: 1180px) { .overview-grid { grid-template-columns: 1fr 1fr; } .activity-card { grid-column: 1 / -1; } }
      @media (max-width: 780px) { .page { padding:0 10px 24px; } .hero { flex-direction:column; } .overview-grid { grid-template-columns: 1fr; } .inheritance-card,.quick-card,.activity-card { grid-column:auto; } .tabs { gap:16px; padding:0 4px; overflow:auto; } .stats { gap:14px; } .stat { padding-right:14px; } .wide-modal,.modal { min-width:0; width:min(92vw, 520px); } }
    `];P([g({attribute:!1})],k.prototype,"hass",2);P([g({attribute:!1})],k.prototype,"state",2);P([g({attribute:!1})],k.prototype,"group",2);P([g({type:Boolean})],k.prototype,"narrow",2);P([g({type:Object})],k.prototype,"onNavigate",2);P([g({type:Object})],k.prototype,"onStateChanged",2);P([d()],k.prototype,"_showDeleteConfirm",2);P([d()],k.prototype,"_showAddClient",2);P([d()],k.prototype,"_showAddMember",2);P([d()],k.prototype,"_showAddPolicy",2);P([d()],k.prototype,"_showDeleteMemberConfirm",2);P([d()],k.prototype,"_tab",2);k=P([L("group-view")],k);var Rt=Object.defineProperty,Nt=Object.getOwnPropertyDescriptor,w=(t,e,i,s)=>{for(var a=s>1?void 0:s?Nt(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Rt(e,i,a),a};const Fe=()=>new Date(Date.now()-24*60*60*1e3).toISOString(),Vt={refresh:"M17.65,6.35C16.2,4.9 14.21,4 12,4C7.58,4 4.01,7.58 4.01,12C4.01,16.42 7.58,20 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18C8.69,18 6,15.31 6,12C6,8.69 8.69,6 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"};let y=class extends ${constructor(){super(...arguments),this.narrow=!1,this._newException="",this._showDeleteConfirm=!1,this._showAddClient=!1,this._queryLogs=[],this._queryLoading=!1,this._queryLive=!0,this._querySearch="",this._queryType="all",this._queryClient="all",this._queryError="",this._queryOldest="",this._queryFullyLoaded=!1}connectedCallback(){super.connectedCallback(),this._startQueryPolling()}disconnectedCallback(){super.disconnectedCallback(),this._stopQueryPolling()}updated(t){t.has("member")&&(this._queryLogs=[],this._queryOldest="",this._queryFullyLoaded=!1,this._loadQueryLog())}render(){if(!this.member)return r``;const t=this.member.client_names.map(o=>this.state.clients.find(c=>c.name===o)).filter(Boolean),e=this._activePolicies(),i=e[0],s=this._blockedServices(e),a=this._allowedServices(e),n=e.length>0&&(s.length>0||e.some(o=>o.rules.some(c=>c.action==="block")));return r`
      <div class="page">
        <div class="breadcrumb"><span @click=${()=>{var o;return(o=this.onNavigate)==null?void 0:o.call(this,"members")}}>Members</span><span>›</span><strong>${this.member.name}</strong></div>

        <section class="hero card">
          <div class="avatar">${this.member.name.slice(0,1).toUpperCase()}</div>
          <div class="hero-main">
            <div class="title-line">
              <h1>${this.member.name}</h1>
              <span class="pill green">Active</span>
            </div>
            <div class="hero-meta">
              <span>👥 ${this._groupName()}</span>
              <span>◈ ${i!=null&&i.profile_id?this._profileName(i.profile_id):"No profile"}</span>
              <span>▣ ${e.length} active</span>
              <span>▱ ${t.length} clients</span>
              <span>⇆ ${this.member.exceptions.length} exceptions</span>
            </div>
          </div>
          <div class="hero-actions">
            <button class="btn" @click=${this._editMember}>✎ Edit Member</button>
            <button class="btn btn-hero-delete" @click=${()=>{this._showDeleteConfirm=!0}}>Delete</button>
          </div>
        </section>

        <div class="layout">
          <main class="main-column">
            <div class="grid-3">
              <section class="card stat-card">
                <div class="section-title">Current Status</div>
                <div class="status-row">
                  <strong class=${n?"yellow":"green-text"}>${n?"RESTRICTED":"UNRESTRICTED"}</strong>
                  <div class="next-change">${i?r`<span>Next change</span><strong>${this._nextChange(i)}</strong>`:r`<span>No active schedule</span>`}</div>
                </div>
                <div class="subtext">${(i==null?void 0:i.name)||"No active policy"}${i!=null&&i.time_schedule?r` · ${this._scheduleText(i)}`:""}</div>
              </section>

              <section class="card stat-card">
                <div class="section-title">Allowed Services</div>
                <div class="service-line">
                  ${a.length?a.slice(0,3).map(o=>r`<span class="service allowed"><span class="service-dot">✓</span>${o}</span>`):r`<span class="muted">No explicit allow rules</span>`}
                </div>
              </section>

              <section class="card stat-card">
                <div class="section-title">Global Blocked Services</div>
                <div class="service-line">
                  ${s.length?s.slice(0,4).map(o=>r`<span class="service blocked"><span class="service-dot">×</span>${o}</span>`):r`<span class="muted">No explicit blocked services</span>`}
                  ${s.length>4?r`<span class="more">+${s.length-4}</span>`:""}
                </div>
              </section>
            </div>

            <section class="card section-card">
              <div class="section-head"><h2>Assigned Clients (${t.length})</h2><button class="btn small" @click=${()=>{var o;return(o=this.onNavigate)==null?void 0:o.call(this,"clients")}}>Manage Clients</button></div>
              <table class="table">
                <thead><tr><th>CLIENT</th><th>IP ADDRESS</th><th>STATUS</th><th>CURRENT POLICY</th><th>LAST SEEN</th><th></th></tr></thead>
                <tbody>
                  ${t.map(o=>r`
                    <tr @click=${()=>{var c;return(c=this.onNavigate)==null?void 0:c.call(this,"client-detail",o)}}>
                      <td><div class="client-cell"><span class="device-icon">▣</span><div><strong>${o.name}</strong>${o===t[0]?r`<small>Primary device</small>`:""}</div></div></td>
                      <td class="mono">${o.ids[0]||"—"}</td>
                      <td><span class="pill ${n?"yellow-pill":"green"}">${n?"RESTRICTED":"NORMAL"}</span></td>
                      <td>${(i==null?void 0:i.name)||"Default"}<small class="cell-sub">${i!=null&&i.time_schedule?this._scheduleText(i):"All day"}</small></td>
                      <td class="last-seen">${this._lastSeen(o.name)}</td>
                      <td class="arrow">›</td>
                    </tr>
                  `)}
                </tbody>
              </table>
              ${t.length?"":r`<div class="empty">No clients assigned. Add a client below.</div>`}
              <div class="add-row">
                <button class="btn" @click=${()=>{this._showAddClient=!0}}>+ Add Client</button>
              </div>
            </section>

            <section class="card section-card">
              <div class="section-head"><h2>Active Policy</h2>${i?r`<button class="btn small" @click=${()=>{var o;return(o=this.onNavigate)==null?void 0:o.call(this,"policy-detail",i)}}>View Policy ↗</button>`:""}</div>
              ${i?r`
                <div class="policy-banner">
                  <div class="policy-icon">☾</div>
                  <div class="policy-main"><strong>${i.name}</strong><span>${this._scheduleText(i)}</span></div>
                  <span class="pill purple">${this._policyMode(i)}</span>
                  <div class="policy-meta"><span>Schedule<br><strong>${this._scheduleDays(i)}</strong></span><span>Profile<br><strong>${i.profile_id?this._profileName(i.profile_id):"None"}</strong></span></div>
                </div>
              `:r`<div class="empty">No active policy at the current time.</div>`}
            </section>

            <div class="grid-2">
              <section class="card section-card compact">
                <div class="section-head"><h2>Exceptions (${this.member.exceptions.length})</h2><button class="btn small" @click=${this._addException}>＋ Add Exception</button></div>
                ${this.member.exceptions.length?this.member.exceptions.map(o=>r`<div class="exception"><span>${o}</span><button class="icon-btn" @click=${()=>this._removeException(o)}>×</button></div>`):r`<div class="empty">No exceptions for this member</div>`}
                <div class="inline-add"><input class="field" placeholder="domain.com" .value=${this._newException} @input=${o=>this._newException=o.target.value} @keydown=${o=>o.key==="Enter"&&this._addException()}></div>
              </section>
              <section class="card section-card compact">
                <div class="section-head"><h2>Overrides (${this.state.overrides.filter(o=>o.target_type==="member"&&o.target===this.member.name&&!this._expired(o.expires)).length})</h2><button class="btn small" @click=${()=>{var o;return(o=this.onNavigate)==null?void 0:o.call(this,"override")}}>＋ New Override</button></div>
                <div class="empty">No active overrides</div>
              </section>
            </div>
          </main>

          <aside class="query-panel card">
            <div class="query-head">
              <div><h2>DNS Query Log <span>(Live)</span></h2><small>Latest DNS queries for this member</small></div>
              <div class="live-controls"><span class="live-dot ${this._queryLive?"on":""}">● Live</span><button class="icon-btn" title="Pause" @click=${()=>{this._queryLive=!this._queryLive,this._queryLive?this._startQueryPolling():this._stopQueryPolling()}}>${this._queryLive?"Ⅱ":"▶"}</button></div>
            </div>
            <div class="filters">
              <select class="field" @change=${o=>{this._queryClient=o.target.value}}>
                <option value="all">All Clients</option>
                ${t.map(o=>r`<option value="${o.name}">${o.name}</option>`)}
              </select>
              <select class="field" @change=${o=>{this._queryType=o.target.value}}>
                <option value="all">All Types</option><option value="A">A</option><option value="AAAA">AAAA</option><option value="HTTPS">HTTPS</option><option value="TXT">TXT</option>
              </select>
              <input class="field search" placeholder="Search domain…" .value=${this._querySearch} @input=${o=>this._querySearch=o.target.value}>
              <button class="icon-btn" title="Refresh" @click=${this._loadQueryLog}><ha-icon .path=${Vt.refresh}></ha-icon></button>
            </div>
            ${this._queryError?r`<div class="query-error">${this._queryError}</div>`:""}
            <div class="query-table-wrap">
              <table class="table query-table">
                <thead><tr><th>TIME</th><th>CLIENT</th><th>DOMAIN</th><th>ACTION</th><th>TYPE</th></tr></thead>
                <tbody>
                  ${this._filteredLogs().slice(0,50).map(o=>{var c;return r`
                    <tr>
                      <td class="time">${this._formatTime(o.time)}</td>
                      <td>${o.member_client||o.client}</td>
                      <td><div class="domain-cell"><span class="svc-icon">${Xe(M(o),18)}</span><strong>${M(o)||"—"}</strong></div></td>
                      <td>${this._isBlocked(o)?r`<span class="pill red">BLOCKED</span>`:r`<span class="pill green">PROCESSED</span>`}</td>
                      <td>${((c=o.question)==null?void 0:c.type)||"A"}</td>
                    </tr>
                  `})}
                </tbody>
              </table>
              ${this._queryLoading&&!this._queryLogs.length?r`<div class="empty loading-log">Loading query log…</div>`:""}
              ${!this._queryLoading&&!this._filteredLogs().length?r`<div class="empty loading-log">No DNS queries found for this member.</div>`:""}
            </div>
            <div class="query-foot"><span>Auto-scroll <button class="switch ${this._queryLive?"on":""}" @click=${()=>this._queryLive=!this._queryLive}><i></i></button></span><button class="btn small" @click=${()=>{var o;return(o=this.onNavigate)==null?void 0:o.call(this,"logs")}}>View Full Logs</button></div>
          </aside>
        </div>

        <section class="card timeline-card">
          <div class="section-head"><h2>Today Activity Timeline</h2><span class="legend"><i class="allowed-dot"></i> Allowed <i class="blocked-dot"></i> Blocked <i class="unknown-dot"></i> Unknown</span></div>
          ${t.map(o=>r`
            <div class="timeline-row"><div class="timeline-label"><strong>${o.name}</strong><small>${o.ids[0]||""}</small></div><div class="timeline"><span class="tick t0">00:00</span><span class="tick t4">04:00</span><span class="tick t8">08:00</span><span class="tick t12">12:00</span><span class="tick t16">16:00</span><span class="tick t20">20:00</span><span class="tick t24">24:00</span><div class="bar"><span class="seg allowed"></span><span class="seg blocked"></span><span class="now"></span></div></div></div>
          `)}
        </section>
      </div>

      ${this._showDeleteConfirm?r`
        <div class="modal-scrim" @click=${()=>this._showDeleteConfirm=!1}></div>
        <div class="modal">
          <div class="modal-head"><h3>Delete member "${this.member.name}"?</h3></div>
          <div class="modal-body"><p>This action cannot be undone. Clients and policies will not be deleted.</p></div>
          <div class="modal-actions">
            <button class="btn" @click=${()=>this._showDeleteConfirm=!1}>Cancel</button>
            <button class="btn btn-danger" @click=${this._deleteMember}>Delete</button>
          </div>
        </div>
      `:""}

      ${this._showAddClient?r`
        <div class="modal-scrim" @click=${()=>this._showAddClient=!1}></div>
        <div class="modal">
          <div class="modal-head"><h3>Add Client to "${this.member.name}"</h3></div>
          <div class="modal-body">
            ${this.state.clients.filter(o=>!this.member.client_names.includes(o.name)).length===0?r`<p class="empty">No available clients</p>`:this.state.clients.filter(o=>!this.member.client_names.includes(o.name)).map(o=>r`
                    <div class="modal-list-item" @click=${()=>{this._addClient(o.name),this._showAddClient=!1}}>
                      <span>${o.name}</span>
                      <ha-icon .path=${"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"}></ha-icon>
                    </div>
                  `)}
          </div>
          <div class="modal-actions">
            <button class="btn" @click=${()=>this._showAddClient=!1}>Cancel</button>
          </div>
        </div>
      `:""}
    `}_activePolicies(){const t=new Set(this.member.assigned_policy_ids);for(const i of this.state.groups)i.member_names.includes(this.member.name)&&i.assigned_policy_ids.forEach(s=>t.add(s));const e=new Date;return[...t].map(i=>this.state.policies.find(s=>s.id===i)).filter(i=>!!i&&this._scheduleActive(i,e)).sort((i,s)=>s.priority-i.priority)}_scheduleActive(t,e){if(!t.time_schedule)return!0;const i=t.time_schedule.days||[],s=["sun","mon","tue","wed","thu","fri","sat"][e.getDay()];if(i.length&&!i.includes(s))return!1;const a=t.time_schedule.time_from,n=t.time_schedule.time_to;if(!a||!n)return!0;const o=e.getHours()*60+e.getMinutes(),c=this._minutes(a),l=this._minutes(n);return c<=l?o>=c&&o<=l:o>=c||o<=l}_minutes(t){const[e,i]=t.split(":").map(Number);return e*60+i}_scheduleText(t){return t.time_schedule?`${t.time_schedule.time_from||"00:00"} – ${t.time_schedule.time_to||"24:00"}`:"All day"}_scheduleDays(t){var e,i;return(i=(e=t.time_schedule)==null?void 0:e.days)!=null&&i.length?t.time_schedule.days.map(s=>s.slice(0,1).toUpperCase()+s.slice(1)).join(" · "):"Every day"}_policyMode(t){var i;return((i=t.rules)==null?void 0:i.filter(s=>s.action==="allow").length)||0?"ALLOW ONLY":"RESTRICTED"}_groupName(){var t;return((t=this.state.groups.find(e=>e.member_names.includes(this.member.name)))==null?void 0:t.name)||"Unassigned"}_profileName(t){var e;return((e=this.state.profiles.find(i=>i.id===t))==null?void 0:e.name)||t}_nextChange(t){var e;return((e=t.time_schedule)==null?void 0:e.time_to)||"—"}_blockedServices(t){return[...new Set(t.flatMap(e=>e.rules.filter(i=>i.rule_type==="service"&&i.action==="block").map(i=>i.target)))]}_allowedServices(t){return[...new Set(t.flatMap(e=>e.rules.filter(i=>i.rule_type==="service"&&i.action==="allow").map(i=>i.target)))]}_lastSeen(t){const e=this._queryLogs.find(i=>i.member_client===t);return e?`${this._formatTime(e.time)} · Online`:"—"}_expired(t){return!!t&&new Date(t).getTime()<=Date.now()}_editMember(){}_filteredLogs(){return this._queryLogs.filter(t=>{var o;const e=M(t).toLowerCase(),i=t.member_client||t.client||"",s=!this._querySearch.trim()||e.includes(this._querySearch.trim().toLowerCase()),a=this._queryClient==="all"||i===this._queryClient,n=this._queryType==="all"||((o=t.question)==null?void 0:o.type)===this._queryType;return s&&a&&n&&!!i})}_isBlocked(t){const e=(t.reason||"").toLowerCase();return/filtered\/(blocked|blacklist|safebrowsing|parental|safesearch|service)/.test(e)||/\bblocked\b/.test(e)||/\bblacklist\b/.test(e)}_response(t){var e,i;return((i=(e=t.answer)==null?void 0:e[0])==null?void 0:i.value)||t.status||"—"}_formatTime(t){const e=new Date(t);return Number.isNaN(e.getTime())?t.slice(11,19):e.toLocaleTimeString([],{hour12:!1})}_startQueryPolling(){this._stopQueryPolling(),this._queryLive&&(this._loadQueryLog(),this._queryTimer=window.setInterval(()=>this._loadQueryLog(),5e3))}_stopQueryPolling(){this._queryTimer&&(window.clearInterval(this._queryTimer),this._queryTimer=void 0)}async _loadQueryLog(){if(!(!this.member||!this.hass||this._queryLoading)){this._queryLoading=!0;try{const t=this._queryLogs.length===0,e=t?200:80,i=t?"":this._queryOldest,s=await this.hass.callWS({type:"adguard_pc/members/querylog",member_id:this.member.id,limit:e,search:"",response_status:"",older_than:i}),a=(s==null?void 0:s.data)||[],n=(s==null?void 0:s.oldest)||"";if(t){this._queryLogs=a,this._queryOldest=n;const o=new Date(Fe()).getTime();for(;n&&a.length>=e&&a.length>0;){const c=a[a.length-1];if(new Date(c.time).getTime()<=o)break;const p=await this.hass.callWS({type:"adguard_pc/members/querylog",member_id:this.member.id,limit:e,search:"",response_status:"",older_than:this._queryOldest}),m=(p==null?void 0:p.data)||[];if(!m.length)break;this._queryLogs=[...this._queryLogs,...m],this._queryOldest=(p==null?void 0:p.oldest)||"";const b=m[m.length-1];if(new Date(b.time).getTime()<=o||!(p!=null&&p.oldest))break}this._queryFullyLoaded=!0}else if(a.length){const o=new Set(this._queryLogs.map(l=>{var p;return`${l.time}|${M(l)}|${(p=l.question)==null?void 0:p.type}`})),c=a.filter(l=>{var p;return!o.has(`${l.time}|${M(l)}|${(p=l.question)==null?void 0:p.type}`)});if(c.length){const l=new Date(Fe()).getTime();this._queryLogs=[...c,...this._queryLogs].filter(p=>new Date(p.time).getTime()>l)}}this._queryError=""}catch(t){this._queryError=t instanceof Error?t.message:"Unable to load AdGuard query log"}finally{this._queryLoading=!1}}}async _handleAddClient(t){const e=t.target.value;e&&await this._addClient(e),t.target.value=""}async _addClient(t){var i;if(!t||this.member.client_names.includes(t))return;const e={...this.member,client_names:[...this.member.client_names,t]};await this.hass.callWS({type:"adguard_pc/members/update",member:e}),(i=this.onStateChanged)==null||i.call(this),this._loadQueryLog()}async _removeClient(t){var i;const e={...this.member,client_names:this.member.client_names.filter(s=>s!==t)};await this.hass.callWS({type:"adguard_pc/members/update",member:e}),(i=this.onStateChanged)==null||i.call(this),this._loadQueryLog()}async _addException(){var e;if(!this._newException.trim())return;const t={...this.member,exceptions:[...this.member.exceptions,this._newException.trim()]};await this.hass.callWS({type:"adguard_pc/members/update",member:t}),this._newException="",(e=this.onStateChanged)==null||e.call(this)}async _removeException(t){var i;const e={...this.member,exceptions:this.member.exceptions.filter(s=>s!==t)};await this.hass.callWS({type:"adguard_pc/members/update",member:e}),(i=this.onStateChanged)==null||i.call(this)}_handleDeleteDialog(){this._showDeleteConfirm=!1}async _deleteMember(){var t,e;await this.hass.callWS({type:"adguard_pc/members/delete",member_id:this.member.id}),this._showDeleteConfirm=!1,(t=this.onStateChanged)==null||t.call(this),(e=this.onNavigate)==null||e.call(this,"dashboard")}};y.styles=C`
    :host { display: block; color: var(--agpc-text, #eef2ff); }
    .page { padding: 0 14px 28px; max-width: 1680px; margin: 0 auto; }
    .card { background: var(--agpc-card-bg, #151c31); border: 1px solid var(--agpc-border, #27304a); border-radius: 12px; box-sizing: border-box; }
    .breadcrumb { height: 42px; display:flex; align-items:center; gap:10px; color:var(--agpc-text-faint,#71809f); font-size:13px; }
    .breadcrumb span:first-child { cursor:pointer; }.breadcrumb strong { color:var(--agpc-text,#eef2ff); }
    .hero { min-height:108px; display:flex; align-items:center; padding:18px 20px; gap:18px; }
    .avatar { width:68px; height:68px; border-radius:50%; display:grid; place-items:center; background:linear-gradient(135deg,#3d67a9,#25355c); border:2px solid #536a95; font-size:28px; font-weight:800; }
    .hero-main { flex:1; min-width:0; }.title-line { display:flex; align-items:center; gap:12px; }.title-line h1 { margin:0; font-size:24px; }.hero-meta { display:flex; flex-wrap:wrap; gap:20px; color:#9aa6c0; font-size:12px; margin-top:12px; }.hero-actions { display:flex; gap:8px; align-self:flex-start; }
    .btn-hero-delete { background:#451d24; color:#ff6875; border:1px solid #6b2832; border-radius:7px; padding:8px 11px; font:600 11px inherit; cursor:pointer; }
    .btn-hero-delete:hover { background:#5c2430; }
    .layout { display:grid; grid-template-columns:minmax(0,1fr) 500px; gap:12px; margin-top:12px; align-items:start; }.main-column { min-width:0; }.grid-3 { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; }.grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .stat-card { min-height:122px; padding:16px; }.section-title { font-size:13px; font-weight:700; margin-bottom:16px; }.status-row { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; }.status-row strong { font-size:16px; }.yellow { color:#f3bd38; }.green-text { color:#2bd88f; }.subtext,.muted { color:#7e8aa4; font-size:12px; margin-top:10px; }.next-change { text-align:right; color:#7e8aa4; font-size:11px; }.next-change strong { display:block; color:#eef2ff; font-size:15px; margin-top:3px; }
    .service-line { display:flex; flex-wrap:wrap; gap:7px; align-items:center; }.service { display:inline-flex; align-items:center; gap:6px; padding:6px 8px; border-radius:8px; background:#11172a; border:1px solid #26304a; font-size:11px; }.service.allowed { color:#42e09a; }.service.blocked { color:#ff6464; }.service-dot { font-weight:900; }.more { font-size:11px; color:#7e8aa4; }
    .section-card { padding:16px; margin-top:12px; }.section-card.compact { min-height:130px; }.section-head { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:12px; }.section-head h2 { margin:0; font-size:15px; }.table { width:100%; border-collapse:collapse; }.table th { text-align:left; font-size:9px; color:#65728f; font-weight:700; letter-spacing:.05em; padding:0 8px 9px; border-bottom:1px solid #29324a; }.table td { padding:10px 8px; border-bottom:1px solid #202942; font-size:11px; color:#cdd5e8; }.table tbody tr { cursor:pointer; }.table tbody tr:hover { background:#18213a; }.table tbody tr:last-child td { border-bottom:0; }.client-cell { display:flex; align-items:center; gap:9px; }.client-cell strong { display:block; color:#f2f5ff; }.client-cell small,.cell-sub { display:block; color:#66738e; font-size:9px; margin-top:3px; }.device-icon { width:27px; height:27px; display:grid; place-items:center; background:#1d2945; border-radius:7px; color:#78a6ff; }.mono { font-family:ui-monospace,SFMono-Regular,Consolas,monospace; }.last-seen { color:#39d991!important; }.arrow { color:#60708f!important; font-size:18px!important; }.add-row { margin-top:12px; }.add-row ha-select { width:100%; }.empty { color:#687691; font-size:12px; font-style:italic; padding:12px 0; }.policy-banner { display:flex; align-items:center; gap:14px; min-height:72px; padding:12px 14px; background:#10182d; border:1px solid #293452; border-radius:9px; }.policy-icon { width:38px; height:38px; border-radius:10px; background:#34285c; color:#c5a6ff; display:grid; place-items:center; font-size:20px; }.policy-main { flex:1; }.policy-main strong { display:block; }.policy-main span { display:block; color:#73809b; font-size:11px; margin-top:4px; }.policy-meta { display:flex; gap:28px; color:#7b87a0; font-size:10px; }.policy-meta strong { color:#d8deed; font-size:11px; }.exception { display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid #202942; font-size:12px; }.inline-add { margin-top:9px; }.field { background:#10172a; border:1px solid #2b3550; color:#e9edf8; border-radius:7px; padding:8px 9px; font:inherit; box-sizing:border-box; outline:none; }.field:focus { border-color:#4e86ff; }.inline-add .field { width:100%; }
    .query-panel { position:sticky; top:12px; overflow:hidden; }.query-head { display:flex; justify-content:space-between; gap:12px; padding:16px; border-bottom:1px solid #29324a; }.query-head h2 { margin:0; font-size:15px; }.query-head h2 span { color:#75829b; font-weight:500; }.query-head small { display:block; color:#66738e; font-size:10px; margin-top:5px; }.live-controls { display:flex; align-items:flex-start; gap:7px; }.live-dot { color:#71809d; font-size:10px; padding-top:5px; }.live-dot.on { color:#38dc91; }.filters { display:grid; grid-template-columns:1fr 1fr; gap:7px; padding:10px; border-bottom:1px solid #29324a; }.filters .search { grid-column:1 / -1; }.filters .icon-btn { position:absolute; margin-left:448px; margin-top:1px; }.query-table-wrap { max-height:620px; overflow:auto; }.query-table { min-width:620px; }.query-table th { position:sticky; top:0; background:#151c31; z-index:1; }.query-table td { white-space:nowrap; }.query-table .time { color:#7f8ca7; font-variant-numeric:tabular-nums; }.query-table .response { max-width:120px; overflow:hidden; text-overflow:ellipsis; }.domain-cell { display:flex; align-items:center; gap:6px; }.svc-icon { display:inline-flex; align-items:center; flex-shrink:0; }.svc-icon svg { display:block; }.query-error { margin:8px 10px 0; padding:8px; border-radius:7px; background:#3a1e2a; color:#ff8c9c; font-size:11px; }.query-foot { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-top:1px solid #29324a; color:#7c88a0; font-size:10px; }.query-foot > span { display:flex; align-items:center; gap:7px; }.switch { width:30px; height:17px; padding:2px; border:0; border-radius:10px; background:#35405a; cursor:pointer; }.switch i { display:block; width:13px; height:13px; border-radius:50%; background:#a1aac0; transition:.15s; }.switch.on { background:#20c981; }.switch.on i { transform:translateX(13px); background:#fff; }
    .modal-scrim { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:999; }
    .modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:1000; background:var(--agpc-card-bg,#151c31); border:1px solid var(--agpc-border,#27304a); border-radius:12px; padding:20px; min-width:320px; max-width:420px; box-shadow:0 8px 32px rgba(0,0,0,0.4); }
    .modal-head h3 { margin:0 0 12px; font-size:16px; color:var(--agpc-text,#eef2ff); }
    .modal-body p { margin:0 0 16px; color:var(--agpc-text-faint,#7e8aa4); font-size:13px; }
    .modal-actions { display:flex; gap:8px; justify-content:flex-end; }
    .modal-list-item { display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-bottom:1px solid var(--agpc-border,#27304a); cursor:pointer; border-radius:6px; }
    .modal-list-item:hover { background:var(--agpc-sidebar-hover,#1b253e); }
    .modal-list-item:last-child { border-bottom:none; }
    .btn-danger { background:#b94650; color:#fff; border-color:#b94650; }
    .btn-danger:hover { opacity:0.9; }
    .timeline-card { margin-top:12px; padding:16px; }.legend { display:flex; gap:10px; align-items:center; color:#78859e; font-size:10px; }.legend i { width:8px; height:8px; border-radius:2px; display:inline-block; }.allowed-dot { background:#25c987; }.blocked-dot { background:#cf4b55; }.unknown-dot { background:#59637a; }.timeline-row { display:grid; grid-template-columns:150px 1fr; gap:14px; align-items:center; margin:16px 0; }.timeline-label strong { display:block; font-size:11px; }.timeline-label small { color:#65728e; font-size:9px; }.timeline { position:relative; padding-top:18px; }.bar { height:10px; border-radius:5px; background:#283047; overflow:hidden; position:relative; }.seg.allowed { position:absolute; left:0; width:58%; height:100%; background:#20b77c; }.seg.blocked { position:absolute; left:58%; width:31%; height:100%; background:#b94650; }.now { position:absolute; left:73%; top:-5px; width:2px; height:20px; background:#f3c73f; }.tick { position:absolute; top:0; color:#56627b; font-size:8px; transform:translateX(-50%); }.t0{left:0}.t4{left:16.67%}.t8{left:33.33%}.t12{left:50%}.t16{left:66.67%}.t20{left:83.33%}.t24{right:0;transform:none}
    .pill { display:inline-flex; align-items:center; padding:3px 8px; border-radius:6px; font-size:9px; font-weight:800; letter-spacing:.04em; }.pill.green { background:#103c31; color:#34db95; }.pill.red { background:#441d28; color:#ff6875; }.pill.yellow-pill { background:#45381b; color:#f0bd35; }.pill.purple { background:#32294e; color:#bd9bff; }.btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; border:1px solid #2e3853; background:#151e34; color:#d8dff0; border-radius:7px; padding:8px 11px; font:600 11px inherit; cursor:pointer; }.btn:hover { background:#1b2741; }.btn.small { padding:6px 9px; font-size:10px; }.icon-btn { width:31px; height:31px; display:grid; place-items:center; border:1px solid transparent; border-radius:7px; background:transparent; color:#8390aa; cursor:pointer; }.icon-btn:hover { background:#1b253e; color:#eaf0ff; border-color:#2d3853; }
    @media (max-width:1250px) { .layout { grid-template-columns:1fr; }.query-panel { position:relative; top:auto; }.query-table-wrap { max-height:460px; } }
    @media (max-width:760px) { .page{padding:0 8px 20px}.grid-3,.grid-2{grid-template-columns:1fr}.hero{align-items:flex-start}.hero-actions{margin-left:auto}.hero-meta{gap:10px}.timeline-row{grid-template-columns:1fr}.query-table-wrap{overflow-x:auto}.query-panel{width:100%} }
  `;w([g({attribute:!1})],y.prototype,"hass",2);w([g({attribute:!1})],y.prototype,"state",2);w([g({attribute:!1})],y.prototype,"member",2);w([g({type:Boolean})],y.prototype,"narrow",2);w([g({type:Object})],y.prototype,"onNavigate",2);w([g({type:Object})],y.prototype,"onStateChanged",2);w([d()],y.prototype,"_newException",2);w([d()],y.prototype,"_showDeleteConfirm",2);w([d()],y.prototype,"_showAddClient",2);w([d()],y.prototype,"_queryLogs",2);w([d()],y.prototype,"_queryLoading",2);w([d()],y.prototype,"_queryLive",2);w([d()],y.prototype,"_querySearch",2);w([d()],y.prototype,"_queryType",2);w([d()],y.prototype,"_queryClient",2);w([d()],y.prototype,"_queryError",2);w([d()],y.prototype,"_queryOldest",2);w([d()],y.prototype,"_queryFullyLoaded",2);y=w([L("member-view")],y);var qt=Object.defineProperty,Ot=Object.getOwnPropertyDescriptor,R=(t,e,i,s)=>{for(var a=s>1?void 0:s?Ot(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&qt(e,i,a),a};let S=class extends ${constructor(){super(...arguments),this.narrow=!1,this._showAddRule=!1,this._newRuleTarget="",this._newRuleAction="block",this._newRuleType="domain",this._showDeleteConfirm=!1}render(){return this.profile?r`
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
            <button class="btn btn-sm" @click=${this._toggleDefault}>Toggle Default</button>
          </div>
        </div>
      </ha-card>

      ${this._showDeleteConfirm?r`
        <div class="modal-scrim" @click=${()=>this._showDeleteConfirm=!1}></div>
        <div class="modal">
          <div class="modal-head"><h3>Delete profile "${this.profile.name}"?</h3></div>
          <div class="modal-body"><p>Policies using this profile will lose their template.</p></div>
          <div class="modal-actions">
            <button class="btn" @click=${()=>this._showDeleteConfirm=!1}>Cancel</button>
            <button class="btn btn-danger" @click=${this._deleteProfile}>Delete</button>
          </div>
        </div>
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
          ${this._showAddRule?r`
            <div class="add-form">
              <ha-textfield label="Target (domain)" .value=${this._newRuleTarget}
                @input=${t=>{this._newRuleTarget=t.target.value}}
              ></ha-textfield>
              <ha-select label="Action" .value=${this._newRuleAction}
                @change=${t=>{this._newRuleAction=t.target.value}}
              >
                <ha-list-item value="block">Block</ha-list-item>
                <ha-list-item value="allow">Allow</ha-list-item>
              </ha-select>
              <ha-select label="Type" .value=${this._newRuleType}
                @change=${t=>{this._newRuleType=t.target.value}}
              >
                <ha-list-item value="domain">Domain</ha-list-item>
                <ha-list-item value="service">Service</ha-list-item>
                <ha-list-item value="category">Category</ha-list-item>
              </ha-select>
              <button class="btn" @click=${this._addRule} ?disabled=${!this._newRuleTarget.trim()}>Add</button>
            </div>
          `:""}
          ${this.profile.rules.length===0?r`<p class="empty">No rules defined</p>`:r`
                <table class="data-table">
                  <thead><tr><th>Type</th><th>Target</th><th>Action</th><th></th></tr></thead>
                  <tbody>
                    ${this.profile.rules.map((t,e)=>r`
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
    `:r``}_handleDeleteDialog(){this._showDeleteConfirm=!1}async _toggleDefault(){var i;const t=this.profile.default_action==="block"?"allow":"block",e={...this.profile,default_action:t};await this.hass.callWS({type:"adguard_pc/profiles/update",profile:e}),this.profile=e,(i=this.onStateChanged)==null||i.call(this)}async _addRule(){var i;if(!this._newRuleTarget.trim())return;const t={target:this._newRuleTarget.trim(),action:this._newRuleAction,rule_type:this._newRuleType},e={...this.profile,rules:[...this.profile.rules,t]};await this.hass.callWS({type:"adguard_pc/profiles/update",profile:e}),this.profile=e,this._newRuleTarget="",this._showAddRule=!1,(i=this.onStateChanged)==null||i.call(this)}async _removeRule(t){var s;const e=this.profile.rules.filter((a,n)=>n!==t),i={...this.profile,rules:e};await this.hass.callWS({type:"adguard_pc/profiles/update",profile:i}),this.profile=i,(s=this.onStateChanged)==null||s.call(this)}async _deleteProfile(){var t,e;await this.hass.callWS({type:"adguard_pc/profiles/delete",profile_id:this.profile.id}),this._showDeleteConfirm=!1,(t=this.onStateChanged)==null||t.call(this),(e=this.onNavigate)==null||e.call(this,"dashboard")}};S.styles=C`
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
    .modal-scrim { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:999; }
    .modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:1000; background:var(--card-background-color,#1e1e1e); border:1px solid var(--divider-color,#333); border-radius:12px; padding:20px; min-width:320px; max-width:420px; box-shadow:0 8px 32px rgba(0,0,0,0.4); }
    .modal-head h3 { margin:0 0 12px; font-size:16px; }
    .modal-body p { margin:0 0 16px; color:var(--secondary-text-color,#999); font-size:13px; }
    .modal-actions { display:flex; gap:8px; justify-content:flex-end; }
    .btn { display:inline-flex; align-items:center; padding:8px 16px; border-radius:8px; border:1px solid var(--divider-color,#333); background:var(--card-background-color,#2a2a2a); color:var(--primary-text-color,#eee); cursor:pointer; font-size:13px; }
    .btn:hover { background:var(--secondary-background-color,#333); }
    .btn:disabled { opacity:0.4; cursor:default; }
    .btn-danger { background:var(--error-color,#f44336); color:#fff; border-color:var(--error-color,#f44336); }
    .btn-danger:hover { opacity:0.9; }
    .btn-sm { padding:5px 12px; font-size:12px; }
  `;R([g({attribute:!1})],S.prototype,"hass",2);R([g({attribute:!1})],S.prototype,"state",2);R([g({attribute:!1})],S.prototype,"profile",2);R([g({type:Boolean})],S.prototype,"narrow",2);R([g({type:Object})],S.prototype,"onNavigate",2);R([g({type:Object})],S.prototype,"onStateChanged",2);R([d()],S.prototype,"_showAddRule",2);R([d()],S.prototype,"_newRuleTarget",2);R([d()],S.prototype,"_newRuleAction",2);R([d()],S.prototype,"_newRuleType",2);R([d()],S.prototype,"_showDeleteConfirm",2);S=R([L("profile-view")],S);var Ht=Object.defineProperty,It=Object.getOwnPropertyDescriptor,q=(t,e,i,s)=>{for(var a=s>1?void 0:s?It(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Ht(e,i,a),a};let z=class extends ${constructor(){super(...arguments),this.kind="clients",this._showAdd=!1,this._newName="",this._newSecondary="",this._deleteTarget=null}_icon(t,e=15){return N`<svg viewBox="0 0 24 24" width="${e}" height="${e}"><path fill="currentColor" d="${t}"></path></svg>`}get _config(){switch(this.kind){case"groups":return{title:"Groups",icon:h.groups,columns:["Name","Members","Clients","Policies"],items:this.state.groups,nameField:"name",rowValues:t=>[t.member_names.length,t.client_names.length,t.assigned_policy_ids.length],detailView:"group-detail",secondaryLabel:null};case"members":return{title:"Members",icon:h.members,columns:["Name","Clients","Policies","Exceptions"],items:this.state.members,nameField:"name",rowValues:t=>[t.client_names.length,t.assigned_policy_ids.length,t.exceptions.length],detailView:"member-detail",secondaryLabel:null};case"clients":return{title:"Clients",icon:h.clients,columns:["Name","IDs","Policies","Status"],items:this.state.clients,nameField:"name",rowValues:t=>[t.ids.length?t.ids.join(", "):"—",t.assigned_policy_ids.length,t.assigned_policy_ids.length?"Restricted":"Unrestricted"],detailView:"client-detail",secondaryLabel:"IP / ID (optional)"};case"policies":return{title:"Policies",icon:h.policies,columns:["Name","Priority","Rules","Profile"],items:this.state.policies,nameField:"name",rowValues:t=>[t.priority,t.rules.length,this._profileName(t.profile_id)],detailView:"policy-detail",secondaryLabel:null};case"profiles":default:return{title:"Profiles",icon:h.profiles,columns:["Name","Rules","Default Action"],items:this.state.profiles,nameField:"name",rowValues:t=>[t.rules.length,t.default_action],detailView:"profile-detail",secondaryLabel:null}}}_profileName(t){var e;return t?((e=this.state.profiles.find(i=>i.id===t))==null?void 0:e.name)||t:"None"}render(){if(!this.state)return r``;const t=this._config;return r`
      <div class="card">
        <div class="card-head">
          <div class="head-left">
            <div class="head-icon">${this._icon(t.icon,18)}</div>
            <h2>${t.title} <span class="count">(${t.items.length})</span></h2>
          </div>
          <button class="btn primary" @click=${()=>{this._showAdd=!0}}>
            ${this._icon(h.plus,14)} Add ${t.title.slice(0,-1)}
          </button>
        </div>

        ${t.items.length===0?r`<div class="empty-state">No ${t.title.toLowerCase()} configured yet.</div>`:this.kind==="policies"?this._renderPolicyList(t):this._renderTable(t)}
      </div>

      ${this._showAdd?r`
        <div class="modal-scrim" @click=${()=>{this._showAdd=!1,this._newName="",this._newSecondary=""}}>
          <div class="modal" @click=${e=>e.stopPropagation()}>
            <div class="modal-title">Add ${t.title.slice(0,-1)}</div>
            <div class="modal-fields">
              <input class="field" placeholder="${t.title.slice(0,-1)} name" .value=${this._newName}
                @input=${e=>{this._newName=e.target.value}}
                @keydown=${e=>{e.key==="Enter"&&this._create()}}
                autofocus
              />
              ${t.secondaryLabel?r`<input class="field" placeholder="${t.secondaryLabel}" .value=${this._newSecondary}
                    @input=${e=>{this._newSecondary=e.target.value}}
                    @keydown=${e=>{e.key==="Enter"&&this._create()}}
                  />`:u}
            </div>
            <div class="modal-actions">
              <button class="btn" @click=${()=>{this._showAdd=!1,this._newName="",this._newSecondary=""}}>Cancel</button>
              <button class="btn primary" .disabled=${!this._newName.trim()} @click=${this._create}>Create</button>
            </div>
          </div>
        </div>
      `:u}

      ${this._deleteTarget?r`
        <div class="confirm-scrim" @click=${()=>{this._deleteTarget=null}}>
          <div class="confirm-box" @click=${e=>e.stopPropagation()}>
            <h3>Delete "${this._deleteTarget.name}"?</h3>
            <p>This action cannot be undone. All associated data will be removed.</p>
            <div class="confirm-actions">
              <button class="btn" @click=${()=>{this._deleteTarget=null}}>Cancel</button>
              <button class="btn-danger" @click=${this._deleteItem}>Delete</button>
            </div>
          </div>
        </div>
      `:u}
    `}_renderTable(t){return r`
      <table class="table">
        <thead>
          <tr>
            ${t.columns.map(e=>r`<th>${e}</th>`)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${t.items.map(e=>{const i=t.rowValues(e);return r`
              <tr class="clickable" @click=${()=>{var s;return(s=this.onNavigate)==null?void 0:s.call(this,t.detailView,e)}}>
                <td class="name-cell">${e[t.nameField]}</td>
                ${i.map(s=>r`<td>${s}</td>`)}
                <td class="menu-cell">
                  <span class="icon-btn">${this._icon(h.chevronRight,15)}</span>
                </td>
              </tr>
            `})}
        </tbody>
      </table>
    `}_renderPolicyList(t){return r`
      <div class="policy-list">
        ${t.items.map(e=>{var n;const i=this._profileName(e.profile_id),s=e.enabled!==!1,a=e.description||"";return r`
            <div class="policy-card clickable" @click=${()=>{var o;return(o=this.onNavigate)==null?void 0:o.call(this,"policy-detail",e)}}>
              <div class="policy-card-main">
                <div class="policy-card-top">
                  <span class="policy-card-name">${e.name||"Untitled"}</span>
                  <label class="toggle-line" @click=${o=>o.stopPropagation()}>
                    <input type="checkbox" ?checked=${s}
                      @change=${o=>this._togglePolicyEnabled(e,o.target.checked)} />
                    <span class="toggle-label">${s?"On":"Off"}</span>
                  </label>
                </div>
                ${a?r`<div class="policy-card-desc">${a.length>100?a.slice(0,100)+"…":a}</div>`:""}
                <div class="policy-card-meta">
                  <span class="meta-pill">Priority ${e.priority}</span>
                  <span class="meta-pill">${e.rules.length} rule${e.rules.length===1?"":"s"}</span>
                  ${(n=e.exceptions)!=null&&n.length?r`<span class="meta-pill">${e.exceptions.length} exception${e.exceptions.length===1?"":"s"}</span>`:""}
                  <span class="meta-pill">${i}</span>
                </div>
              </div>
              <div class="policy-card-arrow">${this._icon(h.chevronRight,15)}</div>
            </div>
          `})}
      </div>
    `}async _togglePolicyEnabled(t,e){var i;try{await this.hass.callWS({type:"adguard_pc/policies/update",policy:{...t,enabled:e}}),(i=this.onStateChanged)==null||i.call(this)}catch(s){console.error("Failed to toggle policy:",s)}}async _create(){var s;if(!this._newName.trim())return;const t=this._newName.trim(),e=this._newSecondary.trim();let i=null;switch(this.kind){case"groups":i={type:"adguard_pc/groups/create",group:{name:t,member_names:[],client_names:[],assigned_policy_ids:[]}};break;case"members":i={type:"adguard_pc/members/create",member:{name:t,client_names:[],assigned_policy_ids:[],exceptions:[]}};break;case"clients":i={type:"adguard_pc/clients/create",client:{name:t,ids:e?[e]:[],assigned_policy_ids:[],exceptions:[]}};break;case"policies":i={type:"adguard_pc/policies/create",policy:{name:t,rules:[],priority:0}};break;case"profiles":i={type:"adguard_pc/profiles/create",profile:{name:t,rules:[],default_action:"block"}};break}if(i)try{await this.hass.callWS(i)}catch(a){console.error("Create failed:",a)}this._newName="",this._newSecondary="",this._showAdd=!1,(s=this.onStateChanged)==null||s.call(this)}async _deleteItem(){var e;if(!this._deleteTarget)return;const t=this._deleteTarget;this._deleteTarget=null;try{const i=this.kind,a={policies:{type:"adguard_pc/policies/delete",key:"policy_id"},groups:{type:"adguard_pc/groups/delete",key:"group_id"},members:{type:"adguard_pc/members/delete",key:"member_id"},clients:{type:"adguard_pc/clients/delete",key:"client_id"},profiles:{type:"adguard_pc/profiles/delete",key:"profile_id"}}[i];a&&await this.hass.callWS({type:a.type,[a.key]:t.id}),(e=this.onStateChanged)==null||e.call(this)}catch(i){console.error("Delete failed:",i)}}};z.styles=[J,C`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }
      .card { padding: 18px 20px 10px; }
      .card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 10px; flex-wrap: wrap; }
      .head-left { display: flex; align-items: center; gap: 10px; }
      .head-icon { width: 34px; height: 34px; border-radius: 9px; background: var(--agpc-blue-soft); color: var(--agpc-blue); display: flex; align-items: center; justify-content: center; }
      .card-head h2 { font-size: 16px; font-weight: 700; margin: 0; color: var(--agpc-text); }
      .count { color: var(--agpc-text-faint); font-weight: 500; }
      .name-cell { font-weight: 600; color: var(--agpc-text); }
      .menu-cell { text-align: right; color: var(--agpc-text-faint); }

      .policy-list { display: flex; flex-direction: column; gap: 8px; }
      .policy-card {
        display: flex; align-items: center; gap: 12px;
        background: var(--agpc-card-bg-alt); border: 1px solid var(--agpc-border);
        border-radius: var(--agpc-radius-md, 10px); padding: 14px 16px;
        cursor: pointer; transition: border-color .15s, background .15s;
      }
      .policy-card:hover { border-color: var(--agpc-blue); background: rgba(22,119,255,.06); }
      .policy-card-main { flex: 1; min-width: 0; }
      .policy-card-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
      .policy-card-name { font-weight: 650; font-size: 14px; color: var(--agpc-text); }
      .policy-card-desc { color: var(--agpc-text-faint); font-size: 12px; margin-top: 4px; line-height: 1.4; }
      .policy-card-meta { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
      .meta-pill {
        display: inline-block; font-size: 11px; padding: 2px 8px; border-radius: 999px;
        background: rgba(255,255,255,.06); color: var(--agpc-text-faint); font-weight: 500;
      }
      .policy-card-arrow { color: var(--agpc-text-faint); flex-shrink: 0; }
      .policy-card-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
      .switch-toggle { position: relative; display: inline-block; width: 36px; height: 20px; cursor: pointer; }
      .switch-toggle input { opacity: 0; width: 0; height: 0; }
      .switch-slider {
        position: absolute; inset: 0; background: #3a4560; border-radius: 20px; transition: background .2s;
      }
      .switch-slider::before {
        content: ""; position: absolute; left: 2px; top: 2px; width: 16px; height: 16px;
        border-radius: 50%; background: #a0aac0; transition: transform .2s, background .2s;
      }
      .switch-toggle input:checked + .switch-slider { background: var(--agpc-green, #20c879); }
      .switch-toggle input:checked + .switch-slider::before { transform: translateX(16px); background: #fff; }
      .btn-delete-sm {
        padding: 4px 10px; font-size: 11px; font-weight: 600;
        background: #451d24; color: #ff6875; border: 1px solid #6b2832;
        border-radius: 6px; cursor: pointer; transition: background .15s;
      }
      .btn-delete-sm:hover { background: #5c2430; }

      .modal-scrim {
        position: fixed; inset: 0; background: rgba(0, 0, 0, 0.55);
        display: flex; align-items: center; justify-content: center; z-index: 50;
      }
      .modal {
        background: var(--agpc-card-bg); border: 1px solid var(--agpc-border);
        border-radius: var(--agpc-radius-lg); padding: 24px; width: 380px; max-width: 90vw;
      }
      .modal-title { font-size: 17px; font-weight: 700; color: var(--agpc-text); margin-bottom: 16px; }
      .modal-fields { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
      .modal-fields .field {
        width: 100%; box-sizing: border-box;
        background: var(--agpc-card-bg-alt); border: 1px solid var(--agpc-border);
        border-radius: var(--agpc-radius-sm); color: var(--agpc-text);
        padding: 10px 12px; font-size: 13px; font-family: inherit; outline: none;
      }
      .modal-fields .field:focus { border-color: var(--agpc-blue); }
      .modal-fields .field::placeholder { color: var(--agpc-text-faint); }
      .modal-actions { display: flex; justify-content: flex-end; gap: 8px; }

      .confirm-scrim {
        position: fixed; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; z-index: 60;
      }
      .confirm-box {
        background: var(--agpc-card-bg); border: 1px solid var(--agpc-border); border-radius: var(--agpc-radius-lg);
        padding: 24px; width: 360px; max-width: 90vw; text-align: left;
      }
      .confirm-box h3 { margin: 0 0 8px; font-size: 16px; color: var(--agpc-text); }
      .confirm-box p { margin: 0 0 18px; font-size: 13px; color: var(--agpc-text-faint); }
      .confirm-actions { display: flex; justify-content: flex-end; gap: 8px; }
      .btn-danger {
        background: #b94650; color: #fff; border: 1px solid #b94650; border-radius: 7px;
        padding: 8px 14px; font: 600 11px inherit; cursor: pointer;
      }
      .btn-danger:hover { background: #a03c45; }
    `];q([g({attribute:!1})],z.prototype,"hass",2);q([g({attribute:!1})],z.prototype,"state",2);q([g({type:String})],z.prototype,"kind",2);q([g({type:Object})],z.prototype,"onNavigate",2);q([g({type:Object})],z.prototype,"onStateChanged",2);q([d()],z.prototype,"_showAdd",2);q([d()],z.prototype,"_newName",2);q([d()],z.prototype,"_newSecondary",2);q([d()],z.prototype,"_deleteTarget",2);z=q([L("list-view")],z);var jt=Object.defineProperty,Ft=Object.getOwnPropertyDescriptor,ye=(t,e,i,s)=>{for(var a=s>1?void 0:s?Ft(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&jt(e,i,a),a};let ae=class extends ${constructor(){super(...arguments),this.title="Coming soon",this.description="This section isn't available yet.",this.icon=""}_icon(t){return N`<svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="${t}"></path></svg>`}render(){return r`
      <div class="card empty-card">
        ${this.icon?r`<div class="empty-icon">${this._icon(this.icon)}</div>`:""}
        <div class="empty-title">${this.title}</div>
        <div class="empty-desc">${this.description}</div>
      </div>
    `}};ae.styles=[J,C`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }
      .empty-card {
        padding: 60px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 10px;
      }
      .empty-icon {
        width: 60px; height: 60px; border-radius: 16px;
        background: var(--agpc-blue-soft); color: var(--agpc-blue);
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 6px;
      }
      .empty-title { font-size: 17px; font-weight: 700; color: var(--agpc-text); }
      .empty-desc { font-size: 13px; color: var(--agpc-text-dim); max-width: 360px; }
    `];ye([g({type:String})],ae.prototype,"title",2);ye([g({type:String})],ae.prototype,"description",2);ye([g({type:String})],ae.prototype,"icon",2);ae=ye([L("placeholder-view")],ae);var Wt=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,oe=(t,e,i,s)=>{for(var a=s>1?void 0:s?Bt(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Wt(e,i,a),a};const Ut=[{id:"dashboard",label:"Dashboard",icon:h.dashboard},{id:"groups",label:"Groups",icon:h.groups},{id:"members",label:"Members",icon:h.members},{id:"clients",label:"Clients",icon:h.clients},{id:"policies",label:"Policies",icon:h.policies},{id:"profiles",label:"Profiles",icon:h.profiles},{id:"schedules",label:"Schedules",icon:h.schedules},{id:"services",label:"Services",icon:h.services},{id:"override",label:"Overrides",icon:h.overrides},{id:"logs",label:"Logs",icon:h.logs},{id:"settings",label:"Settings",icon:h.settings}],Gt={dashboard:"dashboard",groups:"groups","group-detail":"groups",members:"members","member-detail":"members",clients:"clients","client-detail":"clients",policies:"policies","policy-detail":"policies",profiles:"profiles","profile-detail":"profiles",schedules:"schedules",services:"services",override:"override",logs:"logs",settings:"settings"};let B=class extends ${constructor(){super(...arguments),this.activeView="dashboard",this.state=null,this.protectionEnabled=!0}_icon(t){return N`<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="${t}"></path></svg>`}_badgeFor(t){if(this.state)switch(t){case"groups":return this.state.groups.length||void 0;case"members":return this.state.members.length||void 0;case"clients":return this.state.clients.length||void 0;case"policies":return this.state.policies.length||void 0;case"profiles":return this.state.profiles.length||void 0;case"override":return this.state.overrides.length||void 0;default:return}}render(){const t=Gt[this.activeView]||"dashboard";return r`
      <div class="brand">
        <div class="brand-icon">${this._icon(h.shield)}</div>
        <div class="brand-text">
          <div class="brand-title">AdGuard</div>
          <div class="brand-sub">Parental Control</div>
        </div>
      </div>

      <nav class="nav">
        ${Ut.map(e=>{const i=this._badgeFor(e.id),s=e.id===t;return r`
            <button
              class="nav-item ${s?"active":""}"
              @click=${()=>{var a;return(a=this.onNavigate)==null?void 0:a.call(this,e.id)}}
            >
              <span class="nav-icon">${this._icon(e.icon)}</span>
              <span class="nav-label">${e.label}</span>
              ${i!==void 0?r`<span class="nav-badge">${i}</span>`:""}
            </button>
          `})}
      </nav>

      <div class="sidebar-footer">
        <button class="protection-row" @click=${()=>{var e;return(e=this.onToggleProtection)==null?void 0:e.call(this)}}>
          <div class="protection-text">
            <span class="protection-label">Protection</span>
            <span class="protection-state ${this.protectionEnabled?"on":"off"}">
              ${this.protectionEnabled?"ENABLED":"DISABLED"}
            </span>
          </div>
          <div class="switch ${this.protectionEnabled?"on":""}">
            <div class="knob"></div>
          </div>
        </button>
        <div class="home-status">
          <span class="dot"></span>
          <span>AdGuard Home</span>
        </div>
        <div class="home-status sub">Connected</div>
      </div>
    `}};B.styles=C`
    :host {
      display: flex;
      flex-direction: column;
      width: 240px;
      min-width: 240px;
      height: 100%;
      background: var(--agpc-sidebar-bg, #0d1220);
      border-right: 1px solid var(--agpc-border, #232a41);
      box-sizing: border-box;
      padding: 18px 14px;
      gap: 8px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 4px 8px 18px;
      margin-bottom: 6px;
      border-bottom: 1px solid var(--agpc-border, #232a41);
    }
    .brand-icon {
      width: 34px;
      height: 34px;
      border-radius: 9px;
      background: var(--agpc-green-soft, rgba(46,204,113,0.14));
      color: var(--agpc-green, #2ecc71);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .brand-title { font-size: 14.5px; font-weight: 700; color: var(--agpc-text, #e9ecf5); line-height: 1.2; }
    .brand-sub { font-size: 11px; color: var(--agpc-text-dim, #8a92ab); }

    .nav {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      overflow-y: auto;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      box-sizing: border-box;
      border: none;
      background: transparent;
      color: var(--agpc-text-dim, #8a92ab);
      padding: 9px 10px;
      border-radius: var(--agpc-radius-sm, 8px);
      font-size: 13.5px;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      text-align: left;
    }
    .nav-item:hover { background: rgba(255,255,255,0.04); color: var(--agpc-text, #e9ecf5); }
    .nav-item.active {
      background: var(--agpc-blue-soft, rgba(79,140,255,0.14));
      color: var(--agpc-blue, #4f8cff);
    }
    .nav-icon { display: flex; flex-shrink: 0; }
    .nav-label { flex: 1; }
    .nav-badge {
      font-size: 11px;
      font-weight: 700;
      color: var(--agpc-text-faint, #5c6480);
      background: rgba(255,255,255,0.06);
      border-radius: 999px;
      padding: 1px 7px;
    }
    .nav-item.active .nav-badge { color: var(--agpc-blue, #4f8cff); background: rgba(79,140,255,0.18); }

    .sidebar-footer {
      border-top: 1px solid var(--agpc-border, #232a41);
      padding-top: 12px;
      margin-top: 6px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .protection-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      box-sizing: border-box;
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 6px 4px;
      font-family: inherit;
    }
    .protection-text { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }
    .protection-label { font-size: 12px; color: var(--agpc-text-dim, #8a92ab); }
    .protection-state { font-size: 12.5px; font-weight: 700; letter-spacing: 0.03em; }
    .protection-state.on { color: var(--agpc-green, #2ecc71); }
    .protection-state.off { color: var(--agpc-text-faint, #5c6480); }
    .switch {
      width: 34px;
      height: 20px;
      border-radius: 999px;
      background: rgba(255,255,255,0.1);
      position: relative;
      transition: background 0.15s ease;
      flex-shrink: 0;
    }
    .switch.on { background: var(--agpc-green, #2ecc71); }
    .knob {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      transition: left 0.15s ease;
    }
    .switch.on .knob { left: 16px; }
    .home-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      color: var(--agpc-text-dim, #8a92ab);
      padding: 0 4px;
    }
    .home-status.sub { color: var(--agpc-text-faint, #5c6480); padding-left: 16px; font-size: 11px; }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--agpc-green, #2ecc71); }
  `;oe([g({type:String})],B.prototype,"activeView",2);oe([g({attribute:!1})],B.prototype,"state",2);oe([g({type:Boolean})],B.prototype,"protectionEnabled",2);oe([g({type:Object})],B.prototype,"onNavigate",2);oe([g({type:Object})],B.prototype,"onToggleProtection",2);B=oe([L("agpc-sidebar")],B);var Zt=Object.defineProperty,Qt=Object.getOwnPropertyDescriptor,ee=(t,e,i,s)=>{for(var a=s>1?void 0:s?Qt(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Zt(e,i,a),a};let I=class extends ${constructor(){super(...arguments),this.title="Dashboard",this.showBack=!1,this.lastSync=null,this.syncing=!1}_icon(t,e=18){return N`<svg viewBox="0 0 24 24" width="${e}" height="${e}"><path fill="currentColor" d="${t}"></path></svg>`}render(){return r`
      <div class="left">
        ${this.showBack?r`
              <button class="icon-btn" @click=${()=>{var t;return(t=this.onBack)==null?void 0:t.call(this)}} aria-label="Back">
                ${this._icon(h.back)}
              </button>
            `:u}
        <h1>${this.title}</h1>
      </div>
      <div class="right">
        ${this.lastSync?r`<span class="sync-label">Last sync: ${this.lastSync}</span>`:u}
        <button class="icon-btn ${this.syncing?"spinning":""}" @click=${()=>{var t;return(t=this.onRefresh)==null?void 0:t.call(this)}} aria-label="Refresh">
          ${this._icon(h.sync)}
        </button>
        <button class="icon-btn" aria-label="Toggle theme">${this._icon(h.moon)}</button>
        <button class="icon-btn" aria-label="More">${this._icon(h.dots)}</button>
      </div>
    `}};I.styles=C`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 28px;
      border-bottom: 1px solid var(--agpc-border, #232a41);
      box-sizing: border-box;
    }
    .left { display: flex; align-items: center; gap: 10px; }
    h1 { font-size: 19px; font-weight: 700; color: var(--agpc-text, #e9ecf5); margin: 0; }
    .right { display: flex; align-items: center; gap: 6px; }
    .sync-label { font-size: 12px; color: var(--agpc-text-faint, #5c6480); margin-right: 6px; }
    .icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: var(--agpc-text-dim, #8a92ab);
      cursor: pointer;
    }
    .icon-btn:hover { background: rgba(255,255,255,0.06); color: var(--agpc-text, #e9ecf5); }
    .icon-btn.spinning svg { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `;ee([g({type:String})],I.prototype,"title",2);ee([g({type:Boolean})],I.prototype,"showBack",2);ee([g({type:String})],I.prototype,"lastSync",2);ee([g({type:Boolean})],I.prototype,"syncing",2);ee([g({type:Object})],I.prototype,"onBack",2);ee([g({type:Object})],I.prototype,"onRefresh",2);I=ee([L("agpc-topbar")],I);var Yt=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,ue=(t,e,i,s)=>{for(var a=s>1?void 0:s?Kt(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&Yt(e,i,a),a};const Xt={mon:"Mon",tue:"Tue",wed:"Wed",thu:"Thu",fri:"Fri",sat:"Sat",sun:"Sun"};let X=class extends ${_icon(t,e=16){return N`<svg viewBox="0 0 24 24" width="${e}" height="${e}"><path fill="currentColor" d="${t}"></path></svg>`}_scheduleRows(){return this.state.policies.filter(t=>t.time_schedule).map(t=>({policyId:t.id,policyName:t.name,priority:t.priority,days:t.time_schedule.days,timeFrom:t.time_schedule.time_from,timeTo:t.time_schedule.time_to,rulesCount:t.rules.length})).sort((t,e)=>e.priority-t.priority)}_unscheduledPolicies(){return this.state.policies.filter(t=>!t.time_schedule)}render(){if(!this.state)return r``;const t=this._scheduleRows(),e=this._unscheduledPolicies();return r`
      <div class="card">
        <div class="card-head">
          <div class="head-left">
            <div class="head-icon">${this._icon(h.schedules,18)}</div>
            <h2>Schedules <span class="count">(${t.length})</span></h2>
          </div>
          <button class="btn" @click=${()=>{var i;return(i=this.onNavigate)==null?void 0:i.call(this,"policies")}}>
            ${this._icon(h.policies,14)} Manage Policies
          </button>
        </div>

        ${t.length===0?r`<div class="empty-state">No schedules configured yet. Add a time schedule to a policy to see it here.</div>`:r`
              <table class="table">
                <thead>
                  <tr>
                    <th>Policy</th>
                    <th>Days</th>
                    <th>Time</th>
                    <th>Rules</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${t.map(i=>r`
                    <tr class="clickable" @click=${()=>{var a;const s=this.state.policies.find(n=>n.id===i.policyId);s&&((a=this.onNavigate)==null||a.call(this,"policy-detail",s))}}>
                      <td class="name-cell">
                        <div class="policy-name">${i.policyName}</div>
                        <div class="policy-sub">Priority ${i.priority}</div>
                      </td>
                      <td>
                        <div class="day-chips">
                          ${["mon","tue","wed","thu","fri","sat","sun"].map(s=>r`<span class="day-chip ${i.days.includes(s)?"active":""}">${Xt[s]}</span>`)}
                        </div>
                      </td>
                      <td class="time-cell">
                        ${i.timeFrom||"00:00"} — ${i.timeTo||"23:59"}
                      </td>
                      <td>${i.rulesCount}</td>
                      <td class="menu-cell">
                        <span class="icon-btn">${this._icon(h.chevronRight,15)}</span>
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            `}
      </div>

      ${e.length>0?r`
        <div class="card">
          <div class="card-head">
            <div class="head-left">
              <h2>Unscheduled Policies <span class="count">(${e.length})</span></h2>
            </div>
          </div>
          <div class="unscheduled-list">
            ${e.map(i=>r`
              <div class="unscheduled-item clickable" @click=${()=>{var s;return(s=this.onNavigate)==null?void 0:s.call(this,"policy-detail",i)}}>
                <span class="unscheduled-name">${i.name}</span>
                <span class="unscheduled-hint">Active at all times · ${i.rules.length} rules</span>
                <span class="icon-btn">${this._icon(h.chevronRight,14)}</span>
              </div>
            `)}
          </div>
        </div>
      `:""}
    `}};X.styles=[J,C`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }
      .card { padding: 18px 20px 10px; margin-bottom: 18px; }
      .card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 10px; }
      .head-left { display: flex; align-items: center; gap: 10px; }
      .head-icon { width: 34px; height: 34px; border-radius: 9px; background: var(--agpc-blue-soft); color: var(--agpc-blue); display: flex; align-items: center; justify-content: center; }
      .card-head h2 { font-size: 16px; font-weight: 700; margin: 0; color: var(--agpc-text); }
      .count { color: var(--agpc-text-faint); font-weight: 500; }
      .name-cell { font-weight: 600; color: var(--agpc-text); }
      .policy-sub { font-size: 11.5px; color: var(--agpc-text-faint); margin-top: 2px; }
      .time-cell { font-family: var(--code-font-family); font-size: 13px; }
      .menu-cell { text-align: right; color: var(--agpc-text-faint); }

      .day-chips { display: flex; gap: 3px; }
      .day-chip {
        display: inline-flex; align-items: center; justify-content: center;
        width: 28px; height: 22px; border-radius: 4px;
        font-size: 10px; font-weight: 700; text-transform: uppercase;
        background: rgba(255, 255, 255, 0.04); color: var(--agpc-text-faint);
      }
      .day-chip.active { background: var(--agpc-blue-soft); color: var(--agpc-blue); }

      .unscheduled-list { padding: 4px 0; }
      .unscheduled-item {
        display: flex; align-items: center; gap: 12px;
        padding: 10px 4px; border-bottom: 1px solid var(--agpc-border-soft);
      }
      .unscheduled-item:last-child { border-bottom: none; }
      .unscheduled-name { font-weight: 600; color: var(--agpc-text); font-size: 13.5px; }
      .unscheduled-hint { flex: 1; font-size: 12px; color: var(--agpc-text-faint); }
    `];ue([g({attribute:!1})],X.prototype,"hass",2);ue([g({attribute:!1})],X.prototype,"state",2);ue([g({type:Object})],X.prototype,"onNavigate",2);ue([g({type:Object})],X.prototype,"onStateChanged",2);X=ue([L("schedule-view")],X);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt={CHILD:2},ei=t=>(...e)=>({_$litDirective$:t,values:e});class ti{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,s){this._$Ct=e,this._$AM=i,this._$Ci=s}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ke extends ti{constructor(e){if(super(e),this.it=u,e.type!==Jt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===u||e==null)return this._t=void 0,this.it=e;if(e===Y)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const i=[e];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}}ke.directiveName="unsafeHTML",ke.resultType=1;const ii=ei(ke);var si=Object.defineProperty,ai=Object.getOwnPropertyDescriptor,O=(t,e,i,s)=>{for(var a=s>1?void 0:s?ai(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&si(e,i,a),a};const te={ai:"Artificial Intelligence",social_network:"Social Networks",streaming:"Streaming",video:"Video",gaming:"Gaming",gambling:"Gambling",adult:"Adult",music:"Music",messaging:"Messaging",shopping:"Shopping",education:"Education",cloud:"Cloud",p2p:"P2P",cdn:"CDN",dating:"Dating",privacy:"Privacy",other:"Other",social:"Social",games:"Games"};let E=class extends ${constructor(){super(...arguments),this._services=[],this._loading=!0,this._search="",this._saving=!1,this._selectedCategory="all"}connectedCallback(){super.connectedCallback(),this._loadServices(),this._pollHandle=setInterval(()=>this._loadServices(),3e4)}disconnectedCallback(){super.disconnectedCallback(),this._pollHandle&&clearInterval(this._pollHandle)}updated(t){t.has("hass")&&this.hass&&this._loading&&this._loadServices()}async _loadServices(){if(this.hass)try{this._services=await this.hass.callWS({type:"adguard_pc/services/list"}),this._loading=!1}catch(t){console.error("Failed to load services:",t),this._loading=!1}}async _toggleBlocked(t){var e;if(!this._saving){this._saving=!0;try{const i=this._services.filter(a=>a.blocked).map(a=>a.id);let s;t.blocked?s=i.filter(a=>a!==t.id):s=[...i,t.id],await this.hass.callWS({type:"adguard_pc/services/update",blocked_ids:s}),t.blocked=!t.blocked,this._services=[...this._services],(e=this.onStateChanged)==null||e.call(this)}catch(i){console.error("Failed to toggle service:",i)}this._saving=!1}}_getCategories(){const t=new Set;for(const e of this._services)e.categories&&e.categories.length&&e.categories.forEach(i=>t.add(i));return[...t].sort((e,i)=>{const s=(te[e]||e).toLowerCase(),a=(te[i]||i).toLowerCase();return s.localeCompare(a)})}_getFilteredServices(){const t=this._search.toLowerCase();return this._services.filter(e=>{const i=!this._search||e.name.toLowerCase().includes(t)||e.id.toLowerCase().includes(t),s=this._selectedCategory==="all"||e.categories&&e.categories.includes(this._selectedCategory);return i&&s})}_getServicesByCategory(){const t=this._getFilteredServices(),e=new Map;for(const i of t){const s=i.categories&&i.categories.length?i.categories:["other"];for(const a of s)e.has(a)||e.set(a,[]),e.get(a).push(i)}return e}_icon(t,e=16){return N`<svg viewBox="0 0 24 24" width="${e}" height="${e}"><path fill="currentColor" d="${t}"></path></svg>`}_decodeIcon(t){if(!t)return"🌐";if(t.startsWith("data:")){const e=t.split(",")[1]||"";try{return atob(e)}catch{return"🌐"}}if(!t.startsWith("<"))try{return atob(t)}catch{return"🌐"}return t}_renderIcon(t){const e=this._decodeIcon(t);if(e.startsWith("<")){const i=e.replace(/width="[^"]*"/g,"").replace(/height="[^"]*"/g,"");return r`<span class="svc-svg-wrap">${ii(i)}</span>`}return r`<span class="svc-emoji">${e}</span>`}render(){if(!this.state)return r``;const t=this._services.filter(a=>a.blocked).length,e=this._getCategories(),i=this._getServicesByCategory(),s=this._getFilteredServices().length;return r`
      <div class="card">
        <div class="card-head">
          <div class="head-left">
            <div class="head-icon">${this._icon(h.services,18)}</div>
            <h2>Global Blocked Services <span class="count">(${t} / ${this._services.length})</span></h2>
          </div>
        </div>

        ${this._loading?r`<div class="loading-msg">Loading services…</div>`:r`
              <div class="search-bar">
                <input
                  type="text"
                  class="search"
                  placeholder="Search services…"
                  .value=${this._search}
                  @input=${a=>{this._search=a.target.value}}
                />
              </div>

              <div class="category-tabs">
                <button class="cat-tab ${this._selectedCategory==="all"?"active":""}"
                  @click=${()=>{this._selectedCategory="all"}}>
                  All
                </button>
                ${e.map(a=>r`
                  <button class="cat-tab ${this._selectedCategory===a?"active":""}"
                    @click=${()=>{this._selectedCategory=a}}>
                    ${te[a]||a}
                    <span class="cat-count">${this._services.filter(n=>{var o;return(o=n.categories)==null?void 0:o.includes(a)}).length}</span>
                  </button>
                `)}
              </div>

              ${this._selectedCategory==="all"?r`
                    ${[...i.entries()].sort(([a],[n])=>{const o=(te[a]||a).toLowerCase(),c=(te[n]||n).toLowerCase();return o.localeCompare(c)}).map(([a,n])=>r`
                      <div class="category-section">
                        <div class="cat-header">
                          <span class="cat-title">${te[a]||a}</span>
                          <span class="cat-badge">${n.filter(o=>o.blocked).length} / ${n.length} blocked</span>
                        </div>
                        <div class="service-grid">
                          ${[...n].sort((o,c)=>o.name.localeCompare(c.name)).map(o=>this._renderService(o))}
                        </div>
                      </div>
                    `)}
                  `:r`
                    <div class="service-grid">
                      ${[...this._getFilteredServices()].sort((a,n)=>a.name.localeCompare(n.name)).map(a=>this._renderService(a))}
                    </div>
                  `}

              ${s===0?r`
                <div class="empty-state">
                  ${this._search?"No services match your search":"No services in this category"}
                </div>
              `:""}
            `}
      </div>
    `}_renderService(t){return r`
      <div class="service-item ${t.blocked?"blocked":"allowed"}" @click=${()=>this._toggleBlocked(t)}>
        <div class="svc-left">
          <div class="svc-icon">${this._renderIcon(t.icon)}</div>
          <div class="svc-info">
            <div class="svc-name">${t.name}</div>
            <div class="svc-id">${t.id}</div>
          </div>
        </div>
        <div class="svc-toggle ${t.blocked?"on":""}">
          <div class="toggle-track">
            <div class="toggle-thumb"></div>
          </div>
        </div>
      </div>
    `}};E.styles=[J,C`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }
      .card { padding: 18px 20px 10px; margin-bottom: 18px; }
      .card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
      .head-left { display: flex; align-items: center; gap: 10px; }
      .head-icon { width: 34px; height: 34px; border-radius: 9px; background: var(--agpc-red-soft); color: var(--agpc-red); display: flex; align-items: center; justify-content: center; }
      .card-head h2 { font-size: 16px; font-weight: 700; margin: 0; color: var(--agpc-text); }
      .count { color: var(--agpc-text-faint); font-weight: 500; }
      .loading-msg { text-align: center; padding: 32px; color: var(--agpc-text-faint); font-size: 13px; }
      .empty-state { text-align: center; padding: 24px; color: var(--agpc-text-faint); font-size: 13px; }

      .search-bar { margin-bottom: 12px; }
      .search {
        width: 100%; padding: 10px 14px;
        background: var(--agpc-surface); border: 1px solid var(--agpc-border-soft);
        border-radius: 7px; color: var(--agpc-text); font-size: 13px;
        outline: none; box-sizing: border-box;
      }
      .search:focus { border-color: var(--agpc-border-focus); }
      .search::placeholder { color: var(--agpc-text-faint); }

      .service-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
        gap: 6px;
      }
      .service-item {
        display: flex; align-items: center; justify-content: space-between;
        padding: 10px 12px; border-radius: 7px;
        background: rgba(255, 255, 255, 0.015); border: 1px solid transparent;
        cursor: pointer; transition: border-color 0.15s ease, background 0.15s ease;
      }
      .service-item:hover { background: rgba(255, 255, 255, 0.035); }
      .service-item.blocked { background: rgba(255, 77, 77, 0.06); }
      .service-item.blocked:hover { background: rgba(255, 77, 77, 0.1); border-color: rgba(255, 77, 77, 0.15); }

      .svc-left { display: flex; align-items: center; gap: 10px; min-width: 0; }
      .svc-icon { width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .svc-icon .svc-svg-wrap { display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; }
      .svc-icon .svc-svg-wrap svg { width: 20px; height: 20px; }
      .svc-icon .svc-emoji { font-size: 18px; }
      .svc-name { font-size: 12.5px; font-weight: 600; color: var(--agpc-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .svc-id { font-size: 10.5px; color: var(--agpc-text-faint); font-family: var(--code-font-family); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

      .svc-toggle { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
      .toggle-track {
        width: 32px; height: 17px; border-radius: 10px;
        background: var(--agpc-surface-hover); position: relative;
        transition: background 0.2s ease;
      }
      .toggle-track::after {
        content: ""; position: absolute; left: 2px; top: 2px;
        width: 13px; height: 13px; border-radius: 50%;
        background: var(--agpc-text-faint); transition: transform 0.2s ease, background 0.2s ease;
      }
      .svc-toggle.on .toggle-track { background: var(--agpc-red); }
      .svc-toggle.on .toggle-track::after { background: white; transform: translateX(15px); }


      .category-tabs { display: flex; gap: 4px; margin-bottom: 16px; overflow-x: auto; padding-bottom: 4px; flex-wrap: nowrap; }
      .cat-tab { display: inline-flex; align-items: center; gap: 5px; padding: 6px 12px; border-radius: 6px; border: 1px solid transparent; background: transparent; color: var(--agpc-text-faint); font-size: 11.5px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: all 0.15s ease; }
      .cat-tab:hover { background: rgba(255, 255, 255, 0.04); color: var(--agpc-text); }
      .cat-tab.active { background: var(--agpc-blue-soft); color: var(--agpc-blue); border-color: rgba(100, 140, 230, 0.2); }
      .cat-count { font-size: 9.5px; font-weight: 700; padding: 1px 5px; border-radius: 4px; background: rgba(255, 255, 255, 0.06); color: var(--agpc-text-faint); }
      .cat-tab.active .cat-count { background: rgba(100, 140, 230, 0.15); color: var(--agpc-blue); }
      .category-section { margin-bottom: 16px; }
      .cat-header { display: flex; align-items: center; justify-content: space-between; padding: 0 2px 8px; border-bottom: 1px solid var(--agpc-border-soft); margin-bottom: 8px; }
      .cat-title { font-size: 12px; font-weight: 700; color: var(--agpc-text); text-transform: uppercase; letter-spacing: 0.04em; }
      .cat-badge { font-size: 10.5px; color: var(--agpc-text-faint); }
    `];O([g({attribute:!1})],E.prototype,"hass",2);O([g({attribute:!1})],E.prototype,"state",2);O([g({type:Object})],E.prototype,"onNavigate",2);O([g({type:Object})],E.prototype,"onStateChanged",2);O([d()],E.prototype,"_services",2);O([d()],E.prototype,"_loading",2);O([d()],E.prototype,"_search",2);O([d()],E.prototype,"_saving",2);O([d()],E.prototype,"_selectedCategory",2);E=O([L("services-view")],E);var oi=Object.defineProperty,ri=Object.getOwnPropertyDescriptor,T=(t,e,i,s)=>{for(var a=s>1?void 0:s?ri(e,i):e,n=t.length-1,o;n>=0;n--)(o=t[n])&&(a=(s?o(e,i,a):o(a))||a);return s&&a&&oi(e,i,a),a};const ni={logs:{title:"Logs",description:"Query and activity logs will appear here once log streaming is wired up."},settings:{title:"Settings",description:"Integration and sync settings will be available here soon."}};let A=class extends ${constructor(){super(...arguments),this._view="dashboard",this._state=null,this._selectedClient=null,this._selectedPolicy=null,this._selectedGroup=null,this._selectedMember=null,this._selectedProfile=null,this._loading=!0,this._syncing=!1,this._protectionEnabled=!0,this._lastSync=null,this._api=null,this._navigate=(t,e)=>{this._view=t,t==="client-detail"&&e&&(this._selectedClient=e),t==="policy-detail"&&e&&(this._selectedPolicy=e),t==="group-detail"&&e&&(this._selectedGroup=e),t==="member-detail"&&e&&(this._selectedMember=e),t==="profile-detail"&&e&&(this._selectedProfile=e),this._loadState(),this.requestUpdate()},this._onStateChanged=async()=>{await this._loadState()},this._sync=async()=>{if(!(!this.hass||this._syncing)){this._syncing=!0;try{await this.hass.callWS({type:"adguard_pc/sync"}),await this._loadState()}catch(t){console.error("Sync failed:",t)}finally{this._syncing=!1}}}}updated(t){t.has("hass")&&this.hass&&!this._api&&(this._api=new wt(this.hass),this._loadState())}async _loadState(){if(this._api)try{this._state=await this._api.getState(),this._lastSync=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),this._selectedPolicy&&this._state&&(this._selectedPolicy=this._state.policies.find(t=>t.id===this._selectedPolicy.id)||this._selectedPolicy),this._selectedClient&&this._state&&(this._selectedClient=this._state.clients.find(t=>t.id===this._selectedClient.id)||this._selectedClient),this._selectedGroup&&this._state&&(this._selectedGroup=this._state.groups.find(t=>t.id===this._selectedGroup.id)||this._selectedGroup),this._selectedMember&&this._state&&(this._selectedMember=this._state.members.find(t=>t.id===this._selectedMember.id)||this._selectedMember),this._selectedProfile&&this._state&&(this._selectedProfile=this._state.profiles.find(t=>t.id===this._selectedProfile.id)||this._selectedProfile)}catch(t){console.error("Failed to load state:",t)}finally{this._loading=!1}}render(){if(this._loading)return r`
        <div class="shell">
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading AdGuard Parental Control…</p>
          </div>
        </div>
      `;if(!this._state)return r`
        <div class="shell">
          <div class="loading">
            <p>Failed to load state. Check your AdGuard Home connection.</p>
          </div>
        </div>
      `;const t=this._view.endsWith("-detail")||this._view==="override";return r`
      <div class="shell">
        <agpc-sidebar
          .activeView=${this._view}
          .state=${this._state}
          .protectionEnabled=${this._protectionEnabled}
          .onNavigate=${e=>this._navigate(e)}
          .onToggleProtection=${()=>{this._protectionEnabled=!this._protectionEnabled}}
        ></agpc-sidebar>
        <div class="main">
          <agpc-topbar
            .title=${this._viewTitle}
            .showBack=${t}
            .lastSync=${this._view==="dashboard"?this._lastSync:null}
            .syncing=${this._syncing}
            .onBack=${()=>this._navigate("dashboard")}
            .onRefresh=${this._sync}
          ></agpc-topbar>
          <div class="content">${this._renderContent()}</div>
        </div>
      </div>
    `}get _viewTitle(){var t,e,i,s,a;switch(this._view){case"client-detail":return((t=this._selectedClient)==null?void 0:t.name)||"Client";case"policy-detail":return((e=this._selectedPolicy)==null?void 0:e.name)||"Policy";case"group-detail":return((i=this._selectedGroup)==null?void 0:i.name)||"Group";case"member-detail":return((s=this._selectedMember)==null?void 0:s.name)||"Member";case"profile-detail":return((a=this._selectedProfile)==null?void 0:a.name)||"Profile";case"override":return"Overrides";case"groups":return"Groups";case"members":return"Members";case"clients":return"Clients";case"policies":return"Policies";case"profiles":return"Profiles";case"schedules":return"Schedules";case"services":return"Services";case"logs":return"Logs";case"settings":return"Settings";default:return"Dashboard"}}_renderContent(){switch(this._view){case"dashboard":return r`<dashboard-view .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate}></dashboard-view>`;case"client-detail":return r`<client-view .state=${this._state} .hass=${this.hass} .client=${this._selectedClient} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></client-view>`;case"policy-detail":return r`<policy-view .state=${this._state} .hass=${this.hass} .policy=${this._selectedPolicy} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></policy-view>`;case"group-detail":return r`<group-view .state=${this._state} .hass=${this.hass} .group=${this._selectedGroup} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></group-view>`;case"member-detail":return r`<member-view .state=${this._state} .hass=${this.hass} .member=${this._selectedMember} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></member-view>`;case"profile-detail":return r`<profile-view .state=${this._state} .hass=${this.hass} .profile=${this._selectedProfile} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></profile-view>`;case"override":return r`<override-view .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></override-view>`;case"groups":return r`<list-view kind="groups" .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></list-view>`;case"members":return r`<list-view kind="members" .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></list-view>`;case"clients":return r`<list-view kind="clients" .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></list-view>`;case"policies":return r`<list-view kind="policies" .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></list-view>`;case"profiles":return r`<list-view kind="profiles" .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></list-view>`;case"schedules":return r`<schedule-view .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></schedule-view>`;case"services":return r`<services-view .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></services-view>`;case"logs":case"settings":{const t=ni[this._view];return r`<placeholder-view .title=${t.title} .description=${t.description}></placeholder-view>`}default:return r`<dashboard-view .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate}></dashboard-view>`}}};A.styles=[xt,C`
      .shell {
        display: flex;
        height: 100vh;
        width: 100%;
        overflow: hidden;
      }
      .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
        height: 100%;
      }
      .content {
        flex: 1;
        overflow-y: auto;
      }
      .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        gap: 16px;
        color: var(--agpc-text-dim);
      }
      .spinner {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid var(--agpc-border);
        border-top-color: var(--agpc-blue);
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `];T([g({attribute:!1})],A.prototype,"hass",2);T([d()],A.prototype,"_view",2);T([d()],A.prototype,"_state",2);T([d()],A.prototype,"_selectedClient",2);T([d()],A.prototype,"_selectedPolicy",2);T([d()],A.prototype,"_selectedGroup",2);T([d()],A.prototype,"_selectedMember",2);T([d()],A.prototype,"_selectedProfile",2);T([d()],A.prototype,"_loading",2);T([d()],A.prototype,"_syncing",2);T([d()],A.prototype,"_protectionEnabled",2);T([d()],A.prototype,"_lastSync",2);A=T([L("adguard-parental-control")],A);

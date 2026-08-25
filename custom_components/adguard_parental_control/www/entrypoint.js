/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ue=globalThis,we=ue.ShadowRoot&&(ue.ShadyCSS===void 0||ue.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ce=Symbol(),Ae=new WeakMap;let qe=class{constructor(e,i,s){if(this._$cssResult$=!0,s!==Ce)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i}get styleSheet(){let e=this.o;const i=this.t;if(we&&e===void 0){const s=i!==void 0&&i.length===1;s&&(e=Ae.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Ae.set(i,e))}return e}toString(){return this.cssText}};const Ge=t=>new qe(typeof t=="string"?t:t+"",void 0,Ce),w=(t,...e)=>{const i=t.length===1?t[0]:e.reduce((s,a,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[o+1],t[0]);return new qe(i,t,Ce)},Qe=(t,e)=>{if(we)t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of e){const s=document.createElement("style"),a=ue.litNonce;a!==void 0&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}},Le=we?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(const s of e.cssRules)i+=s.cssText;return Ge(i)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ye,defineProperty:Xe,getOwnPropertyDescriptor:Ke,getOwnPropertyNames:Je,getOwnPropertySymbols:et,getPrototypeOf:tt}=Object,W=globalThis,Pe=W.trustedTypes,it=Pe?Pe.emptyScript:"",ye=W.reactiveElementPolyfillSupport,re=(t,e)=>t,ge={toAttribute(t,e){switch(e){case Boolean:t=t?it:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch{i=null}}return i}},ke=(t,e)=>!Ye(t,e),Me={attribute:!0,type:String,converter:ge,reflect:!1,useDefault:!1,hasChanged:ke};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),W.litPropertyMetadata??(W.litPropertyMetadata=new WeakMap);let X=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=Me){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(e,i),!i.noAccessor){const s=Symbol(),a=this.getPropertyDescriptor(e,s,i);a!==void 0&&Xe(this.prototype,e,a)}}static getPropertyDescriptor(e,i,s){const{get:a,set:o}=Ke(this.prototype,e)??{get(){return this[i]},set(r){this[i]=r}};return{get:a,set(r){const n=a==null?void 0:a.call(this);o==null||o.call(this,r),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Me}static _$Ei(){if(this.hasOwnProperty(re("elementProperties")))return;const e=tt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(re("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(re("properties"))){const i=this.properties,s=[...Je(i),...et(i)];for(const a of s)this.createProperty(a,i[a])}const e=this[Symbol.metadata];if(e!==null){const i=litPropertyMetadata.get(e);if(i!==void 0)for(const[s,a]of i)this.elementProperties.set(s,a)}this._$Eh=new Map;for(const[i,s]of this.elementProperties){const a=this._$Eu(i,s);a!==void 0&&this._$Eh.set(a,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const i=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const a of s)i.unshift(Le(a))}else e!==void 0&&i.push(Le(e));return i}static _$Eu(e,i){const s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(i=>i(this))}addController(e){var i;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var i;(i=this._$EO)==null||i.delete(e)}_$E_(){const e=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Qe(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostConnected)==null?void 0:s.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostDisconnected)==null?void 0:s.call(i)})}attributeChangedCallback(e,i,s){this._$AK(e,s)}_$ET(e,i){var o;const s=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,s);if(a!==void 0&&s.reflect===!0){const r=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:ge).toAttribute(i,s.type);this._$Em=e,r==null?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,i){var o,r;const s=this.constructor,a=s._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const n=s.getPropertyOptions(a),p=typeof n.converter=="function"?{fromAttribute:n.converter}:((o=n.converter)==null?void 0:o.fromAttribute)!==void 0?n.converter:ge;this._$Em=a;const m=p.fromAttribute(i,n.type);this[a]=m??((r=this._$Ej)==null?void 0:r.get(a))??m,this._$Em=null}}requestUpdate(e,i,s,a=!1,o){var r;if(e!==void 0){const n=this.constructor;if(a===!1&&(o=this[e]),s??(s=n.getPropertyOptions(e)),!((s.hasChanged??ke)(o,i)||s.useDefault&&s.reflect&&o===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,i,{useDefault:s,reflect:a,wrapped:o},r){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??i??this[e]),o!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(i=void 0),this._$AL.set(e,i)),a===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[o,r]of a){const{wrapped:n}=r,p=this[o];n!==!0||this._$AL.has(o)||p===void 0||this.C(o,void 0,r,p)}}let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(s=this._$EO)==null||s.forEach(a=>{var o;return(o=a.hostUpdate)==null?void 0:o.call(a)}),this.update(i)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(i)}willUpdate(e){}_$AE(e){var i;(i=this._$EO)==null||i.forEach(s=>{var a;return(a=s.hostUpdated)==null?void 0:a.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(i=>this._$ET(i,this[i]))),this._$EM()}updated(e){}firstUpdated(e){}};X.elementStyles=[],X.shadowRootOptions={mode:"open"},X[re("elementProperties")]=new Map,X[re("finalized")]=new Map,ye==null||ye({ReactiveElement:X}),(W.reactiveElementVersions??(W.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oe=globalThis,Te=t=>t,me=oe.trustedTypes,De=me?me.createPolicy("lit-html",{createHTML:t=>t}):void 0,Be="$lit$",j=`lit$${Math.random().toFixed(9).slice(2)}$`,Ie="?"+j,st=`<${Ie}>`,G=document,le=()=>G.createComment(""),ne=t=>t===null||typeof t!="object"&&typeof t!="function",Se=Array.isArray,at=t=>Se(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",_e=`[ 	
\f\r]`,ae=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ne=/-->/g,Re=/>/g,U=RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ee=/'/g,He=/"/g,Ue=/^(?:script|style|textarea|title)$/i,Fe=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),l=Fe(1),B=Fe(2),K=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Oe=new WeakMap,F=G.createTreeWalker(G,129);function Ze(t,e){if(!Se(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return De!==void 0?De.createHTML(e):e}const rt=(t,e)=>{const i=t.length-1,s=[];let a,o=e===2?"<svg>":e===3?"<math>":"",r=ae;for(let n=0;n<i;n++){const p=t[n];let m,$,g=-1,H=0;for(;H<p.length&&(r.lastIndex=H,$=r.exec(p),$!==null);)H=r.lastIndex,r===ae?$[1]==="!--"?r=Ne:$[1]!==void 0?r=Re:$[2]!==void 0?(Ue.test($[2])&&(a=RegExp("</"+$[2],"g")),r=U):$[3]!==void 0&&(r=U):r===U?$[0]===">"?(r=a??ae,g=-1):$[1]===void 0?g=-2:(g=r.lastIndex-$[2].length,m=$[1],r=$[3]===void 0?U:$[3]==='"'?He:Ee):r===He||r===Ee?r=U:r===Ne||r===Re?r=ae:(r=U,a=void 0);const V=r===U&&t[n+1].startsWith("/>")?" ":"";o+=r===ae?p+st:g>=0?(s.push(m),p.slice(0,g)+Be+p.slice(g)+j+V):p+j+(g===-2?n:V)}return[Ze(t,o+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class ce{constructor({strings:e,_$litType$:i},s){let a;this.parts=[];let o=0,r=0;const n=e.length-1,p=this.parts,[m,$]=rt(e,i);if(this.el=ce.createElement(m,s),F.currentNode=this.el.content,i===2||i===3){const g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(a=F.nextNode())!==null&&p.length<n;){if(a.nodeType===1){if(a.hasAttributes())for(const g of a.getAttributeNames())if(g.endsWith(Be)){const H=$[r++],V=a.getAttribute(g).split(j),he=/([.?@])?(.*)/.exec(H);p.push({type:1,index:o,name:he[2],strings:V,ctor:he[1]==="."?lt:he[1]==="?"?nt:he[1]==="@"?ct:ve}),a.removeAttribute(g)}else g.startsWith(j)&&(p.push({type:6,index:o}),a.removeAttribute(g));if(Ue.test(a.tagName)){const g=a.textContent.split(j),H=g.length-1;if(H>0){a.textContent=me?me.emptyScript:"";for(let V=0;V<H;V++)a.append(g[V],le()),F.nextNode(),p.push({type:2,index:++o});a.append(g[H],le())}}}else if(a.nodeType===8)if(a.data===Ie)p.push({type:2,index:o});else{let g=-1;for(;(g=a.data.indexOf(j,g+1))!==-1;)p.push({type:7,index:o}),g+=j.length-1}o++}}static createElement(e,i){const s=G.createElement("template");return s.innerHTML=e,s}}function J(t,e,i=t,s){var r,n;if(e===K)return e;let a=s!==void 0?(r=i._$Co)==null?void 0:r[s]:i._$Cl;const o=ne(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==o&&((n=a==null?void 0:a._$AO)==null||n.call(a,!1),o===void 0?a=void 0:(a=new o(t),a._$AT(t,i,s)),s!==void 0?(i._$Co??(i._$Co=[]))[s]=a:i._$Cl=a),a!==void 0&&(e=J(t,a._$AS(t,e.values),a,s)),e}class ot{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:i},parts:s}=this._$AD,a=((e==null?void 0:e.creationScope)??G).importNode(i,!0);F.currentNode=a;let o=F.nextNode(),r=0,n=0,p=s[0];for(;p!==void 0;){if(r===p.index){let m;p.type===2?m=new de(o,o.nextSibling,this,e):p.type===1?m=new p.ctor(o,p.name,p.strings,this,e):p.type===6&&(m=new dt(o,this,e)),this._$AV.push(m),p=s[++n]}r!==(p==null?void 0:p.index)&&(o=F.nextNode(),r++)}return F.currentNode=G,a}p(e){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,i),i+=s.strings.length-2):s._$AI(e[i])),i++}}class de{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,i,s,a){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=s,this.options=a,this._$Cv=(a==null?void 0:a.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=J(this,e,i),ne(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==K&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):at(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&ne(this._$AH)?this._$AA.nextSibling.data=e:this.T(G.createTextNode(e)),this._$AH=e}$(e){var o;const{values:i,_$litType$:s}=e,a=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=ce.createElement(Ze(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===a)this._$AH.p(i);else{const r=new ot(a,this),n=r.u(this.options);r.p(i),this.T(n),this._$AH=r}}_$AC(e){let i=Oe.get(e.strings);return i===void 0&&Oe.set(e.strings,i=new ce(e)),i}k(e){Se(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,a=0;for(const o of e)a===i.length?i.push(s=new de(this.O(le()),this.O(le()),this,this.options)):s=i[a],s._$AI(o),a++;a<i.length&&(this._$AR(s&&s._$AB.nextSibling,a),i.length=a)}_$AR(e=this._$AA.nextSibling,i){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,i);e!==this._$AB;){const a=Te(e).nextSibling;Te(e).remove(),e=a}}setConnected(e){var i;this._$AM===void 0&&(this._$Cv=e,(i=this._$AP)==null||i.call(this,e))}}class ve{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,s,a,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=i,this._$AM=a,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(e,i=this,s,a){const o=this.strings;let r=!1;if(o===void 0)e=J(this,e,i,0),r=!ne(e)||e!==this._$AH&&e!==K,r&&(this._$AH=e);else{const n=e;let p,m;for(e=o[0],p=0;p<o.length-1;p++)m=J(this,n[s+p],i,p),m===K&&(m=this._$AH[p]),r||(r=!ne(m)||m!==this._$AH[p]),m===u?e=u:e!==u&&(e+=(m??"")+o[p+1]),this._$AH[p]=m}r&&!a&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class lt extends ve{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}}class nt extends ve{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}}class ct extends ve{constructor(e,i,s,a,o){super(e,i,s,a,o),this.type=5}_$AI(e,i=this){if((e=J(this,e,i,0)??u)===K)return;const s=this._$AH,a=e===u&&s!==u||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==u&&(s===u||a);a&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var i;typeof this._$AH=="function"?this._$AH.call(((i=this.options)==null?void 0:i.host)??this.element,e):this._$AH.handleEvent(e)}}class dt{constructor(e,i,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const xe=oe.litHtmlPolyfillSupport;xe==null||xe(ce,de),(oe.litHtmlVersions??(oe.litHtmlVersions=[])).push("3.3.3");const pt=(t,e,i)=>{const s=(i==null?void 0:i.renderBefore)??e;let a=s._$litPart$;if(a===void 0){const o=(i==null?void 0:i.renderBefore)??null;s._$litPart$=a=new de(e.insertBefore(le(),o),o,void 0,i??{})}return a._$AI(t),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=globalThis;class y extends X{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;const e=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=e.firstChild),e}update(e){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=pt(i,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return K}}var We;y._$litElement$=!0,y.finalized=!0,(We=Z.litElementHydrateSupport)==null||We.call(Z,{LitElement:y});const $e=Z.litElementPolyfillSupport;$e==null||$e({LitElement:y});(Z.litElementVersions??(Z.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=t=>(e,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ht={attribute:!0,type:String,converter:ge,reflect:!1,hasChanged:ke},ut=(t=ht,e,i)=>{const{kind:s,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(o===void 0&&globalThis.litPropertyMetadata.set(a,o=new Map),s==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),s==="accessor"){const{name:r}=i;return{set(n){const p=e.get.call(this);e.set.call(this,n),this.requestUpdate(r,p,t,!0,n)},init(n){return n!==void 0&&this.C(r,void 0,t,n),n}}}if(s==="setter"){const{name:r}=i;return function(n){const p=this[r];e.call(this,n),this.requestUpdate(r,p,t,!0,n)}}throw Error("Unsupported decorator location: "+s)};function c(t){return(e,i)=>typeof i=="object"?ut(t,e,i):((s,a,o)=>{const r=a.hasOwnProperty(o);return a.constructor.createProperty(o,s),r?Object.getOwnPropertyDescriptor(a,o):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function d(t){return c({...t,state:!0,attribute:!1})}const gt=w`
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
`,ie=w`
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
`,h={shield:"M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z",dashboard:"M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z",groups:"M16.5,12A2.5,2.5 0 0,0 19,9.5A2.5,2.5 0 0,0 16.5,7A2.5,2.5 0 0,0 14,9.5A2.5,2.5 0 0,0 16.5,12M9,12A2.5,2.5 0 0,0 11.5,9.5A2.5,2.5 0 0,0 9,7A2.5,2.5 0 0,0 6.5,9.5A2.5,2.5 0 0,0 9,12M9,14C6.33,14 1,15.34 1,18V20H17V18C17,15.34 11.67,14 9,14M16.5,14C16.29,14 16.06,14 15.82,14C17.16,15 18,16.36 18,18V20H23V18C23,15.34 19.33,14 16.5,14Z",members:"M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z",clients:"M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z",policies:"M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7A2,2 0 0,1 14,9C14,10.11 13.1,11 12,11A2,2 0 0,1 10,9A2,2 0 0,1 12,7M17.75,17C17.75,15.14 15.14,14 12,14C8.86,14 6.25,15.14 6.25,17V18H17.75V17Z",profiles:"M12,12A5,5 0 0,0 17,7A5,5 0 0,0 12,2A5,5 0 0,0 7,7A5,5 0 0,0 12,12M12,14C8.34,14 1,15.79 1,19.5V22H23V19.5C23,15.79 15.66,14 12,14Z",schedules:"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",services:"M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16",overrides:"M9,3L5,6.99H8V14H10V6.99H13M16,17.01V10H14V17.01H11L15,21L19,17.01H16Z",logs:"M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",settings:"M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z",chevronRight:"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",back:"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z",plus:"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",close:"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",sync:"M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13.03 17.7,14 17.19,14.79L18.63,16.23C19.5,15 20,13.55 20,12A8,8 0 0,0 12,4M12,18A6,6 0 0,1 6,12C6,10.97 6.3,10 6.81,9.21L5.37,7.77C4.5,9 4,10.45 4,12A8,8 0 0,0 12,20V23L16,19L12,15V18Z",moon:"M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z",dots:"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z",laptop:"M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z",clock:"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",category:"M4,4H10V10H4V4M20,4V10H14V4H20M14,14H20V20H14V14M4,14H10V20H4V14Z",domain:"M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"};var mt=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,be=(t,e,i,s)=>{for(var a=s>1?void 0:s?vt(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&mt(e,i,a),a};let ee=class extends y{_icon(t,e=20){return B`<svg viewBox="0 0 24 24" width="${e}" height="${e}"><path fill="currentColor" d="${t}"></path></svg>`}_ownerFor(t){const e=this.state.members.find(s=>s.client_names.includes(t.name));if(e)return e.name;const i=this.state.groups.find(s=>s.client_names.includes(t.name));return i?i.name:"Unassigned"}_clientRows(){return this.state.clients.map(t=>{var a;const e=t.assigned_policy_ids.length>0,i=e?this.state.policies.find(o=>o.id===t.assigned_policy_ids[0]):void 0;let s="-";return(a=i==null?void 0:i.time_schedule)!=null&&a.time_to&&(s=i.time_schedule.time_to),{client:t,owner:this._ownerFor(t),restricted:e,currentPolicy:i?i.name:"Default",nextChange:s}})}_blockedCategoryRules(){const t=new Map;for(const e of this.state.policies)for(const i of e.rules)i.rule_type==="category"&&i.action==="block"&&t.set(i.target,(t.get(i.target)||0)+1);for(const e of this.state.profiles)for(const i of e.rules)i.rule_type==="category"&&i.action==="block"&&t.set(i.target,(t.get(i.target)||0)+1);return Array.from(t.entries()).map(([e,i])=>({target:e,count:i})).sort((e,i)=>i.count-e.count).slice(0,5)}_blockedDomainRules(){const t=[];for(const e of this.state.policies)for(const i of e.rules)i.rule_type==="domain"&&i.action==="block"&&t.push({target:i.target,source:e.name});for(const e of this.state.profiles)for(const i of e.rules)i.rule_type==="domain"&&i.action==="block"&&t.push({target:i.target,source:e.name});return t.slice(0,6)}_totalRules(){const t=this.state.policies.reduce((i,s)=>i+s.rules.length,0),e=this.state.profiles.reduce((i,s)=>i+s.rules.length,0);return t+e}render(){if(!this.state)return l``;const t=this._clientRows(),e=t.filter(o=>o.restricted).length,i=this.state.policies.filter(o=>o.rules.length>0||o.profile_id),s=this._blockedCategoryRules(),a=this._blockedDomainRules();return l`
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
          <button class="link-btn" @click=${()=>{var o;return(o=this.onNavigate)==null?void 0:o.call(this,"clients")}}>View all</button>
        </div>
        ${t.length===0?l`<div class="empty-state">No clients configured yet.</div>`:l`
              <table class="table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Member</th>
                    <th>Status</th>
                    <th>Current Policy</th>
                    <th>Next Change</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${t.slice(0,6).map(o=>l`
                      <tr class="clickable" @click=${()=>{var r;return(r=this.onNavigate)==null?void 0:r.call(this,"client-detail",o.client)}}>
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
                        <td class="menu-cell">
                          <span class="icon-btn">${this._icon(h.dots,16)}</span>
                        </td>
                      </tr>
                    `)}
                </tbody>
              </table>
            `}
      </div>

      <div class="bottom-grid">
        <div class="card mini-card">
          <div class="card-head"><h2>Active Policies</h2></div>
          <div class="mini-body">
            <div class="mini-icon blue">${this._icon(h.schedules,22)}</div>
            <div>
              <div class="mini-value">${i.length} <span class="mini-of">/ ${this.state.policies.length}</span></div>
              <div class="mini-caption">${i.slice(0,2).map(o=>o.name).join(", ")||"No active policies"}</div>
            </div>
          </div>
        </div>

        <div class="card mini-card">
          <div class="card-head"><h2>Top Blocked Categories</h2></div>
          ${s.length===0?l`<div class="empty-state">No blocked categories yet.</div>`:l`
                <ul class="rank-list">
                  ${s.map(o=>l`
                      <li>
                        <span class="rank-icon">${this._icon(h.category,16)}</span>
                        <span class="rank-label">${o.target}</span>
                        <span class="rank-count">${o.count}</span>
                      </li>
                    `)}
                </ul>
              `}
        </div>

        <div class="card mini-card">
          <div class="card-head"><h2>Top Blocked Domains</h2></div>
          ${a.length===0?l`<div class="empty-state">No blocked domains yet.</div>`:l`
                <ul class="rank-list">
                  ${a.map(o=>l`
                      <li>
                        <span class="rank-icon">${this._icon(h.domain,16)}</span>
                        <span class="rank-label">${o.target}</span>
                        <span class="rank-count muted">${o.source}</span>
                      </li>
                    `)}
                </ul>
              `}
        </div>
      </div>
    `}};ee.styles=[ie,w`
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
    `];be([c({attribute:!1})],ee.prototype,"hass",2);be([c({attribute:!1})],ee.prototype,"state",2);be([c({type:Object})],ee.prototype,"onNavigate",2);ee=be([A("dashboard-view")],ee);var bt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,x=(t,e,i,s)=>{for(var a=s>1?void 0:s?ft(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&bt(e,i,a),a};const ze={whatsapp:"Essential communication",youtube:"Video streaming","youtube.com":"Video streaming",tiktok:"Social media","tiktok.com":"Social media",discord:"Gaming / Chat","facebook.com":"Social media","instagram.com":"Social media",netflix:"Video streaming",snapchat:"Social media",roblox:"Gaming",twitch:"Video streaming",spotify:"Music"};function yt(t){const e=t.target.toLowerCase();for(const i of Object.keys(ze))if(e.includes(i))return ze[i];return t.rule_type==="domain"?"Domain rule":t.rule_type==="service"?"Service rule":"Category rule"}let b=class extends y{constructor(){super(...arguments),this._tab="general",this._ruleFilter="all",this._enabled=!0,this._selectedPolicyId=null,this._showAddRule=!1,this._newRuleTarget="",this._newRuleType="domain",this._newRuleAction="block",this._showDeleteConfirm=!1,this._ipDraft="",this._tagDraft=""}willUpdate(){this.client&&this._selectedPolicyId===null&&this.client.assigned_policy_ids.length&&(this._selectedPolicyId=this.client.assigned_policy_ids[0]),this.client&&this._ipDraft===""&&(this._ipDraft=this.client.ids[0]||""),this.client&&this._tagDraft===""&&(this._tagDraft=this.client.ids[1]||"")}_icon(t,e=16){return B`<svg viewBox="0 0 24 24" width="${e}" height="${e}"><path fill="currentColor" d="${t}"></path></svg>`}get _owningGroup(){return this.state.groups.find(t=>t.client_names.includes(this.client.name))||null}get _owningMember(){return this.state.members.find(t=>t.client_names.includes(this.client.name))||null}get _selectedPolicy(){return this._selectedPolicyId&&this.state.policies.find(t=>t.id===this._selectedPolicyId)||null}render(){if(!this.client)return l``;const t=this.client.assigned_policy_ids.length>0;return l`
      <div class="split">
        <div class="card editor-card">
          <div class="editor-head">
            <div class="editor-title">
              <div class="editor-icon">${this._icon(h.laptop,18)}</div>
              <div>
                <div class="editor-name">Client Editor</div>
                <div class="editor-sub">${this.client.name}</div>
              </div>
            </div>
            <div class="editor-actions">
              <span class="enabled-label">Enabled</span>
              <button class="switch ${this._enabled?"on":""}" @click=${()=>{this._enabled=!this._enabled}}>
                <div class="knob"></div>
              </button>
              <button class="btn danger" @click=${()=>{this._showDeleteConfirm=!0}}>Delete</button>
            </div>
          </div>

          <div class="tab-strip">
            ${["general","policies","rules","overrides","activity"].map(e=>l`
                <button class="tab ${this._tab===e?"active":""}" @click=${()=>{this._tab=e}}>
                  ${e[0].toUpperCase()+e.slice(1)}
                </button>
              `)}
          </div>

          <div class="tab-body">
            ${this._tab==="general"?this._renderGeneral(t):u}
            ${this._tab==="policies"?this._renderPolicies():u}
            ${this._tab==="rules"?this._renderRulesTab():u}
            ${this._tab==="overrides"?this._renderOverrides():u}
            ${this._tab==="activity"?this._renderActivity():u}
          </div>
        </div>

        <div class="card rules-card">${this._renderRulesEditor()}</div>
      </div>

      ${this._showDeleteConfirm?l`
            <div class="modal-scrim" @click=${()=>{this._showDeleteConfirm=!1}}>
              <div class="modal" @click=${e=>e.stopPropagation()}>
                <div class="modal-title">Delete client "${this.client.name}"?</div>
                <div class="modal-sub">This cannot be undone.</div>
                <div class="modal-actions">
                  <button class="btn" @click=${()=>{this._showDeleteConfirm=!1}}>Cancel</button>
                  <button class="btn danger" @click=${this._deleteClient}>Delete</button>
                </div>
              </div>
            </div>
          `:u}
    `}_renderGeneral(t){var o;const e=this._owningGroup,i=this._owningMember,s=((o=this._selectedPolicy)==null?void 0:o.profile_id)||null,a=s?this.state.profiles.find(r=>r.id===s):null;return l`
      <div class="section">
        <div class="section-title">Identity</div>
        <label class="field-label">Name</label>
        <input class="field" .value=${this.client.name} readonly />

        <label class="field-label">IP Address</label>
        <input class="field" .value=${this._ipDraft}
          @input=${r=>{this._ipDraft=r.target.value}}
        />

        <label class="field-label">AdGuard Client</label>
        <input class="field" .value=${this._tagDraft}
          @input=${r=>{this._tagDraft=r.target.value}}
          placeholder="e.g. teddy-pc"
        />

        <label class="field-label">Tags</label>
        <div class="tag-row">
          ${e?l`<span class="tag">${e.name}<button class="tag-x" @click=${()=>this._removeFromGroup()}>×</button></span>`:u}
          ${i?l`<span class="tag">${i.name}<button class="tag-x" @click=${()=>this._removeFromMember()}>×</button></span>`:u}
          ${!e&&!i?l`<span class="empty-state" style="padding:0;">No tags</span>`:u}
        </div>

        <button class="btn primary save-btn" @click=${this._saveIdentity}>Save Identity</button>
      </div>

      <div class="section">
        <div class="section-title">Inheritance</div>
        <label class="field-label">Group</label>
        <select class="field" .value=${(e==null?void 0:e.id)||""} @change=${r=>this._assignGroup(r.target.value)}>
          <option value="">— None —</option>
          ${this.state.groups.map(r=>l`<option value=${r.id} ?selected=${r.id===(e==null?void 0:e.id)}>${r.name}</option>`)}
        </select>

        <label class="field-label">Member</label>
        <select class="field" .value=${(i==null?void 0:i.id)||""} @change=${r=>this._assignMember(r.target.value)}>
          <option value="">— None —</option>
          ${this.state.members.map(r=>l`<option value=${r.id} ?selected=${r.id===(i==null?void 0:i.id)}>${r.name}</option>`)}
        </select>

        <label class="field-label">Profile</label>
        <input class="field" readonly .value=${(a==null?void 0:a.name)||"None"} />
      </div>

      <div class="section">
        <div class="section-title">Status</div>
        <div class="status-row"><span>Connection</span><span class="badge blue">Configured</span></div>
        <div class="status-row"><span>Protection</span><span class="badge ${t?"red":"green"}">${t?"Restricted":"Unrestricted"}</span></div>
        <div class="status-row"><span>Last Seen</span><span class="status-value">—</span></div>
      </div>
    `}_renderPolicies(){return l`
      <div class="section">
        <div class="section-title">Assigned Policies (${this.client.assigned_policy_ids.length})</div>
        ${this.client.assigned_policy_ids.length===0?l`<div class="empty-state">No policies assigned</div>`:this.client.assigned_policy_ids.map(t=>{const e=this.state.policies.find(s=>s.id===t),i=t===this._selectedPolicyId;return l`
                <div class="row-item ${i?"selected":""}" @click=${()=>{this._selectedPolicyId=t,this._tab="general"}}>
                  <span class="row-text">${(e==null?void 0:e.name)||t}</span>
                  <div class="row-actions">
                    ${i?l`<span class="badge blue">Editing</span>`:u}
                    <button class="icon-btn" @click=${s=>{s.stopPropagation(),this._removePolicy(t)}}>
                      ${this._icon(h.close,14)}
                    </button>
                  </div>
                </div>
              `})}
        <label class="field-label" style="margin-top:12px;">Assign policy</label>
        <select class="field" @change=${t=>{const e=t.target.value;e&&this._addPolicy(e),t.target.value=""}}>
          <option value="">Select a policy…</option>
          ${this.state.policies.filter(t=>!this.client.assigned_policy_ids.includes(t.id)).map(t=>l`<option value=${t.id}>${t.name}</option>`)}
        </select>
      </div>
    `}_renderRulesTab(){return l`
      <div class="section">
        <div class="section-title">Rules Editor Target</div>
        <p class="hint-text">Pick which assigned policy's rules to edit on the right.</p>
        <select class="field" .value=${this._selectedPolicyId||""} @change=${t=>{this._selectedPolicyId=t.target.value||null}}>
          <option value="">— Select policy —</option>
          ${this.client.assigned_policy_ids.map(t=>{const e=this.state.policies.find(i=>i.id===t);return l`<option value=${t} ?selected=${t===this._selectedPolicyId}>${(e==null?void 0:e.name)||t}</option>`})}
        </select>
      </div>
    `}_renderOverrides(){const t=this.state.overrides.filter(e=>e.target===this.client.name);return l`
      <div class="section">
        <div class="section-title">Overrides for this client</div>
        ${t.length===0?l`<div class="empty-state">No active overrides</div>`:t.map(e=>l`
                <div class="row-item">
                  <span class="row-text">${e.action} ${e.expires?"· until "+new Date(e.expires).toLocaleTimeString():"· indefinite"}</span>
                  <button class="icon-btn" @click=${()=>this._clearOverride(e.id)}>${this._icon(h.close,14)}</button>
                </div>
              `)}
        <div class="quick-override">
          <button class="btn" @click=${()=>this._setOverride("allow_all",30)}>Allow 30m</button>
          <button class="btn" @click=${()=>this._setOverride("block_all",30)}>Block 30m</button>
          <button class="btn" @click=${()=>{var e;return(e=this.onNavigate)==null?void 0:e.call(this,"override")}}>Manage all overrides</button>
        </div>
      </div>
    `}_renderActivity(){return l`
      <div class="section">
        <div class="section-title">Recent Activity</div>
        <div class="empty-state">No activity data available yet.</div>
      </div>
    `}_renderRulesEditor(){const t=this._selectedPolicy;if(!t)return l`
        <div class="rules-empty">
          <div class="rules-empty-icon">${this._icon(h.policies,28)}</div>
          <p>No policy selected for this client.</p>
          <button class="btn primary" @click=${()=>{this._tab="policies"}}>Assign a policy</button>
        </div>
      `;const e=t.rules,i=e.filter(n=>n.rule_type==="service").length,s=e.filter(n=>n.rule_type==="domain").length,a=e.filter(n=>this._ruleFilter==="all"||n.rule_type===this._ruleFilter),o=e.filter(n=>n.action==="allow").length,r=e.filter(n=>n.action==="block").length;return l`
      <div class="rules-head">
        <div class="rules-title">Rules Editor <span class="rules-policy-name">(${t.name})</span></div>
        <button class="btn primary" @click=${()=>{this._showAddRule=!this._showAddRule}}>
          ${this._icon(h.plus,14)} Add Rule
        </button>
      </div>

      <div class="rules-subtabs">
        <button class="subtab ${this._ruleFilter==="all"?"active":""}" @click=${()=>{this._ruleFilter="all"}}>All (${e.length})</button>
        <button class="subtab ${this._ruleFilter==="service"?"active":""}" @click=${()=>{this._ruleFilter="service"}}>Services (${i})</button>
        <button class="subtab ${this._ruleFilter==="domain"?"active":""}" @click=${()=>{this._ruleFilter="domain"}}>Domains (${s})</button>
      </div>

      ${this._showAddRule?l`
            <div class="add-rule-form">
              <input class="field" placeholder="Target (e.g. youtube.com)" .value=${this._newRuleTarget}
                @input=${n=>{this._newRuleTarget=n.target.value}}
              />
              <select class="field" .value=${this._newRuleType} @change=${n=>{this._newRuleType=n.target.value}}>
                <option value="domain">Domain</option>
                <option value="service">Service</option>
                <option value="category">Category</option>
              </select>
              <select class="field" .value=${this._newRuleAction} @change=${n=>{this._newRuleAction=n.target.value}}>
                <option value="block">Block</option>
                <option value="allow">Allow</option>
              </select>
              <button class="btn primary" .disabled=${!this._newRuleTarget.trim()} @click=${this._addRule}>Add</button>
            </div>
          `:u}

      ${a.length===0?l`<div class="empty-state">No rules in this category.</div>`:l`
            <table class="table rules-table">
              <thead>
                <tr><th>Type</th><th>Target</th><th>Action</th><th>Notes</th><th></th></tr>
              </thead>
              <tbody>
                ${a.map((n,p)=>{const m=e.indexOf(n);return l`
                    <tr>
                      <td><span class="rule-type-cell">${this._icon(n.rule_type==="domain"?h.domain:n.rule_type==="service"?h.services:h.category,15)} ${n.rule_type}</span></td>
                      <td class="target-cell">${n.target}</td>
                      <td><span class="badge ${n.action==="block"?"red":"green"}">${n.action}</span></td>
                      <td class="notes-cell">${yt(n)}</td>
                      <td class="menu-cell">
                        <button class="icon-btn" @click=${()=>this._removeRule(m)}>${this._icon(h.close,14)}</button>
                      </td>
                    </tr>
                  `})}
              </tbody>
            </table>
          `}

      <div class="rules-footer">
        <span class="badge green">ALLOW ${o}</span>
        <span class="badge red">BLOCK ${r}</span>
      </div>
    `}async _saveIdentity(){const t=[...this.client.ids];t[0]=this._ipDraft.trim(),this._tagDraft.trim()&&(t[1]=this._tagDraft.trim());const e={...this.client,ids:t.filter(Boolean)};await this.hass.callWS({type:"adguard_pc/clients/update",client:e}),this.client=e}async _addPolicy(t){if(!t||this.client.assigned_policy_ids.includes(t))return;const e={...this.client,assigned_policy_ids:[...this.client.assigned_policy_ids,t]};await this.hass.callWS({type:"adguard_pc/clients/update",client:e}),this.client=e,this._selectedPolicyId=t}async _removePolicy(t){const e={...this.client,assigned_policy_ids:this.client.assigned_policy_ids.filter(i=>i!==t)};await this.hass.callWS({type:"adguard_pc/clients/update",client:e}),this.client=e,this._selectedPolicyId===t&&(this._selectedPolicyId=e.assigned_policy_ids[0]||null)}async _assignGroup(t){const e=this._owningGroup;if(e&&e.id!==t){const i={...e,client_names:e.client_names.filter(s=>s!==this.client.name)};await this.hass.callWS({type:"adguard_pc/groups/update",group:i})}if(t){const i=this.state.groups.find(s=>s.id===t);if(i&&!i.client_names.includes(this.client.name)){const s={...i,client_names:[...i.client_names,this.client.name]};await this.hass.callWS({type:"adguard_pc/groups/update",group:s})}}this._reloadState()}async _assignMember(t){const e=this._owningMember;if(e&&e.id!==t){const i={...e,client_names:e.client_names.filter(s=>s!==this.client.name)};await this.hass.callWS({type:"adguard_pc/members/update",member:i})}if(t){const i=this.state.members.find(s=>s.id===t);if(i&&!i.client_names.includes(this.client.name)){const s={...i,client_names:[...i.client_names,this.client.name]};await this.hass.callWS({type:"adguard_pc/members/update",member:s})}}this._reloadState()}async _removeFromGroup(){const t=this._owningGroup;if(!t)return;const e={...t,client_names:t.client_names.filter(i=>i!==this.client.name)};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this._reloadState()}async _removeFromMember(){const t=this._owningMember;if(!t)return;const e={...t,client_names:t.client_names.filter(i=>i!==this.client.name)};await this.hass.callWS({type:"adguard_pc/members/update",member:e}),this._reloadState()}async _addRule(){const t=this._selectedPolicy;if(!t||!this._newRuleTarget.trim())return;const e={target:this._newRuleTarget.trim(),action:this._newRuleAction,rule_type:this._newRuleType},i={...t,rules:[...t.rules,e]};await this.hass.callWS({type:"adguard_pc/policies/update",policy:i}),this._newRuleTarget="",this._showAddRule=!1,this._reloadState()}async _removeRule(t){const e=this._selectedPolicy;if(!e)return;const i=e.rules.filter((a,o)=>o!==t),s={...e,rules:i};await this.hass.callWS({type:"adguard_pc/policies/update",policy:s}),this._reloadState()}async _setOverride(t,e){await this.hass.callWS({type:"adguard_pc/overrides/set",target:this.client.name,target_type:"client",action:t,duration_minutes:e}),this._reloadState()}async _clearOverride(t){await this.hass.callWS({type:"adguard_pc/overrides/clear",override_id:t}),this._reloadState()}async _deleteClient(){var t,e;await this.hass.callWS({type:"adguard_pc/clients/delete",client_id:this.client.name}),this._showDeleteConfirm=!1,(t=this.onStateChanged)==null||t.call(this),(e=this.onNavigate)==null||e.call(this,"clients")}async _reloadState(){var t;try{this.state=await this.hass.callWS({type:"adguard_pc/state/get"});const e=this.state.clients.find(i=>i.name===this.client.name);e&&(this.client=e),(t=this.onStateChanged)==null||t.call(this)}catch(e){console.error("Failed to reload state:",e)}}};b.styles=[ie,w`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }

      .split { display: grid; grid-template-columns: 380px 1fr; gap: 18px; align-items: start; }
      @media (max-width: 900px) { .split { grid-template-columns: 1fr; } }

      .card { padding: 0; }
      .editor-card { display: flex; flex-direction: column; overflow: hidden; }
      .rules-card { padding: 18px 20px 16px; }

      .editor-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 18px; border-bottom: 1px solid var(--agpc-border); gap: 10px; }
      .editor-title { display: flex; align-items: center; gap: 10px; min-width: 0; }
      .editor-icon { width: 34px; height: 34px; border-radius: 9px; background: var(--agpc-blue-soft); color: var(--agpc-blue); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .editor-name { font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--agpc-text-faint); font-weight: 700; }
      .editor-sub { font-size: 15px; font-weight: 700; color: var(--agpc-text); }
      .editor-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
      .enabled-label { font-size: 12px; color: var(--agpc-text-dim); }

      .switch { width: 34px; height: 20px; border-radius: 999px; background: rgba(255,255,255,0.1); position: relative; border: none; cursor: pointer; padding: 0; flex-shrink: 0; }
      .switch.on { background: var(--agpc-green); }
      .knob { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: left 0.15s ease; }
      .switch.on .knob { left: 16px; }

      .tab-strip { display: flex; gap: 4px; padding: 10px 14px 0; border-bottom: 1px solid var(--agpc-border); overflow-x: auto; }
      .tab { border: none; background: transparent; color: var(--agpc-text-dim); font-size: 12.5px; font-weight: 600; padding: 8px 12px; cursor: pointer; border-bottom: 2px solid transparent; font-family: inherit; white-space: nowrap; }
      .tab:hover { color: var(--agpc-text); }
      .tab.active { color: var(--agpc-blue); border-bottom-color: var(--agpc-blue); }

      .tab-body { padding: 16px 18px 20px; max-height: 640px; overflow-y: auto; }
      .section { margin-bottom: 22px; }
      .section:last-child { margin-bottom: 0; }
      .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: var(--agpc-text-faint); margin-bottom: 10px; }
      .field-label { display: block; font-size: 11.5px; color: var(--agpc-text-dim); margin: 10px 0 5px; }
      .field-label:first-child { margin-top: 0; }
      .hint-text { font-size: 12px; color: var(--agpc-text-dim); margin: 0 0 10px; }

      .tag-row { display: flex; flex-wrap: wrap; gap: 6px; }
      .tag { display: inline-flex; align-items: center; gap: 4px; background: var(--agpc-blue-soft); color: var(--agpc-blue); font-size: 11.5px; font-weight: 600; padding: 4px 6px 4px 10px; border-radius: 999px; }
      .tag-x { border: none; background: transparent; color: inherit; cursor: pointer; font-size: 13px; padding: 0 2px; }

      .save-btn { margin-top: 14px; width: 100%; justify-content: center; }

      .status-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--agpc-border-soft); font-size: 13px; color: var(--agpc-text-dim); }
      .status-row:last-child { border-bottom: none; }
      .status-value { color: var(--agpc-text); font-weight: 600; }

      .row-item { display: flex; align-items: center; justify-content: space-between; padding: 9px 10px; border-radius: var(--agpc-radius-sm); cursor: pointer; }
      .row-item:hover { background: var(--agpc-card-hover); }
      .row-item.selected { background: var(--agpc-blue-soft); }
      .row-text { font-size: 13px; color: var(--agpc-text); }
      .row-actions { display: flex; align-items: center; gap: 6px; }

      .quick-override { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }

      /* Rules editor (right panel) */
      .rules-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 4px; }
      .rules-title { font-size: 16px; font-weight: 700; color: var(--agpc-text); }
      .rules-policy-name { font-weight: 500; color: var(--agpc-text-dim); font-size: 13px; }
      .rules-subtabs { display: flex; gap: 18px; border-bottom: 1px solid var(--agpc-border); margin: 14px 0 4px; }
      .subtab { border: none; background: transparent; color: var(--agpc-text-dim); font-size: 12.5px; font-weight: 600; padding: 8px 2px; cursor: pointer; border-bottom: 2px solid transparent; font-family: inherit; }
      .subtab.active { color: var(--agpc-text); border-bottom-color: var(--agpc-blue); }

      .add-rule-form { display: flex; gap: 8px; margin: 14px 0; flex-wrap: wrap; }
      .add-rule-form .field { flex: 1; min-width: 140px; }
      .add-rule-form select.field { flex: 0 0 130px; }

      .rules-table { margin-top: 10px; }
      .rule-type-cell { display: inline-flex; align-items: center; gap: 6px; color: var(--agpc-text-dim); text-transform: capitalize; font-size: 12.5px; }
      .target-cell { font-family: var(--code-font-family); font-size: 12.5px; }
      .notes-cell { color: var(--agpc-text-faint); font-size: 12.5px; }

      .rules-footer { display: flex; gap: 10px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--agpc-border); }

      .rules-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 60px 20px; text-align: center; color: var(--agpc-text-dim); }
      .rules-empty-icon { width: 56px; height: 56px; border-radius: 14px; background: var(--agpc-blue-soft); color: var(--agpc-blue); display: flex; align-items: center; justify-content: center; }

      .modal-scrim { position: fixed; inset: 0; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; z-index: 50; }
      .modal { background: var(--agpc-card-bg); border: 1px solid var(--agpc-border); border-radius: var(--agpc-radius-lg); padding: 22px; width: 320px; }
      .modal-title { font-size: 15px; font-weight: 700; color: var(--agpc-text); margin-bottom: 4px; }
      .modal-sub { font-size: 12.5px; color: var(--agpc-text-dim); margin-bottom: 18px; }
      .modal-actions { display: flex; justify-content: flex-end; gap: 8px; }
    `];x([c({attribute:!1})],b.prototype,"hass",2);x([c({attribute:!1})],b.prototype,"state",2);x([c({attribute:!1})],b.prototype,"client",2);x([c({type:Object})],b.prototype,"onNavigate",2);x([c({type:Object})],b.prototype,"onStateChanged",2);x([d()],b.prototype,"_tab",2);x([d()],b.prototype,"_ruleFilter",2);x([d()],b.prototype,"_enabled",2);x([d()],b.prototype,"_selectedPolicyId",2);x([d()],b.prototype,"_showAddRule",2);x([d()],b.prototype,"_newRuleTarget",2);x([d()],b.prototype,"_newRuleType",2);x([d()],b.prototype,"_newRuleAction",2);x([d()],b.prototype,"_showDeleteConfirm",2);x([d()],b.prototype,"_ipDraft",2);x([d()],b.prototype,"_tagDraft",2);b=x([A("client-view")],b);var _t=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,f=(t,e,i,s)=>{for(var a=s>1?void 0:s?xt(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&_t(e,i,a),a};let v=class extends y{constructor(){super(...arguments),this.narrow=!1,this._showAddRule=!1,this._newRuleTarget="",this._newRuleAction="block",this._newRuleType="domain",this._showAddSchedule=!1,this._schedDays=["mon","tue","wed","thu","fri"],this._schedFrom="08:00",this._schedTo="20:00",this._showAddCalendar=!1,this._calEntity="",this._calMatch="",this._showDeleteConfirm=!1}render(){return this.policy?l`
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

      ${this._showDeleteConfirm?l`
        <div class="modal-scrim" @click=${()=>this._showDeleteConfirm=!1}></div>
        <div class="modal">
          <div class="modal-head"><h3>Delete policy "${this.policy.name}"?</h3></div>
          <div class="modal-body"><p>This will remove the policy and unassign it from all groups and members.</p></div>
          <div class="modal-actions">
            <button class="btn" @click=${()=>this._showDeleteConfirm=!1}>Cancel</button>
            <button class="btn btn-danger" @click=${this._deletePolicy}>Delete</button>
          </div>
        </div>
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
                @change=${t=>{const e=t.target.value;e!==void 0&&this._assignProfile(e)}}
              >
                <ha-list-item value="">None</ha-list-item>
                ${this.state.profiles.map(t=>l`
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
          ${this._showAddRule?l`
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
          ${this.policy.rules.length===0?l`<p class="empty">No rules defined</p>`:l`
                <table class="data-table">
                  <thead><tr><th>Type</th><th>Target</th><th>Action</th><th></th></tr></thead>
                  <tbody>
                    ${this.policy.rules.map((t,e)=>l`
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
          ${this.policy.time_schedule&&!this._showAddSchedule?l`
                <div class="info-section">
                  <p><strong>Days:</strong> ${this.policy.time_schedule.days.join(", ")||"All"}</p>
                  <p><strong>Time:</strong> ${this.policy.time_schedule.time_from||"00:00"} - ${this.policy.time_schedule.time_to||"23:59"}</p>
                  <button class="btn btn-sm" @click=${this._removeSchedule}>Remove</button>
                </div>
              `:this._showAddSchedule?this._renderScheduleForm():l`<p class="empty">No schedule - active at all times</p>`}
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
          ${this.policy.calendar_condition&&!this._showAddCalendar?l`
                <div class="info-section">
                  <p><strong>Entity:</strong> ${this.policy.calendar_condition.calendar_entity||"None"}</p>
                  <p><strong>Match:</strong> ${this.policy.calendar_condition.event_match.join(", ")||"None"}</p>
                  <p><strong>Invert:</strong> ${this.policy.calendar_condition.invert?"Yes":"No"}</p>
                  <button class="btn btn-sm" @click=${this._removeCalendar}>Remove</button>
                </div>
              `:this._showAddCalendar?this._renderCalendarForm():l`<p class="empty">No calendar condition</p>`}
        </div>
      </ha-card>
    `:l``}_renderScheduleForm(){return l`
      <div class="add-form">
        <div class="day-chips">
          ${["mon","tue","wed","thu","fri","sat","sun"].map(e=>l`
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
        <button class="btn" @click=${this._saveSchedule}>Save Schedule</button>
        <button class="btn" @click=${()=>{this._showAddSchedule=!1}}>Cancel</button>
      </div>
    `}_renderCalendarForm(){return l`
      <div class="add-form">
        <ha-select label="Calendar Entity" .value=${this._calEntity}
          @change=${t=>{this._calEntity=t.target.value}}
        >
          ${this.state.calendar_entities.map(t=>l`
            <ha-list-item value="${t}">${t}</ha-list-item>
          `)}
        </ha-select>
        <ha-textfield label="Event keywords (comma-separated)" .value=${this._calMatch}
          @input=${t=>{this._calMatch=t.target.value}}
        ></ha-textfield>
        <button class="btn" @click=${this._saveCalendar}>Save Condition</button>
        <button class="btn" @click=${()=>{this._showAddCalendar=!1}}>Cancel</button>
      </div>
    `}_getProfileName(){if(!this.policy.profile_id)return"None";const t=this.state.profiles.find(e=>e.id===this.policy.profile_id);return(t==null?void 0:t.name)||this.policy.profile_id}_toggleDay(t){this._schedDays=this._schedDays.includes(t)?this._schedDays.filter(e=>e!==t):[...this._schedDays,t]}async _addRule(){var i;if(!this._newRuleTarget.trim())return;const t={target:this._newRuleTarget.trim(),action:this._newRuleAction,rule_type:this._newRuleType},e={...this.policy,rules:[...this.policy.rules,t]};await this.hass.callWS({type:"adguard_pc/policies/update",policy:e}),this.policy=e,this._newRuleTarget="",this._showAddRule=!1,(i=this.onStateChanged)==null||i.call(this)}async _removeRule(t){var s;const e=this.policy.rules.filter((a,o)=>o!==t),i={...this.policy,rules:e};await this.hass.callWS({type:"adguard_pc/policies/update",policy:i}),this.policy=i,(s=this.onStateChanged)==null||s.call(this)}async _saveSchedule(){var e;const t={...this.policy,time_schedule:{days:this._schedDays,time_from:this._schedFrom,time_to:this._schedTo}};await this.hass.callWS({type:"adguard_pc/policies/update",policy:t}),this.policy=t,this._showAddSchedule=!1,(e=this.onStateChanged)==null||e.call(this)}async _removeSchedule(){var e;const t={...this.policy,time_schedule:null};await this.hass.callWS({type:"adguard_pc/policies/update",policy:t}),this.policy=t,(e=this.onStateChanged)==null||e.call(this)}async _saveCalendar(){var e;const t={...this.policy,calendar_condition:{calendar_entity:this._calEntity||null,event_match:this._calMatch.split(",").map(i=>i.trim()).filter(Boolean),invert:!1}};await this.hass.callWS({type:"adguard_pc/policies/update",policy:t}),this.policy=t,this._showAddCalendar=!1,(e=this.onStateChanged)==null||e.call(this)}async _removeCalendar(){var e;const t={...this.policy,calendar_condition:null};await this.hass.callWS({type:"adguard_pc/policies/update",policy:t}),this.policy=t,(e=this.onStateChanged)==null||e.call(this)}async _deletePolicy(){var t,e;await this.hass.callWS({type:"adguard_pc/policies/delete",policy_id:this.policy.id}),this._showDeleteConfirm=!1,(t=this.onStateChanged)==null||t.call(this),(e=this.onNavigate)==null||e.call(this,"dashboard")}async _assignProfile(t){var i;const e={...this.policy,profile_id:t||null};await this.hass.callWS({type:"adguard_pc/policies/update",policy:e}),this.policy=e,(i=this.onStateChanged)==null||i.call(this)}_handleDeleteDialog(){this._showDeleteConfirm=!1}};v.styles=w`
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
  `;f([c({attribute:!1})],v.prototype,"hass",2);f([c({attribute:!1})],v.prototype,"state",2);f([c({attribute:!1})],v.prototype,"policy",2);f([c({type:Boolean})],v.prototype,"narrow",2);f([c({type:Object})],v.prototype,"onNavigate",2);f([c({type:Object})],v.prototype,"onStateChanged",2);f([d()],v.prototype,"_showAddRule",2);f([d()],v.prototype,"_newRuleTarget",2);f([d()],v.prototype,"_newRuleAction",2);f([d()],v.prototype,"_newRuleType",2);f([d()],v.prototype,"_showAddSchedule",2);f([d()],v.prototype,"_schedDays",2);f([d()],v.prototype,"_schedFrom",2);f([d()],v.prototype,"_schedTo",2);f([d()],v.prototype,"_showAddCalendar",2);f([d()],v.prototype,"_calEntity",2);f([d()],v.prototype,"_calMatch",2);f([d()],v.prototype,"_showDeleteConfirm",2);v=f([A("policy-view")],v);var $t=Object.defineProperty,wt=Object.getOwnPropertyDescriptor,R=(t,e,i,s)=>{for(var a=s>1?void 0:s?wt(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&$t(e,i,a),a};let P=class extends y{constructor(){super(...arguments),this.narrow=!1,this._selectedTarget="",this._selectedTargetType="client",this._selectedAction="allow_all",this._selectedDuration="30"}render(){return this.state?(this._selectedTargetType==="client"?this.state.clients:this.state.members,l`
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
            ${this._selectedTargetType==="client"?this.state.clients.map(t=>l`<ha-list-item value="${t.name}">${t.name}</ha-list-item>`):this.state.members.map(t=>l`<ha-list-item value="${t.name}">${t.name}</ha-list-item>`)}
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
          ${this.state.overrides.length===0?l`<p class="empty">No active overrides</p>`:l`
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
                    ${this.state.overrides.map(t=>l`
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
    `):l``}async _applyOverride(){var t,e;if(this._selectedTarget)try{await this.hass.callWS({type:"adguard_pc/overrides/set",target:this._selectedTarget,target_type:this._selectedTargetType,action:this._selectedAction,duration_minutes:parseInt(this._selectedDuration,10)}),this._selectedTarget="",(t=this.onStateChanged)==null||t.call(this),(e=this.onNavigate)==null||e.call(this,"override")}catch(i){console.error("Failed to set override:",i)}}async _clearOverride(t){var e,i;try{await this.hass.callWS({type:"adguard_pc/overrides/clear",override_id:t}),(e=this.onStateChanged)==null||e.call(this),(i=this.onNavigate)==null||i.call(this,"override")}catch(s){console.error("Failed to clear override:",s)}}};P.styles=w`
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
  `;R([c({attribute:!1})],P.prototype,"hass",2);R([c({attribute:!1})],P.prototype,"state",2);R([c({type:Boolean})],P.prototype,"narrow",2);R([c({type:Object})],P.prototype,"onNavigate",2);R([c({type:Object})],P.prototype,"onStateChanged",2);R([d()],P.prototype,"_selectedTarget",2);R([d()],P.prototype,"_selectedTargetType",2);R([d()],P.prototype,"_selectedAction",2);R([d()],P.prototype,"_selectedDuration",2);P=R([A("override-view")],P);var Ct=Object.defineProperty,kt=Object.getOwnPropertyDescriptor,I=(t,e,i,s)=>{for(var a=s>1?void 0:s?kt(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&Ct(e,i,a),a};let N=class extends y{constructor(){super(...arguments),this.narrow=!1,this._showDeleteConfirm=!1}render(){return this.group?l`
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

      ${this._showDeleteConfirm?l`
        <div class="modal-scrim" @click=${()=>this._showDeleteConfirm=!1}></div>
        <div class="modal">
          <div class="modal-head"><h3>Delete group "${this.group.name}"?</h3></div>
          <div class="modal-body"><p>This cannot be undone.</p></div>
          <div class="modal-actions">
            <button class="btn" @click=${()=>this._showDeleteConfirm=!1}>Cancel</button>
            <button class="btn btn-danger" @click=${this._deleteGroup}>Delete</button>
          </div>
        </div>
      `:""}

      <!-- Members -->
      <ha-card>
        <div class="card-header">
          <div class="name">Members (${this.group.member_names.length})</div>
        </div>
        <div class="card-content">
          ${this.group.member_names.length===0?l`<p class="empty">No members assigned</p>`:""}
          ${this.group.member_names.map(t=>l`
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
                @change=${t=>{const e=t.target.value;e&&this._addMember(e),t.target.value=""}}
              >
                ${this.state.members.filter(t=>!this.group.member_names.includes(t.name)).map(t=>l`<ha-list-item value="${t.name}">${t.name}</ha-list-item>`)}
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
          ${this.group.client_names.length===0?l`<p class="empty">No clients assigned</p>`:""}
          ${this.group.client_names.map(t=>l`
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
              @change=${t=>{const e=t.target.value;e&&this._addClient(e),t.target.value=""}}
            >
              ${this.state.clients.filter(t=>!this.group.client_names.includes(t.name)).map(t=>l`<ha-list-item value="${t.name}">${t.name}</ha-list-item>`)}
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
          ${this.group.assigned_policy_ids.length===0?l`<p class="empty">No policies assigned</p>`:""}
          ${this.group.assigned_policy_ids.map(t=>{const e=this.state.policies.find(i=>i.id===t);return l`
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
              @change=${t=>{const e=t.target.value;e&&this._addPolicy(e),t.target.value=""}}
            >
              ${this.state.policies.filter(t=>!this.group.assigned_policy_ids.includes(t.id)).map(t=>l`<ha-list-item value="${t.id}">${t.name}</ha-list-item>`)}
            </ha-select>
          </div>
        </div>
      </ha-card>
    `:l``}_handleDeleteDialog(){this._showDeleteConfirm=!1}async _addMember(t){var i;if(!t||this.group.member_names.includes(t))return;const e={...this.group,member_names:[...this.group.member_names,t]};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this.group=e,(i=this.onStateChanged)==null||i.call(this)}async _removeMember(t){var i;const e={...this.group,member_names:this.group.member_names.filter(s=>s!==t)};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this.group=e,(i=this.onStateChanged)==null||i.call(this)}async _addClient(t){var i;if(!t||this.group.client_names.includes(t))return;const e={...this.group,client_names:[...this.group.client_names,t]};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this.group=e,(i=this.onStateChanged)==null||i.call(this)}async _removeClient(t){var i;const e={...this.group,client_names:this.group.client_names.filter(s=>s!==t)};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this.group=e,(i=this.onStateChanged)==null||i.call(this)}async _addPolicy(t){var i;if(!t||this.group.assigned_policy_ids.includes(t))return;const e={...this.group,assigned_policy_ids:[...this.group.assigned_policy_ids,t]};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this.group=e,(i=this.onStateChanged)==null||i.call(this)}async _removePolicy(t){var i;const e={...this.group,assigned_policy_ids:this.group.assigned_policy_ids.filter(s=>s!==t)};await this.hass.callWS({type:"adguard_pc/groups/update",group:e}),this.group=e,(i=this.onStateChanged)==null||i.call(this)}async _deleteGroup(){var t,e;await this.hass.callWS({type:"adguard_pc/groups/delete",group_id:this.group.id}),this._showDeleteConfirm=!1,(t=this.onStateChanged)==null||t.call(this),(e=this.onNavigate)==null||e.call(this,"dashboard")}};N.styles=w`
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
    .modal-scrim { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:999; }
    .modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:1000; background:var(--card-background-color,#1e1e1e); border:1px solid var(--divider-color,#333); border-radius:12px; padding:20px; min-width:320px; max-width:420px; box-shadow:0 8px 32px rgba(0,0,0,0.4); }
    .modal-head h3 { margin:0 0 12px; font-size:16px; }
    .modal-body p { margin:0 0 16px; color:var(--secondary-text-color,#999); font-size:13px; }
    .modal-actions { display:flex; gap:8px; justify-content:flex-end; }
    .btn { display:inline-flex; align-items:center; padding:8px 16px; border-radius:8px; border:1px solid var(--divider-color,#333); background:var(--card-background-color,#2a2a2a); color:var(--primary-text-color,#eee); cursor:pointer; font-size:13px; }
    .btn:hover { background:var(--secondary-background-color,#333); }
    .btn-danger { background:var(--error-color,#f44336); color:#fff; border-color:var(--error-color,#f44336); }
    .btn-danger:hover { opacity:0.9; }
  `;I([c({attribute:!1})],N.prototype,"hass",2);I([c({attribute:!1})],N.prototype,"state",2);I([c({attribute:!1})],N.prototype,"group",2);I([c({type:Boolean})],N.prototype,"narrow",2);I([c({type:Object})],N.prototype,"onNavigate",2);I([c({type:Object})],N.prototype,"onStateChanged",2);I([d()],N.prototype,"_showDeleteConfirm",2);N=I([A("group-view")],N);var St=Object.defineProperty,At=Object.getOwnPropertyDescriptor,C=(t,e,i,s)=>{for(var a=s>1?void 0:s?At(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&St(e,i,a),a};const Ve={trash:"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0,0,0 8,21H16A2,2 0,0,0 18,19V7H6V19Z",refresh:"M17.65,6.35C16.2,4.9 14.21,4 12,4C7.58,4 4.01,7.58 4.01,12C4.01,16.42 7.58,20 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18C8.69,18 6,15.31 6,12C6,8.69 8.69,6 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"};let _=class extends y{constructor(){super(...arguments),this.narrow=!1,this._newException="",this._showDeleteConfirm=!1,this._queryLogs=[],this._queryLoading=!1,this._queryLive=!0,this._querySearch="",this._queryType="all",this._queryClient="all",this._queryError=""}connectedCallback(){super.connectedCallback(),this._startQueryPolling()}disconnectedCallback(){super.disconnectedCallback(),this._stopQueryPolling()}updated(t){t.has("member")&&this._loadQueryLog()}render(){if(!this.member)return l``;const t=this.member.client_names.map(r=>this.state.clients.find(n=>n.name===r)).filter(Boolean),e=this._activePolicies(),i=e[0],s=this._blockedServices(e),a=this._allowedServices(e),o=e.length>0&&(s.length>0||e.some(r=>r.rules.some(n=>n.action==="block")));return l`
      <div class="page">
        <div class="breadcrumb"><span @click=${()=>{var r;return(r=this.onNavigate)==null?void 0:r.call(this,"members")}}>Members</span><span>›</span><strong>${this.member.name}</strong></div>

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
            <button class="icon-btn" title="Delete" @click=${()=>{this._showDeleteConfirm=!0}}><ha-icon .path=${Ve.trash}></ha-icon></button>
          </div>
        </section>

        <div class="layout">
          <main class="main-column">
            <div class="grid-3">
              <section class="card stat-card">
                <div class="section-title">Current Status</div>
                <div class="status-row">
                  <strong class=${o?"yellow":"green-text"}>${o?"RESTRICTED":"UNRESTRICTED"}</strong>
                  <div class="next-change">${i?l`<span>Next change</span><strong>${this._nextChange(i)}</strong>`:l`<span>No active schedule</span>`}</div>
                </div>
                <div class="subtext">${(i==null?void 0:i.name)||"No active policy"}${i!=null&&i.time_schedule?l` · ${this._scheduleText(i)}`:""}</div>
              </section>

              <section class="card stat-card">
                <div class="section-title">Allowed Services</div>
                <div class="service-line">
                  ${a.length?a.slice(0,3).map(r=>l`<span class="service allowed"><span class="service-dot">✓</span>${r}</span>`):l`<span class="muted">No explicit allow rules</span>`}
                </div>
              </section>

              <section class="card stat-card">
                <div class="section-title">Blocked Services</div>
                <div class="service-line">
                  ${s.length?s.slice(0,4).map(r=>l`<span class="service blocked"><span class="service-dot">×</span>${r}</span>`):l`<span class="muted">No explicit blocked services</span>`}
                  ${s.length>4?l`<span class="more">+${s.length-4}</span>`:""}
                </div>
              </section>
            </div>

            <section class="card section-card">
              <div class="section-head"><h2>Assigned Clients (${t.length})</h2><button class="btn small" @click=${()=>{var r;return(r=this.onNavigate)==null?void 0:r.call(this,"clients")}}>Manage Clients</button></div>
              <table class="table">
                <thead><tr><th>CLIENT</th><th>IP ADDRESS</th><th>STATUS</th><th>CURRENT POLICY</th><th>LAST SEEN</th><th></th></tr></thead>
                <tbody>
                  ${t.map(r=>l`
                    <tr @click=${()=>{var n;return(n=this.onNavigate)==null?void 0:n.call(this,"client-detail",r)}}>
                      <td><div class="client-cell"><span class="device-icon">▣</span><div><strong>${r.name}</strong>${r===t[0]?l`<small>Primary device</small>`:""}</div></div></td>
                      <td class="mono">${r.ids[0]||"—"}</td>
                      <td><span class="pill ${o?"yellow-pill":"green"}">${o?"RESTRICTED":"NORMAL"}</span></td>
                      <td>${(i==null?void 0:i.name)||"Default"}<small class="cell-sub">${i!=null&&i.time_schedule?this._scheduleText(i):"All day"}</small></td>
                      <td class="last-seen">${this._lastSeen(r.name)}</td>
                      <td class="arrow">›</td>
                    </tr>
                  `)}
                </tbody>
              </table>
              ${t.length?"":l`<div class="empty">No clients assigned. Add a client below.</div>`}
              <div class="add-row">
                <ha-select label="Add client" .value=${""} @change=${this._handleAddClient}>
                  ${this.state.clients.filter(r=>!this.member.client_names.includes(r.name)).map(r=>l`<ha-list-item value="${r.name}">${r.name}</ha-list-item>`)}
                </ha-select>
              </div>
            </section>

            <section class="card section-card">
              <div class="section-head"><h2>Active Policy</h2>${i?l`<button class="btn small" @click=${()=>{var r;return(r=this.onNavigate)==null?void 0:r.call(this,"policy-detail",i)}}>View Policy ↗</button>`:""}</div>
              ${i?l`
                <div class="policy-banner">
                  <div class="policy-icon">☾</div>
                  <div class="policy-main"><strong>${i.name}</strong><span>${this._scheduleText(i)}</span></div>
                  <span class="pill purple">${this._policyMode(i)}</span>
                  <div class="policy-meta"><span>Schedule<br><strong>${this._scheduleDays(i)}</strong></span><span>Profile<br><strong>${i.profile_id?this._profileName(i.profile_id):"None"}</strong></span></div>
                </div>
              `:l`<div class="empty">No active policy at the current time.</div>`}
            </section>

            <div class="grid-2">
              <section class="card section-card compact">
                <div class="section-head"><h2>Exceptions (${this.member.exceptions.length})</h2><button class="btn small" @click=${this._addException}>＋ Add Exception</button></div>
                ${this.member.exceptions.length?this.member.exceptions.map(r=>l`<div class="exception"><span>${r}</span><button class="icon-btn" @click=${()=>this._removeException(r)}>×</button></div>`):l`<div class="empty">No exceptions for this member</div>`}
                <div class="inline-add"><input class="field" placeholder="domain.com" .value=${this._newException} @input=${r=>this._newException=r.target.value} @keydown=${r=>r.key==="Enter"&&this._addException()}></div>
              </section>
              <section class="card section-card compact">
                <div class="section-head"><h2>Overrides (${this.state.overrides.filter(r=>r.target_type==="member"&&r.target===this.member.name&&!this._expired(r.expires)).length})</h2><button class="btn small" @click=${()=>{var r;return(r=this.onNavigate)==null?void 0:r.call(this,"override")}}>＋ New Override</button></div>
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
              <select class="field" @change=${r=>{this._queryClient=r.target.value}}>
                <option value="all">All Clients</option>
                ${t.map(r=>l`<option value="${r.name}">${r.name}</option>`)}
              </select>
              <select class="field" @change=${r=>{this._queryType=r.target.value}}>
                <option value="all">All Types</option><option value="A">A</option><option value="AAAA">AAAA</option><option value="HTTPS">HTTPS</option><option value="TXT">TXT</option>
              </select>
              <input class="field search" placeholder="Search domain…" .value=${this._querySearch} @input=${r=>this._querySearch=r.target.value}>
              <button class="icon-btn" title="Refresh" @click=${this._loadQueryLog}><ha-icon .path=${Ve.refresh}></ha-icon></button>
            </div>
            ${this._queryError?l`<div class="query-error">${this._queryError}</div>`:""}
            <div class="query-table-wrap">
              <table class="table query-table">
                <thead><tr><th>TIME</th><th>CLIENT</th><th>DOMAIN / QUERY</th><th>RESPONSE</th><th>ACTION</th><th>TYPE</th></tr></thead>
                <tbody>
                  ${this._filteredLogs().slice(0,50).map(r=>{var n,p;return l`
                    <tr>
                      <td class="time">${this._formatTime(r.time)}</td>
                      <td>${r.member_client||r.client}</td>
                      <td><strong>${((n=r.question)==null?void 0:n.host)||"—"}</strong></td>
                      <td class="response">${this._response(r)}</td>
                      <td>${this._isBlocked(r)?l`<span class="pill red">BLOCKED</span>`:l`<span class="pill green">ALLOWED</span>`}</td>
                      <td>${((p=r.question)==null?void 0:p.type)||"A"}</td>
                    </tr>
                  `})}
                </tbody>
              </table>
              ${this._queryLoading&&!this._queryLogs.length?l`<div class="empty loading-log">Loading query log…</div>`:""}
              ${!this._queryLoading&&!this._filteredLogs().length?l`<div class="empty loading-log">No DNS queries found for this member.</div>`:""}
            </div>
            <div class="query-foot"><span>Auto-scroll <button class="switch ${this._queryLive?"on":""}" @click=${()=>this._queryLive=!this._queryLive}><i></i></button></span><button class="btn small" @click=${()=>{var r;return(r=this.onNavigate)==null?void 0:r.call(this,"logs")}}>View Full Logs</button></div>
          </aside>
        </div>

        <section class="card timeline-card">
          <div class="section-head"><h2>Today Activity Timeline</h2><span class="legend"><i class="allowed-dot"></i> Allowed <i class="blocked-dot"></i> Blocked <i class="unknown-dot"></i> Unknown</span></div>
          ${t.map(r=>l`
            <div class="timeline-row"><div class="timeline-label"><strong>${r.name}</strong><small>${r.ids[0]||""}</small></div><div class="timeline"><span class="tick t0">00:00</span><span class="tick t4">04:00</span><span class="tick t8">08:00</span><span class="tick t12">12:00</span><span class="tick t16">16:00</span><span class="tick t20">20:00</span><span class="tick t24">24:00</span><div class="bar"><span class="seg allowed"></span><span class="seg blocked"></span><span class="now"></span></div></div></div>
          `)}
        </section>
      </div>

      ${this._showDeleteConfirm?l`
        <div class="modal-scrim" @click=${()=>this._showDeleteConfirm=!1}></div>
        <div class="modal">
          <div class="modal-head"><h3>Delete member "${this.member.name}"?</h3></div>
          <div class="modal-body"><p>This cannot be undone. Clients and policies will not be deleted.</p></div>
          <div class="modal-actions">
            <button class="btn" @click=${()=>this._showDeleteConfirm=!1}>Cancel</button>
            <button class="btn btn-danger" @click=${this._deleteMember}>Delete</button>
          </div>
        </div>
      `:""}
    `}_activePolicies(){const t=new Set(this.member.assigned_policy_ids);for(const i of this.state.groups)i.member_names.includes(this.member.name)&&i.assigned_policy_ids.forEach(s=>t.add(s));const e=new Date;return[...t].map(i=>this.state.policies.find(s=>s.id===i)).filter(i=>!!i&&this._scheduleActive(i,e)).sort((i,s)=>s.priority-i.priority)}_scheduleActive(t,e){if(!t.time_schedule)return!0;const i=t.time_schedule.days||[],s=["sun","mon","tue","wed","thu","fri","sat"][e.getDay()];if(i.length&&!i.includes(s))return!1;const a=t.time_schedule.time_from,o=t.time_schedule.time_to;if(!a||!o)return!0;const r=e.getHours()*60+e.getMinutes(),n=this._minutes(a),p=this._minutes(o);return n<=p?r>=n&&r<=p:r>=n||r<=p}_minutes(t){const[e,i]=t.split(":").map(Number);return e*60+i}_scheduleText(t){return t.time_schedule?`${t.time_schedule.time_from||"00:00"} – ${t.time_schedule.time_to||"24:00"}`:"All day"}_scheduleDays(t){var e,i;return(i=(e=t.time_schedule)==null?void 0:e.days)!=null&&i.length?t.time_schedule.days.map(s=>s.slice(0,1).toUpperCase()+s.slice(1)).join(" · "):"Every day"}_policyMode(t){var i;return((i=t.rules)==null?void 0:i.filter(s=>s.action==="allow").length)||0?"ALLOW ONLY":"RESTRICTED"}_groupName(){var t;return((t=this.state.groups.find(e=>e.member_names.includes(this.member.name)))==null?void 0:t.name)||"Unassigned"}_profileName(t){var e;return((e=this.state.profiles.find(i=>i.id===t))==null?void 0:e.name)||t}_nextChange(t){var e;return((e=t.time_schedule)==null?void 0:e.time_to)||"—"}_blockedServices(t){return[...new Set(t.flatMap(e=>e.rules.filter(i=>i.rule_type==="service"&&i.action==="block").map(i=>i.target)))]}_allowedServices(t){return[...new Set(t.flatMap(e=>e.rules.filter(i=>i.rule_type==="service"&&i.action==="allow").map(i=>i.target)))]}_lastSeen(t){const e=this._queryLogs.find(i=>i.member_client===t);return e?`${this._formatTime(e.time)} · Online`:"—"}_expired(t){return!!t&&new Date(t).getTime()<=Date.now()}_editMember(){}_filteredLogs(){return this._queryLogs.filter(t=>{var r,n,p;const e=((n=(r=t.question)==null?void 0:r.host)==null?void 0:n.toLowerCase())||"",i=t.member_client||t.client||"",s=!this._querySearch.trim()||e.includes(this._querySearch.trim().toLowerCase()),a=this._queryClient==="all"||i===this._queryClient,o=this._queryType==="all"||((p=t.question)==null?void 0:p.type)===this._queryType;return s&&a&&o&&!!i})}_isBlocked(t){const e=(t.reason||"").toLowerCase();return e.includes("filtered")||e.includes("blocked")||e.includes("blacklist")||e.includes("parental")||e.includes("service")}_response(t){var e,i;return((i=(e=t.answer)==null?void 0:e[0])==null?void 0:i.value)||(this._isBlocked(t)?"Blocked":t.status||"—")}_formatTime(t){const e=new Date(t);return Number.isNaN(e.getTime())?t.slice(11,19):e.toLocaleTimeString([],{hour12:!1})}_startQueryPolling(){this._stopQueryPolling(),this._queryLive&&(this._loadQueryLog(),this._queryTimer=window.setInterval(()=>this._loadQueryLog(),5e3))}_stopQueryPolling(){this._queryTimer&&(window.clearInterval(this._queryTimer),this._queryTimer=void 0)}async _loadQueryLog(){if(!(!this.member||!this.hass||this._queryLoading)){this._queryLoading=!0;try{const t=await this.hass.callWS({type:"adguard_pc/members/querylog",member_id:this.member.id,limit:80,search:"",response_status:""});this._queryLogs=(t==null?void 0:t.data)||[],this._queryError=""}catch(t){this._queryError=t instanceof Error?t.message:"Unable to load AdGuard query log"}finally{this._queryLoading=!1}}}async _handleAddClient(t){const e=t.target.value;e&&await this._addClient(e),t.target.value=""}async _addClient(t){var i;if(!t||this.member.client_names.includes(t))return;const e={...this.member,client_names:[...this.member.client_names,t]};await this.hass.callWS({type:"adguard_pc/members/update",member:e}),this.member=e,(i=this.onStateChanged)==null||i.call(this),this._loadQueryLog()}async _removeClient(t){var i;const e={...this.member,client_names:this.member.client_names.filter(s=>s!==t)};await this.hass.callWS({type:"adguard_pc/members/update",member:e}),this.member=e,(i=this.onStateChanged)==null||i.call(this),this._loadQueryLog()}async _addException(){var e;if(!this._newException.trim())return;const t={...this.member,exceptions:[...this.member.exceptions,this._newException.trim()]};await this.hass.callWS({type:"adguard_pc/members/update",member:t}),this.member=t,this._newException="",(e=this.onStateChanged)==null||e.call(this)}async _removeException(t){var i;const e={...this.member,exceptions:this.member.exceptions.filter(s=>s!==t)};await this.hass.callWS({type:"adguard_pc/members/update",member:e}),this.member=e,(i=this.onStateChanged)==null||i.call(this)}_handleDeleteDialog(){this._showDeleteConfirm=!1}async _deleteMember(){var t,e;await this.hass.callWS({type:"adguard_pc/members/delete",member_id:this.member.id}),this._showDeleteConfirm=!1,(t=this.onStateChanged)==null||t.call(this),(e=this.onNavigate)==null||e.call(this,"dashboard")}};_.styles=w`
    :host { display: block; color: var(--agpc-text, #eef2ff); }
    .page { padding: 0 14px 28px; max-width: 1680px; margin: 0 auto; }
    .card { background: var(--agpc-card-bg, #151c31); border: 1px solid var(--agpc-border, #27304a); border-radius: 12px; box-sizing: border-box; }
    .breadcrumb { height: 42px; display:flex; align-items:center; gap:10px; color:var(--agpc-text-faint,#71809f); font-size:13px; }
    .breadcrumb span:first-child { cursor:pointer; }.breadcrumb strong { color:var(--agpc-text,#eef2ff); }
    .hero { min-height:108px; display:flex; align-items:center; padding:18px 20px; gap:18px; }
    .avatar { width:68px; height:68px; border-radius:50%; display:grid; place-items:center; background:linear-gradient(135deg,#3d67a9,#25355c); border:2px solid #536a95; font-size:28px; font-weight:800; }
    .hero-main { flex:1; min-width:0; }.title-line { display:flex; align-items:center; gap:12px; }.title-line h1 { margin:0; font-size:24px; }.hero-meta { display:flex; flex-wrap:wrap; gap:20px; color:#9aa6c0; font-size:12px; margin-top:12px; }.hero-actions { display:flex; gap:8px; align-self:flex-start; }
    .layout { display:grid; grid-template-columns:minmax(0,1fr) 500px; gap:12px; margin-top:12px; align-items:start; }.main-column { min-width:0; }.grid-3 { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; }.grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .stat-card { min-height:122px; padding:16px; }.section-title { font-size:13px; font-weight:700; margin-bottom:16px; }.status-row { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; }.status-row strong { font-size:16px; }.yellow { color:#f3bd38; }.green-text { color:#2bd88f; }.subtext,.muted { color:#7e8aa4; font-size:12px; margin-top:10px; }.next-change { text-align:right; color:#7e8aa4; font-size:11px; }.next-change strong { display:block; color:#eef2ff; font-size:15px; margin-top:3px; }
    .service-line { display:flex; flex-wrap:wrap; gap:7px; align-items:center; }.service { display:inline-flex; align-items:center; gap:6px; padding:6px 8px; border-radius:8px; background:#11172a; border:1px solid #26304a; font-size:11px; }.service.allowed { color:#42e09a; }.service.blocked { color:#ff6464; }.service-dot { font-weight:900; }.more { font-size:11px; color:#7e8aa4; }
    .section-card { padding:16px; margin-top:12px; }.section-card.compact { min-height:130px; }.section-head { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:12px; }.section-head h2 { margin:0; font-size:15px; }.table { width:100%; border-collapse:collapse; }.table th { text-align:left; font-size:9px; color:#65728f; font-weight:700; letter-spacing:.05em; padding:0 8px 9px; border-bottom:1px solid #29324a; }.table td { padding:10px 8px; border-bottom:1px solid #202942; font-size:11px; color:#cdd5e8; }.table tbody tr { cursor:pointer; }.table tbody tr:hover { background:#18213a; }.table tbody tr:last-child td { border-bottom:0; }.client-cell { display:flex; align-items:center; gap:9px; }.client-cell strong { display:block; color:#f2f5ff; }.client-cell small,.cell-sub { display:block; color:#66738e; font-size:9px; margin-top:3px; }.device-icon { width:27px; height:27px; display:grid; place-items:center; background:#1d2945; border-radius:7px; color:#78a6ff; }.mono { font-family:ui-monospace,SFMono-Regular,Consolas,monospace; }.last-seen { color:#39d991!important; }.arrow { color:#60708f!important; font-size:18px!important; }.add-row { margin-top:12px; }.add-row ha-select { width:100%; }.empty { color:#687691; font-size:12px; font-style:italic; padding:12px 0; }.policy-banner { display:flex; align-items:center; gap:14px; min-height:72px; padding:12px 14px; background:#10182d; border:1px solid #293452; border-radius:9px; }.policy-icon { width:38px; height:38px; border-radius:10px; background:#34285c; color:#c5a6ff; display:grid; place-items:center; font-size:20px; }.policy-main { flex:1; }.policy-main strong { display:block; }.policy-main span { display:block; color:#73809b; font-size:11px; margin-top:4px; }.policy-meta { display:flex; gap:28px; color:#7b87a0; font-size:10px; }.policy-meta strong { color:#d8deed; font-size:11px; }.exception { display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid #202942; font-size:12px; }.inline-add { margin-top:9px; }.field { background:#10172a; border:1px solid #2b3550; color:#e9edf8; border-radius:7px; padding:8px 9px; font:inherit; box-sizing:border-box; outline:none; }.field:focus { border-color:#4e86ff; }.inline-add .field { width:100%; }
    .query-panel { position:sticky; top:12px; overflow:hidden; }.query-head { display:flex; justify-content:space-between; gap:12px; padding:16px; border-bottom:1px solid #29324a; }.query-head h2 { margin:0; font-size:15px; }.query-head h2 span { color:#75829b; font-weight:500; }.query-head small { display:block; color:#66738e; font-size:10px; margin-top:5px; }.live-controls { display:flex; align-items:flex-start; gap:7px; }.live-dot { color:#71809d; font-size:10px; padding-top:5px; }.live-dot.on { color:#38dc91; }.filters { display:grid; grid-template-columns:1fr 1fr; gap:7px; padding:10px; border-bottom:1px solid #29324a; }.filters .search { grid-column:1 / -1; }.filters .icon-btn { position:absolute; margin-left:448px; margin-top:1px; }.query-table-wrap { max-height:620px; overflow:auto; }.query-table { min-width:620px; }.query-table th { position:sticky; top:0; background:#151c31; z-index:1; }.query-table td { white-space:nowrap; }.query-table .time { color:#7f8ca7; font-variant-numeric:tabular-nums; }.query-table .response { max-width:120px; overflow:hidden; text-overflow:ellipsis; }.query-error { margin:8px 10px 0; padding:8px; border-radius:7px; background:#3a1e2a; color:#ff8c9c; font-size:11px; }.query-foot { display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border-top:1px solid #29324a; color:#7c88a0; font-size:10px; }.query-foot > span { display:flex; align-items:center; gap:7px; }.switch { width:30px; height:17px; padding:2px; border:0; border-radius:10px; background:#35405a; cursor:pointer; }.switch i { display:block; width:13px; height:13px; border-radius:50%; background:#a1aac0; transition:.15s; }.switch.on { background:#20c981; }.switch.on i { transform:translateX(13px); background:#fff; }
    .modal-scrim { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:999; }
    .modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:1000; background:var(--agpc-card-bg,#151c31); border:1px solid var(--agpc-border,#27304a); border-radius:12px; padding:20px; min-width:320px; max-width:420px; box-shadow:0 8px 32px rgba(0,0,0,0.4); }
    .modal-head h3 { margin:0 0 12px; font-size:16px; color:var(--agpc-text,#eef2ff); }
    .modal-body p { margin:0 0 16px; color:var(--agpc-text-faint,#7e8aa4); font-size:13px; }
    .modal-actions { display:flex; gap:8px; justify-content:flex-end; }
    .timeline-card { margin-top:12px; padding:16px; }.legend { display:flex; gap:10px; align-items:center; color:#78859e; font-size:10px; }.legend i { width:8px; height:8px; border-radius:2px; display:inline-block; }.allowed-dot { background:#25c987; }.blocked-dot { background:#cf4b55; }.unknown-dot { background:#59637a; }.timeline-row { display:grid; grid-template-columns:150px 1fr; gap:14px; align-items:center; margin:16px 0; }.timeline-label strong { display:block; font-size:11px; }.timeline-label small { color:#65728e; font-size:9px; }.timeline { position:relative; padding-top:18px; }.bar { height:10px; border-radius:5px; background:#283047; overflow:hidden; position:relative; }.seg.allowed { position:absolute; left:0; width:58%; height:100%; background:#20b77c; }.seg.blocked { position:absolute; left:58%; width:31%; height:100%; background:#b94650; }.now { position:absolute; left:73%; top:-5px; width:2px; height:20px; background:#f3c73f; }.tick { position:absolute; top:0; color:#56627b; font-size:8px; transform:translateX(-50%); }.t0{left:0}.t4{left:16.67%}.t8{left:33.33%}.t12{left:50%}.t16{left:66.67%}.t20{left:83.33%}.t24{right:0;transform:none}
    .pill { display:inline-flex; align-items:center; padding:3px 8px; border-radius:6px; font-size:9px; font-weight:800; letter-spacing:.04em; }.pill.green { background:#103c31; color:#34db95; }.pill.red { background:#441d28; color:#ff6875; }.pill.yellow-pill { background:#45381b; color:#f0bd35; }.pill.purple { background:#32294e; color:#bd9bff; }.btn { display:inline-flex; align-items:center; justify-content:center; gap:6px; border:1px solid #2e3853; background:#151e34; color:#d8dff0; border-radius:7px; padding:8px 11px; font:600 11px inherit; cursor:pointer; }.btn:hover { background:#1b2741; }.btn.small { padding:6px 9px; font-size:10px; }.icon-btn { width:31px; height:31px; display:grid; place-items:center; border:1px solid transparent; border-radius:7px; background:transparent; color:#8390aa; cursor:pointer; }.icon-btn:hover { background:#1b253e; color:#eaf0ff; border-color:#2d3853; }
    @media (max-width:1250px) { .layout { grid-template-columns:1fr; }.query-panel { position:relative; top:auto; }.query-table-wrap { max-height:460px; } }
    @media (max-width:760px) { .page{padding:0 8px 20px}.grid-3,.grid-2{grid-template-columns:1fr}.hero{align-items:flex-start}.hero-actions{margin-left:auto}.hero-meta{gap:10px}.timeline-row{grid-template-columns:1fr}.query-table-wrap{overflow-x:auto}.query-panel{width:100%} }
  `;C([c({attribute:!1})],_.prototype,"hass",2);C([c({attribute:!1})],_.prototype,"state",2);C([c({attribute:!1})],_.prototype,"member",2);C([c({type:Boolean})],_.prototype,"narrow",2);C([c({type:Object})],_.prototype,"onNavigate",2);C([c({type:Object})],_.prototype,"onStateChanged",2);C([d()],_.prototype,"_newException",2);C([d()],_.prototype,"_showDeleteConfirm",2);C([d()],_.prototype,"_queryLogs",2);C([d()],_.prototype,"_queryLoading",2);C([d()],_.prototype,"_queryLive",2);C([d()],_.prototype,"_querySearch",2);C([d()],_.prototype,"_queryType",2);C([d()],_.prototype,"_queryClient",2);C([d()],_.prototype,"_queryError",2);_=C([A("member-view")],_);var Lt=Object.defineProperty,Pt=Object.getOwnPropertyDescriptor,T=(t,e,i,s)=>{for(var a=s>1?void 0:s?Pt(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&Lt(e,i,a),a};let S=class extends y{constructor(){super(...arguments),this.narrow=!1,this._showAddRule=!1,this._newRuleTarget="",this._newRuleAction="block",this._newRuleType="domain",this._showDeleteConfirm=!1}render(){return this.profile?l`
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

      ${this._showDeleteConfirm?l`
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
          ${this._showAddRule?l`
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
          ${this.profile.rules.length===0?l`<p class="empty">No rules defined</p>`:l`
                <table class="data-table">
                  <thead><tr><th>Type</th><th>Target</th><th>Action</th><th></th></tr></thead>
                  <tbody>
                    ${this.profile.rules.map((t,e)=>l`
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
    `:l``}_handleDeleteDialog(){this._showDeleteConfirm=!1}async _toggleDefault(){var i;const t=this.profile.default_action==="block"?"allow":"block",e={...this.profile,default_action:t};await this.hass.callWS({type:"adguard_pc/profiles/update",profile:e}),this.profile=e,(i=this.onStateChanged)==null||i.call(this)}async _addRule(){var i;if(!this._newRuleTarget.trim())return;const t={target:this._newRuleTarget.trim(),action:this._newRuleAction,rule_type:this._newRuleType},e={...this.profile,rules:[...this.profile.rules,t]};await this.hass.callWS({type:"adguard_pc/profiles/update",profile:e}),this.profile=e,this._newRuleTarget="",this._showAddRule=!1,(i=this.onStateChanged)==null||i.call(this)}async _removeRule(t){var s;const e=this.profile.rules.filter((a,o)=>o!==t),i={...this.profile,rules:e};await this.hass.callWS({type:"adguard_pc/profiles/update",profile:i}),this.profile=i,(s=this.onStateChanged)==null||s.call(this)}async _deleteProfile(){var t,e;await this.hass.callWS({type:"adguard_pc/profiles/delete",profile_id:this.profile.id}),this._showDeleteConfirm=!1,(t=this.onStateChanged)==null||t.call(this),(e=this.onNavigate)==null||e.call(this,"dashboard")}};S.styles=w`
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
  `;T([c({attribute:!1})],S.prototype,"hass",2);T([c({attribute:!1})],S.prototype,"state",2);T([c({attribute:!1})],S.prototype,"profile",2);T([c({type:Boolean})],S.prototype,"narrow",2);T([c({type:Object})],S.prototype,"onNavigate",2);T([c({type:Object})],S.prototype,"onStateChanged",2);T([d()],S.prototype,"_showAddRule",2);T([d()],S.prototype,"_newRuleTarget",2);T([d()],S.prototype,"_newRuleAction",2);T([d()],S.prototype,"_newRuleType",2);T([d()],S.prototype,"_showDeleteConfirm",2);S=T([A("profile-view")],S);var Mt=Object.defineProperty,Tt=Object.getOwnPropertyDescriptor,z=(t,e,i,s)=>{for(var a=s>1?void 0:s?Tt(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&Mt(e,i,a),a};let D=class extends y{constructor(){super(...arguments),this.kind="clients",this._showAdd=!1,this._newName="",this._newSecondary=""}_icon(t,e=15){return B`<svg viewBox="0 0 24 24" width="${e}" height="${e}"><path fill="currentColor" d="${t}"></path></svg>`}get _config(){switch(this.kind){case"groups":return{title:"Groups",icon:h.groups,columns:["Name","Members","Clients","Policies"],items:this.state.groups,nameField:"name",rowValues:t=>[t.member_names.length,t.client_names.length,t.assigned_policy_ids.length],detailView:"group-detail",secondaryLabel:null};case"members":return{title:"Members",icon:h.members,columns:["Name","Clients","Policies","Exceptions"],items:this.state.members,nameField:"name",rowValues:t=>[t.client_names.length,t.assigned_policy_ids.length,t.exceptions.length],detailView:"member-detail",secondaryLabel:null};case"clients":return{title:"Clients",icon:h.clients,columns:["Name","IDs","Policies","Status"],items:this.state.clients,nameField:"name",rowValues:t=>[t.ids.length?t.ids.join(", "):"—",t.assigned_policy_ids.length,t.assigned_policy_ids.length?"Restricted":"Unrestricted"],detailView:"client-detail",secondaryLabel:"IP / ID (optional)"};case"policies":return{title:"Policies",icon:h.policies,columns:["Name","Priority","Rules","Profile"],items:this.state.policies,nameField:"name",rowValues:t=>[t.priority,t.rules.length,this._profileName(t.profile_id)],detailView:"policy-detail",secondaryLabel:null};case"profiles":default:return{title:"Profiles",icon:h.profiles,columns:["Name","Rules","Default Action"],items:this.state.profiles,nameField:"name",rowValues:t=>[t.rules.length,t.default_action],detailView:"profile-detail",secondaryLabel:null}}}_profileName(t){var e;return t?((e=this.state.profiles.find(i=>i.id===t))==null?void 0:e.name)||t:"None"}render(){if(!this.state)return l``;const t=this._config;return l`
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

        ${t.items.length===0?l`<div class="empty-state">No ${t.title.toLowerCase()} configured yet.</div>`:l`
              <table class="table">
                <thead>
                  <tr>
                    ${t.columns.map(e=>l`<th>${e}</th>`)}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${t.items.map(e=>{const i=t.rowValues(e);return l`
                      <tr class="clickable" @click=${()=>{var s;return(s=this.onNavigate)==null?void 0:s.call(this,t.detailView,e)}}>
                        <td class="name-cell">${e[t.nameField]}</td>
                        ${i.map(s=>l`<td>${s}</td>`)}
                        <td class="menu-cell">
                          <span class="icon-btn">${this._icon(h.chevronRight,15)}</span>
                        </td>
                      </tr>
                    `})}
                </tbody>
              </table>
            `}
      </div>

      ${this._showAdd?l`
        <div class="modal-scrim" @click=${()=>{this._showAdd=!1,this._newName="",this._newSecondary=""}}>
          <div class="modal" @click=${e=>e.stopPropagation()}>
            <div class="modal-title">Add ${t.title.slice(0,-1)}</div>
            <div class="modal-fields">
              <input class="field" placeholder="${t.title.slice(0,-1)} name" .value=${this._newName}
                @input=${e=>{this._newName=e.target.value}}
                @keydown=${e=>{e.key==="Enter"&&this._create()}}
                autofocus
              />
              ${t.secondaryLabel?l`<input class="field" placeholder="${t.secondaryLabel}" .value=${this._newSecondary}
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
    `}async _create(){var s;if(!this._newName.trim())return;const t=this._newName.trim(),e=this._newSecondary.trim();let i=null;switch(this.kind){case"groups":i={type:"adguard_pc/groups/create",group:{name:t,member_names:[],client_names:[],assigned_policy_ids:[]}};break;case"members":i={type:"adguard_pc/members/create",member:{name:t,client_names:[],assigned_policy_ids:[],exceptions:[]}};break;case"clients":i={type:"adguard_pc/clients/create",client:{name:t,ids:e?[e]:[],assigned_policy_ids:[],exceptions:[]}};break;case"policies":i={type:"adguard_pc/policies/create",policy:{name:t,rules:[],priority:0}};break;case"profiles":i={type:"adguard_pc/profiles/create",profile:{name:t,rules:[],default_action:"block"}};break}if(i)try{await this.hass.callWS(i)}catch(a){console.error("Create failed:",a)}this._newName="",this._newSecondary="",this._showAdd=!1,(s=this.onStateChanged)==null||s.call(this)}};D.styles=[ie,w`
      :host { display: block; padding: 22px 28px 40px; box-sizing: border-box; }
      .card { padding: 18px 20px 10px; }
      .card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 10px; flex-wrap: wrap; }
      .head-left { display: flex; align-items: center; gap: 10px; }
      .head-icon { width: 34px; height: 34px; border-radius: 9px; background: var(--agpc-blue-soft); color: var(--agpc-blue); display: flex; align-items: center; justify-content: center; }
      .card-head h2 { font-size: 16px; font-weight: 700; margin: 0; color: var(--agpc-text); }
      .count { color: var(--agpc-text-faint); font-weight: 500; }
      .name-cell { font-weight: 600; color: var(--agpc-text); }
      .menu-cell { text-align: right; color: var(--agpc-text-faint); }

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
    `];z([c({attribute:!1})],D.prototype,"hass",2);z([c({attribute:!1})],D.prototype,"state",2);z([c({type:String})],D.prototype,"kind",2);z([c({type:Object})],D.prototype,"onNavigate",2);z([c({type:Object})],D.prototype,"onStateChanged",2);z([d()],D.prototype,"_showAdd",2);z([d()],D.prototype,"_newName",2);z([d()],D.prototype,"_newSecondary",2);D=z([A("list-view")],D);var Dt=Object.defineProperty,Nt=Object.getOwnPropertyDescriptor,fe=(t,e,i,s)=>{for(var a=s>1?void 0:s?Nt(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&Dt(e,i,a),a};let te=class extends y{constructor(){super(...arguments),this.title="Coming soon",this.description="This section isn't available yet.",this.icon=""}_icon(t){return B`<svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="${t}"></path></svg>`}render(){return l`
      <div class="card empty-card">
        ${this.icon?l`<div class="empty-icon">${this._icon(this.icon)}</div>`:""}
        <div class="empty-title">${this.title}</div>
        <div class="empty-desc">${this.description}</div>
      </div>
    `}};te.styles=[ie,w`
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
    `];fe([c({type:String})],te.prototype,"title",2);fe([c({type:String})],te.prototype,"description",2);fe([c({type:String})],te.prototype,"icon",2);te=fe([A("placeholder-view")],te);var Rt=Object.defineProperty,Et=Object.getOwnPropertyDescriptor,se=(t,e,i,s)=>{for(var a=s>1?void 0:s?Et(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&Rt(e,i,a),a};const Ht=[{id:"dashboard",label:"Dashboard",icon:h.dashboard},{id:"groups",label:"Groups",icon:h.groups},{id:"members",label:"Members",icon:h.members},{id:"clients",label:"Clients",icon:h.clients},{id:"policies",label:"Policies",icon:h.policies},{id:"profiles",label:"Profiles",icon:h.profiles},{id:"schedules",label:"Schedules",icon:h.schedules},{id:"services",label:"Services",icon:h.services},{id:"override",label:"Overrides",icon:h.overrides},{id:"logs",label:"Logs",icon:h.logs},{id:"settings",label:"Settings",icon:h.settings}],Ot={dashboard:"dashboard",groups:"groups","group-detail":"groups",members:"members","member-detail":"members",clients:"clients","client-detail":"clients",policies:"policies","policy-detail":"policies",profiles:"profiles","profile-detail":"profiles",schedules:"schedules",services:"services",override:"override",logs:"logs",settings:"settings"};let q=class extends y{constructor(){super(...arguments),this.activeView="dashboard",this.state=null,this.protectionEnabled=!0}_icon(t){return B`<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="${t}"></path></svg>`}_badgeFor(t){if(this.state)switch(t){case"groups":return this.state.groups.length||void 0;case"members":return this.state.members.length||void 0;case"clients":return this.state.clients.length||void 0;case"policies":return this.state.policies.length||void 0;case"profiles":return this.state.profiles.length||void 0;case"override":return this.state.overrides.length||void 0;default:return}}render(){const t=Ot[this.activeView]||"dashboard";return l`
      <div class="brand">
        <div class="brand-icon">${this._icon(h.shield)}</div>
        <div class="brand-text">
          <div class="brand-title">AdGuard</div>
          <div class="brand-sub">Parental Control</div>
        </div>
      </div>

      <nav class="nav">
        ${Ht.map(e=>{const i=this._badgeFor(e.id),s=e.id===t;return l`
            <button
              class="nav-item ${s?"active":""}"
              @click=${()=>{var a;return(a=this.onNavigate)==null?void 0:a.call(this,e.id)}}
            >
              <span class="nav-icon">${this._icon(e.icon)}</span>
              <span class="nav-label">${e.label}</span>
              ${i!==void 0?l`<span class="nav-badge">${i}</span>`:""}
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
    `}};q.styles=w`
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
  `;se([c({type:String})],q.prototype,"activeView",2);se([c({attribute:!1})],q.prototype,"state",2);se([c({type:Boolean})],q.prototype,"protectionEnabled",2);se([c({type:Object})],q.prototype,"onNavigate",2);se([c({type:Object})],q.prototype,"onToggleProtection",2);q=se([A("agpc-sidebar")],q);var zt=Object.defineProperty,Vt=Object.getOwnPropertyDescriptor,Y=(t,e,i,s)=>{for(var a=s>1?void 0:s?Vt(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&zt(e,i,a),a};let O=class extends y{constructor(){super(...arguments),this.title="Dashboard",this.showBack=!1,this.lastSync=null,this.syncing=!1}_icon(t,e=18){return B`<svg viewBox="0 0 24 24" width="${e}" height="${e}"><path fill="currentColor" d="${t}"></path></svg>`}render(){return l`
      <div class="left">
        ${this.showBack?l`
              <button class="icon-btn" @click=${()=>{var t;return(t=this.onBack)==null?void 0:t.call(this)}} aria-label="Back">
                ${this._icon(h.back)}
              </button>
            `:u}
        <h1>${this.title}</h1>
      </div>
      <div class="right">
        ${this.lastSync?l`<span class="sync-label">Last sync: ${this.lastSync}</span>`:u}
        <button class="icon-btn ${this.syncing?"spinning":""}" @click=${()=>{var t;return(t=this.onRefresh)==null?void 0:t.call(this)}} aria-label="Refresh">
          ${this._icon(h.sync)}
        </button>
        <button class="icon-btn" aria-label="Toggle theme">${this._icon(h.moon)}</button>
        <button class="icon-btn" aria-label="More">${this._icon(h.dots)}</button>
      </div>
    `}};O.styles=w`
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
  `;Y([c({type:String})],O.prototype,"title",2);Y([c({type:Boolean})],O.prototype,"showBack",2);Y([c({type:String})],O.prototype,"lastSync",2);Y([c({type:Boolean})],O.prototype,"syncing",2);Y([c({type:Object})],O.prototype,"onBack",2);Y([c({type:Object})],O.prototype,"onRefresh",2);O=Y([A("agpc-topbar")],O);class jt{constructor(e){this.hass=e}async getState(){return this.hass.callWS({type:"adguard_pc/state/get"})}async updateState(e){await this.hass.callWS({type:"adguard_pc/state/update",state:e})}async getStatus(){return this.hass.callWS({type:"adguard_pc/status"})}async sync(){return this.hass.callWS({type:"adguard_pc/sync"})}async listProfiles(){return this.hass.callWS({type:"adguard_pc/profiles/list"})}async createProfile(e){return this.hass.callWS({type:"adguard_pc/profiles/create",profile:e})}async updateProfile(e){return this.hass.callWS({type:"adguard_pc/profiles/update",profile:e})}async deleteProfile(e){await this.hass.callWS({type:"adguard_pc/profiles/delete",profile_id:e})}async listGroups(){return this.hass.callWS({type:"adguard_pc/groups/list"})}async createGroup(e){return this.hass.callWS({type:"adguard_pc/groups/create",group:e})}async updateGroup(e){return this.hass.callWS({type:"adguard_pc/groups/update",group:e})}async deleteGroup(e){await this.hass.callWS({type:"adguard_pc/groups/delete",group_id:e})}async listMembers(){return this.hass.callWS({type:"adguard_pc/members/list"})}async createMember(e){return this.hass.callWS({type:"adguard_pc/members/create",member:e})}async updateMember(e){return this.hass.callWS({type:"adguard_pc/members/update",member:e})}async deleteMember(e){await this.hass.callWS({type:"adguard_pc/members/delete",member_id:e})}async getMemberQueryLog(e,i={}){return this.hass.callWS({type:"adguard_pc/members/querylog",member_id:e,limit:i.limit??50,search:i.search??"",response_status:i.responseStatus??""})}async listClients(){return this.hass.callWS({type:"adguard_pc/clients/list"})}async createClient(e){return this.hass.callWS({type:"adguard_pc/clients/create",client:e})}async updateClient(e){return this.hass.callWS({type:"adguard_pc/clients/update",client:e})}async deleteClient(e){await this.hass.callWS({type:"adguard_pc/clients/delete",client_id:e})}async listPolicies(){return this.hass.callWS({type:"adguard_pc/policies/list"})}async createPolicy(e){return this.hass.callWS({type:"adguard_pc/policies/create",policy:e})}async updatePolicy(e){return this.hass.callWS({type:"adguard_pc/policies/update",policy:e})}async deletePolicy(e){await this.hass.callWS({type:"adguard_pc/policies/delete",policy_id:e})}async setOverride(e,i,s,a){return this.hass.callWS({type:"adguard_pc/overrides/set",target:e,target_type:i,action:s,duration_minutes:a})}async clearOverride(e){await this.hass.callWS({type:"adguard_pc/overrides/clear",override_id:e})}async listServices(){return this.hass.callWS({type:"adguard_pc/services/list"})}async getBlockedServices(){return this.hass.callWS({type:"adguard_pc/services/blocked"})}async updateBlockedServices(e){await this.hass.callWS({type:"adguard_pc/services/update",blocked_ids:e})}}var Wt=Object.defineProperty,qt=Object.getOwnPropertyDescriptor,pe=(t,e,i,s)=>{for(var a=s>1?void 0:s?qt(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&Wt(e,i,a),a};const Bt={mon:"Mon",tue:"Tue",wed:"Wed",thu:"Thu",fri:"Fri",sat:"Sat",sun:"Sun"};let Q=class extends y{_icon(t,e=16){return B`<svg viewBox="0 0 24 24" width="${e}" height="${e}"><path fill="currentColor" d="${t}"></path></svg>`}_scheduleRows(){return this.state.policies.filter(t=>t.time_schedule).map(t=>({policyId:t.id,policyName:t.name,priority:t.priority,days:t.time_schedule.days,timeFrom:t.time_schedule.time_from,timeTo:t.time_schedule.time_to,rulesCount:t.rules.length})).sort((t,e)=>e.priority-t.priority)}_unscheduledPolicies(){return this.state.policies.filter(t=>!t.time_schedule)}render(){if(!this.state)return l``;const t=this._scheduleRows(),e=this._unscheduledPolicies();return l`
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

        ${t.length===0?l`<div class="empty-state">No schedules configured yet. Add a time schedule to a policy to see it here.</div>`:l`
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
                  ${t.map(i=>l`
                    <tr class="clickable" @click=${()=>{var a;const s=this.state.policies.find(o=>o.id===i.policyId);s&&((a=this.onNavigate)==null||a.call(this,"policy-detail",s))}}>
                      <td class="name-cell">
                        <div class="policy-name">${i.policyName}</div>
                        <div class="policy-sub">Priority ${i.priority}</div>
                      </td>
                      <td>
                        <div class="day-chips">
                          ${["mon","tue","wed","thu","fri","sat","sun"].map(s=>l`<span class="day-chip ${i.days.includes(s)?"active":""}">${Bt[s]}</span>`)}
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

      ${e.length>0?l`
        <div class="card">
          <div class="card-head">
            <div class="head-left">
              <h2>Unscheduled Policies <span class="count">(${e.length})</span></h2>
            </div>
          </div>
          <div class="unscheduled-list">
            ${e.map(i=>l`
              <div class="unscheduled-item clickable" @click=${()=>{var s;return(s=this.onNavigate)==null?void 0:s.call(this,"policy-detail",i)}}>
                <span class="unscheduled-name">${i.name}</span>
                <span class="unscheduled-hint">Active at all times · ${i.rules.length} rules</span>
                <span class="icon-btn">${this._icon(h.chevronRight,14)}</span>
              </div>
            `)}
          </div>
        </div>
      `:""}
    `}};Q.styles=[ie,w`
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
    `];pe([c({attribute:!1})],Q.prototype,"hass",2);pe([c({attribute:!1})],Q.prototype,"state",2);pe([c({type:Object})],Q.prototype,"onNavigate",2);pe([c({type:Object})],Q.prototype,"onStateChanged",2);Q=pe([A("schedule-view")],Q);var It=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,E=(t,e,i,s)=>{for(var a=s>1?void 0:s?Ut(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&It(e,i,a),a};const je={video:"Video",social:"Social",games:"Games",gambling:"Gambling",adult:"Adult",music:"Music",messaging:"Messaging",cloud:"Cloud",p2p:"P2P",shopping:"Shopping",education:"Education",other:"Other"};let M=class extends y{constructor(){super(...arguments),this._services=[],this._loading=!0,this._search="",this._saving=!1,this._selectedCategory="all"}connectedCallback(){super.connectedCallback(),this._loadServices(),this._pollHandle=setInterval(()=>this._loadServices(),3e4)}disconnectedCallback(){super.disconnectedCallback(),this._pollHandle&&clearInterval(this._pollHandle)}updated(t){t.has("hass")&&this.hass&&this._loading&&this._loadServices()}async _loadServices(){if(this.hass)try{this._services=await this.hass.callWS({type:"adguard_pc/services/list"}),this._loading=!1}catch(t){console.error("Failed to load services:",t),this._loading=!1}}async _toggleBlocked(t){var e;if(!this._saving){this._saving=!0;try{const i=this._services.filter(a=>a.blocked).map(a=>a.id);let s;t.blocked?s=i.filter(a=>a!==t.id):s=[...i,t.id],await this.hass.callWS({type:"adguard_pc/services/update",blocked_ids:s}),t.blocked=!t.blocked,this._services=[...this._services],(e=this.onStateChanged)==null||e.call(this)}catch(i){console.error("Failed to toggle service:",i)}this._saving=!1}}_getCategories(){const t=new Set;for(const e of this._services)e.categories&&e.categories.length&&e.categories.forEach(i=>t.add(i));return[...t].sort()}_getFilteredServices(){const t=this._search.toLowerCase();return this._services.filter(e=>{const i=!this._search||e.name.toLowerCase().includes(t)||e.id.toLowerCase().includes(t),s=this._selectedCategory==="all"||e.categories&&e.categories.includes(this._selectedCategory);return i&&s})}_getServicesByCategory(){const t=this._getFilteredServices(),e=new Map;for(const i of t){const s=i.categories&&i.categories.length?i.categories:["other"];for(const a of s)e.has(a)||e.set(a,[]),e.get(a).push(i)}return e}_icon(t,e=16){return B`<svg viewBox="0 0 24 24" width="${e}" height="${e}"><path fill="currentColor" d="${t}"></path></svg>`}render(){if(!this.state)return l``;const t=this._services.filter(a=>a.blocked).length,e=this._getCategories(),i=this._getServicesByCategory(),s=this._getFilteredServices().length;return l`
      <div class="card">
        <div class="card-head">
          <div class="head-left">
            <div class="head-icon">${this._icon(h.services,18)}</div>
            <h2>Blocked Services <span class="count">(${t} / ${this._services.length})</span></h2>
          </div>
        </div>

        ${this._loading?l`<div class="loading-msg">Loading services…</div>`:l`
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
                ${e.map(a=>l`
                  <button class="cat-tab ${this._selectedCategory===a?"active":""}"
                    @click=${()=>{this._selectedCategory=a}}>
                    ${je[a]||a}
                    <span class="cat-count">${this._services.filter(o=>{var r;return(r=o.categories)==null?void 0:r.includes(a)}).length}</span>
                  </button>
                `)}
              </div>

              ${this._selectedCategory==="all"?l`
                    ${[...i.entries()].map(([a,o])=>l`
                      <div class="category-section">
                        <div class="cat-header">
                          <span class="cat-title">${je[a]||a}</span>
                          <span class="cat-badge">${o.filter(r=>r.blocked).length} / ${o.length} blocked</span>
                        </div>
                        <div class="service-grid">
                          ${o.map(r=>this._renderService(r))}
                        </div>
                      </div>
                    `)}
                  `:l`
                    <div class="service-grid">
                      ${this._getFilteredServices().map(a=>this._renderService(a))}
                    </div>
                  `}

              ${s===0?l`
                <div class="empty-state">
                  ${this._search?"No services match your search":"No services in this category"}
                </div>
              `:""}
            `}
      </div>
    `}_renderService(t){return l`
      <div class="service-item ${t.blocked?"blocked":"allowed"}" @click=${()=>this._toggleBlocked(t)}>
        <div class="svc-left">
          <div class="svc-icon">${t.icon||"🌐"}</div>
          <div class="svc-info">
            <div class="svc-name">${t.name}</div>
            <div class="svc-id">${t.id}</div>
          </div>
        </div>
        <div class="svc-toggle ${t.blocked?"on":""}">
          <div class="toggle-track">
            <div class="toggle-thumb"></div>
          </div>
          <span class="toggle-label">${t.blocked?"Blocked":"Allowed"}</span>
        </div>
      </div>
    `}};M.styles=[ie,w`
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
      .svc-icon { font-size: 18px; width: 26px; text-align: center; }
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
      .toggle-label { font-size: 10.5px; color: var(--agpc-text-faint); }
      .svc-toggle.on .toggle-label { color: var(--agpc-red); font-weight: 600; }

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
    `];E([c({attribute:!1})],M.prototype,"hass",2);E([c({attribute:!1})],M.prototype,"state",2);E([c({type:Object})],M.prototype,"onNavigate",2);E([c({type:Object})],M.prototype,"onStateChanged",2);E([d()],M.prototype,"_services",2);E([d()],M.prototype,"_loading",2);E([d()],M.prototype,"_search",2);E([d()],M.prototype,"_saving",2);E([d()],M.prototype,"_selectedCategory",2);M=E([A("services-view")],M);var Ft=Object.defineProperty,Zt=Object.getOwnPropertyDescriptor,L=(t,e,i,s)=>{for(var a=s>1?void 0:s?Zt(e,i):e,o=t.length-1,r;o>=0;o--)(r=t[o])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&Ft(e,i,a),a};const Gt={logs:{title:"Logs",description:"Query and activity logs will appear here once log streaming is wired up."},settings:{title:"Settings",description:"Integration and sync settings will be available here soon."}};let k=class extends y{constructor(){super(...arguments),this._view="dashboard",this._state=null,this._selectedClient=null,this._selectedPolicy=null,this._selectedGroup=null,this._selectedMember=null,this._selectedProfile=null,this._loading=!0,this._syncing=!1,this._protectionEnabled=!0,this._lastSync=null,this._api=null,this._navigate=(t,e)=>{this._view=t,t==="client-detail"&&e&&(this._selectedClient=e),t==="policy-detail"&&e&&(this._selectedPolicy=e),t==="group-detail"&&e&&(this._selectedGroup=e),t==="member-detail"&&e&&(this._selectedMember=e),t==="profile-detail"&&e&&(this._selectedProfile=e),this._loadState(),this.requestUpdate()},this._onStateChanged=async()=>{await this._loadState()},this._sync=async()=>{if(!(!this.hass||this._syncing)){this._syncing=!0;try{await this.hass.callWS({type:"adguard_pc/sync"}),await this._loadState()}catch(t){console.error("Sync failed:",t)}finally{this._syncing=!1}}}}updated(t){t.has("hass")&&this.hass&&!this._api&&(this._api=new jt(this.hass),this._loadState())}async _loadState(){if(this._api)try{this._state=await this._api.getState(),this._lastSync=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch(t){console.error("Failed to load state:",t)}finally{this._loading=!1}}render(){if(this._loading)return l`
        <div class="shell">
          <div class="loading">
            <div class="spinner"></div>
            <p>Loading AdGuard Parental Control…</p>
          </div>
        </div>
      `;if(!this._state)return l`
        <div class="shell">
          <div class="loading">
            <p>Failed to load state. Check your AdGuard Home connection.</p>
          </div>
        </div>
      `;const t=this._view.endsWith("-detail")||this._view==="override";return l`
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
    `}get _viewTitle(){var t,e,i,s,a;switch(this._view){case"client-detail":return((t=this._selectedClient)==null?void 0:t.name)||"Client";case"policy-detail":return((e=this._selectedPolicy)==null?void 0:e.name)||"Policy";case"group-detail":return((i=this._selectedGroup)==null?void 0:i.name)||"Group";case"member-detail":return((s=this._selectedMember)==null?void 0:s.name)||"Member";case"profile-detail":return((a=this._selectedProfile)==null?void 0:a.name)||"Profile";case"override":return"Overrides";case"groups":return"Groups";case"members":return"Members";case"clients":return"Clients";case"policies":return"Policies";case"profiles":return"Profiles";case"schedules":return"Schedules";case"services":return"Services";case"logs":return"Logs";case"settings":return"Settings";default:return"Dashboard"}}_renderContent(){switch(this._view){case"dashboard":return l`<dashboard-view .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate}></dashboard-view>`;case"client-detail":return l`<client-view .state=${this._state} .hass=${this.hass} .client=${this._selectedClient} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></client-view>`;case"policy-detail":return l`<policy-view .state=${this._state} .hass=${this.hass} .policy=${this._selectedPolicy} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></policy-view>`;case"group-detail":return l`<group-view .state=${this._state} .hass=${this.hass} .group=${this._selectedGroup} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></group-view>`;case"member-detail":return l`<member-view .state=${this._state} .hass=${this.hass} .member=${this._selectedMember} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></member-view>`;case"profile-detail":return l`<profile-view .state=${this._state} .hass=${this.hass} .profile=${this._selectedProfile} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></profile-view>`;case"override":return l`<override-view .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></override-view>`;case"groups":return l`<list-view kind="groups" .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></list-view>`;case"members":return l`<list-view kind="members" .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></list-view>`;case"clients":return l`<list-view kind="clients" .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></list-view>`;case"policies":return l`<list-view kind="policies" .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></list-view>`;case"profiles":return l`<list-view kind="profiles" .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></list-view>`;case"schedules":return l`<schedule-view .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></schedule-view>`;case"services":return l`<services-view .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate} .onStateChanged=${this._onStateChanged}></services-view>`;case"logs":case"settings":{const t=Gt[this._view];return l`<placeholder-view .title=${t.title} .description=${t.description}></placeholder-view>`}default:return l`<dashboard-view .state=${this._state} .hass=${this.hass} .onNavigate=${this._navigate}></dashboard-view>`}}};k.styles=[gt,w`
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
    `];L([c({attribute:!1})],k.prototype,"hass",2);L([d()],k.prototype,"_view",2);L([d()],k.prototype,"_state",2);L([d()],k.prototype,"_selectedClient",2);L([d()],k.prototype,"_selectedPolicy",2);L([d()],k.prototype,"_selectedGroup",2);L([d()],k.prototype,"_selectedMember",2);L([d()],k.prototype,"_selectedProfile",2);L([d()],k.prototype,"_loading",2);L([d()],k.prototype,"_syncing",2);L([d()],k.prototype,"_protectionEnabled",2);L([d()],k.prototype,"_lastSync",2);k=L([A("adguard-parental-control")],k);

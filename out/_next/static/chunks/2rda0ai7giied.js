(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,[8341,(e,t,r)=>{Object.defineProperty(r,"__esModule",{value:!0});var n={cancelIdleCallback:function(){return o},requestIdleCallback:function(){return a}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a="u">typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},o="u">typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},79520,(e,t,r)=>{Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return x},handleClientScriptLoad:function(){return g},initScriptLoader:function(){return _}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a=e.r(55682),o=e.r(90809),l=e.r(43476),c=a._(e.r(74080)),s=o._(e.r(71645)),u=e.r(42732),f=e.r(22737),d=e.r(8341),m=e.r(19083),p=new Map,h=new Set,v=e=>{let{src:t,id:r,onLoad:n=()=>{},onReady:i=null,dangerouslySetInnerHTML:a,children:o="",strategy:l="afterInteractive",onError:s,stylesheets:u}=e,d=r||t;if(d&&h.has(d))return;if(p.has(t)){h.add(d),p.get(t).then(n,s);return}let m=()=>{i&&i(),h.add(d)},v=document.createElement("script"),g=new Promise((e,t)=>{v.addEventListener("load",function(t){e(),n&&n.call(this,t),m()}),v.addEventListener("error",function(e){t(e)})}).catch(function(e){s&&s(e)});a?(v.innerHTML=a.__html||"",m()):o?(v.textContent="string"==typeof o?o:Array.isArray(o)?o.join(""):"",m()):t&&(v.src=t,p.set(t,g)),(0,f.setAttributesFromProps)(v,e),"worker"===l&&v.setAttribute("type","text/partytown"),v.setAttribute("data-nscript",l),u&&(e=>{if(c.default.preinit)return e.forEach(e=>{c.default.preinit(e,{as:"style"})});if("u">typeof window){let t=document.head;e.forEach(e=>{let r=document.createElement("link");r.type="text/css",r.rel="stylesheet",r.href=e,t.appendChild(r)})}})(u),document.body.appendChild(v)};function g(e){let{strategy:t="afterInteractive"}=e;"lazyOnload"===t?window.addEventListener("load",()=>{(0,d.requestIdleCallback)(()=>v(e))}):v(e)}function _(e){e.forEach(g),[...document.querySelectorAll('[data-nscript="beforeInteractive"]'),...document.querySelectorAll('[data-nscript="beforePageRender"]')].forEach(e=>{let t=e.id||e.getAttribute("src");h.add(t)})}function b(e){let{id:t,src:r="",onLoad:n=()=>{},onReady:i=null,strategy:a="afterInteractive",onError:o,stylesheets:f,...p}=e,{updateScripts:g,scripts:_,getIsSsr:b,appDir:x,nonce:y}=(0,s.useContext)(u.HeadManagerContext);y=p.nonce||y;let S=(0,s.useRef)(!1);(0,s.useEffect)(()=>{let e=t||r;S.current||(i&&e&&h.has(e)&&i(),S.current=!0)},[i,t,r]);let j=(0,s.useRef)(!1);if((0,s.useEffect)(()=>{if(!j.current){if("afterInteractive"===a)v(e);else"lazyOnload"===a&&("complete"===document.readyState?(0,d.requestIdleCallback)(()=>v(e)):window.addEventListener("load",()=>{(0,d.requestIdleCallback)(()=>v(e))}));j.current=!0}},[e,a]),("beforeInteractive"===a||"worker"===a)&&(g?(_[a]=(_[a]||[]).concat([{id:t,src:r,onLoad:n,onReady:i,onError:o,...p,nonce:y}]),g(_)):b&&b()?h.add(t||r):b&&!b()&&v({...e,nonce:y})),x){if(f&&f.forEach(e=>{c.default.preinit(e,{as:"style"})}),"beforeInteractive"===a)if(!r)return p.dangerouslySetInnerHTML&&(p.children=p.dangerouslySetInnerHTML.__html,delete p.dangerouslySetInnerHTML),(0,l.jsx)("script",{nonce:y,dangerouslySetInnerHTML:{__html:`(self.__next_s=self.__next_s||[]).push(${(0,m.htmlEscapeJsonString)(JSON.stringify([0,{...p,id:t}]))})`}});else return c.default.preload(r,p.integrity?{as:"script",integrity:p.integrity,nonce:y,crossOrigin:p.crossOrigin}:{as:"script",nonce:y,crossOrigin:p.crossOrigin}),(0,l.jsx)("script",{nonce:y,dangerouslySetInnerHTML:{__html:`(self.__next_s=self.__next_s||[]).push(${(0,m.htmlEscapeJsonString)(JSON.stringify([r,{...p,id:t}]))})`}});"afterInteractive"===a&&r&&c.default.preload(r,p.integrity?{as:"script",integrity:p.integrity,nonce:y,crossOrigin:p.crossOrigin}:{as:"script",nonce:y,crossOrigin:p.crossOrigin})}return null}Object.defineProperty(b,"__nextScript",{value:!0});let x=b;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},19083,(e,t,r)=>{Object.defineProperty(r,"__esModule",{value:!0});var n={ESCAPE_REGEX:function(){return o},htmlEscapeAttributeString:function(){return u},htmlEscapeJsonString:function(){return s}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let a={"&":"\\u0026",">":"\\u003e","<":"\\u003c","\u2028":"\\u2028","\u2029":"\\u2029"},o=/[&><\u2028\u2029]/g,l={"&":"&amp;",'"':"&quot;","'":"&#39;","<":"&lt;",">":"&gt;"},c=/[&"'<>]/g;function s(e){return e.replace(o,e=>a[e])}function u(e){return e.replace(c,e=>l[e])}},95940,e=>{var t=e.i(43476),r=e.i(3303),n=e.i(71645);e.s(["FrascoPerfume",0,function(){let e=(0,n.useRef)(null);return(0,n.useEffect)(()=>{let t=document.createElement("perfume-spray");return t.style.cssText="position:absolute;inset:0",e.current?.appendChild(t),()=>t.remove()},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.default,{src:"/frasco-perfume.js",strategy:"afterInteractive"}),(0,t.jsx)("div",{ref:e,style:{position:"absolute",inset:0}})]})}])},94833,e=>{var t=e.i(43476),r=e.i(71645);let n=`
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,i=`
precision highp float;

varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_pointer_strength;
uniform float u_time;
uniform float u_distortion;
uniform float u_scale;
uniform vec3 u_base;
uniform vec3 u_metal;
uniform vec3 u_highlight;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + 1.0), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float weight = 0.52;
  mat2 rotation = mat2(0.80, -0.60, 0.60, 0.80);
  for (int octave = 0; octave < 4; octave++) {
    value += noise(p) * weight;
    p = rotation * p * 2.03 + 17.17;
    weight *= 0.5;
  }
  return value;
}

float liquidField(vec2 p, float time) {
  vec2 drift = vec2(time * 0.045, -time * 0.032);
  vec2 firstWarp = vec2(
    fbm(p * 0.72 + drift),
    fbm(p * 0.76 + vec2(5.2, 1.3) - drift.yx)
  );
  vec2 secondWarp = vec2(
    fbm(p * 0.78 + firstWarp * 2.7 + vec2(1.7, 9.2) + drift * 1.3),
    fbm(p * 0.74 + firstWarp * 2.5 + vec2(8.3, 2.8) - drift * 1.1)
  );
  return fbm(p * 0.68 + secondWarp * (2.75 * u_distortion));
}

void main() {
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (v_uv - 0.5) * vec2(aspect, 1.0) * u_scale;
  vec2 pointer = (u_pointer - 0.5) * vec2(aspect, 1.0) * u_scale;
  vec2 delta = p - pointer;
  float pointerFalloff = exp(-dot(delta, delta) * 2.6);
  float distanceFromPointer = max(length(delta), 0.001);
  p += (delta / distanceFromPointer) * pointerFalloff * u_distortion * 0.16 * u_pointer_strength;

  float field = liquidField(p, u_time);
  float shadow = smoothstep(0.18, 0.42, field);
  float silver = smoothstep(0.38, 0.64, field);
  float specular = smoothstep(0.60, 0.82, field);
  vec3 color = mix(vec3(0.0), u_base, shadow);
  color = mix(color, u_metal, silver * 0.88);
  color = mix(color, u_highlight, specular * 0.94);

  float softReflection = smoothstep(0.0, 0.13, 0.13 - abs(field - 0.51));
  color = mix(color, u_highlight, softReflection * 0.12);
  color += (hash21(gl_FragCoord.xy + floor(u_time * 12.0)) - 0.5) * 0.004;

  float vignette = 1.0 - smoothstep(0.48, 1.08, length((v_uv - 0.5) * vec2(0.82, 1.0)));
  color *= 0.76 + vignette * 0.24;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`,a=[.078,.063,.043],o=[.56,.42,.2],l=[.95,.8,.48];function c(e,t,r){let n=e.createShader(t);return n?(e.shaderSource(n,r),e.compileShader(n),e.getShaderParameter(n,e.COMPILE_STATUS))?n:(e.deleteShader(n),null):null}e.s(["MetalLiquido",0,function(){let e=(0,r.useRef)(null),s=(0,r.useRef)(null),[u,f]=(0,r.useState)(!0);return(0,r.useEffect)(()=>{let t,r=e.current,u=s.current,d=r?.parentElement;if(!r||!u||!d)return;let m=u.getContext("webgl",{alpha:!1,antialias:!1,depth:!1,stencil:!1});if(!m)return f(!1);let p=c(m,m.VERTEX_SHADER,n),h=c(m,m.FRAGMENT_SHADER,i),v=m.createProgram(),g=m.createBuffer();if(!p||!h||!v||!g||(m.attachShader(v,p),m.attachShader(v,h),m.linkProgram(v),m.deleteShader(p),m.deleteShader(h),!m.getProgramParameter(v,m.LINK_STATUS)))return f(!1);m.useProgram(v),m.bindBuffer(m.ARRAY_BUFFER,g),m.bufferData(m.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),m.STATIC_DRAW);let _=m.getAttribLocation(v,"a_position");m.enableVertexAttribArray(_),m.vertexAttribPointer(_,2,m.FLOAT,!1,0,0),m.uniform1f(m.getUniformLocation(v,"u_distortion"),.6),m.uniform1f(m.getUniformLocation(v,"u_scale"),.92),m.uniform3fv(m.getUniformLocation(v,"u_base"),a),m.uniform3fv(m.getUniformLocation(v,"u_metal"),o),m.uniform3fv(m.getUniformLocation(v,"u_highlight"),l);let b=m.getUniformLocation(v,"u_resolution"),x=m.getUniformLocation(v,"u_pointer"),y=m.getUniformLocation(v,"u_pointer_strength"),S=m.getUniformLocation(v,"u_time"),j=window.matchMedia("(prefers-reduced-motion: reduce)").matches,E=0,w=performance.now(),A=!0,L={x:.5,y:.5,f:0,ax:.5,ay:.5,af:0};function M(e){t=void 0;let n=Math.min(Math.max((e-w)/1e3,0),.05);w=e,j||(E+=.72*n);let i=1-Math.exp(-(8*n));L.ax+=(L.x-L.ax)*i,L.ay+=(L.y-L.ay)*i,L.af+=((j?0:L.f)-L.af)*i;let a=r.getBoundingClientRect(),o=Math.max(1,Math.round(+a.width)),l=Math.max(1,Math.round(+a.height));(u.width!==o||u.height!==l)&&(u.width=o,u.height=l),m.viewport(0,0,o,l),m.uniform2f(b,o,l),m.uniform2f(x,L.ax,L.ay),m.uniform1f(y,L.af),m.uniform1f(S,E),m.drawArrays(m.TRIANGLES,0,3),A&&!j&&(t=requestAnimationFrame(M))}function C(){void 0===t&&A&&(w=performance.now(),t=requestAnimationFrame(M))}function I(e){let t=r.getBoundingClientRect();L.x=Math.min(Math.max((e.clientX-t.left)/t.width,0),1),L.y=1-Math.min(Math.max((e.clientY-t.top)/t.height,0),1),L.f=1,C()}function O(){L.x=.5,L.y=.5,L.f=0,C()}function P(e){e.preventDefault(),void 0!==t&&cancelAnimationFrame(t),t=void 0,f(!1)}let R=new ResizeObserver(C),T=new IntersectionObserver(([e])=>{(A=!!e?.isIntersecting)?C():void 0!==t&&(cancelAnimationFrame(t),t=void 0)});return R.observe(r),T.observe(r),d.addEventListener("pointermove",I),d.addEventListener("pointerleave",O),u.addEventListener("webglcontextlost",P),C(),()=>{void 0!==t&&cancelAnimationFrame(t),R.disconnect(),T.disconnect(),d.removeEventListener("pointermove",I),d.removeEventListener("pointerleave",O),u.removeEventListener("webglcontextlost",P),m.deleteBuffer(g),m.deleteProgram(v)}},[]),(0,t.jsx)("div",{ref:e,"aria-hidden":"true",className:"metal-liquido",children:u&&(0,t.jsx)("canvas",{ref:s})})}])},41830,e=>{var t=e.i(43476),r=e.i(22016),n=e.i(71645),i=e.i(2468),a=e.i(13904);function o(e,t){return e?t?"Sumar a cotización":"Añadir a cotización":t?"Sumar a mi consulta":"Agregar a mi consulta"}e.s(["TarjetaProducto",0,function({producto:e,mayorista:l=!1}){let{agregar:c,tiene:s}=(0,a.useTienda)(),[u,f]=(0,n.useState)(1),d=(0,i.v)(e);return(0,t.jsxs)("article",{className:"tarjeta",children:[(0,t.jsxs)(r.default,{href:d,"aria-label":e.nombre,className:"tarjeta-foto",children:[(0,t.jsx)("div",{className:"ph ph-claro",children:(0,t.jsx)("span",{className:"ph-texto",style:{fontSize:10.5,letterSpacing:".06em"},children:e.foto})}),(0,t.jsx)("div",{className:"ph ph-claro-b",children:(0,t.jsx)("span",{className:"ph-texto",style:{fontSize:10.5,letterSpacing:".06em"},children:"Segunda foto · detalle"})})]}),(0,t.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:5},children:[(0,t.jsx)("span",{className:"rotulo",children:e.marca}),(0,t.jsx)(r.default,{href:d,className:"tarjeta-nombre",children:e.nombre}),(0,t.jsx)("span",{style:{fontSize:13,color:"var(--texto-3)"},children:e.presentacion})]}),l&&(0,t.jsxs)("div",{className:"contador",children:[(0,t.jsx)("button",{type:"button",onClick:()=>f(e=>Math.max(1,e-1)),"aria-label":"Restar",children:"−"}),(0,t.jsx)("span",{style:{fontSize:14},children:u}),(0,t.jsx)("button",{type:"button",onClick:()=>f(e=>e+1),"aria-label":"Sumar",children:"+"})]}),(0,t.jsxs)("div",{className:"tarjeta-pie",children:[(0,t.jsx)("span",{style:{fontSize:13,fontWeight:600},children:(0,i.l)(e)}),(0,t.jsx)("button",{type:"button",className:"btn-texto",onClick:()=>c(e.slug,l?u:1,e.nombre),children:o(l,s(e.slug))})]})]})},"etiquetaAgregar",0,o])}],3303,(e,t,r)=>{t.exports=e.r(79520)}]);
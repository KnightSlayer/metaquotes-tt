var T=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var y=(u,e)=>{var t={};for(var n in u)_.call(u,n)&&e.indexOf(n)<0&&(t[n]=u[n]);if(u!=null&&T)for(var n of T(u))e.indexOf(n)<0&&X.call(u,n)&&(t[n]=u[n]);return t};const Y=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}};Y();const B=new Set,U=()=>{B.forEach(u=>u())};window.addEventListener("popstate",U);const m={push(u){window.history.pushState({},"",u),U()},subscribe(u){return B.add(u),()=>B.delete(u)}},c=()=>btoa(Math.random().toString());var z="/assets/telegram_logo.22b156c4.png";function V(){document.querySelectorAll("a:not([target])").forEach(u=>{u.addEventListener("click",e=>{e.preventDefault();const t=e.target;m.push(t.href)})})}const K=(u,e)=>{const t={main:c(),footer:c()};u.innerHTML=`
    <header>
      <h1> This is Edgar Abgaryan's test task </h1>
      <nav>
        <a href="/">\u0413\u043B\u0430\u0432\u043D\u0430\u044F</a>
        &nbsp;
        &nbsp;
        &nbsp;
        <a href="/about">\u041E \u0437\u0430\u0434\u0430\u0447\u0435</a>
      </nav>
    </header>

    <main id="${t.main}"></main>

    <footer>
      <a href="https://t.me/eabgaryan" target="_blank">
        Contact me in telegram
        <img src=${z} alt="telegram logo" />
      </a>
      <div id="${t.footer}"></div>
    </footer>
  `,Object.entries(t).forEach(([n,o])=>{const r=document.getElementById(o);r.attributes.removeNamedItem("id");const s=e[n];s?s(r):r.remove()}),V()};function p(u){return new URL(document.location.href).searchParams.get(u)}function M(u,e){let t=p(u);return m.subscribe(()=>{const n=p(u);n!==t&&(t=n,e(n))})}const a=u=>({get:()=>p(u),set(e){const t=new URL(document.location.href);t.searchParams.set(u,e),m.push(t.href)},onChange:e=>M(u,e),sync:e=>(e(p(u)),M(u,e))}),C={PRECIPITATION:"precipitation",TEMPERATURE:"temperature"},i=Object.freeze({FROM:"from",TO:"to",GRAPH:"graph"}),d=Object.freeze({MIN:1881,MAX:2006}),g=900,E=450,I=40,x=25,w=55,J=30,j=(u,e)=>{if(!u||!/^[12]\d{3}$/.test(u))return e;const t=parseInt(u);return t<d.MIN||t>d.MAX?e:u},G=(u=a(i.FROM).get())=>j(u,d.MIN.toString()),b=(u=a(i.TO).get())=>j(u,d.MAX.toString()),A=(u=a(i.GRAPH).get())=>{const e="temperature";return u&&Object.values(C).find(t=>t===u)||e},h=Symbol(),F=(u,e)=>{var t;u.dataset.onUnmount="",u[h]||(u[h]=[]),(t=u[h])==null||t.push(e)},Q=u=>{u.querySelectorAll("[data-on-unmount]").forEach(e=>{var t;return(t=e[h])==null?void 0:t.forEach(n=>n())})};function Z(){return new Worker("/assets/graphWorker.1284acf5.js",{type:"module"})}const u4=u=>{let e=new u;return{postMessage:(...t)=>e.postMessage(...t),set onmessage(t){e.onmessage=t},terminate:()=>{const t=e.onmessage;e.terminate(),e=new u,e.onmessage=t}}};let D=u4(Z);const e4={[C.TEMPERATURE]:" \xB0C",[C.PRECIPITATION]:" \u043C\u043C"},t4=u=>{u.fillStyle="#FFFFFA",u.fillRect(0,0,g,E)},n4=(u,e,t)=>{u.strokeStyle="#CCCCCA",u.lineWidth=.5,u.fillStyle="black",u.font="14px sans",u.textAlign="right",u.textBaseline="middle";const n=t.yLabel||(o=>o);e.y.forEach(({value:o,label:r})=>{u.fillText(n(r),w-5,o),u.beginPath(),u.moveTo(w-4,o),u.lineTo(g-J+4,o),u.stroke()}),u.textAlign="center",u.textBaseline="top",e.x.forEach(({value:o,label:r})=>{u.fillText(r,o,E-I+9),u.beginPath(),u.moveTo(o,E-I+4),u.lineTo(o,x-4),u.stroke()})},o4=(u,e)=>{const{data:t}=e;u.beginPath(),u.strokeStyle="green",u.moveTo(t[0].x,t[0].y);for(let n=1;n<t.length;n++)u.lineTo(t[n].x,t[n].y);u.stroke()},r4=(u,e,t)=>{const n=u.getContext("2d");t4(n),n4(n,e,t),o4(n,e)},s4=u=>{var r;const e=document.getElementById(u);e.attributes.removeNamedItem("id"),e.innerHTML=`
    <canvas style="border: 1px solid #777; width: ${g}px; height: ${E}px;">
        \u0412\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 canvas
    </canvas>
    <div class="status">
        Loading...
    </div>
  `;const t=e.querySelector("canvas"),n=e.querySelector(".status");t.width=g*window.devicePixelRatio,t.height=E*window.devicePixelRatio,(r=t.getContext("2d"))==null||r.scale(window.devicePixelRatio,window.devicePixelRatio);function o(){if(window.location.pathname!==W)return;n.innerHTML="Loading...";const s=G(),l=b(),f=A();D.terminate(),D.postMessage({from:s,to:l,graph:f})}o(),Object.values(i).forEach(s=>{const l=a(s).onChange(o);F(e,()=>l())}),D.onmessage=s=>{const v=s.data,{error:l}=v,f=y(v,["error"]);l?n.innerHTML=`Error: ${l}`:(n.innerHTML="",r4(t,f,{yLabel:q=>q+e4[A()]}))}};const P=(u,e)=>{const t=document.getElementById(u);t.attributes.removeNamedItem("id"),t.onclick=()=>a(i.GRAPH).set(e),t.classList.add("button");const n=a(i.GRAPH).sync(o=>{A(o)===e?t.classList.add("--active"):t.classList.remove("--active")});F(t,n)},L=(u,{sync:e,onChange:t})=>{const n=document.getElementById(u);n.attributes.removeNamedItem("id");for(let r=d.MIN;r<=d.MAX;r++){const s=document.createElement("option");s.innerHTML=r.toString(),s.value=r.toString(),n.append(s)}const o=e(r=>{n.value=b(r)});F(n,o),n.onchange=r=>{const s=r.target;t(s.value)}},O=c(),S=c(),R=c(),N=c(),k=c(),a4=u=>{u.innerHTML=`
    <h2>\u0410\u0440\u0445\u0438\u0432 \u043C\u0435\u0442\u0435\u043E\u0441\u043B\u0443\u0436\u0431\u044B</h2>

    <div>
      <div>
        <button id="${S}"> \u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 </button>
        <button id="${R}"> \u041E\u0441\u0430\u0434\u043A\u0438 </button>
      </div>

      <div>
        <div>
          <select id="${N}"></select>
          <select id="${k}"></select>
        </div>

        <div id="${O}">

        </div>
      </div>
    </div>
  `,s4(O),P(S,"temperature"),P(R,"precipitation"),L(N,{sync:e=>a(i.FROM).sync(t=>e(G(t))),onChange:a(i.FROM).set}),L(k,{sync:e=>a(i.TO).sync(t=>e(b(t))),onChange:a(i.TO).set})},W="/";const i4=u=>{u.innerHTML=`
    <h2>\u041E \u0437\u0430\u0434\u0430\u0447\u0435</h2>

    <h3> \u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0444\u043E\u0440\u043C\u044B </h3>

    <p class="about-paragraph">
      \u041E\u0442 \u0441\u0435\u0431\u044F \u044F \u0434\u043E\u0431\u0430\u0432\u0438\u043B \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044E \u0447\u0430\u0441\u0442\u0438 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0432 \u0443\u0440\u043B\u043E\u043C (\u0433\u0435\u0442 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430\u043C\u0438),
      \u0447\u0442\u043E \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0434\u043D\u0438\u043C \u0438\u0437 \u0438\u0437\u043B\u044E\u0431\u043B\u0435\u043D\u043D\u044B\u0445 \u043C\u043D\u043E\u044E \u0442\u0435\u0445\u043D\u0438\u043A \u0434\u043B\u044F \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F UX.
      \u0422\u043E \u043A\u043E\u043D\u0435\u0447\u043D\u044B\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043C\u043E\u0436\u0435\u0442 \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0433\u0440\u0430\u0444\u0438\u043A, \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0443\u0440\u043B \u0438
      \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0434\u0440\u0443\u0433\u0443 \u0441\u0441\u044B\u043B\u043A\u0443. \u0418 \u0443 \u0434\u0440\u0443\u0433\u0430 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u0433\u0440\u0430\u0444\u0438\u043A \u0441 \u0442\u0435\u043C \u0436\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u043C\u0438.
      \u0418\u043B\u0438 \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u0440\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0447\u043A\u0438 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u0435 \u0438\u043D\u043F\u0443\u0442\u044B \u043D\u0435 \u043F\u0440\u043E\u043F\u0430\u0434\u0443\u0442.
      \u041F\u0440\u0438 \u044D\u0442\u043E\u043C \u044F \u0437\u043D\u0430\u044E \u043E <a rel="noreferrer" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy"> Referrer-Policy </a>
      \u0438 \u043F\u043E\u043D\u0438\u043C\u0430\u044E, \u0447\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u044B\u043C \u0441 \u0432\u0430\u0436\u043D\u044B\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u0432 \u0443\u0440\u043B\u0435
    </p>

    <h3> SPA </h3>

    <p class="about-paragraph">
      \u041F\u043E \u0441\u043A\u043E\u043B\u044C\u043A\u0443 \u0432 \u0437\u0430\u0434\u0430\u043D\u0438\u0438 \u0431\u044B\u043B \u043F\u0443\u043D\u043A\u0442 <em> "\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0432 \u0438\u0434\u0435\u043E\u043B\u043E\u0433\u0438\u0438 Single Page Application" </em>,
      \u0442\u043E \u044F \u0440\u0435\u0448\u0438\u043B \u0437\u0430\u043E\u0434\u043D\u043E \u0438 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u043E\u0441\u0442\u043E\u0439 \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0439 \u0440\u043E\u0443\u0442\u0438\u043D\u0433. \u041A\u0440\u043E\u043C\u0435 \u0433\u043B\u0430\u0432\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043D\u0435\u043F\u043E\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u043E \u0441 \u0437\u0430\u0434\u0430\u0447\u0435\u0439
      \u0435\u0441\u0442\u044C \u0438 \u0432\u043E\u0442 \u044D\u0442\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0447\u043A\u0430 <code>/about</code>. \u041F\u043B\u044E\u0441 404 \u0441\u0442\u0440\u0430\u043D\u0438\u0447\u043A\u0430 \u0434\u043B\u044F \u0432\u0441\u0435\u0433\u043E \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0433\u043E.
    </p>

    <h3> \u041E\u0431 \u043E\u0442\u0440\u0438\u0441\u043E\u0432\u043A\u0435 \u0433\u0440\u0430\u0444\u0438\u043A\u0430 </h3>

    <p class="about-paragraph">
      \u042F \u043E\u0441\u0442\u0430\u0432\u0438\u043B \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u044B\u0439 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0432 \u043A\u043E\u0434\u0435 \u043E \u0442\u043E\u043C, \u043F\u043E\u0447\u0435\u043C\u0443 \u0433\u0440\u0430\u0444\u0438\u043A \u0440\u0438\u0441\u0443\u0435\u0442\u0441\u044F \u0438\u043C\u0435\u043D\u043D\u043E \u0442\u0430\u043A (<code> src/web-workers/graphWorker.ts </code>)
      \u0423 \u043C\u0435\u043D\u044F \u0431\u044B\u043B\u043E \u0436\u0435\u043B\u0430\u043D\u0438\u0435 \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438 \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438 \u043D\u0430 \u0443\u0437\u043B\u044B \u0433\u0440\u0430\u0444\u0438\u043A\u0430, \u043D\u043E \u0437\u0430\u0434\u0430\u043D\u0438\u0435 \u0438 \u0442\u0430\u043A \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C \u043E\u0431\u044A\u0451\u043C\u043D\u044B\u043C.
    </p>
  `},c4="/about",l4=u=>{u.innerHTML=`
    <h1>404</h1>
  `},d4=u=>($(u),m.subscribe(()=>$(u))),E4={[W]:a4,[c4]:i4};let H;const $=u=>{if(H===window.location.pathname)return;Q(u),H=window.location.pathname;const e=E4[window.location.pathname]||l4;K(u,{main:e})},h4=document.querySelector("#app");d4(h4);

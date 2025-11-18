"use strict";exports.id=84,exports.ids=[84],exports.modules={2084:(t,e,a)=>{a.r(e),a.d(e,{default:()=>Document});var r=a(997),n=a(6859);let o=`
  (function() {
    try {
      var dataElement = document.getElementById('__NEXT_DATA__');
      if (!dataElement) return;
      var data = JSON.parse(dataElement.textContent || '{}');
      var lang = data && data.props && data.props.pageProps && data.props.pageProps.language ? data.props.pageProps.language : 'ro';
      document.documentElement.setAttribute('lang', lang);
    } catch (error) {}
  })();
`;function Document(){return(0,r.jsxs)(n.Html,{lang:"ro",children:[(0,r.jsxs)(n.Head,{children:[r.jsx("meta",{charSet:"utf-8"}),r.jsx("meta",{name:"theme-color",content:"#0f172a"}),r.jsx("link",{rel:"icon",href:"/img/logo/tab-logo-notext.svg"})]}),(0,r.jsxs)("body",{children:[r.jsx(n.Main,{}),r.jsx(n.NextScript,{}),r.jsx("script",{dangerouslySetInnerHTML:{__html:o}})]})]})}}};
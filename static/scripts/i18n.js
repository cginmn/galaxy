"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o};!function(){function o(o,t,n,e,r,i){t[o]&&(n.push(o),!0!==t[o]&&1!==t[o]||e.push(r+o+"/"+i))}function t(o,t,n,e,r){var i=e+t+"/"+r;require._fileExists(o.toUrl(i+".js"))&&n.push(i)}function n(o,t,e){var r;for(r in t)!t.hasOwnProperty(r)||o.hasOwnProperty(r)&&!e?"object"===_typeof(t[r])&&(!o[r]&&t[r]&&(o[r]={}),n(o[r],t[r],e)):o[r]=t[r]}var e=/(^.*(^|\/)nls(\/|$))([^\/]*)\/?([^\/]*)/;define(["module"],function(r){var i=r.config?r.config():{};return{version:"2.0.4",load:function(r,f,l,u){u=u||{},u.locale&&(i.locale=u.locale);var a,c,s,p=e.exec(r),y=p[1],g=p[4],v=p[5],h=g.split("-"),b=[],m={},d="";if(p[5]?(y=p[1],a=y+v):(a=r,v=p[4],g=i.locale,g||(g=i.locale="undefined"==typeof navigator?"root":(navigator.language||navigator.userLanguage||"root").toLowerCase()),h=g.split("-")),u.isBuild){for(b.push(a),t(f,"root",b,y,v),c=0;c<h.length;c++)s=h[c],d+=(d?"-":"")+s,t(f,d,b,y,v);f(b,function(){l()})}else f([a],function(t){var e,r=[];for(o("root",t,r,b,y,v),c=0;c<h.length;c++)e=h[c],d+=(d?"-":"")+e,o(d,t,r,b,y,v);f(b,function(){var o,e,i;for(o=r.length-1;o>-1&&r[o];o--)i=r[o],e=t[i],!0!==e&&1!==e||(e=f(y+i+"/"+v)),n(m,e);l(m)})})}}})}();
//# sourceMappingURL=../maps/i18n.js.map

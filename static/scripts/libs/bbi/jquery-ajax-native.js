"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e,t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"===("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=t(require("jquery")):t(e.jQuery)}(void 0,function(e){var t=e.ajaxSettings;t.responseFields.native="responseNative",t.converters["* native"]=!0;var r={},o=0,n={0:200,1223:204},s={},i=jQuery.ajaxSettings.xhr();window.ActiveXObject&&e(window).on("unload",function(){for(var e in s)s[e]()}),r.cors=!!i&&"withCredentials"in i,r.ajax=i=!!i,e.ajaxTransport("native",function(e){var t;if(r.cors||i&&!e.crossDomain)return{send:function(r,i){var a,u=e.xhr(),f=++o,d={};if(u.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(a in e.xhrFields)u[a]=e.xhrFields[a];e.mimeType&&u.overrideMimeType&&u.overrideMimeType(e.mimeType),e.crossDomain||r["X-Requested-With"]||(r["X-Requested-With"]="XMLHttpRequest");for(a in r)u.setRequestHeader(a,r[a]);t=function(e){return function(){t&&(delete s[f],t=u.onload=u.onerror=null,"abort"===e?u.abort():"error"===e?i(u.status,u.statusText):(u.response&&(d.native=u.response),i(n[u.status]||u.status,u.statusText,d,u.getAllResponseHeaders())))}},u.onload=t(),u.onerror=t("error"),t=s[f]=t("abort");try{u.send(e.hasContent&&e.data||null)}catch(e){if(t)throw e}},abort:function(){t&&t()}}}),e.getNative=function(t,r){return e.ajax({dataType:"native",url:t,xhrFields:{responseType:"arraybuffer"},success:r})}});
//# sourceMappingURL=../../../maps/libs/bbi/jquery-ajax-native.js.map

"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){if("object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Raven=t()}}(function(){return function t(e,n,r){function i(a,s){if(!n[a]){if(!e[a]){var l="function"==typeof require&&require;if(!s&&l)return l(a,!0);if(o)return o(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[a]={exports:{}};e[a][0].call(c.exports,function(t){var n=e[a][1][t];return i(n||t)},c,c.exports,t,e,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(t,e,n){function r(t,e,n,r){return JSON.stringify(t,i(e,r),n)}function i(t,e){var n=[],r=[];return null==e&&(e=function(t,e){return n[0]===e?"[Circular ~]":"[Circular ~."+r.slice(0,n.indexOf(e)).join(".")+"]"}),function(i,o){if(n.length>0){var a=n.indexOf(this);~a?n.splice(a+1):n.push(this),~a?r.splice(a,1/0,i):r.push(i),~n.indexOf(o)&&(o=e.call(this,i,o))}else n.push(o);return null==t?o:t.call(this,i,o)}}n=e.exports=r,n.getSerialize=i},{}],2:[function(t,e,n){function r(t){this.name="RavenConfigError",this.message=t}r.prototype=new Error,r.prototype.constructor=r,e.exports=r},{}],3:[function(t,e,n){var r=function(t,e,n){var r=t[e],i=t;if(e in t){var o="warn"===e?"warning":e;t[e]=function(){var t=[].slice.call(arguments),e=""+t.join(" "),a={level:o,logger:"console",extra:{arguments:t}};n&&n(e,a),r&&Function.prototype.apply.call(r,i,t)}}};e.exports={wrapMethod:r}},{}],4:[function(t,e,n){function r(){return+new Date}function i(){this._hasJSON=!("object"!==("undefined"==typeof JSON?"undefined":_typeof(JSON))||!JSON.stringify),this._hasDocument="undefined"!=typeof document,this._lastCapturedException=null,this._lastEventId=null,this._globalServer=null,this._globalKey=null,this._globalProject=null,this._globalContext={},this._globalOptions={logger:"javascript",ignoreErrors:[],ignoreUrls:[],whitelistUrls:[],includePaths:[],crossOrigin:"anonymous",collectWindowErrors:!0,maxMessageLength:0,stackTraceLimit:50},this._ignoreOnError=0,this._isRavenInstalled=!1,this._originalErrorStackTraceLimit=Error.stackTraceLimit,this._originalConsole=window.console||{},this._originalConsoleMethods={},this._plugins=[],this._startTime=r(),this._wrappedBuiltIns=[],this._breadcrumbs=[],this._breadcrumbLimit=20,this._lastCapturedEvent=null,this._keypressTimeout,this._location=window.location,this._lastHref=this._location&&this._location.href;for(var t in this._originalConsole)this._originalConsoleMethods[t]=this._originalConsole[t]}var o=t(7),a=t(2),s=t(6),l=t(1),u=s.isFunction,c=s.isUndefined,h=s.isError,p=s.isEmptyObject,f=s.hasKey,d=s.joinRegExp,g=s.each,_=s.objectMerge,v=s.truncate,m=s.urlencode,b=s.uuid4,y=s.htmlTreeAsString,w=s.parseUrl,x=s.isString,E=t(3).wrapMethod,S="source protocol user pass host port path".split(" "),k=/^(?:(\w+):)?\/\/(?:(\w+)(:\w+)?@)?([\w\.-]+)(?::(\d+))?(\/.*)/;i.prototype={VERSION:"3.3.0",debug:!1,TraceKit:o,config:function(t,e){var n=this;if(this._globalServer)return this._logDebug("error","Error: Raven has already been configured"),this;if(!t)return this;e&&g(e,function(t,e){"tags"===t||"extra"===t?n._globalContext[t]=e:n._globalOptions[t]=e});var r=this._parseDSN(t),i=r.path.lastIndexOf("/"),a=r.path.substr(1,i);return this._dsn=t,this._globalOptions.ignoreErrors.push(/^Script error\.?$/),this._globalOptions.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),this._globalOptions.ignoreErrors=d(this._globalOptions.ignoreErrors),this._globalOptions.ignoreUrls=!!this._globalOptions.ignoreUrls.length&&d(this._globalOptions.ignoreUrls),this._globalOptions.whitelistUrls=!!this._globalOptions.whitelistUrls.length&&d(this._globalOptions.whitelistUrls),this._globalOptions.includePaths=d(this._globalOptions.includePaths),this._globalKey=r.user,this._globalSecret=r.pass&&r.pass.substr(1),this._globalProject=r.path.substr(i+1),this._globalServer=this._getGlobalServer(r),this._globalEndpoint=this._globalServer+"/"+a+"api/"+this._globalProject+"/store/",o.collectWindowErrors=!!this._globalOptions.collectWindowErrors,this},install:function(){var t=this;return this.isSetup()&&!this._isRavenInstalled&&(o.report.subscribe(function(){t._handleOnErrorStackInfo.apply(t,arguments)}),this._wrapBuiltIns(),this._drainPlugins(),this._isRavenInstalled=!0),Error.stackTraceLimit=this._globalOptions.stackTraceLimit,this},context:function(t,e,n){return u(t)&&(n=e||[],e=t,t=void 0),this.wrap(t,e).apply(this,n)},wrap:function(t,e,n){function r(){var r=[],o=arguments.length,a=!t||t&&!1!==t.deep;for(n&&u(n)&&n.apply(this,arguments);o--;)r[o]=a?i.wrap(t,arguments[o]):arguments[o];try{return e.apply(this,r)}catch(e){throw i._ignoreNextOnError(),i.captureException(e,t),e}}var i=this;if(c(e)&&!u(t))return t;if(u(t)&&(e=t,t=void 0),!u(e))return e;try{if(e.__raven__)return e}catch(t){return e}if(e.__raven_wrapper__)return e.__raven_wrapper__;for(var o in e)f(e,o)&&(r[o]=e[o]);return r.prototype=e.prototype,e.__raven_wrapper__=r,r.__raven__=!0,r.__inner__=e,r},uninstall:function(){return o.report.uninstall(),this._restoreBuiltIns(),Error.stackTraceLimit=this._originalErrorStackTraceLimit,this._isRavenInstalled=!1,this},captureException:function(t,e){if(!h(t))return this.captureMessage(t,e);this._lastCapturedException=t;try{var n=o.computeStackTrace(t);this._handleStackInfo(n,e)}catch(e){if(t!==e)throw e}return this},captureMessage:function(t,e){if(!this._globalOptions.ignoreErrors.test||!this._globalOptions.ignoreErrors.test(t))return this._send(_({message:t+""},e)),this},captureBreadcrumb:function(t){var e=_({timestamp:r()/1e3},t);this._breadcrumbs.push(e),this._breadcrumbs.length>this._breadcrumbLimit&&this._breadcrumbs.shift()},addPlugin:function(t){var e=Array.prototype.slice.call(arguments,1);return this._plugins.push([t,e]),this._isRavenInstalled&&this._drainPlugins(),this},setUserContext:function(t){return this._globalContext.user=t,this},setExtraContext:function(t){return this._mergeContext("extra",t),this},setTagsContext:function(t){return this._mergeContext("tags",t),this},clearContext:function(){return this._globalContext={},this},getContext:function(){return JSON.parse(l(this._globalContext))},setEnvironment:function(t){return this._globalOptions.environment=t,this},setRelease:function(t){return this._globalOptions.release=t,this},setDataCallback:function(t){var e=this._globalOptions.dataCallback;return this._globalOptions.dataCallback=u(t)?function(n){return t(n,e)}:t,this},setShouldSendCallback:function(t){var e=this._globalOptions.shouldSendCallback;return this._globalOptions.shouldSendCallback=u(t)?function(n){return t(n,e)}:t,this},setTransport:function(t){return this._globalOptions.transport=t,this},lastException:function(){return this._lastCapturedException},lastEventId:function(){return this._lastEventId},isSetup:function(){return!!this._hasJSON&&(!!this._globalServer||(this.ravenNotConfiguredError||(this.ravenNotConfiguredError=!0,this._logDebug("error","Error: Raven has not been configured.")),!1))},afterLoad:function(){var t=window.RavenConfig;t&&this.config(t.dsn,t.config).install()},showReportDialog:function(t){if(window.document){t=t||{};var e=t.eventId||this.lastEventId();if(!e)throw new a("Missing eventId");var n=t.dsn||this._dsn;if(!n)throw new a("Missing DSN");var r=encodeURIComponent,i="";i+="?eventId="+r(e),i+="&dsn="+r(n);var o=t.user||this._globalContext.user;o&&(o.name&&(i+="&name="+r(o.name)),o.email&&(i+="&email="+r(o.email)));var s=this._getGlobalServer(this._parseDSN(n)),l=document.createElement("script");l.async=!0,l.src=s+"/api/embed/error-page/"+i,(document.head||document.body).appendChild(l)}},_ignoreNextOnError:function(){var t=this;this._ignoreOnError+=1,setTimeout(function(){t._ignoreOnError-=1})},_triggerEvent:function(t,e){var n,r;if(this._hasDocument){e=e||{},t="raven"+t.substr(0,1).toUpperCase()+t.substr(1),document.createEvent?(n=document.createEvent("HTMLEvents"),n.initEvent(t,!0,!0)):(n=document.createEventObject(),n.eventType=t);for(r in e)f(e,r)&&(n[r]=e[r]);if(document.createEvent)document.dispatchEvent(n);else try{document.fireEvent("on"+n.eventType.toLowerCase(),n)}catch(t){}}},_breadcrumbEventHandler:function(t){var e=this;return function(n){if(e._keypressTimeout=null,e._lastCapturedEvent!==n){e._lastCapturedEvent=n;var r,i=n.target;try{r=y(i)}catch(t){r="<unknown>"}e.captureBreadcrumb({category:"ui."+t,message:r})}}},_keypressEventHandler:function(){var t=this;return function(e){var n=e.target,r=n&&n.tagName;if(r&&("INPUT"===r||"TEXTAREA"===r)){var i=t._keypressTimeout;i||t._breadcrumbEventHandler("input")(e),clearTimeout(i),t._keypressTimeout=setTimeout(function(){t._keypressTimeout=null},1e3)}}},_captureUrlChange:function(t,e){var n=w(this._location.href),r=w(e),i=w(t);this._lastHref=e,n.protocol===r.protocol&&n.host===r.host&&(e=r.relative),n.protocol===i.protocol&&n.host===i.host&&(t=i.relative),this.captureBreadcrumb({category:"navigation",data:{to:e,from:t}})},_wrapBuiltIns:function(){function t(t,e,n,i){var o=t[e];t[e]=n(o),i||r._wrappedBuiltIns.push([t,e,o])}function e(t){return function(e,n){for(var i=new Array(arguments.length),o=0;o<i.length;++o)i[o]=arguments[o];var a=i[0];return u(a)&&(i[0]=r.wrap(a)),t.apply?t.apply(this,i):t(i[0],i[1])}}function n(e,n){e in n&&u(n[e])&&t(n,e,function(t){return r.wrap(t)},!0)}var r=this;t(window,"setTimeout",e),t(window,"setInterval",e),window.requestAnimationFrame&&t(window,"requestAnimationFrame",function(t){return function(e){return t(r.wrap(e))}}),this._hasDocument&&(document.addEventListener?(document.addEventListener("click",r._breadcrumbEventHandler("click"),!1),document.addEventListener("keypress",r._keypressEventHandler(),!1)):(document.attachEvent("onclick",r._breadcrumbEventHandler("click")),document.attachEvent("onkeypress",r._keypressEventHandler())));for(var i=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],o=0;o<i.length;o++)!function(e){var n=window[e]&&window[e].prototype;n&&n.hasOwnProperty&&n.hasOwnProperty("addEventListener")&&(t(n,"addEventListener",function(t){return function(n,i,o,a){try{i&&i.handleEvent&&(i.handleEvent=r.wrap(i.handleEvent))}catch(t){}var s;return"EventTarget"!==e&&"Node"!==e||("click"===n?s=r._breadcrumbEventHandler(n):"keypress"===n&&(s=r._keypressEventHandler())),t.call(this,n,r.wrap(i,void 0,s),o,a)}}),t(n,"removeEventListener",function(t){return function(e,n,r,i){return n=n&&(n.__raven_wrapper__?n.__raven_wrapper__:n),t.call(this,e,n,r,i)}}))}(i[o]);if("XMLHttpRequest"in window){var a=XMLHttpRequest.prototype;t(a,"open",function(t){return function(e,n){return x(n)&&-1===n.indexOf(r._globalKey)&&(this.__raven_xhr={method:e,url:n,status_code:null}),t.apply(this,arguments)}}),t(a,"send",function(e){return function(i){function o(){if(a.__raven_xhr&&(1===a.readyState||4===a.readyState)){try{a.__raven_xhr.status_code=a.status}catch(t){}r.captureBreadcrumb({type:"http",category:"xhr",data:a.__raven_xhr})}}for(var a=this,s=["onload","onerror","onprogress"],l=0;l<s.length;l++)n(s[l],a);return"onreadystatechange"in a&&u(a.onreadystatechange)?t(a,"onreadystatechange",function(t){return r.wrap(t,void 0,o)},!0):a.onreadystatechange=o,e.apply(this,arguments)}})}var s=window.chrome;if(!(s&&s.app&&s.app.runtime)&&window.history&&history.pushState){var l=window.onpopstate;window.onpopstate=function(){var t=r._location.href;if(r._captureUrlChange(r._lastHref,t),l)return l.apply(this,arguments)},t(history,"pushState",function(t){return function(){var e=arguments.length>2?arguments[2]:void 0;return e&&r._captureUrlChange(r._lastHref,e+""),t.apply(this,arguments)}})}var c=function(t,e){r.captureBreadcrumb({message:t,level:e.level,category:"console"})};"console"in window&&console.log&&g(["debug","info","warn","error","log"],function(t,e){E(console,e,c)});var h=window.jQuery||window.$;h&&h.fn&&h.fn.ready&&t(h.fn,"ready",function(t){return function(e){return t.call(this,r.wrap(e))}})},_restoreBuiltIns:function(){for(var t;this._wrappedBuiltIns.length;){t=this._wrappedBuiltIns.shift();var e=t[0],n=t[1],r=t[2];e[n]=r}},_drainPlugins:function(){var t=this;g(this._plugins,function(e,n){var r=n[0],i=n[1];r.apply(t,[t].concat(i))})},_parseDSN:function(t){var e=k.exec(t),n={},r=7;try{for(;r--;)n[S[r]]=e[r]||""}catch(e){throw new a("Invalid DSN: "+t)}if(n.pass&&!this._globalOptions.allowSecretKey)throw new a("Do not specify your secret key in the DSN. See: http://bit.ly/raven-secret-key");return n},_getGlobalServer:function(t){var e="//"+t.host+(t.port?":"+t.port:"");return t.protocol&&(e=t.protocol+":"+e),e},_handleOnErrorStackInfo:function(){this._ignoreOnError||this._handleStackInfo.apply(this,arguments)},_handleStackInfo:function(t,e){var n=this,r=[];t.stack&&t.stack.length&&g(t.stack,function(t,e){var i=n._normalizeFrame(e);i&&r.push(i)}),this._triggerEvent("handle",{stackInfo:t,options:e}),this._processException(t.name,t.message,t.url,t.lineno,r.slice(0,this._globalOptions.stackTraceLimit),e)},_normalizeFrame:function(t){if(t.url){var e={filename:t.url,lineno:t.line,colno:t.column,function:t.func||"?"};return e.in_app=!(this._globalOptions.includePaths.test&&!this._globalOptions.includePaths.test(e.filename)||/(Raven|TraceKit)\./.test(e.function)||/raven\.(min\.)?js$/.test(e.filename)),e}},_processException:function(t,e,n,r,i,o){var a;if((!this._globalOptions.ignoreErrors.test||!this._globalOptions.ignoreErrors.test(e))&&(e+="",i&&i.length?(n=i[0].filename||n,i.reverse(),a={frames:i}):n&&(a={frames:[{filename:n,lineno:r,in_app:!0}]}),(!this._globalOptions.ignoreUrls.test||!this._globalOptions.ignoreUrls.test(n))&&(!this._globalOptions.whitelistUrls.test||this._globalOptions.whitelistUrls.test(n)))){var s=_({exception:{values:[{type:t,value:e,stacktrace:a}]},culprit:n},o);this._send(s)}},_trimPacket:function(t){var e=this._globalOptions.maxMessageLength;if(t.message&&(t.message=v(t.message,e)),t.exception){var n=t.exception.values[0];n.value=v(n.value,e)}return t},_getHttpData:function(){if(this._hasDocument&&document.location&&document.location.href){var t={headers:{"User-Agent":navigator.userAgent}};return t.url=document.location.href,document.referrer&&(t.headers.Referer=document.referrer),t}},_send:function(t){var e=this,n=this._globalOptions,i={project:this._globalProject,logger:n.logger,platform:"javascript"},o=this._getHttpData();if(o&&(i.request=o),t=_(i,t),t.tags=_(_({},this._globalContext.tags),t.tags),t.extra=_(_({},this._globalContext.extra),t.extra),t.extra["session:duration"]=r()-this._startTime,this._breadcrumbs&&this._breadcrumbs.length>0&&(t.breadcrumbs={values:[].slice.call(this._breadcrumbs,0)}),p(t.tags)&&delete t.tags,this._globalContext.user&&(t.user=this._globalContext.user),n.environment&&(t.environment=n.environment),n.release&&(t.release=n.release),n.serverName&&(t.server_name=n.serverName),u(n.dataCallback)&&(t=n.dataCallback(t)||t),t&&!p(t)&&(!u(n.shouldSendCallback)||n.shouldSendCallback(t))&&(this._lastEventId=t.event_id||(t.event_id=b()),t=this._trimPacket(t),this._logDebug("debug","Raven about to send:",t),this.isSetup())){var a={sentry_version:"7",sentry_client:"raven-js/"+this.VERSION,sentry_key:this._globalKey};this._globalSecret&&(a.sentry_secret=this._globalSecret);var s=t.exception&&t.exception.values[0];this.captureBreadcrumb({category:"sentry",message:s?(s.type?s.type+": ":"")+s.message:t.message,event_id:t.event_id,level:t.level||"error"});var l=this._globalEndpoint;(n.transport||this._makeRequest).call(this,{url:l,auth:a,data:t,options:n,onSuccess:function(){e._triggerEvent("success",{data:t,src:l})},onError:function(){e._triggerEvent("failure",{data:t,src:l})}})}},_makeRequest:function(t){function e(){200===n.status?t.onSuccess&&t.onSuccess():t.onError&&t.onError()}var n=new XMLHttpRequest;if("withCredentials"in n||"undefined"!=typeof XDomainRequest){var r=t.url;"withCredentials"in n?n.onreadystatechange=function(){4===n.readyState&&e()}:(n=new XDomainRequest,r=r.replace(/^https?:/,""),n.onload=e),n.open("POST",r+"?"+m(t.auth)),n.send(l(t.data))}},_logDebug:function(t){this._originalConsoleMethods[t]&&this.debug&&Function.prototype.apply.call(this._originalConsoleMethods[t],this._originalConsole,[].slice.call(arguments,1))},_mergeContext:function(t,e){c(e)?delete this._globalContext[t]:this._globalContext[t]=_(this._globalContext[t]||{},e)}},i.prototype.setUser=i.prototype.setUserContext,i.prototype.setReleaseContext=i.prototype.setRelease,e.exports=i},{1:1,2:2,3:3,6:6,7:7}],5:[function(t,e,n){var r=t(4),i=window.Raven,o=new r;o.noConflict=function(){return window.Raven=i,o},o.afterLoad(),e.exports=o},{4:4}],6:[function(t,e,n){function r(t){return void 0===t}function i(t){return"function"==typeof t}function o(t){return"[object String]"===b.toString.call(t)}function a(t){return"object"===(void 0===t?"undefined":_typeof(t))&&null!==t}function s(t){for(var e in t)return!1;return!0}function l(t){var e=b.toString.call(t);return a(t)&&"[object Error]"===e||"[object Exception]"===e||t instanceof Error}function u(t,e){var n,i;if(r(t.length))for(n in t)p(t,n)&&e.call(null,n,t[n]);else if(i=t.length)for(n=0;n<i;n++)e.call(null,n,t[n])}function c(t,e){return e?(u(e,function(e,n){t[e]=n}),t):t}function h(t,e){return!e||t.length<=e?t:t.substr(0,e)+"…"}function p(t,e){return b.hasOwnProperty.call(t,e)}function f(t){for(var e,n=[],r=0,i=t.length;r<i;r++)e=t[r],o(e)?n.push(e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")):e&&e.source&&n.push(e.source);return new RegExp(n.join("|"),"i")}function d(t){var e=[];return u(t,function(t,n){e.push(encodeURIComponent(t)+"="+encodeURIComponent(n))}),e.join("&")}function g(t){var e=t.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};var n=e[6]||"",r=e[8]||"";return{protocol:e[2],host:e[4],path:e[5],relative:e[5]+n+r}}function _(){var t=window.crypto||window.msCrypto;if(!r(t)&&t.getRandomValues){var e=new Uint16Array(8);t.getRandomValues(e),e[3]=4095&e[3]|16384,e[4]=16383&e[4]|32768;var n=function(t){for(var e=t.toString(16);e.length<4;)e="0"+e;return e};return n(e[0])+n(e[1])+n(e[2])+n(e[3])+n(e[4])+n(e[5])+n(e[6])+n(e[7])}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})}function v(t){for(var e,n=[],r=0,i=0,o=" > ".length;t&&r++<5&&!("html"===(e=m(t))||r>1&&i+n.length*o+e.length>=80);)n.push(e),i+=e.length,t=t.parentNode;return n.reverse().join(" > ")}function m(t){var e,n,r,i,a,s=[];if(!t||!t.tagName)return"";if(s.push(t.tagName.toLowerCase()),t.id&&s.push("#"+t.id),(e=t.className)&&o(e))for(n=e.split(" "),a=0;a<n.length;a++)s.push("."+n[a]);var l=["type","name","title","alt"];for(a=0;a<l.length;a++)r=l[a],(i=t.getAttribute(r))&&s.push("["+r+'="'+i+'"]');return s.join("")}var b=Object.prototype;e.exports={isUndefined:r,isFunction:i,isString:o,isObject:a,isEmptyObject:s,isError:l,each:u,objectMerge:c,truncate:h,hasKey:p,joinRegExp:f,urlencode:d,uuid4:_,htmlTreeAsString:v,htmlElementAsString:m,parseUrl:g}},{}],7:[function(t,e,n){function r(){return"undefined"==typeof document?"":document.location.href}var i=t(6),o=i.hasKey,a=i.isString,s=i.isUndefined,l={collectWindowErrors:!0,debug:!1},u=[].slice,c="?",h=/^(?:Uncaught (?:exception: )?)?((?:Eval|Internal|Range|Reference|Syntax|Type|URI)Error): ?(.*)$/;l.report=function(){function t(t){p(),m.push(t)}function e(t){for(var e=m.length-1;e>=0;--e)m[e]===t&&m.splice(e,1)}function n(){f(),m=[]}function i(t,e){var n=null;if(!e||l.collectWindowErrors){for(var r in m)if(o(m,r))try{m[r].apply(null,[t].concat(u.call(arguments,2)))}catch(t){n=t}if(n)throw n}}function s(t,e,n,o,s){var u=null;if(w)l.computeStackTrace.augmentStackTraceWithInitialElement(w,e,n,t),d();else if(s)u=l.computeStackTrace(s),i(u,!0);else{var p,f={url:e,line:n,column:o},g=void 0,v=t;if(a(t)){var p=t.match(h);p&&(g=p[1],v=p[2])}f.func=c,u={name:g,message:v,url:r(),stack:[f]},i(u,!0)}return!!_&&_.apply(this,arguments)}function p(){v||(_=window.onerror,window.onerror=s,v=!0)}function f(){v&&(window.onerror=_,v=!1,_=void 0)}function d(){var t=w,e=b;b=null,w=null,y=null,i.apply(null,[t,!1].concat(e))}function g(t,e){var n=u.call(arguments,1);if(w){if(y===t)return;d()}var r=l.computeStackTrace(t);if(w=r,y=t,b=n,window.setTimeout(function(){y===t&&d()},r.incomplete?2e3:0),!1!==e)throw t}var _,v,m=[],b=null,y=null,w=null;return g.subscribe=t,g.unsubscribe=e,g.uninstall=n,g}(),l.computeStackTrace=function(){function t(t){if(!s(t.stack)&&t.stack){for(var e,n,i=/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|<anonymous>).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,o=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i,a=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,l=t.stack.split("\n"),u=[],h=(/^(.*) is undefined$/.exec(t.message),0),p=l.length;h<p;++h){if(e=i.exec(l[h])){var f=e[2]&&-1!==e[2].indexOf("native");n={url:f?null:e[2],func:e[1]||c,args:f?[e[2]]:[],line:e[3]?+e[3]:null,column:e[4]?+e[4]:null}}else if(e=a.exec(l[h]))n={url:e[2],func:e[1]||c,args:[],line:+e[3],column:e[4]?+e[4]:null};else{if(!(e=o.exec(l[h])))continue;n={url:e[3],func:e[1]||c,args:e[2]?e[2].split(","):[],line:e[4]?+e[4]:null,column:e[5]?+e[5]:null}}!n.func&&n.line&&(n.func=c),u.push(n)}return u.length?(u[0].column||s(t.columnNumber)||(u[0].column=t.columnNumber+1),{name:t.name,message:t.message,url:r(),stack:u}):null}}function e(t){var e=t.stacktrace;if(!s(t.stacktrace)&&t.stacktrace){for(var n,i=/ line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,o=/ line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i,a=e.split("\n"),l=[],u=0;u<a.length;u+=2){var h=null;(n=i.exec(a[u]))?h={url:n[2],line:+n[1],column:null,func:n[3],args:[]}:(n=o.exec(a[u]))&&(h={url:n[6],line:+n[1],column:+n[2],func:n[3]||n[4],args:n[5]?n[5].split(","):[]}),h&&(!h.func&&h.line&&(h.func=c),l.push(h))}return l.length?{name:t.name,message:t.message,url:r(),stack:l}:null}}function n(t){var e=t.message.split("\n");if(e.length<4)return null;for(var n,i=/^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,o=/^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,a=/^\s*Line (\d+) of function script\s*$/i,s=[],l=(document.getElementsByTagName("script"),2);l<e.length;l+=2){var u=null;if(n=i.exec(e[l]))u={url:n[2],func:n[3],args:[],line:+n[1],column:null};else if(n=o.exec(e[l])){u={url:n[3],func:n[4],args:[],line:+n[1],column:null};n[1]}else if(n=a.exec(e[l])){var h=window.location.href.replace(/#.*$/,"");u={url:h,func:"",args:[],line:n[1],column:null}}u&&(u.func||(u.func=c),s.push(u))}return s.length?{name:t.name,message:e[0],url:r(),stack:s}:null}function i(t,e,n,r){var i={url:e,line:n};if(i.url&&i.line){if(t.incomplete=!1,i.func||(i.func=c),t.stack.length>0&&t.stack[0].url===i.url){if(t.stack[0].line===i.line)return!1;if(!t.stack[0].line&&t.stack[0].func===i.func)return t.stack[0].line=i.line,!1}return t.stack.unshift(i),t.partial=!0,!0}return t.incomplete=!0,!1}function o(t,e){for(var n,s,u=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,h=[],p={},f=!1,d=o.caller;d&&!f;d=d.caller)if(d!==a&&d!==l.report){if(s={url:null,func:c,line:null,column:null},d.name?s.func=d.name:(n=u.exec(d.toString()))&&(s.func=n[1]),void 0===s.func)try{s.func=n.input.substring(0,n.input.indexOf("{"))}catch(t){}p[""+d]?f=!0:p[""+d]=!0,h.push(s)}e&&h.splice(0,e);var g={name:t.name,message:t.message,url:r(),stack:h};return i(g,t.sourceURL||t.fileName,t.line||t.lineNumber,t.message||t.description),g}function a(i,a){var s=null;a=null==a?0:+a;try{if(s=e(i))return s}catch(t){if(l.debug)throw t}try{if(s=t(i))return s}catch(t){if(l.debug)throw t}try{if(s=n(i))return s}catch(t){if(l.debug)throw t}try{if(s=o(i,a+1))return s}catch(t){if(l.debug)throw t}return{name:i.name,message:i.message,url:r()}}return a.augmentStackTraceWithInitialElement=i,a.computeStackTraceFromStackProp=t,a}(),e.exports=l},{6:6}]},{},[5])(5)});
//# sourceMappingURL=../../maps/libs/raven.js.map

"use strict";define([],function(){function e(e,r){var t=void 0!==e.prototype?e.prototype:e;return void 0!==r&&(t._logNamespace=r),o.forEach(function(e){t[e]=function(){if(this.logger)return this.logger.emit?this.logger.emit(e,this._logNamespace,arguments):this.logger[e]?this.logger[e].apply(this.logger,arguments):void 0}}),e}var o=["log","debug","info","warn","error","metric"];return e});
//# sourceMappingURL=../../maps/utils/add-logging.js.map

!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";var r=new(n(1).Event);r.$on("testEvent",function(e){console.log("测试事件添加，传入参数为"+e)}),r.$emit("testEvent","事件触发成功"),r.$emit("testEvent","事件再次触发成功"),r.$off("testEvent"),r.$emit("testEvent","事件取消，不会有输出"),r.$once("testOnce",function(e){console.log("事件仅仅触发一次，传入参数为"+e)}),r.$emit("testOnce","事件触发成功"),r.$emit("testOnce","事件取消，不会有输出")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var o=0;t.Event=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.id=++o,this._events={}}return r(e,[{key:"$on",value:function(e,t){return(this._events[e]||(this._events[e]=[])).push(t),this}},{key:"$off",value:function(e){return this._events[e]&&(this._events[e]=null),this}},{key:"$once",value:function(e,t){var n=this;return n.$on(e,function(){n.$off(e),t.apply(n,arguments)}),n}},{key:"$emit",value:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=this,u=o._events[e];return u&&u.forEach(function(e){return e.apply(o,n)}),o}}]),e}()}]);
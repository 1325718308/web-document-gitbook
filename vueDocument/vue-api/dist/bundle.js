!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r=function(t,e,n){Object.defineProperty(t,n,{get:()=>t[e][n],set(r){t[e][n]=r}})};function o(t,e,n){l(n),Object.defineProperty(t,e,{get:()=>n,set(t){t!==n&&(l(newVal),n=newVal)}})}var i=function(t){for(let e=0;e<t.length;e++)l(t[e])},u=Array.prototype,a=Object.create(u);function c(t){Array.isArray(t)?(t.__proto__=a,i(t)):this.walk(t)}["push","pop","splice","shift","unshift","sort","reverse"].map((function(t){a[t]=function(){var e,n=Array.prototype.slice.call(arguments),r=u[t].apply(this,n);switch(t){case"push":case"unshift":e=n;break;case"splice":e=n[2].slice(2)}return e&&i(e),r}})),c.prototype.walk=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++){var r=e[n];o(t,r,t[r])}};var f=c;var l=function(t){if("object"==typeof t&&null!==t)return new f(t)};function p(t){t.$options.data&&function(t){var e=t.$options.data;e=t._data="function"==typeof e?e.call(t):e||{};for(let n in e)r(t,"_data",n);l(t._data)}(t)}function s(t){this._init(t)}s.prototype._init=function(t){this.$options=t,p(this)};e.default=s}]);
//# sourceMappingURL=bundle.js.map
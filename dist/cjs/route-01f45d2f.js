"use strict";var t=require("./_rollupPluginBabelHelpers-764e5ec4.js"),e={render:function(t){return t("div",{class:"yandex-route_not-used-dom-element"})},props:{points:{type:[Array],required:!0,validator:function(e){if(!Array.isArray(e))return!1;if(0===e.length)return!1;var r,n=t._createForOfIteratorHelper(e);try{for(n.s();!(r=n.n()).done;){var i=r.value;if("string"==typeof i&&0===i.length)return!1;if("object"===t._typeof(i)&&(!("type"in i)||!("point"in i)||"type"in i&&"point"in i&&!["viaPoint","wayPoint"].includes(i.type)))return!1;if("viaPoint"===i.type&&("string"!=typeof i.point||"string"==typeof i.point&&0===i.point.length))return!1;if("wayPoint"===i.type&&(!Array.isArray(i.point)||2!==i.point.length||Number.isNaN(i.point[0])||Number.isNaN(i.point[1])))return!1}}catch(t){n.e(t)}finally{n.f()}return!0}},params:{type:Object,default:function(){return{}}}},watch:{points:function(t,e){this.$emit("updated",{property:"points",value:t})},params:function(t,e){this.$emit("updated",{property:"params",value:t})}},methods:{getGeoObject:function(e){var r=this;return t._asyncToGenerator(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.route(r.points,r.params);case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})))()}}};exports.default=e;

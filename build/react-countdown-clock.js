!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react")):"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?exports.ReactCountdownClock=e(require("react")):t.ReactCountdownClock=e(t.React)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="C:\\Users\\User\\Documents\\Apps\\react-countdown-clock-customised-for-exquizitely\\react-countdown-clock\\build",e(e.s=2)}([function(e,n){e.exports=t},function(t,e,n){"use strict";function r(t,e,n,r,o,s,a,c){if(i(e),!t){var u;if(void 0===e)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var p=[n,r,o,s,a,c],l=0;u=new Error(e.replace(/%s/g,function(){return p[l++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}}var i=function(t){};t.exports=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i,o,s;o=n(0),i=n(3),r=n(7),s=r({_seconds:0,_radius:null,_fraction:null,_content:null,_canvas:null,_timeoutIds:[],defaultProps:function(){return{seconds:60,size:300,color:"#000",alpha:1,timeFormat:"hms",fontSize:"auto",font:"Arial",showMilliseconds:!0,restartOnNewProps:!0,paused:!1}},displayName:"ReactCountdownClock",propTypes:{seconds:o.PropTypes.number,size:o.PropTypes.number,weight:o.PropTypes.number,color:o.PropTypes.string,fontSize:o.PropTypes.string,font:o.PropTypes.string,alpha:o.PropTypes.number,timeFormat:o.PropTypes.string,onComplete:o.PropTypes.func,showMilliseconds:i.bool,paused:i.bool,pausedText:i.string,backgroundColor:o.PropTypes.string,backgroundColorEdge:o.PropTypes.string,fontColor:o.PropTypes.string,restartOnNewProps:o.PropTypes.bool},componentWillReceiveProps:function(t){if(this.props.restartOnNewProps&&(this._seconds=t.seconds,this._setupTimer()),t.color!==this.props.color&&(this._drawBackground(),this._updateCanvas()),t.paused!==this.props.paused&&(this.props.paused||this._startTimer(),this.props.paused))return this._pauseTimer()},componentDidMount:function(){return this._seconds=this.props.seconds,this._setupTimer()},componentWillUnmount:function(){return this._cancelTimer()},_setupTimer:function(){if(this._setScale(),this._setupCanvases(),this._drawBackground(),this._drawIcon(),this._drawTimerText(),this._drawTimer(),!this.props.paused)return this._startTimer()},_updateCanvas:function(){return this._clearTimer(),this._drawTimer(),this._clearTimerText(),this._drawTimerText(),this._clearIcon(),this._drawIcon()},_setScale:function(){return this._radius=this.props.size/2,this._fraction=2/this._seconds,this._tickPeriod=this._calculateTick(),this._innerRadius=this.props.weight?this._radius-this.props.weight:this._radius/1.8},_calculateTick:function(){var t,e;return e=1.8,t=this._seconds*e,t>1e3?1e3:t},_setupCanvases:function(){if(this._background=this.refs.background.getContext("2d"),this._icon=this.refs.background.getContext("2d"),this._icon.textAlign="center",this._icon.textBaseline="middle",this._timerText=this.refs.timerText.getContext("2d"),this._timerText.textAlign="center",this._timerText.textBaseline="middle",this._timer=this.refs.timer.getContext("2d"),this._timer.textAlign="center",this._timer.textBaseline="middle",null!=this.props.onClick)return this.refs.component.addEventListener("click",this.props.onClick)},_startTimer:function(){return this._timeoutIds.push(setTimeout(function(t){return function(){return t._tick()}}(this),200))},_pauseTimer:function(){return this._cancelTimer(),this._updateCanvas()},_cancelTimer:function(){var t,e,n,r,i;for(n=this._timeoutIds,r=[],t=0,e=n.length;t<e;t++)i=n[t],r.push(clearTimeout(i));return r},_tick:function(){var t;return t=Date.now(),this._timeoutIds.push(setTimeout(function(e){return function(){var n;return n=(Date.now()-t)/1e3,e._seconds-=n,console.log({"seconds=":"seconds="}),console.log(e._seconds),e._seconds<=0?(e._seconds=0,e._handleComplete(),e._clearTimer(),e._clearTimerText(),e._clearIcon()):(e._updateCanvas(),e._tick())}}(this),this._tickPeriod))},_handleComplete:function(){if(this.props.onComplete)return this.props.onComplete()},_clearTimer:function(){return this._timer.clearRect(0,0,this.refs.timer.width,this.refs.timer.height),this._drawBackground()},_clearTimerText:function(){return this._timerText.clearRect(0,0,this.refs.timerText.width,this.refs.timerText.height),this._timerText.fillText(" ",this._radius,79)},_clearIcon:function(){return this._icon.clearRect(0,0,this.refs.icon.width,this.refs.icon.height),this._icon.fillText(" ",67,38)},_drawBackground:function(){return this._background.beginPath(),this._background.globalAlpha=1,this._background.fillStyle=this.props.backgroundColorEdge,this._background.arc(this._radius,this._radius,this._radius,0,2*Math.PI,!1),this._background.arc(this._radius,this._radius,this._innerRadius,2*Math.PI,0,!0),this._background.closePath(),this._background.fill()},_formattedTime:function(){var t,e,n,r,i,o;return t=null!=(r=this._seconds<=9.9&&this.props.showMilliseconds)?r:{1:0},"hms"===this.props.timeFormat?(e=parseInt(this._seconds/3600)%24,n=parseInt(this._seconds/60)%60,i=(this._seconds%60).toFixed(t),e<10&&(e="0"+e),n<10&&(n="0"+n),i<10&&n>=1&&(i="0"+i),o=[],e>0&&o.push(e),n>0&&o.push(n),o.push(i),o.join(":")):this._seconds.toFixed(t)},_fontSize:function(t){var e;return"auto"===this.props.fontSize?(e=function(){switch(t.length){case 8:return 4;case 5:return 3;default:return 2}}(),this._radius/e+"px"):this.props.fontSize},_drawIcon:function(){return this._icon.clearRect(107,0,0,0),this._icon.globalAlpha=1,this._icon.fillStyle=this.props.fontColor||this.props.color,this._icon.font="32px FontAwesome",this._icon.fillText("",67,38)},_drawTimerText:function(){var t,e;return t=this._formattedTime(),e=this.props.paused&&null!=this.props.pausedText?this.props.pausedText:t,this._timerText.fillStyle=this.props.fontColor||this.props.color,this._timerText.font="normal "+this._fontSize(t)+" "+this.props.font,this._timerText.fillText(e,this._radius,79),this._timerText.fill()},_drawTimer:function(){var t;return t=this._fraction*this._seconds+1.5,this._timer.globalAlpha=1,this._timer.fillStyle=this.props.color,this._timer.strokeStyle=this.props.color,this._timer.beginPath(),this._timer.arc(this._radius,this._radius,this._radius,1.5*Math.PI,Math.PI*t,!1),this._timer.arc(this._radius,this._radius,this._innerRadius,Math.PI*t,1.5*Math.PI,!0),this._timer.closePath(),this._timer.fill()},render:function(){return o.createElement("div",{ref:"component",className:"react-countdown-clock"},o.createElement("canvas",{ref:"background",style:{position:"absolute"},width:this.props.size,height:this.props.size}),o.createElement("canvas",{ref:"timer",style:{position:"absolute"},width:this.props.size,height:this.props.size}),o.createElement("canvas",{ref:"timerText",style:{position:"absolute"},width:this.props.size,height:this.props.size}),o.createElement("canvas",{ref:"icon",style:{position:"absolute"},width:this.props.size,height:this.props.size}))}}),e.default=s},function(t,e,n){t.exports=n(4)()},function(t,e,n){"use strict";var r=n(5),i=n(1),o=n(6);t.exports=function(){function t(t,e,n,r,s,a){a!==o&&i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e};return n.checkPropTypes=r,n.PropTypes=n,n}},function(t,e,n){"use strict";function r(t){return function(){return t}}var i=function(){};i.thatReturns=r,i.thatReturnsFalse=r(!1),i.thatReturnsTrue=r(!0),i.thatReturnsNull=r(null),i.thatReturnsThis=function(){return this},i.thatReturnsArgument=function(t){return t},t.exports=i},function(t,e,n){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,e,n){"use strict";var r=n(0),i=n(8);if(void 0===r)throw Error("create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.");var o=(new r.Component).updater;t.exports=i(r.Component,r.isValidElement,o)},function(t,e,n){"use strict";function r(t){return t}function i(t,e,n){function i(t,e){var n=g.hasOwnProperty(e)?g[e]:null;x.hasOwnProperty(e)&&a("OVERRIDE_BASE"===n,"ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.",e),t&&a("DEFINE_MANY"===n||"DEFINE_MANY_MERGED"===n,"ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",e)}function u(t,n){if(n){a("function"!=typeof n,"ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."),a(!e(n),"ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");var r=t.prototype,o=r.__reactAutoBindPairs;n.hasOwnProperty(c)&&T.mixins(t,n.mixins);for(var s in n)if(n.hasOwnProperty(s)&&s!==c){var u=n[s],p=r.hasOwnProperty(s);if(i(p,s),T.hasOwnProperty(s))T[s](t,u);else{var l=g.hasOwnProperty(s),d="function"==typeof u,_=d&&!l&&!p&&!1!==n.autobind;if(_)o.push(s,u),r[s]=u;else if(p){var m=g[s];a(l&&("DEFINE_MANY_MERGED"===m||"DEFINE_MANY"===m),"ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.",m,s),"DEFINE_MANY_MERGED"===m?r[s]=h(r[s],u):"DEFINE_MANY"===m&&(r[s]=f(r[s],u))}else r[s]=u}}}else;}function p(t,e){if(e)for(var n in e){var r=e[n];if(e.hasOwnProperty(n)){var i=n in T;a(!i,'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',n);var o=n in t;a(!o,"ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",n),t[n]=r}}}function l(t,e){a(t&&e&&"object"==typeof t&&"object"==typeof e,"mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.");for(var n in e)e.hasOwnProperty(n)&&(a(void 0===t[n],"mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.",n),t[n]=e[n]);return t}function h(t,e){return function(){var n=t.apply(this,arguments),r=e.apply(this,arguments);if(null==n)return r;if(null==r)return n;var i={};return l(i,n),l(i,r),i}}function f(t,e){return function(){t.apply(this,arguments),e.apply(this,arguments)}}function d(t,e){var n=e.bind(t);return n}function _(t){for(var e=t.__reactAutoBindPairs,n=0;n<e.length;n+=2){var r=e[n],i=e[n+1];t[r]=d(t,i)}}function m(t){var e=r(function(t,r,i){this.__reactAutoBindPairs.length&&_(this),this.props=t,this.context=r,this.refs=s,this.updater=i||n,this.state=null;var o=this.getInitialState?this.getInitialState():null;a("object"==typeof o&&!Array.isArray(o),"%s.getInitialState(): must return an object or null",e.displayName||"ReactCompositeComponent"),this.state=o});e.prototype=new v,e.prototype.constructor=e,e.prototype.__reactAutoBindPairs=[],y.forEach(u.bind(null,e)),u(e,b),u(e,t),u(e,E),e.getDefaultProps&&(e.defaultProps=e.getDefaultProps()),a(e.prototype.render,"createClass(...): Class specification must implement a `render` method.");for(var i in g)e.prototype[i]||(e.prototype[i]=null);return e}var y=[],g={mixins:"DEFINE_MANY",statics:"DEFINE_MANY",propTypes:"DEFINE_MANY",contextTypes:"DEFINE_MANY",childContextTypes:"DEFINE_MANY",getDefaultProps:"DEFINE_MANY_MERGED",getInitialState:"DEFINE_MANY_MERGED",getChildContext:"DEFINE_MANY_MERGED",render:"DEFINE_ONCE",componentWillMount:"DEFINE_MANY",componentDidMount:"DEFINE_MANY",componentWillReceiveProps:"DEFINE_MANY",shouldComponentUpdate:"DEFINE_ONCE",componentWillUpdate:"DEFINE_MANY",componentDidUpdate:"DEFINE_MANY",componentWillUnmount:"DEFINE_MANY",updateComponent:"OVERRIDE_BASE"},T={displayName:function(t,e){t.displayName=e},mixins:function(t,e){if(e)for(var n=0;n<e.length;n++)u(t,e[n])},childContextTypes:function(t,e){t.childContextTypes=o({},t.childContextTypes,e)},contextTypes:function(t,e){t.contextTypes=o({},t.contextTypes,e)},getDefaultProps:function(t,e){t.getDefaultProps?t.getDefaultProps=h(t.getDefaultProps,e):t.getDefaultProps=e},propTypes:function(t,e){t.propTypes=o({},t.propTypes,e)},statics:function(t,e){p(t,e)},autobind:function(){}},b={componentDidMount:function(){this.__isMounted=!0}},E={componentWillUnmount:function(){this.__isMounted=!1}},x={replaceState:function(t,e){this.updater.enqueueReplaceState(this,t,e)},isMounted:function(){return!!this.__isMounted}},v=function(){};return o(v.prototype,t.prototype,x),m}var o=n(9),s=n(10),a=n(1),c="mixins";t.exports=i},function(t,e,n){"use strict";function r(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var i=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(t){r[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var n,a,c=r(t),u=1;u<arguments.length;u++){n=Object(arguments[u]);for(var p in n)o.call(n,p)&&(c[p]=n[p]);if(i){a=i(n);for(var l=0;l<a.length;l++)s.call(n,a[l])&&(c[a[l]]=n[a[l]])}}return c}},function(t,e,n){"use strict";var r={};t.exports=r}])});
//# sourceMappingURL=react-countdown-clock.js.map
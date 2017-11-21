!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react")):"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?exports.ReactCountdownClock=e(require("react")):t.ReactCountdownClock=e(t.React)}(this,function(t){return function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="C:\\Users\\User\\Documents\\Apps\\react-countdown-clock-customised-for-exquizitely\\react-countdown-clock\\build",e(e.s=2)}([function(e,r){e.exports=t},function(t,e,r){"use strict";function n(t,e,r,n,o,s,a,c){if(i(e),!t){var u;if(void 0===e)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var p=[r,n,o,s,a,c],l=0;u=new Error(e.replace(/%s/g,function(){return p[l++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}}var i=function(t){};t.exports=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,i,o,s;o=r(0),i=r(3),n=r(7),s=n({_seconds:0,_radius:null,_fraction:null,_content:null,_canvas:null,_timeoutIds:[],defaultProps:function(){return{seconds:60,size:300,color:"#000",alpha:1,timeFormat:"hms",fontSize:"auto",font:"Arial",showMilliseconds:!0,restartOnNewProps:!0,paused:!1}},displayName:"ReactCountdownClock",propTypes:{seconds:o.PropTypes.number,size:o.PropTypes.number,weight:o.PropTypes.number,color:o.PropTypes.string,fontSize:o.PropTypes.string,font:o.PropTypes.string,alpha:o.PropTypes.number,timeFormat:o.PropTypes.string,onComplete:o.PropTypes.func,onTick:o.PropTypes.func,showMilliseconds:i.bool,paused:o.PropTypes.bool,pausedText:o.PropTypes.string,backgroundColor:o.PropTypes.string,backgroundColorEdge:o.PropTypes.string,fontColor:o.PropTypes.string,restartOnNewProps:o.PropTypes.bool},componentWillReceiveProps:function(t){if(this.props.restartOnNewProps&&(this._seconds=t.seconds,this._cancelTimer(),this._updateCanvas(),this._setupTimer()),t.color!==this.props.color&&(this._drawBackground(),this._updateCanvas()),t.paused!==this.props.paused&&(this.props.paused||this._startTimer(),this.props.paused))return this._pauseTimer()},componentDidMount:function(){return this._seconds=this.props.seconds,this._setupTimer()},componentWillUnmount:function(){return this._cancelTimer()},_setupTimer:function(){if(this._setScale(),this._setupCanvases(),this._drawBackground(),this._drawIcon(),this._drawTimerText(),this._drawTimer(),!this.props.paused)return this._startTimer()},_updateCanvas:function(){return this._clearTimer(),this._drawTimer(),this._clearTimerText(),this._drawTimerText(),this._clearIcon(),this._drawIcon()},_setScale:function(){return this._radius=this.props.size/2,this._fraction=2/this._seconds,this._tickPeriod=this._calculateTick(),this._innerRadius=this.props.weight?this._radius-this.props.weight:this._radius/1.8},_calculateTick:function(){var t,e;return e=1.8,t=this._seconds*e,t>1e3?1e3:t},_setupCanvases:function(){if(this._background=this.refs.background.getContext("2d"),this._icon=this.refs.background.getContext("2d"),this._icon.textAlign="center",this._icon.textBaseline="middle",this._timerText=this.refs.timerText.getContext("2d"),this._timerText.textAlign="center",this._timerText.textBaseline="middle",this._timer=this.refs.timer.getContext("2d"),this._timer.textAlign="center",this._timer.textBaseline="middle",null!=this.props.onClick)return this.refs.component.addEventListener("click",this.props.onClick)},_startTimer:function(){return this._timeoutIds.push(setTimeout(function(t){return function(){return t._tick()}}(this),200))},_pauseTimer:function(){return this._cancelTimer()},_cancelTimer:function(){var t,e,r,n,i;for(r=this._timeoutIds,n=[],t=0,e=r.length;t<e;t++)i=r[t],n.push(clearTimeout(i));return n},_tick:function(){var t;return t=Date.now(),this._timeoutIds.push(setTimeout(function(e){return function(){var r;return r=(Date.now()-t)/1e3,e._seconds-=r,e.props.onTick&&e.props.onTick(e._seconds),e._seconds<=0?(e._seconds=0,e._handleComplete(),e._clearTimer(),e._clearTimerText(),e._clearIcon()):(e._updateCanvas(),e._tick())}}(this),this._tickPeriod))},_handleComplete:function(){if(this.props.onComplete)return this.props.onComplete()},_clearTimer:function(){return this._timer.clearRect(0,0,this.props.size,this.props.size),this._drawBackground()},_clearTimerText:function(){return this._timerText.clearRect(0,0,this.props.size,this.props.size),this._timerText.fillText(" ",this._radius,59)},_clearIcon:function(){return this._icon.clearRect(0,0,this.props.size,this.props.size),this._icon.fillText(" ",50,29)},_drawBackground:function(){return this._background.beginPath(),this._background.globalAlpha=1,this._background.fillStyle=this.props.backgroundColorEdge,this._background.arc(this._radius,this._radius,this._radius,0,2*Math.PI,!1),this._background.arc(this._radius,this._radius,this._innerRadius,2*Math.PI,0,!0),this._background.closePath(),this._background.fill()},_formattedTime:function(){var t,e,r,n,i,o;return t=null!=(n=this._seconds<=9.9&&this.props.showMilliseconds)?n:{1:0},"hms"===this.props.timeFormat?(e=parseInt(this._seconds/3600)%24,r=parseInt(this._seconds/60)%60,i=(this._seconds%60).toFixed(t),e<10&&(e="0"+e),r<10&&(r="0"+r),i<10&&r>=1&&(i="0"+i),o=[],e>0&&o.push(e),r>0&&o.push(r),o.push(i),o.join(":")):this._seconds.toFixed(t)},_fontSize:function(t){var e;return"auto"===this.props.fontSize?(e=function(){switch(t.length){case 8:return 4;case 5:return 3;default:return 2}}(),this._radius/e+"px"):this.props.fontSize},_drawIcon:function(){return this._icon.clearRect(80,0,0,0),this._icon.globalAlpha=1,this._icon.fillStyle=this.props.fontColor||this.props.color,this._icon.font="27px FontAwesome",this._icon.fillText("",50,33)},_drawTimerText:function(){var t,e;return t=this._formattedTime(),e=this.props.paused&&null!=this.props.pausedText?this.props.pausedText:t,this._timerText.fillStyle=this.props.fontColor||this.props.color,this._timerText.font="normal "+this._fontSize(t)+" "+this.props.font,this._timerText.fillText(e,this._radius,62),this._timerText.fill()},_drawTimer:function(){var t;return t=this._fraction*this._seconds+1.5,this._timer.globalAlpha=1,this._timer.fillStyle=this.props.color,this._timer.strokeStyle=this.props.color,this._timer.beginPath(),this._timer.arc(this._radius,this._radius,this._radius,1.5*Math.PI,Math.PI*t,!1),this._timer.arc(this._radius,this._radius,this._innerRadius,Math.PI*t,1.5*Math.PI,!0),this._timer.closePath(),this._timer.fill()},render:function(){return o.createElement("div",{ref:"component",className:"react-countdown-clock"},o.createElement("canvas",{ref:"background",style:{position:"absolute"},width:this.props.size,height:this.props.size}),o.createElement("canvas",{ref:"timer",style:{position:"absolute"},width:this.props.size,height:this.props.size}),o.createElement("canvas",{ref:"timerText",style:{position:"absolute"},width:this.props.size,height:this.props.size}),o.createElement("canvas",{ref:"icon",style:{position:"absolute"},width:this.props.size,height:this.props.size}))}}),e.default=s},function(t,e,r){t.exports=r(4)()},function(t,e,r){"use strict";var n=r(5),i=r(1),o=r(6);t.exports=function(){function t(t,e,r,n,s,a){a!==o&&i(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function e(){return t}t.isRequired=t;var r={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e};return r.checkPropTypes=n,r.PropTypes=r,r}},function(t,e,r){"use strict";function n(t){return function(){return t}}var i=function(){};i.thatReturns=n,i.thatReturnsFalse=n(!1),i.thatReturnsTrue=n(!0),i.thatReturnsNull=n(null),i.thatReturnsThis=function(){return this},i.thatReturnsArgument=function(t){return t},t.exports=i},function(t,e,r){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,e,r){"use strict";var n=r(0),i=r(8);if(void 0===n)throw Error("create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.");var o=(new n.Component).updater;t.exports=i(n.Component,n.isValidElement,o)},function(t,e,r){"use strict";function n(t){return t}function i(t,e,r){function i(t,e){var r=g.hasOwnProperty(e)?g[e]:null;x.hasOwnProperty(e)&&a("OVERRIDE_BASE"===r,"ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.",e),t&&a("DEFINE_MANY"===r||"DEFINE_MANY_MERGED"===r,"ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",e)}function u(t,r){if(r){a("function"!=typeof r,"ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."),a(!e(r),"ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");var n=t.prototype,o=n.__reactAutoBindPairs;r.hasOwnProperty(c)&&T.mixins(t,r.mixins);for(var s in r)if(r.hasOwnProperty(s)&&s!==c){var u=r[s],p=n.hasOwnProperty(s);if(i(p,s),T.hasOwnProperty(s))T[s](t,u);else{var l=g.hasOwnProperty(s),d="function"==typeof u,_=d&&!l&&!p&&!1!==r.autobind;if(_)o.push(s,u),n[s]=u;else if(p){var m=g[s];a(l&&("DEFINE_MANY_MERGED"===m||"DEFINE_MANY"===m),"ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.",m,s),"DEFINE_MANY_MERGED"===m?n[s]=h(n[s],u):"DEFINE_MANY"===m&&(n[s]=f(n[s],u))}else n[s]=u}}}else;}function p(t,e){if(e)for(var r in e){var n=e[r];if(e.hasOwnProperty(r)){var i=r in T;a(!i,'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.',r);var o=r in t;a(!o,"ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.",r),t[r]=n}}}function l(t,e){a(t&&e&&"object"==typeof t&&"object"==typeof e,"mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.");for(var r in e)e.hasOwnProperty(r)&&(a(void 0===t[r],"mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.",r),t[r]=e[r]);return t}function h(t,e){return function(){var r=t.apply(this,arguments),n=e.apply(this,arguments);if(null==r)return n;if(null==n)return r;var i={};return l(i,r),l(i,n),i}}function f(t,e){return function(){t.apply(this,arguments),e.apply(this,arguments)}}function d(t,e){var r=e.bind(t);return r}function _(t){for(var e=t.__reactAutoBindPairs,r=0;r<e.length;r+=2){var n=e[r],i=e[r+1];t[n]=d(t,i)}}function m(t){var e=n(function(t,n,i){this.__reactAutoBindPairs.length&&_(this),this.props=t,this.context=n,this.refs=s,this.updater=i||r,this.state=null;var o=this.getInitialState?this.getInitialState():null;a("object"==typeof o&&!Array.isArray(o),"%s.getInitialState(): must return an object or null",e.displayName||"ReactCompositeComponent"),this.state=o});e.prototype=new v,e.prototype.constructor=e,e.prototype.__reactAutoBindPairs=[],y.forEach(u.bind(null,e)),u(e,b),u(e,t),u(e,E),e.getDefaultProps&&(e.defaultProps=e.getDefaultProps()),a(e.prototype.render,"createClass(...): Class specification must implement a `render` method.");for(var i in g)e.prototype[i]||(e.prototype[i]=null);return e}var y=[],g={mixins:"DEFINE_MANY",statics:"DEFINE_MANY",propTypes:"DEFINE_MANY",contextTypes:"DEFINE_MANY",childContextTypes:"DEFINE_MANY",getDefaultProps:"DEFINE_MANY_MERGED",getInitialState:"DEFINE_MANY_MERGED",getChildContext:"DEFINE_MANY_MERGED",render:"DEFINE_ONCE",componentWillMount:"DEFINE_MANY",componentDidMount:"DEFINE_MANY",componentWillReceiveProps:"DEFINE_MANY",shouldComponentUpdate:"DEFINE_ONCE",componentWillUpdate:"DEFINE_MANY",componentDidUpdate:"DEFINE_MANY",componentWillUnmount:"DEFINE_MANY",updateComponent:"OVERRIDE_BASE"},T={displayName:function(t,e){t.displayName=e},mixins:function(t,e){if(e)for(var r=0;r<e.length;r++)u(t,e[r])},childContextTypes:function(t,e){t.childContextTypes=o({},t.childContextTypes,e)},contextTypes:function(t,e){t.contextTypes=o({},t.contextTypes,e)},getDefaultProps:function(t,e){t.getDefaultProps?t.getDefaultProps=h(t.getDefaultProps,e):t.getDefaultProps=e},propTypes:function(t,e){t.propTypes=o({},t.propTypes,e)},statics:function(t,e){p(t,e)},autobind:function(){}},b={componentDidMount:function(){this.__isMounted=!0}},E={componentWillUnmount:function(){this.__isMounted=!1}},x={replaceState:function(t,e){this.updater.enqueueReplaceState(this,t,e)},isMounted:function(){return!!this.__isMounted}},v=function(){};return o(v.prototype,t.prototype,x),m}var o=r(9),s=r(10),a=r(1),c="mixins";t.exports=i},function(t,e,r){"use strict";function n(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var i=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(t){n[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var r,a,c=n(t),u=1;u<arguments.length;u++){r=Object(arguments[u]);for(var p in r)o.call(r,p)&&(c[p]=r[p]);if(i){a=i(r);for(var l=0;l<a.length;l++)s.call(r,a[l])&&(c[a[l]]=r[a[l]])}}return c}},function(t,e,r){"use strict";var n={};t.exports=n}])});
//# sourceMappingURL=react-countdown-clock.js.map
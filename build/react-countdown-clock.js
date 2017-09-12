!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react")):"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?exports.ReactCountdownClock=e(require("react")):t.ReactCountdownClock=e(t.React)}(this,function(t){return function(t){function e(r){if(i[r])return i[r].exports;var s=i[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var i={};return e.m=t,e.c=i,e.d=function(t,i,r){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="C:\\Users\\User\\Documents\\Apps\\react-countdown-clock-customised-for-exquizitely\\react-countdown-clock\\build",e(e.s=0)}([function(t,e,i){var r,s;s=i(1),r=i(2),t.exports=s.createClass({_seconds:0,_radius:null,_fraction:null,_content:null,_canvas:null,_timeoutIds:[],displayName:"ReactCountdownClock",propTypes:{seconds:s.PropTypes.number,size:s.PropTypes.number,weight:s.PropTypes.number,color:s.PropTypes.string,fontSize:s.PropTypes.string,font:s.PropTypes.string,alpha:s.PropTypes.number,timeFormat:s.PropTypes.string,onComplete:s.PropTypes.func,showMilliseconds:r.bool,backgroundColor:s.PropTypes.string,backgroundColorEdge:s.PropTypes.string,fontColor:s.PropTypes.string,restartOnNewProps:s.PropTypes.bool},getDefaultProps:function(){return{seconds:60,size:300,color:"#000",alpha:1,timeFormat:"hms",fontSize:"auto",font:"Arial",showMilliseconds:!0,restartOnNewProps:!0}},componentWillReceiveProps:function(t){if(this.props.restartOnNewProps&&(this._seconds=t.seconds,this._setupTimer()),t.color!==this.props.color)return this._clearBackground(),this._drawBackground(),this._updateCanvas()},componentDidMount:function(){return this._seconds=this.props.seconds,this._setupTimer()},componentWillUnmount:function(){return this._cancelTimer()},_setupTimer:function(){if(this._setScale(),this._setupCanvases(),this._drawBackground(),this._drawIcon(),this._drawTimerText(),this._drawTimer(),!this.props.paused)return this._startTimer()},_updateCanvas:function(){return this._clearTimer(),this._drawTimer(),this._drawTimerText()},_setScale:function(){return this._radius=this.props.size/2,this._fraction=2/this._seconds,this._tickPeriod=this._calculateTick(),this._innerRadius=this.props.weight?this._radius-this.props.weight:this._radius/1.8},_calculateTick:function(){var t,e;return e=1.8,t=this._seconds*e,t>1e3?1e3:t},_setupCanvases:function(){if(this._background=this.refs.background.getContext("2d"),this._icon=this.refs.background.getContext("2d"),this._icon.textAlign="center",this._icon.textBaseline="middle",this._timerText=this.refs.timerText.getContext("2d"),this._timerText.textAlign="center",this._timerText.textBaseline="middle",this._timer=this.refs.timer.getContext("2d"),this._timer.textAlign="center",this._timer.textBaseline="middle",null!=this.props.onClick)return this.refs.component.addEventListener("click",this.props.onClick)},_startTimer:function(){return this._timeoutIds.push(setTimeout(function(t){return function(){return t._tick()}}(this),200))},_stopTimer:function(){var t,e,i,r,s;for(i=this._timeoutIds,r=[],t=0,e=i.length;t<e;t++)s=i[t],r.push(clearTimeout(s));return r},_cancelTimer:function(){if(this._stopTimer(),null!=this.props.onClick)return this.refs.component.removeEventListener("click",this.props.onClick)},_tick:function(){var t;return t=Date.now(),this._timeoutIds.push(setTimeout(function(e){return function(){var i;return i=(Date.now()-t)/1e3,e._seconds-=i,e._seconds<=0?(e._seconds=0,e._handleComplete(),e._clearTimer()):(e._updateCanvas(),e._tick())}}(this),this._tickPeriod))},_handleComplete:function(){if(this.props.onComplete)return this.props.onComplete()},_clearBackground:function(){return this._background.clearRect(0,0,this.refs.timer.width,this.refs.timer.height)},_clearTimer:function(){return this._timer.clearRect(0,0,this.refs.timer.width,this.refs.timer.height),this._timerText.clearRect(0,0,this.refs.timer.width,this.refs.timer.height)},_drawBackground:function(){return this._background.beginPath(),this._background.globalAlpha=1,this._background.fillStyle=this.props.backgroundColorEdge,this._background.arc(this._radius,this._radius,this._radius,0,2*Math.PI,!1),this._background.arc(this._radius,this._radius,this._innerRadius,2*Math.PI,0,!0),this._background.closePath(),this._background.fill()},_formattedTime:function(){var t,e,i,r,s,n;return t=null!=(r=this._seconds<=9.9&&this.props.showMilliseconds)?r:{1:0},"hms"===this.props.timeFormat?(e=parseInt(this._seconds/3600)%24,i=parseInt(this._seconds/60)%60,s=(this._seconds%60).toFixed(t),e<10&&(e="0"+e),i<10&&(i="0"+i),s<10&&i>=1&&(s="0"+s),n=[],e>0&&n.push(e),i>0&&n.push(i),n.push(s),n.join(":")):this._seconds.toFixed(t)},_fontSize:function(t){var e;return"auto"===this.props.fontSize?(e=function(){switch(t.length){case 8:return 4;case 5:return 3;default:return 2}}(),this._radius/e+"px"):this.props.fontSize},_drawIcon:function(){return this._icon.clearRect(107,0,0,0),this._icon.globalAlpha=1,this._icon.fillStyle=this.props.fontColor||this.props.color,this._icon.font="32px FontAwesome",this._icon.fillText("",67,38)},_drawTimerText:function(){var t,e;return this._fraction*this._seconds+1.5,t=this._formattedTime(),e=this.props.paused&&null!=this.props.pausedText?this.props.pausedText:t,this._timerText.fillStyle=this.props.fontColor||this.props.color,this._timerText.font="normal "+this._fontSize(t)+" "+this.props.font,this._timerText.fillText(e,this._radius,79),this._timerText.fill()},_drawTimer:function(){var t;return t=this._fraction*this._seconds+1.5,this._timer.globalAlpha=1,this._timer.fillStyle=this.props.color,this._timer.strokeStyle=this.props.color,this._timer.beginPath(),this._timer.arc(this._radius,this._radius,this._radius,1.5*Math.PI,Math.PI*t,!1),this._timer.arc(this._radius,this._radius,this._innerRadius,Math.PI*t,1.5*Math.PI,!0),this._timer.closePath(),this._timer.fill()},render:function(){return s.createElement("div",{ref:"component",className:"react-countdown-clock"},s.createElement("canvas",{ref:"background",style:{position:"absolute"},width:this.props.size,height:this.props.size}),s.createElement("canvas",{ref:"timer",style:{position:"absolute"},width:this.props.size,height:this.props.size}),s.createElement("canvas",{ref:"timerText",style:{position:"absolute"},width:this.props.size,height:this.props.size}),s.createElement("canvas",{ref:"icon",style:{position:"absolute"},width:this.props.size,height:this.props.size}))}})},function(e,i){e.exports=t},function(t,e,i){t.exports=i(3)()},function(t,e,i){"use strict";var r=i(4),s=i(5),n=i(6);t.exports=function(){function t(t,e,i,r,o,c){c!==n&&s(!1,"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")}function e(){return t}t.isRequired=t;var i={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e};return i.checkPropTypes=r,i.PropTypes=i,i}},function(t,e,i){"use strict";function r(t){return function(){return t}}var s=function(){};s.thatReturns=r,s.thatReturnsFalse=r(!1),s.thatReturnsTrue=r(!0),s.thatReturnsNull=r(null),s.thatReturnsThis=function(){return this},s.thatReturnsArgument=function(t){return t},t.exports=s},function(t,e,i){"use strict";function r(t,e,i,r,n,o,c,a){if(s(e),!t){var u;if(void 0===e)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var h=[i,r,n,o,c,a],p=0;u=new Error(e.replace(/%s/g,function(){return h[p++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}}var s=function(t){};t.exports=r},function(t,e,i){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}])});
//# sourceMappingURL=react-countdown-clock.js.map
React  = require 'react'
PropTypes = require 'prop-types'
CreateReactClass = require 'create-react-class'

ReactCountdownClock = CreateReactClass
  _seconds: 0
  _radius: null
  _fraction: null
  _content: null
  _canvas: null
  _timeoutIds: []

  defaultProps: ->
    seconds: 60
    size: 300
    color: '#000'
    alpha: 1
    timeFormat: 'hms'
    fontSize: 'auto'
    font: 'Arial'
    showMilliseconds: true
    restartOnNewProps: true
    paused: false

  displayName: 'ReactCountdownClock'

  propTypes:
    seconds: React.PropTypes.number
    size: React.PropTypes.number
    weight: React.PropTypes.number
    color: React.PropTypes.string
    fontSize: React.PropTypes.string
    font: React.PropTypes.string
    alpha: React.PropTypes.number
    timeFormat: React.PropTypes.string
    onComplete: React.PropTypes.func
    onTick: React.PropTypes.func
    showMilliseconds: PropTypes.bool
    paused: React.PropTypes.bool
    pausedText: React.PropTypes.string
    backgroundColor: React.PropTypes.string
    backgroundColorEdge: React.PropTypes.string
    fontColor: React.PropTypes.string
    restartOnNewProps: React.PropTypes.bool

  #getDefaultProps: ->

  componentWillReceiveProps: (props) ->
    #if @props.restartOnNewProps or (props.paused != @props.paused && !@props.paused)
    if @props.restartOnNewProps
      @_seconds = props.seconds
      @_cancelTimer()
      @_updateCanvas()
      @_setupTimer()

    if props.color != @props.color
      #@_clearBackground()
      @_drawBackground()
      @_updateCanvas()

    if props.paused != @props.paused
      @_startTimer() if !@props.paused
      @_pauseTimer() if @props.paused

  componentDidMount: ->
    @_seconds = @props.seconds
    @_setupTimer()

  componentWillUnmount: ->
    @_cancelTimer()

  _setupTimer: ->
    @_setScale()
    @_setupCanvases()
    @_drawBackground()
    @_drawIcon()
    @_drawTimerText()
    @_drawTimer()
    #@_startTimer() unless @props.paused
    @_startTimer()

  _updateCanvas: ->
    @_clearTimer()
    @_drawTimer()
    @_clearTimerText()
    @_drawTimerText()
    @_clearIcon()
    @_drawIcon()

  _setScale: ->
    @_radius      = @props.size / 2
    @_fraction    = 2 / @_seconds
    @_tickPeriod  = @_calculateTick()
    @_innerRadius =
      if @props.weight
        @_radius - @props.weight
      else
        @_radius / 1.8

  _calculateTick: ->
    # Tick period (milleseconds) needs to be fast for smaller time periods and slower
    # for longer ones. This provides smoother rendering. It should never exceed 1 second.
    tickScale = 1.8
    tick = @_seconds * tickScale
    if tick > 1000 then 1000 else tick

  _setupCanvases: ->
    @_background = @refs.background.getContext '2d'
    @_icon = @refs.background.getContext '2d'
    @_icon.textAlign = 'center'
    @_icon.textBaseline = 'middle'

    @_timerText = @refs.timerText.getContext '2d'
    @_timerText.textAlign = 'center'
    @_timerText.textBaseline = 'middle'

    @_timer = @refs.timer.getContext '2d'
    @_timer.textAlign = 'center'
    @_timer.textBaseline = 'middle'
    if @props.onClick?
      @refs.component.addEventListener 'click', @props.onClick

  _startTimer: ->
    # Give it a moment to collect it's thoughts for smoother render
    @_timeoutIds.push(setTimeout ( => @_tick() ), 200)

  _pauseTimer: ->
    #@_stopTimer()
    @_cancelTimer()
    @_updateCanvas()

  #_stopTimer: ->
    #for timeout in @_timeoutIds
      #clearTimeout timeout

  _cancelTimer: ->
    for timeout in @_timeoutIds
      clearTimeout timeout

    #@_stopTimer()

    #if @props.onClick?
      #@refs.component.removeEventListener 'click', @props.onClick

  _tick: ->
    start = Date.now()
    @_timeoutIds.push(setTimeout ( =>
      duration = (Date.now() - start) / 1000
      @_seconds -= duration

      #console.log {'seconds='}
      #console.log @_seconds

      if @props.onTick
        @props.onTick(@_seconds)

      #console.log {'tickPeriod='}
      #console.log @_tickPeriod

      if @_seconds <= 0
        @_seconds = 0
        @_handleComplete()
        @_clearTimer()
        @_clearTimerText()
        @_clearIcon()
      else
        @_updateCanvas()
        @_tick()
        @_pauseTimer() if @props.paused

    ), @_tickPeriod)

  _handleComplete: ->
    if @props.onComplete
      @props.onComplete()

  #_clearBackground: ->
    #@_background.clearRect 0, 0, @refs.timer.width, @refs.timer.height

  _clearTimer: ->
    #@_timer.clearRect 0, 0, @refs.timer.width, @refs.timer.height
    @_timer.clearRect 0, 0, @props.size, @props.size
    @_drawBackground()

  _clearTimerText: ->
    @_timerText.clearRect 0, 0, @props.size, @props.size
    @_timerText.fillText ' ', @_radius, 59

  _clearIcon: ->
    @_icon.clearRect 0, 0, @props.size, @props.size
    @_icon.fillText(' ',50,29)

  _drawBackground: ->
    @_background.beginPath()
    #@_background.globalAlpha = @props.alpha / 3
    @_background.globalAlpha = 1
    #@_background.fillStyle = @props.backgroundColor or @props.color
    @_background.fillStyle = @props.backgroundColorEdge
    @_background.arc @_radius, @_radius,      @_radius,           0, Math.PI * 2, false
    @_background.arc @_radius, @_radius, @_innerRadius, Math.PI * 2,           0, true
    @_background.closePath() #remove?
    @_background.fill()

  _formattedTime: ->
    decimals = (@_seconds <= 9.9 && @props.showMilliseconds) ? 1 : 0

    if @props.timeFormat == 'hms'
      hours   = parseInt( @_seconds / 3600 ) % 24
      minutes = parseInt( @_seconds / 60 ) % 60
      seconds = (@_seconds % 60).toFixed(decimals)

      hours   = "0#{hours}" if hours < 10
      minutes = "0#{minutes}" if minutes < 10
      seconds = "0#{seconds}" if seconds < 10 && minutes >= 1

      timeParts = []
      timeParts.push hours if hours > 0
      timeParts.push minutes if minutes > 0
      timeParts.push seconds

      timeParts.join ':'
    else
      return @_seconds.toFixed(decimals)

  _fontSize: (timeString) ->
    if @props.fontSize == 'auto'
      scale = switch timeString.length
        when 8 then 4 # hh:mm:ss
        when 5 then 3 # mm:ss
        else 2        # ss or ss.s
      size = @_radius / scale
      "#{size}px"
    else
      @props.fontSize

  _drawIcon: ->
    @_icon.clearRect(80,0,0,0);
    @_icon.globalAlpha = 1
    @_icon.fillStyle = @props.fontColor or @props.color
    @_icon.font='27px FontAwesome'
    @_icon.fillText('\uF017',50,33)

  _drawTimerText: ->
    formattedTime = @_formattedTime()
    text = if (@props.paused && @props.pausedText?) then @props.pausedText else formattedTime


    # Timer Text
    @_timerText.fillStyle = @props.fontColor or @props.color
    @_timerText.font = "normal #{@_fontSize(formattedTime)} #{@props.font}"
    @_timerText.fillText text, @_radius, 62
    @_timerText.fill()


  _drawTimer: ->
    percent = @_fraction * @_seconds + 1.5
    #formattedTime = @_formattedTime()
    #text = if (@props.paused && @props.pausedText?) then @props.pausedText else formattedTime


    # Timer Text
    #@_timer.fillStyle = @props.fontColor or @props.color
    #@_timer.font = "normal #{@_fontSize(formattedTime)} #{@props.font}"
    #@_timer.fillText text, @_radius, @_radius
    #@_timer.fill()

    # Timer
    #@_timer.globalAlpha = @props.alpha
    @_timer.globalAlpha = 1
    @_timer.fillStyle = @props.color
    @_timer.strokeStyle = @props.color
    @_timer.beginPath()
    @_timer.arc @_radius, @_radius, @_radius,      Math.PI * 1.5,     Math.PI * percent, false
    @_timer.arc @_radius, @_radius, @_innerRadius, Math.PI * percent, Math.PI * 1.5,     true
    @_timer.closePath()
    @_timer.fill()

  render: ->
    <div ref='component' className='react-countdown-clock'>
      <canvas ref='background' style={ position: 'absolute' } width={@props.size} height={@props.size}></canvas>
      <canvas ref='timer' style={ position: 'absolute' } width={@props.size} height={@props.size}></canvas>
      <canvas ref='timerText' style={ position: 'absolute' } width={@props.size} height={@props.size}></canvas>
      <canvas ref='icon' style={ position: 'absolute' } width={@props.size} height={@props.size}></canvas>
    </div>

export default ReactCountdownClock

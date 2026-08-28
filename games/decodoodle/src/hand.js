import { joinMatch, sendToTable } from '@juxhouse/tardi-core/hand'
import { applyPicturePhoneStyle, PICTURE_PHONE_STYLES } from './visual-styles.js'

;(function () {
  var IDEA_CHARACTER_LIMIT = 64
  var IDEA_CHARACTER_COUNT_START = 55
  var style = document.createElement('style')
  var root = document.createElement('main')
  var title = document.createElement('h1')
  var label = document.createElement('label')
  var textarea = document.createElement('textarea')
  var ideaCharacterCount = document.createElement('p')
  var sendButton = document.createElement('button')
  var status = document.createElement('p')
  var timer = document.createElement('p')
  var header = document.createElement('header')
  var brand = document.createElement('div')
  var eyebrow = document.createElement('p')
  var latestPhase = ''
  var latestHasSubmittedIdea = false
  var latestHasSubmittedDrawing = false
  var latestHasSubmittedGuess = false
  var latestReceivedDrawing = ''
  var latestCanRestart = false
  var phaseDeadline = 0
  var drawingView = null
  var drawingColorOptions = ['#0f172a', '#ef4444', '#f97316', '#eab308', '#22c55e', '#38bdf8', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff']

  style.textContent = PICTURE_PHONE_STYLES
  document.head.append(style)
  applyPicturePhoneStyle()

  root.className = 'broken-picture-phone-hand'
  header.className = 'broken-picture-phone-header'
  brand.className = 'broken-picture-phone-brand'
  eyebrow.className = 'broken-picture-phone-eyebrow'
  eyebrow.textContent = 'Draw · pass · guess'
  title.className = 'broken-picture-phone-title'
  title.textContent = 'DecoDoodle'

  label.className = 'broken-picture-phone-label'
  label.htmlFor = 'broken-picture-phone-text'
  label.textContent = 'Write something for someone to draw'

  textarea.id = 'broken-picture-phone-text'
  textarea.className = 'broken-picture-phone-input'
  textarea.placeholder = 'For example: a penguin playing guitar'
  textarea.maxLength = IDEA_CHARACTER_LIMIT

  ideaCharacterCount.className = 'broken-picture-phone-character-count'
  ideaCharacterCount.setAttribute('aria-live', 'polite')

  sendButton.type = 'button'
  sendButton.className = 'broken-picture-phone-button'
  sendButton.textContent = 'Send Idea'
  sendButton.disabled = true
  sendButton.onclick = handleIdeaButton

  status.className = 'broken-picture-phone-status'
  status.setAttribute('aria-live', 'polite')

  timer.className = 'broken-picture-phone-timer'
  timer.setAttribute('aria-label', 'Time remaining')
  timer.hidden = true

  brand.append(eyebrow, title)
  header.append(brand, timer)

  textarea.oninput = handleIdeaInput
  textarea.onkeydown = handleIdeaKeydown
  textarea.onfocus = handleWritingFocus
  textarea.onblur = handleWritingBlur
  textarea.setAttribute('enterkeyhint', 'send')

  updateCharacterCount()
  root.append(header, label, textarea, ideaCharacterCount, status, sendButton)
  document.body.replaceChildren(root)

  syncViewportLayout()
  window.addEventListener('resize', syncViewportLayout)
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', syncViewportLayout)
  }

  joinMatch({
    onStateChange: handleStateChange,
  })

  window.setInterval(updateTimer, 250)

  function handleStateChange(state) {
    var tableState = state.messageFromTable
    var playerState

    if (!tableState) {
      phaseDeadline = 0
      updateTimer()
      textarea.disabled = true
      sendButton.disabled = true
      status.textContent = 'Connecting to the table...'
      return
    }

    phaseDeadline = tableState.phaseDeadline || 0
    playerState = tableState.playerStatesById[state.playerId]
    if (!playerState) {
      throw new Error('DecoDoodle player state is missing.')
    }

    updateTimer()
    root.setAttribute('data-phase', playerState.phase)

    if (playerState.phase === 'drawing') {
      if (latestPhase !== playerState.phase || latestHasSubmittedDrawing !== playerState.hasSubmittedDrawing) {
        renderDrawingStage(playerState)
      }
      latestPhase = playerState.phase
      latestHasSubmittedIdea = false
      latestHasSubmittedDrawing = playerState.hasSubmittedDrawing
      latestHasSubmittedGuess = false
      latestCanRestart = false
      return
    }

    if (playerState.phase === 'guessing') {
      if (
        latestPhase !== playerState.phase ||
        latestHasSubmittedGuess !== playerState.hasSubmittedGuess ||
        latestReceivedDrawing !== playerState.receivedDrawing
      ) {
        renderGuessingStage(playerState)
      }
      latestPhase = playerState.phase
      latestHasSubmittedIdea = false
      latestHasSubmittedGuess = playerState.hasSubmittedGuess
      latestHasSubmittedDrawing = false
      latestReceivedDrawing = playerState.receivedDrawing
      latestCanRestart = false
      return
    }

    if (playerState.phase === 'results') {
      if (latestPhase !== playerState.phase || latestCanRestart !== !!tableState.canRestart) {
        renderResultsStage(!!tableState.canRestart)
      }
      latestPhase = playerState.phase
      latestHasSubmittedIdea = false
      latestHasSubmittedDrawing = false
      latestHasSubmittedGuess = false
      latestReceivedDrawing = ''
      latestCanRestart = !!tableState.canRestart
      return
    }

    if (latestPhase === 'drawing' || latestPhase === 'guessing' || latestPhase === 'results') {
      textarea.value = ''
      updateCharacterCount()
      drawingView = null
      root.classList.remove('broken-picture-phone-hand-results')
      root.replaceChildren(header, label, textarea, ideaCharacterCount, status, sendButton)
    }

    latestHasSubmittedIdea = !!playerState.hasSubmitted
    textarea.disabled = playerState.phase !== 'writing' || latestHasSubmittedIdea
    textarea.classList.toggle('broken-picture-phone-input-sent', latestHasSubmittedIdea)
    sendButton.textContent = latestHasSubmittedIdea ? 'Change Idea' : 'Send Idea'
    sendButton.disabled = playerState.phase !== 'writing'
    status.textContent = getStatusText(playerState)
    status.classList.toggle('broken-picture-phone-status-sent', latestHasSubmittedIdea)
    latestPhase = playerState.phase
    latestHasSubmittedDrawing = false
    latestHasSubmittedGuess = false
    latestReceivedDrawing = ''
    latestCanRestart = false
    updateSendButton()
  }

  function submitIdea() {
    var idea = textarea.value.replace(/^\s+|\s+$/g, '')

    if (!idea) {
      status.textContent = 'Write an idea before sending it.'
      updateSendButton()
      return
    }

    textarea.disabled = true
    textarea.blur()
    textarea.classList.add('broken-picture-phone-input-sent')
    latestHasSubmittedIdea = true
    sendButton.textContent = 'Change Idea'
    sendButton.disabled = false
    status.textContent = '✓ Sent'
    status.classList.add('broken-picture-phone-status-sent')
    sendToTable({
      type: 'submit_idea',
      idea: idea,
    })
  }

  function handleIdeaButton() {
    if (latestHasSubmittedIdea) {
      changeIdea()
      return
    }

    submitIdea()
  }

  function changeIdea() {
    latestHasSubmittedIdea = false
    textarea.disabled = false
    textarea.classList.remove('broken-picture-phone-input-sent')
    sendButton.textContent = 'Send Idea'
    status.textContent = ''
    status.classList.remove('broken-picture-phone-status-sent')
    updateSendButton()
    sendToTable({
      type: 'resume_idea',
    })
    textarea.focus()
  }

  function handleIdeaKeydown(event) {
    if (event.key !== 'Enter' || event.shiftKey || event.isComposing) {
      return
    }

    event.preventDefault()
    if (!sendButton.disabled && !latestHasSubmittedIdea) {
      submitIdea()
    }
    textarea.blur()
  }

  function updateSendButton() {
    if (latestHasSubmittedIdea) {
      sendButton.disabled = false
      return
    }

    sendButton.disabled = textarea.disabled || !textarea.value.replace(/^\s+|\s+$/g, '')
  }

  function handleIdeaInput() {
    updateCharacterCount()
    updateSendButton()
  }

  function updateCharacterCount() {
    ideaCharacterCount.textContent = textarea.value.length + ' / ' + IDEA_CHARACTER_LIMIT
    ideaCharacterCount.hidden = textarea.value.length <= IDEA_CHARACTER_COUNT_START
  }

  function getStatusText(playerState) {
    if (playerState.phase === 'waiting_for_players') {
      return 'Waiting for another player to join.'
    }

    if (playerState.hasSubmitted) {
      return '✓ Sent'
    }

    return ''
  }

  function renderDrawingStage(playerState) {
    var promptBlock = document.createElement('div')
    var drawingLabel = document.createElement('p')
    var prompt = document.createElement('p')
    var drawingSurface = document.createElement('div')
    var drawingPanel = document.createElement('div')
    var tools = document.createElement('div')
    var swatches = document.createElement('div')
    var toolButtons = document.createElement('div')
    var penButton = document.createElement('button')
    var eraserButton = document.createElement('button')
    var bucketButton = document.createElement('button')
    var undoButton = document.createElement('button')
    var sizeLabel = document.createElement('label')
    var sizeInput = document.createElement('input')
    var canvasWrap = document.createElement('div')
    var canvas = document.createElement('canvas')
    var controls = document.createElement('div')
    var clearButton = document.createElement('button')
    var drawingSendButton = document.createElement('button')
    var resumeButton = document.createElement('button')
    var drawingStatus = document.createElement('p')
    var context
    var isDrawing = false
    var isPinching = false
    var suppressTouchDrawing = false
    var pendingTouchPoint = null
    var hasDrawn = false
    var activeTool = 'pen'
    var activeColor = drawingColorOptions[0]
    var activeSize = 12
    var canvasZoom = 1
    var canvasPanX = 0
    var canvasPanY = 0
    var pinchStartDistance = 0
    var pinchStartZoom = 1
    var pinchAnchorX = 0
    var pinchAnchorY = 0
    var history = []
    var isSubmitted = !!playerState.hasSubmittedDrawing

    if (drawingView && drawingView.idea === playerState.receivedIdea) {
      updateDrawingReadyState(playerState.hasSubmittedDrawing)
      return
    }

    promptBlock.className = 'broken-picture-phone-drawing-prompt'
    drawingLabel.className = 'broken-picture-phone-label'
    drawingLabel.textContent = 'Draw this'
    prompt.className = 'broken-picture-phone-prompt'
    prompt.textContent = playerState.receivedIdea
    promptBlock.append(drawingLabel, prompt)

    tools.className = 'broken-picture-phone-drawing-tools'
    swatches.className = 'broken-picture-phone-swatches'
    toolButtons.className = 'broken-picture-phone-tool-buttons'
    createColorSwatches(swatches)

    penButton.type = 'button'
    penButton.className = 'broken-picture-phone-tool-button broken-picture-phone-tool-button-active'
    penButton.append(createToolIcon('paint'))
    penButton.title = 'Paint'
    penButton.setAttribute('aria-label', 'Paint')

    eraserButton.type = 'button'
    eraserButton.className = 'broken-picture-phone-tool-button'
    eraserButton.append(createToolIcon('eraser'))
    eraserButton.title = 'Eraser'
    eraserButton.setAttribute('aria-label', 'Eraser')

    bucketButton.type = 'button'
    bucketButton.className = 'broken-picture-phone-tool-button'
    bucketButton.append(createToolIcon('bucket'))
    bucketButton.title = 'Paint bucket'
    bucketButton.setAttribute('aria-label', 'Paint bucket')

    undoButton.type = 'button'
    undoButton.className = 'broken-picture-phone-tool-button'
    undoButton.append(createToolIcon('undo'))
    undoButton.title = 'Undo'
    undoButton.setAttribute('aria-label', 'Undo')
    undoButton.disabled = true

    clearButton.type = 'button'
    clearButton.className = 'broken-picture-phone-tool-button'
    clearButton.append(createToolIcon('clear'))
    clearButton.title = 'Clear drawing'
    clearButton.setAttribute('aria-label', 'Clear drawing')

    toolButtons.append(penButton, eraserButton, bucketButton, undoButton, clearButton)
    tools.append(swatches, toolButtons)

    drawingPanel.className = 'broken-picture-phone-drawing-panel'

    sizeLabel.className = 'broken-picture-phone-size'
    sizeLabel.textContent = 'Size'
    sizeInput.type = 'range'
    sizeInput.min = '4'
    sizeInput.max = '36'
    sizeInput.step = '2'
    sizeInput.value = String(activeSize)
    sizeInput.setAttribute('aria-label', 'Pen size')
    sizeLabel.append(sizeInput)

    canvasWrap.className = 'broken-picture-phone-canvas-wrap'
    canvas.className = 'broken-picture-phone-canvas'
    canvas.width = 600
    canvas.height = 600
    canvas.style.transformOrigin = '0 0'
    canvas.setAttribute('aria-label', 'Drawing canvas for: ' + playerState.receivedIdea)
    canvasWrap.append(canvas)
    drawingSurface.className = 'broken-picture-phone-drawing-surface'
    drawingPanel.append(tools, sizeLabel)
    drawingSurface.append(canvasWrap, drawingPanel)

    drawingSendButton.type = 'button'
    drawingSendButton.className = 'broken-picture-phone-button'
    drawingSendButton.textContent = 'Send Drawing'
    drawingSendButton.disabled = true
    resumeButton.type = 'button'
    resumeButton.className = 'broken-picture-phone-button broken-picture-phone-resume-button broken-picture-phone-hidden'
    resumeButton.textContent = 'Resume Drawing'
    controls.className = 'broken-picture-phone-controls'
    controls.append(drawingSendButton, resumeButton)

    drawingStatus.className = 'broken-picture-phone-status'
    drawingStatus.setAttribute('aria-live', 'polite')

    root.replaceChildren(header, promptBlock, drawingSurface, controls)

    context = canvas.getContext('2d')
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    updateContextStyle()

    drawingView = {
      idea: playerState.receivedIdea,
      canvas: canvas,
      clearButton: clearButton,
      sendButton: drawingSendButton,
      resumeButton: resumeButton,
      status: drawingStatus,
      tools: [penButton, eraserButton, bucketButton, undoButton, clearButton, drawingSendButton, resumeButton],
      swatches: swatches,
      sizeInput: sizeInput,
      canvasWrap: canvasWrap,
      drawingPanel: drawingPanel,
      drawingSurface: drawingSurface,
      getHasDrawn: function () {
        return hasDrawn
      },
      getIsSubmitted: function () {
        return isSubmitted
      },
      setIsSubmitted: function (value) {
        isSubmitted = value
      },
      submit: submitDrawing,
    }
    window.requestAnimationFrame(syncDrawingCanvasSize)

    canvas.onmousedown = startMouseDrawing
    canvas.onmousemove = continueMouseDrawing
    canvas.onmouseup = stopDrawing
    canvas.onmouseleave = stopDrawing
    canvas.addEventListener('touchstart', startTouchDrawing, false)
    canvas.addEventListener('touchmove', continueTouchDrawing, false)
    canvas.addEventListener('touchend', stopTouchDrawing, false)
    canvas.addEventListener('touchcancel', stopTouchDrawing, false)

    penButton.onclick = function () {
      setActiveTool('pen')
    }

    eraserButton.onclick = function () {
      setActiveTool('eraser')
    }

    bucketButton.onclick = function () {
      setActiveTool('bucket')
    }

    undoButton.onclick = function () {
      undoCanvas()
    }

    sizeInput.oninput = function () {
      activeSize = parseInt(sizeInput.value, 10)
      updateContextStyle()
    }

    clearButton.onclick = function () {
      if (!hasDrawn) {
        drawingStatus.textContent = 'Canvas is already blank.'
        return
      }

      clearCanvas()
    }

    drawingSendButton.onclick = submitDrawing

    function submitDrawing() {
      if (!hasDrawn) {
        throw new Error('Cannot send an empty DecoDoodle drawing.')
      }

      if (isSubmitted) {
        return
      }

      isSubmitted = true
      updateDrawingReadyState(true)
      sendToTable({
        type: 'submit_drawing',
        drawing: canvas.toDataURL('image/png'),
      })
    }

    resumeButton.onclick = function () {
      isSubmitted = false
      updateDrawingReadyState(false)
      sendToTable({
        type: 'resume_drawing',
      })
    }

    function createColorSwatches(parent) {
      var index
      var colorButton

      for (index = 0; index < drawingColorOptions.length; index += 1) {
        colorButton = document.createElement('button')
        colorButton.type = 'button'
        colorButton.className = index === 0
          ? 'broken-picture-phone-swatch broken-picture-phone-swatch-active'
          : 'broken-picture-phone-swatch'
        colorButton.style.background = drawingColorOptions[index]
        colorButton.title = 'Color ' + (index + 1)
        colorButton.setAttribute('aria-label', 'Color ' + (index + 1))
        colorButton.setAttribute('data-color', drawingColorOptions[index])
        colorButton.onclick = selectColor
        parent.append(colorButton)
      }
    }

    function selectColor(event) {
      activeColor = event.currentTarget.getAttribute('data-color')
      setActiveTool('pen')
      updateSwatches()
      updateContextStyle()
    }

    function setActiveTool(tool) {
      activeTool = tool
      updateToolButtons()
      updateContextStyle()
    }

    function updateSwatches() {
      var buttons = swatches.querySelectorAll('button')
      var index

      for (index = 0; index < buttons.length; index += 1) {
        buttons[index].className = buttons[index].getAttribute('data-color') === activeColor
          ? 'broken-picture-phone-swatch broken-picture-phone-swatch-active'
          : 'broken-picture-phone-swatch'
      }
    }

    function updateToolButtons() {
      penButton.className = activeTool === 'pen'
        ? 'broken-picture-phone-tool-button broken-picture-phone-tool-button-active'
        : 'broken-picture-phone-tool-button'
      eraserButton.className = activeTool === 'eraser'
        ? 'broken-picture-phone-tool-button broken-picture-phone-tool-button-active'
        : 'broken-picture-phone-tool-button'
      bucketButton.className = activeTool === 'bucket'
        ? 'broken-picture-phone-tool-button broken-picture-phone-tool-button-active'
        : 'broken-picture-phone-tool-button'
    }

    function updateContextStyle() {
      context.lineWidth = activeSize
      context.strokeStyle = activeTool === 'eraser' ? '#ffffff' : activeColor
      context.fillStyle = activeTool === 'eraser' ? '#ffffff' : activeColor
    }

    function saveHistory() {
      history.push(context.getImageData(0, 0, canvas.width, canvas.height))
      if (history.length > 12) {
        history.shift()
      }
      undoButton.disabled = history.length === 0
    }

    function undoCanvas() {
      var previous

      if (history.length === 0) {
        return
      }

      previous = history.pop()
      context.putImageData(previous, 0, 0)
      undoButton.disabled = history.length === 0
      updateHasDrawn()
      drawingStatus.textContent = history.length ? 'Undone.' : 'Back to a blank canvas.'
    }

    function clearCanvas() {
      saveHistory()
      context.fillStyle = '#ffffff'
      context.fillRect(0, 0, canvas.width, canvas.height)
      updateHasDrawn()
      drawingStatus.textContent = 'Canvas cleared. Draw with your finger.'
    }

    function startMouseDrawing(event) {
      startDrawing(event.clientX, event.clientY)
    }

    function continueMouseDrawing(event) {
      if (isDrawing) {
        continueDrawing(event.clientX, event.clientY)
      }
    }

    function startTouchDrawing(event) {
      var touch = event.touches[0]

      event.preventDefault()
      if (event.touches.length >= 2) {
        startPinchZoom(event)
        return
      }

      if (suppressTouchDrawing) {
        return
      }

      pendingTouchPoint = {
        clientX: touch.clientX,
        clientY: touch.clientY,
      }
    }

    function continueTouchDrawing(event) {
      var touch = event.touches[0]

      event.preventDefault()
      if (event.touches.length >= 2) {
        updatePinchZoom(event)
        return
      }

      if (isPinching || suppressTouchDrawing) {
        return
      }

      if (pendingTouchPoint && isTouchMovePastThreshold(touch, pendingTouchPoint)) {
        startDrawing(pendingTouchPoint.clientX, pendingTouchPoint.clientY)
        pendingTouchPoint = null
      }

      if (isDrawing) {
        continueDrawing(touch.clientX, touch.clientY)
      }
    }

    function startPinchZoom(event) {
      var touches = event.touches
      var center = getTouchCenter(touches)
      var wrapPoint = getWrapPoint(center.x, center.y)

      stopDrawing()
      pendingTouchPoint = null
      isPinching = true
      suppressTouchDrawing = true
      pinchStartDistance = getTouchDistance(touches)
      pinchStartZoom = canvasZoom
      pinchAnchorX = (wrapPoint.x - canvasPanX) / pinchStartZoom
      pinchAnchorY = (wrapPoint.y - canvasPanY) / pinchStartZoom
    }

    function updatePinchZoom(event) {
      var center
      var distance
      var wrapPoint

      if (!isPinching) {
        startPinchZoom(event)
        return
      }

      center = getTouchCenter(event.touches)
      wrapPoint = getWrapPoint(center.x, center.y)
      distance = getTouchDistance(event.touches)
      canvasZoom = clamp(pinchStartZoom * distance / Math.max(1, pinchStartDistance), 1, 3)
      canvasPanX = clampCanvasPan(wrapPoint.x - pinchAnchorX * canvasZoom)
      canvasPanY = clampCanvasPan(wrapPoint.y - pinchAnchorY * canvasZoom)
      updateCanvasTransform()
    }

    function startDrawing(clientX, clientY) {
      var point = getCanvasPoint(canvas, clientX, clientY)

      if (activeTool === 'bucket') {
        saveHistory()
        floodFill(Math.round(point.x), Math.round(point.y), hexToRgb(activeColor))
        updateHasDrawn()
        drawingStatus.textContent = 'Filled area.'
        return
      }

      isDrawing = true
      saveHistory()
      updateContextStyle()
      context.beginPath()
      context.moveTo(point.x, point.y)
      context.lineTo(point.x, point.y)
      context.stroke()
      updateHasDrawn()
    }

    function continueDrawing(clientX, clientY) {
      var point = getCanvasPoint(canvas, clientX, clientY)

      context.lineTo(point.x, point.y)
      context.stroke()
      updateHasDrawn()
    }

    function stopDrawing() {
      isDrawing = false
    }

    function stopTouchDrawing(event) {
      stopDrawing()

      if (!event || !event.touches || event.touches.length === 0) {
        if (pendingTouchPoint && !isPinching && !suppressTouchDrawing) {
          startDrawing(pendingTouchPoint.clientX, pendingTouchPoint.clientY)
          stopDrawing()
        }
        isPinching = false
        suppressTouchDrawing = false
        pendingTouchPoint = null
        return
      }

      if (isPinching) {
        suppressTouchDrawing = true
      }
    }

    function updateCanvasTransform() {
      canvas.style.transform = 'translate(' + canvasPanX + 'px, ' + canvasPanY + 'px) scale(' + canvasZoom + ')'
    }

    function getTouchDistance(touches) {
      var dx = touches[0].clientX - touches[1].clientX
      var dy = touches[0].clientY - touches[1].clientY

      return Math.sqrt(dx * dx + dy * dy)
    }

    function getTouchCenter(touches) {
      return {
        x: (touches[0].clientX + touches[1].clientX) / 2,
        y: (touches[0].clientY + touches[1].clientY) / 2,
      }
    }

    function getWrapPoint(clientX, clientY) {
      var bounds = canvasWrap.getBoundingClientRect()

      return {
        x: clientX - bounds.left,
        y: clientY - bounds.top,
      }
    }

    function clampCanvasPan(value) {
      var bounds = canvasWrap.getBoundingClientRect()
      var maxPan = Math.max(bounds.width, bounds.height) * (canvasZoom - 1)

      return clamp(value, -maxPan, 0)
    }

    function isTouchMovePastThreshold(touch, startPoint) {
      var dx = touch.clientX - startPoint.clientX
      var dy = touch.clientY - startPoint.clientY

      return Math.sqrt(dx * dx + dy * dy) >= 3
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value))
    }

    function updateHasDrawn() {
      hasDrawn = !isCanvasBlank()
      drawingSendButton.disabled = !hasDrawn
    }

    function isCanvasBlank() {
      var pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
      var index

      for (index = 0; index < pixels.length; index += 4) {
        if (pixels[index] !== 255 || pixels[index + 1] !== 255 || pixels[index + 2] !== 255 || pixels[index + 3] !== 255) {
          return false
        }
      }

      return true
    }

    function floodFill(startX, startY, fillColor) {
      var image = context.getImageData(0, 0, canvas.width, canvas.height)
      var pixels = image.data
      var width = image.width
      var height = image.height
      var startIndex
      var targetColor
      var stack
      var point
      var pixelIndex

      if (startX < 0 || startY < 0 || startX >= width || startY >= height) {
        return
      }

      startIndex = (startY * width + startX) * 4
      targetColor = [pixels[startIndex], pixels[startIndex + 1], pixels[startIndex + 2], pixels[startIndex + 3]]
      if (sameColor(targetColor, fillColor)) {
        return
      }

      stack = [{ x: startX, y: startY }]

      while (stack.length) {
        point = stack.pop()
        if (point.x < 0 || point.y < 0 || point.x >= width || point.y >= height) {
          continue
        }

        pixelIndex = (point.y * width + point.x) * 4
        if (!pixelMatches(pixels, pixelIndex, targetColor)) {
          continue
        }

        pixels[pixelIndex] = fillColor[0]
        pixels[pixelIndex + 1] = fillColor[1]
        pixels[pixelIndex + 2] = fillColor[2]
        pixels[pixelIndex + 3] = 255

        stack.push({ x: point.x + 1, y: point.y })
        stack.push({ x: point.x - 1, y: point.y })
        stack.push({ x: point.x, y: point.y + 1 })
        stack.push({ x: point.x, y: point.y - 1 })
      }

      context.putImageData(image, 0, 0)
    }

    function pixelMatches(pixels, index, color) {
      return pixels[index] === color[0] &&
        pixels[index + 1] === color[1] &&
        pixels[index + 2] === color[2] &&
        pixels[index + 3] === color[3]
    }

    function sameColor(first, second) {
      return first[0] === second[0] &&
        first[1] === second[1] &&
        first[2] === second[2] &&
        first[3] === 255
    }

    function hexToRgb(hex) {
      return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
      ]
    }
  }

  function renderGuessingStage(playerState) {
    var guessLabel = document.createElement('label')
    var drawingImage = document.createElement('img')
    var guessTextarea = document.createElement('textarea')
    var guessButton = document.createElement('button')
    var guessStatus = document.createElement('p')

    drawingView = null

    guessLabel.className = 'broken-picture-phone-label'
    guessLabel.htmlFor = 'broken-picture-phone-guess'
    guessLabel.textContent = 'What is this drawing?'

    drawingImage.className = 'broken-picture-phone-drawing-preview'
    drawingImage.alt = 'Drawing to guess'
    drawingImage.src = playerState.receivedDrawing

    guessTextarea.id = 'broken-picture-phone-guess'
    guessTextarea.className = 'broken-picture-phone-input'
    guessTextarea.placeholder = 'Type your guess here...'
    guessTextarea.disabled = playerState.hasSubmittedGuess

    guessButton.type = 'button'
    guessButton.className = 'broken-picture-phone-button'
    guessButton.textContent = 'Send Guess'
    guessButton.disabled = true

    guessStatus.className = 'broken-picture-phone-status'
    guessStatus.setAttribute('aria-live', 'polite')
    guessStatus.textContent = playerState.hasSubmittedGuess
      ? 'Guess sent. Waiting for everyone else.'
      : 'Type what you think the drawing is.'

    guessTextarea.oninput = function () {
      guessButton.disabled = guessTextarea.disabled || !guessTextarea.value.replace(/^\s+|\s+$/g, '')
    }

    guessButton.onclick = function () {
      var guess = guessTextarea.value.replace(/^\s+|\s+$/g, '')

      if (!guess) {
        guessStatus.textContent = 'Write a guess before sending it.'
        guessButton.disabled = true
        return
      }

      guessTextarea.disabled = true
      guessButton.disabled = true
      guessStatus.textContent = 'Guess sent. Waiting for everyone else.'
      sendToTable({
        type: 'submit_guess',
        guess: guess,
      })
    }

    root.replaceChildren(header, guessLabel, drawingImage, guessTextarea, guessButton, guessStatus)
  }

  function renderResultsStage(canRestart) {
    var result = document.createElement('section')
    var resultLabel = document.createElement('h2')
    var resultStatus = document.createElement('p')
    var restartButton = document.createElement('button')

    drawingView = null
    phaseDeadline = 0
    updateTimer()
    root.classList.add('broken-picture-phone-hand-results')
    result.className = 'broken-picture-phone-result'
    resultLabel.className = 'broken-picture-phone-result-title'
    resultLabel.textContent = 'Game complete'
    resultStatus.className = 'broken-picture-phone-result-status'
    resultStatus.textContent = 'Look at the TV to see every timeline.'
    result.append(resultLabel, resultStatus)

    if (canRestart) {
      restartButton.type = 'button'
      restartButton.className = 'broken-picture-phone-button broken-picture-phone-restart-button'
      restartButton.textContent = 'Restart Game'
      restartButton.onclick = function () {
        restartButton.disabled = true
        sendToTable({
          type: 'restart_game',
        })
      }
      result.append(restartButton)
    }

    root.replaceChildren(result)
  }

  function updateDrawingReadyState(isReady) {
    if (!drawingView) {
      return
    }

    drawingView.setIsSubmitted(isReady)

    if (isReady) {
      drawingView.canvas.className = 'broken-picture-phone-canvas broken-picture-phone-canvas-ready'
      drawingView.clearButton.className = 'broken-picture-phone-button broken-picture-phone-button-secondary broken-picture-phone-hidden'
      drawingView.sendButton.className = 'broken-picture-phone-button broken-picture-phone-hidden'
      drawingView.resumeButton.className = 'broken-picture-phone-button broken-picture-phone-resume-button'
      setDrawingToolsDisabled(true)
      drawingView.resumeButton.disabled = false
      drawingView.status.textContent = 'Drawing ready. Resume if you want to change it.'
      return
    }

    drawingView.canvas.className = 'broken-picture-phone-canvas'
    drawingView.clearButton.className = 'broken-picture-phone-button broken-picture-phone-button-secondary'
    drawingView.sendButton.className = 'broken-picture-phone-button'
    drawingView.sendButton.disabled = !drawingView.getHasDrawn()
    drawingView.resumeButton.className = 'broken-picture-phone-button broken-picture-phone-resume-button broken-picture-phone-hidden'
    setDrawingToolsDisabled(false)
    drawingView.status.textContent = 'Draw with your finger, then send it.'
  }

  function setDrawingToolsDisabled(disabled) {
    var swatchButtons
    var index

    if (!drawingView) {
      return
    }

    for (index = 0; index < drawingView.tools.length; index += 1) {
      drawingView.tools[index].disabled = disabled
    }

    drawingView.resumeButton.disabled = false
    drawingView.sendButton.disabled = disabled || !drawingView.getHasDrawn()
    swatchButtons = drawingView.swatches.querySelectorAll('button')
    for (index = 0; index < swatchButtons.length; index += 1) {
      swatchButtons[index].disabled = disabled
    }
    drawingView.sizeInput.disabled = disabled
  }

  function updateTimer() {
    var seconds = getRemainingSeconds()
    var minutes = Math.floor(seconds / 60)
    var remainingSeconds = seconds % 60

    if (!phaseDeadline) {
      timer.textContent = ''
      timer.hidden = true
      return
    }

    timer.hidden = false
    timer.textContent = minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds
    submitDrawingAtDeadline(seconds)
  }

  function submitDrawingAtDeadline(seconds) {
    if (
      seconds > 1 ||
      latestPhase !== 'drawing' ||
      !drawingView ||
      !drawingView.getHasDrawn() ||
      drawingView.getIsSubmitted()
    ) {
      return
    }

    drawingView.submit()
  }

  function syncViewportLayout() {
    var viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight
    var viewportWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth

    root.style.setProperty('--picture-phone-viewport-height', Math.round(viewportHeight) + 'px')
    root.setAttribute(
      'data-viewport-layout',
      viewportWidth / viewportHeight > 0.7 ? 'short' : 'regular'
    )
    if (viewportHeight < 720) {
      root.setAttribute('data-viewport-compact', 'true')
    } else {
      root.removeAttribute('data-viewport-compact')
    }

    if (document.activeElement === textarea) {
      window.setTimeout(keepWritingControlsVisible, 50)
    }
    window.requestAnimationFrame(syncDrawingCanvasSize)
  }

  function syncDrawingCanvasSize() {
    var availableWidth
    var availableHeight
    var gap
    var surfaceStyles
    var size

    if (!drawingView) {
      return
    }

    surfaceStyles = window.getComputedStyle(drawingView.drawingSurface)
    gap = parseFloat(surfaceStyles.gap) || 0
    availableWidth = drawingView.drawingSurface.clientWidth
    availableHeight = drawingView.drawingSurface.clientHeight

    if (root.getAttribute('data-viewport-layout') === 'short') {
      availableWidth -= drawingView.drawingPanel.offsetWidth + gap
    } else {
      availableHeight -= drawingView.drawingPanel.offsetHeight + gap
    }

    size = Math.max(1, Math.floor(Math.min(availableWidth, availableHeight)))
    drawingView.canvasWrap.style.width = size + 'px'
    drawingView.canvasWrap.style.height = size + 'px'
  }

  function handleWritingFocus() {
    root.setAttribute('data-input-focused', 'true')
    window.setTimeout(keepWritingControlsVisible, 250)
  }

  function handleWritingBlur() {
    root.removeAttribute('data-input-focused')
  }

  function keepWritingControlsVisible() {
    if (document.activeElement === textarea && sendButton.parentNode === root) {
      sendButton.scrollIntoView({ block: 'end' })
    }
  }

  function getRemainingSeconds() {
    if (!phaseDeadline) {
      return 0
    }

    return Math.max(0, Math.ceil((phaseDeadline - Date.now()) / 1000))
  }

  function createToolIcon(name) {
    var iconNames = {
      paint: 'paintbrush',
      eraser: 'eraser',
      bucket: 'paint-bucket',
      undo: 'undo-2',
      clear: 'trash-2',
    }
    var image = document.createElement('img')

    if (!iconNames[name]) {
      throw new Error('Unexpected DecoDoodle drawing tool icon.')
    }

    image.src = 'assets/icons/' + iconNames[name] + '.svg'
    image.alt = ''
    image.setAttribute('aria-hidden', 'true')
    image.setAttribute('draggable', 'false')
    return image
  }

  function getCanvasPoint(canvas, clientX, clientY) {
    var bounds = canvas.getBoundingClientRect()

    return {
      x: (clientX - bounds.left) * canvas.width / bounds.width,
      y: (clientY - bounds.top) * canvas.height / bounds.height,
    }
  }
}())

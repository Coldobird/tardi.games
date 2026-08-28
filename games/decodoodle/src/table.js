import { startMatch, sendToAllHands } from '@juxhouse/tardi-core/table'
import { applyPicturePhoneStyle, PICTURE_PHONE_STYLES } from './visual-styles.js'

;(function () {
  var PHASE_DURATION_MS = 2 * 60 * 1000
  var IDEA_CHARACTER_LIMIT = 64
  var FALLBACK_IDEA = 'Draw anything you like.'
  var FALLBACK_GUESS = 'Something mysterious.'
  var BLANK_DRAWING = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADElEQVR42mP4/58BAAT/Af9jgNErAAAAAElFTkSuQmCC'
  var latestPlayers = []
  var participantIds = []
  var ideasByPlayerId = {}
  var drawingsByPlayerId = {}
  var guessesByPlayerId = {}
  var lineIds = []
  var linesById = {}
  var assignedLineIdsByPlayerId = {}
  var phaseDeadline = 0
  var phase = 'waiting_for_players'
  var completedTransformCount = 0
  var resultAnimationStep = 0
  var resultAnimationTimer = null
  var resultsPlaybackComplete = false
  var style = document.createElement('style')
  var root = document.createElement('main')
  var title = document.createElement('h1')
  var status = document.createElement('p')

  style.textContent = PICTURE_PHONE_STYLES
  document.head.append(style)
  applyPicturePhoneStyle()

  root.className = 'broken-picture-phone-table'
  title.className = 'broken-picture-phone-title'
  status.className = 'broken-picture-phone-table-status'

  root.style.boxSizing = 'border-box'
  root.style.display = 'flex'
  root.style.flexDirection = 'column'
  root.style.alignItems = 'center'
  root.style.justifyContent = 'center'
  root.style.gap = '3vmin'
  root.style.width = '100%'
  root.style.height = '100%'
  root.style.padding = '4vmin'
  root.style.textAlign = 'center'
  root.style.overflow = 'hidden'

  title.style.margin = '0'
  title.style.fontSize = '8vmin'
  title.textContent = 'DecoDoodle'

  status.style.margin = '0'
  status.style.fontSize = '4vmin'
  status.style.color = '#cbd5e1'

  root.append(title, status)
  document.body.replaceChildren(root)

  startMatch({
    onMessage: handleMessage,
    onPlayersChange: handlePlayersChange,
  })

  window.setInterval(handleTimerTick, 1000)

  function handleMessage(message) {
    var idea
    var drawing
    var guess

    if (!message || !message.messageFromHand) {
      throw new Error('Unexpected DecoDoodle hand message.')
    }

    if (!contains(participantIds, message.playerId)) {
      return
    }

    if (message.messageFromHand.type === 'restart_game') {
      if (phase !== 'results' || !resultsPlaybackComplete) {
        return
      }

      resetRoundState()
      beginPhase('writing')
    } else if (message.messageFromHand.type === 'submit_idea') {
      if (phase !== 'writing' || ideasByPlayerId[message.playerId]) {
        return
      }

      idea = String(message.messageFromHand.idea || '').replace(/^\s+|\s+$/g, '')
      if (!idea) {
        throw new Error('DecoDoodle ideas cannot be blank.')
      }
      if (idea.length > IDEA_CHARACTER_LIMIT) {
        throw new Error('DecoDoodle ideas cannot exceed ' + IDEA_CHARACTER_LIMIT + ' characters.')
      }

      ideasByPlayerId[message.playerId] = idea

      if (countSubmittedIdeas() === participantIds.length && participantIds.length >= 2) {
        beginDrawingFromPrompts()
      }
    } else if (message.messageFromHand.type === 'resume_idea') {
      if (phase !== 'writing' || !ideasByPlayerId[message.playerId]) {
        return
      }

      delete ideasByPlayerId[message.playerId]
    } else if (message.messageFromHand.type === 'submit_drawing') {
      if (phase !== 'drawing' || drawingsByPlayerId[message.playerId]) {
        return
      }

      drawing = String(message.messageFromHand.drawing || '')
      if (drawing.indexOf('data:image/png;base64,') !== 0) {
        throw new Error('DecoDoodle drawings must be PNG data URLs.')
      }

      recordDrawing(message.playerId, drawing)
      if (countSubmittedDrawings() === participantIds.length) {
        finishDrawingPhase()
      }
    } else if (message.messageFromHand.type === 'resume_drawing') {
      if (phase !== 'drawing' || !drawingsByPlayerId[message.playerId]) {
        return
      }

      removeDrawing(message.playerId)
    } else if (message.messageFromHand.type === 'submit_guess') {
      if (phase !== 'guessing' || guessesByPlayerId[message.playerId]) {
        return
      }

      guess = String(message.messageFromHand.guess || '').replace(/^\s+|\s+$/g, '')
      if (!guess) {
        throw new Error('DecoDoodle guesses cannot be blank.')
      }

      recordGuess(message.playerId, guess)
      if (countSubmittedGuesses() === participantIds.length) {
        finishGuessingPhase()
      }
    } else {
      throw new Error('Unexpected DecoDoodle hand message type.')
    }

    render()
    publishState()
  }

  function handlePlayersChange(data) {
    var nextPlayers = data.players
    var nextParticipantIds = createPlayerIds(nextPlayers)

    if (!sameValues(participantIds, nextParticipantIds)) {
      participantIds = nextParticipantIds
      resetRoundState()
      beginPhase(participantIds.length >= 2 ? 'writing' : 'waiting_for_players')
    }

    latestPlayers = nextPlayers
    render()
    publishState()
  }

  function resetRoundState() {
    ideasByPlayerId = {}
    drawingsByPlayerId = {}
    guessesByPlayerId = {}
    lineIds = []
    linesById = {}
    assignedLineIdsByPlayerId = {}
    completedTransformCount = 0
    resultsPlaybackComplete = false
    stopResultAnimation()
  }

  function render() {
    var submittedCount = countSubmittedIdeas()

    root.classList.toggle('broken-picture-phone-table-results', phase === 'results')

    if (phase === 'results') {
      renderAnimatedTimeline()
      return
    }

    stopResultAnimation()
    root.style.alignItems = 'center'
    root.style.justifyContent = 'center'
    root.style.overflow = 'hidden'
    root.replaceChildren(title, status)

    if (latestPlayers.length < 2) {
      status.textContent = 'Waiting for another player to join.'
      return
    }

    if (phase === 'drawing') {
      status.textContent = countSubmittedDrawings() + ' of ' + participantIds.length +
        ' drawings ready. ' + formatRemainingTime(getRemainingSeconds())
      return
    }

    if (phase === 'guessing') {
      status.textContent = countSubmittedGuesses() + ' of ' + participantIds.length +
        ' guesses ready. ' + formatRemainingTime(getRemainingSeconds())
      return
    }

    status.textContent = submittedCount + ' of ' + participantIds.length +
      ' ideas sent. ' + formatRemainingTime(getRemainingSeconds())
  }

  function renderAnimatedTimeline() {
    var totalSteps = getResultStepCount()
    var slide

    resultAnimationStep = Math.min(resultAnimationStep, totalSteps - 1)

    slide = getResultSlide(resultAnimationStep)
    renderTimelineSlide(linesById[lineIds[slide.lineIndex]], slide.visibleEntryCount)
    scheduleResultAnimation(getResultPauseMs(slide))
  }

  function renderTimelineSlide(line, visibleEntryCount) {
    var heading = document.createElement('h1')
    var card = createTimelineCard(line, visibleEntryCount)

    heading.textContent = 'Picture Phone Timelines'
    heading.className = 'broken-picture-phone-results-title'
    heading.style.margin = '0'
    heading.style.fontSize = '5vmin'

    root.style.alignItems = 'center'
    root.style.justifyContent = 'center'
    root.style.overflow = 'hidden'
    root.replaceChildren(heading, card)
  }

  function createTimelineCard(line, visibleEntryCount) {
    var card = document.createElement('article')
    var header = document.createElement('h2')
    var entries = document.createElement('div')
    var entryRows = []
    var index

    card.className = 'broken-picture-phone-panel'
    header.className = 'broken-picture-phone-panel-title'
    entries.className = 'broken-picture-phone-entries'

    card.style.boxSizing = 'border-box'
    card.style.display = 'flex'
    card.style.flexDirection = 'column'
    card.style.gap = '1.4vmin'
    card.style.padding = '2vmin'
    card.style.width = 'min(92vw, 980px)'
    card.style.maxHeight = '78vh'
    card.style.border = '2px solid #334155'
    card.style.borderRadius = '8px'
    card.style.background = '#0f172a'
    card.style.textAlign = 'left'
    card.style.overflow = 'hidden'

    header.style.margin = '0'
    header.style.color = '#f8fafc'
    header.style.fontSize = '2.8vmin'
    header.textContent = formatEntryLabel(line.entries[0], 0)

    entries.style.display = 'grid'
    entries.style.gap = '1.2vmin'
    entries.style.flex = '1 1 auto'
    entries.style.minHeight = '0'
    entries.style.overflowX = 'hidden'
    entries.style.overflowY = 'hidden'
    entries.style.pointerEvents = 'none'

    for (index = 0; index < line.entries.length && index < visibleEntryCount; index += 1) {
      entries.append(createEntryNode(line.entries[index], index))
      entryRows.push(line.entries[index].type === 'drawing' ? 'minmax(0, 1fr)' : 'auto')
    }
    entries.style.gridTemplateRows = entryRows.join(' ')

    card.append(header, entries)
    return card
  }

  function createEntryNode(entry, entryIndex) {
    var wrap = document.createElement('div')
    var label = document.createElement('p')
    var value

    wrap.className = 'broken-picture-phone-entry'
    wrap.setAttribute('data-entry-type', entry.type)
    label.className = 'broken-picture-phone-entry-label'

    wrap.style.display = 'flex'
    wrap.style.flexDirection = 'column'
    wrap.style.gap = '.6vmin'
    wrap.style.animation = 'brokenPicturePhoneReveal .45s ease-out'

    label.style.margin = '0'
    label.style.color = '#94a3b8'
    label.style.fontSize = '1.8vmin'
    label.style.fontWeight = 'bold'
    label.textContent = formatEntryLabel(entry, entryIndex)

    if (entry.type === 'drawing') {
      value = document.createElement('img')
      value.alt = 'Timeline drawing'
      value.src = entry.image
      value.className = 'broken-picture-phone-entry-image'
      value.style.display = 'block'
      value.style.width = '100%'
      value.style.maxHeight = '38vh'
      value.style.objectFit = 'contain'
      value.style.border = '2px solid #475569'
      value.style.borderRadius = '8px'
      value.style.background = '#ffffff'
    } else {
      value = document.createElement('p')
      value.textContent = entry.text
      value.className = 'broken-picture-phone-entry-text'
      value.style.margin = '0'
      value.style.padding = '1.2vmin'
      value.style.border = '2px solid #475569'
      value.style.borderRadius = '8px'
      value.style.background = '#020617'
      value.style.color = '#f8fafc'
      value.style.fontSize = '2.4vmin'
      value.style.lineHeight = '1.25'
      value.style.overflowWrap = 'anywhere'
    }

    if (entryIndex === 0) {
      wrap.append(value)
    } else {
      wrap.append(label, value)
    }
    return wrap
  }

  function advanceResultAnimation() {
    var totalSteps = getResultStepCount()

    resultAnimationTimer = null
    if (phase !== 'results') {
      stopResultAnimation()
      return
    }

    if (resultAnimationStep + 1 >= totalSteps) {
      if (!resultsPlaybackComplete) {
        resultsPlaybackComplete = true
        publishState()
      }
      resultAnimationStep = 0
      renderAnimatedTimeline()
      return
    }

    resultAnimationStep += 1
    renderAnimatedTimeline()
  }

  function scheduleResultAnimation(pauseMs) {
    if (resultAnimationTimer) {
      return
    }

    resultAnimationTimer = window.setTimeout(advanceResultAnimation, pauseMs)
  }

  function stopResultAnimation() {
    if (resultAnimationTimer) {
      window.clearTimeout(resultAnimationTimer)
      resultAnimationTimer = null
    }
  }

  function getResultPauseMs(slide) {
    var line = linesById[lineIds[slide.lineIndex]]
    var newestEntry

    if (!line || !line.entries.length) {
      return 3000
    }

    newestEntry = line.entries[Math.min(slide.visibleEntryCount, line.entries.length) - 1]
    return newestEntry && newestEntry.type === 'drawing' ? 6000 : 3000
  }

  function getResultStepCount() {
    var count = 0
    var index
    var line

    for (index = 0; index < lineIds.length; index += 1) {
      line = linesById[lineIds[index]]
      count += line.entries.length
    }

    return Math.max(1, count)
  }

  function getResultSlide(step) {
    var remaining = step
    var index
    var line

    for (index = 0; index < lineIds.length; index += 1) {
      line = linesById[lineIds[index]]
      if (remaining < line.entries.length) {
        return {
          lineIndex: index,
          visibleEntryCount: remaining + 1,
        }
      }

      remaining -= line.entries.length
    }

    return {
      lineIndex: 0,
      visibleEntryCount: 1,
    }
  }

  function formatEntryLabel(entry, entryIndex) {
    var playerName = getPlayerName(entry.playerId)

    if (entryIndex === 0) {
      return 'Prompt by ' + playerName
    }

    if (entry.type === 'drawing') {
      return 'Drawing by ' + playerName
    }

    return 'Guess by ' + playerName
  }

  function publishState() {
    var playerStatesById = {}
    var index
    var playerId

    for (index = 0; index < participantIds.length; index += 1) {
      playerId = participantIds[index]
      playerStatesById[playerId] = {
        phase: phase,
        hasSubmitted: !!ideasByPlayerId[playerId],
        receivedIdea: getAssignedPrompt(playerId),
        hasSubmittedDrawing: !!drawingsByPlayerId[playerId],
        receivedDrawing: getAssignedDrawing(playerId),
        hasSubmittedGuess: !!guessesByPlayerId[playerId],
      }
    }

    sendToAllHands({
      phase: phase,
      phaseDeadline: phaseDeadline,
      canRestart: phase === 'results' && resultsPlaybackComplete,
      playerStatesById: playerStatesById,
    })
  }

  function beginDrawingFromPrompts() {
    createLinesFromPrompts()
    assignLinesToNextPlayers()
    beginPhase('drawing')
  }

  function createLinesFromPrompts() {
    var index
    var playerId
    var lineId

    lineIds = []
    linesById = {}

    for (index = 0; index < participantIds.length; index += 1) {
      playerId = participantIds[index]
      lineId = String(playerId)
      lineIds.push(lineId)
      linesById[lineId] = {
        lineId: lineId,
        originPlayerId: playerId,
        nextPlayerIndex: (index + 1) % participantIds.length,
        entries: [{
          type: 'prompt',
          playerId: playerId,
          text: ideasByPlayerId[playerId],
        }],
      }
    }
  }

  function assignLinesToNextPlayers() {
    var assignments = {}
    var index
    var line
    var playerId

    for (index = 0; index < lineIds.length; index += 1) {
      line = linesById[lineIds[index]]
      playerId = participantIds[line.nextPlayerIndex]
      assignments[playerId] = line.lineId
    }

    assignedLineIdsByPlayerId = assignments
  }

  function recordDrawing(playerId, drawing) {
    var line = getAssignedLine(playerId)

    drawingsByPlayerId[playerId] = drawing
    line.entries.push({
      type: 'drawing',
      playerId: playerId,
      image: drawing,
    })
    advanceLine(line)
  }

  function removeDrawing(playerId) {
    var line = getAssignedLine(playerId)

    delete drawingsByPlayerId[playerId]
    if (line.entries.length > 1 && line.entries[line.entries.length - 1].playerId === playerId) {
      line.entries.pop()
      retreatLine(line)
    }
  }

  function recordGuess(playerId, guess) {
    var line = getAssignedLine(playerId)

    guessesByPlayerId[playerId] = guess
    line.entries.push({
      type: 'guess',
      playerId: playerId,
      text: guess,
    })
    advanceLine(line)
  }

  function finishDrawingPhase() {
    fillMissingDrawings()
    completedTransformCount += 1
    if (isGameComplete()) {
      beginPhase('results')
      return
    }

    guessesByPlayerId = {}
    assignLinesToNextPlayers()
    beginPhase('guessing')
  }

  function finishGuessingPhase() {
    fillMissingGuesses()
    completedTransformCount += 1
    if (isGameComplete()) {
      beginPhase('results')
      return
    }

    drawingsByPlayerId = {}
    assignLinesToNextPlayers()
    beginPhase('drawing')
  }

  function isGameComplete() {
    return completedTransformCount >= participantIds.length - 1
  }

  function beginPhase(nextPhase) {
    phase = nextPhase
    phaseDeadline = Date.now() + PHASE_DURATION_MS

    if (nextPhase === 'waiting_for_players' || nextPhase === 'results') {
      phaseDeadline = 0
    }
  }

  function countSubmittedIdeas() {
    var count = 0
    var index

    for (index = 0; index < participantIds.length; index += 1) {
      if (ideasByPlayerId[participantIds[index]]) {
        count += 1
      }
    }

    return count
  }

  function countSubmittedDrawings() {
    var count = 0
    var index

    for (index = 0; index < participantIds.length; index += 1) {
      if (drawingsByPlayerId[participantIds[index]]) {
        count += 1
      }
    }

    return count
  }

  function countSubmittedGuesses() {
    var count = 0
    var index

    for (index = 0; index < participantIds.length; index += 1) {
      if (guessesByPlayerId[participantIds[index]]) {
        count += 1
      }
    }

    return count
  }

  function handleTimerTick() {
    var index
    var playerId

    if (!phaseDeadline || participantIds.length < 2) {
      return
    }

    if (Date.now() < phaseDeadline) {
      render()
      return
    }

    if (phase === 'writing') {
      for (index = 0; index < participantIds.length; index += 1) {
        playerId = participantIds[index]
        if (!ideasByPlayerId[playerId]) {
          ideasByPlayerId[playerId] = FALLBACK_IDEA
        }
      }
      beginDrawingFromPrompts()
    } else if (phase === 'drawing') {
      finishDrawingPhase()
    } else if (phase === 'guessing') {
      finishGuessingPhase()
    }

    render()
    publishState()
  }

  function fillMissingDrawings() {
    var index
    var playerId

    for (index = 0; index < participantIds.length; index += 1) {
      playerId = participantIds[index]
      if (!drawingsByPlayerId[playerId]) {
        recordDrawing(playerId, BLANK_DRAWING)
      }
    }
  }

  function fillMissingGuesses() {
    var index
    var playerId

    for (index = 0; index < participantIds.length; index += 1) {
      playerId = participantIds[index]
      if (!guessesByPlayerId[playerId]) {
        recordGuess(playerId, FALLBACK_GUESS)
      }
    }
  }

  function getAssignedPrompt(playerId) {
    var line = getAssignedLineOrNull(playerId)
    var entry

    if (!line || phase !== 'drawing') {
      return ''
    }

    entry = getLastTextEntry(line)
    return entry && entry.text ? entry.text : ''
  }

  function getAssignedDrawing(playerId) {
    var line = getAssignedLineOrNull(playerId)
    var entry

    if (!line || phase !== 'guessing') {
      return ''
    }

    entry = line.entries[line.entries.length - 1]
    return entry && entry.image ? entry.image : ''
  }

  function getLastTextEntry(line) {
    var index
    var entry

    for (index = line.entries.length - 1; index >= 0; index -= 1) {
      entry = line.entries[index]
      if (entry.text) {
        return entry
      }
    }

    return null
  }

  function getAssignedLine(playerId) {
    var line = getAssignedLineOrNull(playerId)

    if (!line) {
      throw new Error('DecoDoodle line assignment is missing.')
    }

    return line
  }

  function getAssignedLineOrNull(playerId) {
    var lineId = assignedLineIdsByPlayerId[playerId]

    if (!lineId) {
      return null
    }

    return linesById[lineId] || null
  }

  function advanceLine(line) {
    moveLineCursor(line, 1)
  }

  function retreatLine(line) {
    moveLineCursor(line, -1)
  }

  function moveLineCursor(line, direction) {
    var nextIndex = line.nextPlayerIndex

    do {
      nextIndex = (nextIndex + participantIds.length + direction) % participantIds.length
    } while (participantIds[nextIndex] === line.originPlayerId)

    line.nextPlayerIndex = nextIndex
  }

  function getRemainingSeconds() {
    if (!phaseDeadline) {
      return 0
    }

    return Math.max(0, Math.ceil((phaseDeadline - Date.now()) / 1000))
  }

  function formatRemainingTime(seconds) {
    var minutes = Math.floor(seconds / 60)
    var remainingSeconds = seconds % 60

    return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds
  }

  function createPlayerIds(players) {
    var ids = []
    var index

    for (index = 0; index < players.length; index += 1) {
      ids.push(players[index].playerId)
    }

    return ids
  }

  function getPlayerName(playerId) {
    var index

    for (index = 0; index < latestPlayers.length; index += 1) {
      if (latestPlayers[index].playerId === playerId) {
        return latestPlayers[index].nick
      }
    }

    return 'Player'
  }

  function sameValues(first, second) {
    var index

    if (first.length !== second.length) {
      return false
    }

    for (index = 0; index < first.length; index += 1) {
      if (first[index] !== second[index]) {
        return false
      }
    }

    return true
  }

  function contains(values, expected) {
    var index

    for (index = 0; index < values.length; index += 1) {
      if (values[index] === expected) {
        return true
      }
    }

    return false
  }
}())

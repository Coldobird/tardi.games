// Dev-only platform fixture. Build a real round through the SDK's message
// boundary; the game's private state and production bundles stay untouched.
;(function () {
  var frame = document.getElementById('table')
  var picker = document.getElementById('players')
  var previewPhase = document.getElementById('preview-phase')
  var hand = document.getElementById('hand')
  var status = document.getElementById('status')
  var samples = [
    { nick: 'Alex', prompt: 'A cat watching the sun', guess: 'A sunshine-loving cat', color: '#f5a623' },
    { nick: 'Bea', prompt: 'A cat wearing a party hat', guess: 'A birthday cat', color: '#f5326c' },
    { nick: 'Chris', prompt: 'A cat floating above the clouds', guess: 'A flying cat', color: '#1fc7b1' },
    { nick: 'Dani', prompt: 'A cat exploring the moon', guess: 'A space kitten', color: '#8b5cf6' },
    { nick: 'Eli', prompt: 'A cat sailing across the ocean', guess: 'A pirate cat', color: '#38bdf8' },
    { nick: 'Fran', prompt: 'A cat looking for a rainbow', guess: 'A colorful kitten', color: '#84d62c' },
    { nick: 'Gabi', prompt: 'A cat dancing in the rain', guess: 'A dancing kitten', color: '#fb7185' },
    { nick: 'Hugo', prompt: 'A cat sleeping on a mountain', guess: 'A sleepy mountain lion', color: '#ffbd3e' },
  ]
  var players
  var lastPhase
  var submitted
  var acknowledgedVersions
  var drawings = samples.map(createDrawing)

  window.addEventListener('message', function (event) {
    if (event.source === hand.contentWindow) {
      if (event.data.intent === 'tardi.hand.sendMessageToTable' || event.data.intent === 'tardi.hand.ackTableState') {
        send(players[0].playerId, event.data)
      }
      return
    }
    if (event.source !== frame.contentWindow) return
    var message = event.data || {}
    if (message.intent !== 'tardi.table.sendMessageToHand') return

    if (message.playerId === players[0].playerId) {
      hand.contentWindow.postMessage(Object.assign({}, message, { intent: 'tardi.table.sendGameStateToHand' }), window.location.origin)
    }

    // Behave like connected hands, acknowledging the public match state.
    if (acknowledgedVersions[message.playerId] === message.matchVersion) return
    acknowledgedVersions[message.playerId] = message.matchVersion
    send(message.playerId, {
      intent: 'tardi.hand.ackTableState', matchVersion: message.matchVersion,
    })
    var state = message.messageFromTable
    if (!state) return
    if (state.phase !== lastPhase) {
      lastPhase = state.phase
      submitted = {}
    }
    if (state.phase === 'results') {
      status.textContent = players.length + ' sample timelines ready. Ending animation is looping.'
      return
    }
    if (state.phase === previewPhase.value) {
      status.textContent = 'Sample round paused at ' + state.phase + '. Open Player screen to try the controls.'
      return
    }
    if (submitted[message.playerId]) return

    var index = players.findIndex(function (player) { return player.playerId === message.playerId })
    var payload
    if (state.phase === 'writing') {
      payload = { type: 'submit_idea', idea: samples[index].prompt }
    } else if (state.phase === 'drawing') {
      payload = { type: 'submit_drawing', drawing: drawings[index] }
    } else if (state.phase === 'guessing') {
      payload = { type: 'submit_guess', guess: samples[index].guess }
    } else {
      return
    }
    submitted[message.playerId] = true
    send(message.playerId, {
      intent: 'tardi.hand.sendMessageToTable',
      handSeq: message.handSeq + 1,
      messageFromHand: payload,
    })
  })

  function send(playerId, payload) {
    frame.contentWindow.postMessage({
      intent: 'tardi.platform.sendToTable', playerId: playerId, payload: payload,
    }, window.location.origin)
  }

  function replay() {
    if (previewPhase.value === 'guessing' && Number(picker.value) < 3) picker.value = '3'
    lastPhase = ''
    submitted = {}
    acknowledgedVersions = {}
    players = samples.slice(0, Number(picker.value)).map(function (sample, index) {
      return { playerId: 'preview-' + (index + 1), nick: sample.nick }
    })
    status.textContent = 'Playing sample round…'
    // Recreate the frame to reset both the game and SDK through their lifecycle.
    frame.srcdoc = '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '</head><body><script src="/dist/table.js"><\/script></body></html>'
    hand.srcdoc = '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '</head><body><script src="/dist/hand.js"><\/script></body></html>'
  }

  frame.addEventListener('load', function () {
    frame.contentWindow.postMessage({
      intent: 'tardi.platform.notifyPlayersChange', players: players,
    }, window.location.origin)
  })
  document.getElementById('replay').addEventListener('click', replay)
  picker.addEventListener('change', replay)
  previewPhase.addEventListener('change', replay)
  replay()

  function createDrawing(sample, index) {
    var canvas = document.createElement('canvas')
    canvas.width = 640
    canvas.height = 360
    var context = canvas.getContext('2d')
    context.fillStyle = '#fffef8'
    context.fillRect(0, 0, 640, 360)
    context.lineWidth = 7
    context.lineJoin = 'round'
    context.strokeStyle = '#142260'
    context.fillStyle = sample.color
    context.beginPath()
    context.moveTo(210, 250)
    context.lineTo(210, 95)
    context.lineTo(265, 140)
    context.quadraticCurveTo(320, 115, 375, 140)
    context.lineTo(430, 95)
    context.lineTo(430, 250)
    context.quadraticCurveTo(320, 315, 210, 250)
    context.fill()
    context.stroke()
    context.fillStyle = '#142260'
    ;[280, 360].forEach(function (x) {
      context.beginPath()
      context.arc(x, 200, 9, 0, Math.PI * 2)
      context.fill()
    })
    context.beginPath()
    context.moveTo(305, 235)
    context.lineTo(320, 247)
    context.lineTo(335, 235)
    context.stroke()
    context.fillStyle = '#ffbd3e'
    context.beginPath()
    context.arc(530, 65, 30 + index * 2, 0, Math.PI * 2)
    context.fill()
    return canvas.toDataURL('image/png')
  }
}())

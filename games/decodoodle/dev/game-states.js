// Drive real game bundles only through the SDK's public platform messages.
;(function () {
  var scenarios = [
    { id: 'connecting', title: 'Connecting', phase: 'connecting', tv: 'Starting the game', phone: 'Connecting to the table' },
    { id: 'waiting', title: 'Waiting for players', phase: 'waiting_for_players', tv: 'Waiting for another player', phone: 'Waiting for another player' },
    { id: 'writing', title: 'Writing a prompt', phase: 'writing', tv: 'Waiting for prompts · 0 of 4 ready', phone: 'Writing a prompt' },
    { id: 'writing-ready', title: 'Prompt sent', phase: 'writing', ready: true, tv: 'Waiting for prompts · 1 of 4 ready', phone: 'Prompt sent · Change Idea' },
    { id: 'drawing', title: 'Drawing', phase: 'drawing', tv: 'Waiting for drawings · 0 of 4 ready', phone: 'Drawing the received prompt' },
    { id: 'drawing-ready', title: 'Drawing sent', phase: 'drawing', ready: true, tv: 'Waiting for drawings · 1 of 4 ready', phone: 'Drawing sent · Resume Drawing' },
    { id: 'guessing', title: 'Guessing', phase: 'guessing', tv: 'Waiting for guesses · 0 of 4 ready', phone: 'Guessing the received drawing' },
    { id: 'guessing-ready', title: 'Guess sent', phase: 'guessing', ready: true, tv: 'Waiting for guesses · 1 of 4 ready', phone: 'Guess sent · Waiting for everyone' },
    { id: 'results', title: 'Ending & results', phase: 'results', tv: 'Animated timeline reveal', phone: 'Browse timelines · Restart Game after reveal' },
  ]
  var samples = [
    { nick: 'Alex', prompt: 'A cat exploring the moon', guess: 'A space kitten', color: '#f5326c' },
    { nick: 'Bea', prompt: 'A cat wearing a party hat', guess: 'A birthday cat', color: '#1fc7b1' },
    { nick: 'Chris', prompt: 'A cat floating above the clouds', guess: 'A flying cat', color: '#8b5cf6' },
    { nick: 'Dani', prompt: 'A cat sailing across the ocean', guess: 'A pirate cat', color: '#ffbd3e' },
  ]
  var drawings = samples.map(createDrawing)
  var fixtures = scenarios.map(createFixture)

  window.addEventListener('message', function (event) {
    var fixture = fixtures.find(function (item) {
      return event.source === item.table.contentWindow || event.source === item.hand.contentWindow
    })
    if (!fixture) return
    var message = event.data || {}
    if (event.source === fixture.hand.contentWindow) {
      if (message.intent === 'tardi.hand.sendMessageToTable' || message.intent === 'tardi.hand.ackTableState') {
        send(fixture, fixture.players[0].playerId, message)
      }
      return
    }
    if (message.intent !== 'tardi.table.sendMessageToHand') return
    if (message.playerId === fixture.players[0].playerId) {
      fixture.hand.contentWindow.postMessage(Object.assign({}, message, { intent: 'tardi.table.sendGameStateToHand' }), window.location.origin)
    }
    if (fixture.acknowledged[message.playerId] === message.matchVersion) return
    fixture.acknowledged[message.playerId] = message.matchVersion
    send(fixture, message.playerId, { intent: 'tardi.hand.ackTableState', matchVersion: message.matchVersion })
    var state = message.messageFromTable
    if (!state) return
    if (state.phase !== fixture.lastPhase) {
      fixture.lastPhase = state.phase
      fixture.submitted = {}
    }
    var index = fixture.players.findIndex(function (player) { return player.playerId === message.playerId })
    var atTarget = state.phase === fixture.scenario.phase
    if (atTarget) {
      fixture.status.textContent = 'Live example ready. You can use the phone controls.'
      if (!fixture.scenario.ready || index !== 0) return
      if (!fixture.submitted[message.playerId]) {
        fixture.submitted[message.playerId] = true
        // Submit through the visible phone controls so drafts and canvas strokes
        // match a real player's submitted screen as well as the table state.
        fixture.readyTimer = window.setTimeout(function () { submitPhone(fixture) }, 100)
      }
      return
    }
    if (fixture.submitted[message.playerId]) return
    var payload = submission(state.phase, index)
    if (!payload) return
    fixture.submitted[message.playerId] = true
    send(fixture, message.playerId, {
      intent: 'tardi.hand.sendMessageToTable', handSeq: message.handSeq + 1, messageFromHand: payload,
    })
  })
  fixtures.forEach(reset)

  function createFixture(scenario) {
    var section = document.createElement('section')
    section.className = 'screen-test'
    section.id = scenario.id
    var heading = document.createElement('div')
    heading.className = 'test-heading'
    var title = document.createElement('h2')
    title.textContent = scenario.title
    var button = document.createElement('button')
    button.textContent = 'Reset this pair'
    button.type = 'button'
    button.setAttribute('aria-label', 'Reset ' + scenario.title)
    heading.append(title, button)
    var pair = document.createElement('div')
    pair.className = 'screen-pair'
    var table = screen(pair, 'TV', scenario.tv, 'tv-screen')
    var hand = screen(pair, 'PHONE', scenario.phone, 'phone-screen')
    var status = document.createElement('p')
    status.className = 'fixture-status'
    status.setAttribute('role', 'status')
    section.append(heading, pair, status)
    document.getElementById('states').append(section)
    var link = document.createElement('a')
    link.href = '#' + scenario.id
    link.textContent = scenario.title
    document.getElementById('state-links').append(link)
    var fixture = { scenario: scenario, table: table, hand: hand, status: status,
      players: samples.slice(0, scenario.id === 'waiting' ? 1 : 4).map(function (sample, index) {
        return { playerId: scenario.id + '-' + index, nick: sample.nick }
      }) }
    button.addEventListener('click', function () { reset(fixture) })
    table.addEventListener('load', function () {
      if (scenario.phase === 'connecting') return
      table.contentWindow.postMessage({ intent: 'tardi.platform.notifyPlayersChange', players: fixture.players }, window.location.origin)
    })
    return fixture
  }
  function screen(pair, device, description, className) {
    var figure = document.createElement('figure')
    figure.className = device === 'PHONE' ? 'phone' : 'tv'
    var caption = document.createElement('figcaption')
    caption.textContent = device + ' — ' + description
    var frame = document.createElement('iframe')
    frame.title = device + ' — ' + description
    frame.className = className
    figure.append(caption, frame)
    pair.append(figure)
    return frame
  }
  function reset(fixture) {
    window.clearTimeout(fixture.refreshTimer)
    window.clearTimeout(fixture.readyTimer)
    fixture.lastPhase = ''
    fixture.submitted = {}
    fixture.acknowledged = {}
    fixture.status.textContent = fixture.scenario.phase === 'connecting' ? 'No platform state delivered yet.' : 'Preparing sample round…'
    fixture.hand.srcdoc = bundle('hand')
    fixture.table.srcdoc = bundle('table')
    if (fixture.scenario.phase !== 'connecting' && fixture.scenario.phase !== 'waiting_for_players' && fixture.scenario.phase !== 'results') {
      fixture.refreshTimer = window.setTimeout(function () { reset(fixture) }, 90000)
    }
  }
  function bundle(name) {
    return '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><script src="/dist/' + name + '.js"><\/script></body></html>'
  }
  function send(fixture, playerId, payload) {
    fixture.table.contentWindow.postMessage({ intent: 'tardi.platform.sendToTable', playerId: playerId, payload: payload }, window.location.origin)
  }
  function submission(phase, index) {
    if (phase === 'writing') return { type: 'submit_idea', idea: samples[index].prompt }
    if (phase === 'drawing') return { type: 'submit_drawing', drawing: drawings[index] }
    if (phase === 'guessing') return { type: 'submit_guess', guess: samples[index].guess }
    return null
  }
  function submitPhone(fixture) {
    var phoneWindow = fixture.hand.contentWindow
    var doc = fixture.hand.contentDocument
    if (fixture.scenario.phase === 'drawing') {
      var canvas = doc.querySelector('canvas')
      var bounds = canvas.getBoundingClientRect()
      var points = [[.25,.65],[.25,.25],[.4,.38],[.6,.38],[.75,.25],[.75,.65],[.6,.78],[.4,.78],[.25,.65]]
      points.forEach(function (point, index) {
        canvas.dispatchEvent(new phoneWindow.MouseEvent(index === 0 ? 'mousedown' : 'mousemove', {
          bubbles: true, clientX: bounds.left + point[0] * bounds.width,
          clientY: bounds.top + point[1] * bounds.height, buttons: 1,
        }))
      })
      canvas.dispatchEvent(new phoneWindow.MouseEvent('mouseup', { bubbles: true }))
    } else {
      var input = doc.querySelector('textarea')
      input.value = fixture.scenario.phase === 'writing' ? samples[0].prompt : samples[0].guess
      input.dispatchEvent(new phoneWindow.Event('input', { bubbles: true }))
    }
    Array.from(doc.querySelectorAll('button')).find(function (button) {
      return /^Send (Idea|Drawing|Guess)$/.test(button.textContent)
    }).click()
  }
  function createDrawing(sample) {
    var canvas = document.createElement('canvas')
    canvas.width = 640
    canvas.height = 640
    var context = canvas.getContext('2d')
    context.fillStyle = '#fffef8'
    context.fillRect(0, 0, 640, 640)
    context.fillStyle = sample.color
    context.strokeStyle = '#172663'
    context.lineWidth = 10
    context.lineJoin = 'round'
    context.beginPath()
    context.moveTo(170, 440)
    context.lineTo(170, 180)
    context.lineTo(250, 250)
    context.quadraticCurveTo(320, 220, 390, 250)
    context.lineTo(470, 180)
    context.lineTo(470, 440)
    context.quadraticCurveTo(320, 540, 170, 440)
    context.fill()
    context.stroke()
    context.fillStyle = '#172663'
    ;[260, 380].forEach(function (x) {
      context.beginPath(); context.arc(x, 350, 12, 0, Math.PI * 2); context.fill()
    })
    context.beginPath(); context.moveTo(295, 400); context.lineTo(320, 420); context.lineTo(345, 400); context.stroke()
    context.fillStyle = '#ffbd3e'
    context.beginPath(); context.arc(530, 110, 40, 0, Math.PI * 2); context.fill()
    return canvas.toDataURL('image/png')
  }
}())

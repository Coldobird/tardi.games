;(function () {
  var prefix = 'broken-picture-phone-'
  var art = createSampleDrawing()
  var icons = ['paintbrush', 'paint-bucket', 'eraser', 'undo-2', 'trash-2']
  var colors = ['#172663', '#f5326c', '#ffbd3e', '#1fc7b1', '#8b5cf6']
  var samples = [
    {
      id: 'text', name: 'Prompt & guess strips', height: 180,
      description: 'The clean top sheet stays whole. A yellow, irregular backing peeks out on every side.',
      old: '<p class="' + prefix + 'entry-text">A cat exploring the moon</p><br><p class="' + prefix + 'entry-text">A tiny astronaut looking for the biggest ball of yarn in the universe</p>',
      fresh: paper('A cat exploring the moon', '', 'paper-copy') + paper('A tiny astronaut looking for the biggest ball of yarn in the universe', '', 'paper-copy'),
    },
    {
      id: 'header', name: 'Game header & timer', height: 170,
      description: 'A teal title sheet and a small coral timer, with lighter paper backing and softer shadows.',
      old: '<header class="' + prefix + 'header"><div class="' + prefix + 'brand"><p class="' + prefix + 'eyebrow">Draw · pass · guess</p><h1 class="' + prefix + 'title">DecoDoodle</h1></div><p class="' + prefix + 'timer">1:24</p></header>',
      fresh: '<div class="paper-row"><div class="grow">' + paper('DecoDoodle', 'teal', 'paper-title') + '</div>' + paper('1:24', 'coral paper-timer') + '</div><p class="paper-caption" style="margin:12px 14px">Draw · pass · guess</p>',
    },
    {
      id: 'instruction', name: 'Drawing instruction', height: 180,
      description: 'A separate coral label above the prompt keeps both sheets readable when the text wraps.',
      old: '<div class="' + prefix + 'drawing-prompt"><p class="' + prefix + 'label">DRAW THIS</p><p class="' + prefix + 'prompt">A penguin playing guitar on the moon</p></div>',
      fresh: '<div class="paper-row">' + paper('DRAW THIS', 'coral') + '</div>' + paper('A penguin playing guitar on the moon', '', 'paper-copy'),
    },
    {
      id: 'input', name: 'Writing & guessing input', height: 215,
      description: 'Try typing. The editable top sheet has straight edges and a clearly visible colored backing.',
      old: '<label for="idea" class="' + prefix + 'label">YOUR IDEA</label><textarea id="idea" class="' + prefix + 'input" placeholder="A penguin playing guitar…"></textarea>',
      fresh: '<label for="idea" class="paper-caption">YOUR IDEA</label><div class="paper"><textarea id="idea" class="paper-face paper-input" placeholder="A penguin playing guitar…"></textarea></div>',
    },
    {
      id: 'buttons', name: 'Action buttons', height: 230,
      description: 'Hover, focus, and press the paper buttons. The third example shows the disabled state.',
      old: '<div style="display:flex;flex-wrap:wrap;gap:18px"><button class="' + prefix + 'button">Send idea</button><button class="' + prefix + 'button">Play again</button><button disabled class="' + prefix + 'button">Waiting…</button></div>',
      fresh: '<div class="paper-row">' + paperButton('Send idea', 'teal') + paperButton('Play again', '') + paperButton('Waiting…', 'teal', true) + '</div>',
    },
    {
      id: 'tools', name: 'Drawing tools & color palette', height: 215,
      description: 'Existing game icons on a tidy sheet. Try selecting a tool or a color.',
      old: '<div class="' + prefix + 'drawing-panel"><div class="' + prefix + 'tool-buttons">' + icons.map(function (icon, index) { return '<button aria-label="' + icon + '" aria-pressed="' + (index === 0) + '" class="' + prefix + 'tool-button"><img src="/assets/icons/' + icon + '.svg" alt=""></button>' }).join('') + '</div><div class="' + prefix + 'swatches">' + colors.map(function (color, index) { return '<button aria-label="Color ' + (index + 1) + '" aria-pressed="' + (index === 0) + '" class="' + prefix + 'swatch" style="background:' + color + '"></button>' }).join('') + '</div></div>',
      fresh: paper('<div class="paper-tools">' + icons.map(function (icon, index) { return '<button aria-label="' + icon + '" aria-pressed="' + (index === 0) + '"><img src="/assets/icons/' + icon + '.svg" alt=""></button>' }).join('') + '</div><div class="paper-tools" style="margin-top:14px">' + colors.map(function (color, index) { return '<button class="swatch" aria-label="Color ' + (index + 1) + '" aria-pressed="' + (index === 0) + '" style="--swatch:' + color + '"></button>' }).join('') + '</div>', 'navy'),
    },
    {
      id: 'canvas', name: 'Drawing surface & image frame', height: 220,
      description: 'A straight white drawing sheet sits safely inside its irregular teal backing.',
      old: '<div class="' + prefix + 'canvas-wrap"><img class="' + prefix + 'canvas" src="' + art + '" alt="Sample drawing of a cat"></div>',
      fresh: paper('<img class="paper-art" src="' + art + '" alt="Sample drawing of a cat">', 'aqua'),
    },
    {
      id: 'status', name: 'Waiting & progress messages', height: 180,
      description: 'A compact status sheet with a yellow backing, designed to remain legible at narrow widths.',
      old: '<p class="' + prefix + 'table-status">3 of 4 drawings ready. 0:42</p>',
      fresh: paper('<p class="paper-caption">ALMOST THERE</p><span class="paper-copy">3 of 4 drawings ready · 0:42</span>'),
    },
    {
      id: 'results', name: 'Results card & player heading', height: 430,
      description: 'The same two-layer construction holds a complete result card, with individual prompt and drawing sheets.',
      old: '<article class="' + prefix + 'panel"><h2 class="' + prefix + 'panel-title">Prompt by Alex</h2><p class="' + prefix + 'entry-text">A cat exploring the moon</p><p class="' + prefix + 'entry-label">Drawing by Bea</p><img class="' + prefix + 'entry-image" src="' + art + '" alt="Sample drawing of a cat"><p class="' + prefix + 'entry-label">Guess by Chris</p><p class="' + prefix + 'entry-text">A space kitten</p></article>',
      fresh: paper(paper('Prompt by Alex', 'teal', 'paper-title') + paper('A cat exploring the moon') + '<p class="paper-caption" style="margin:16px 0 8px">Drawing by Bea</p><img class="paper-art" src="' + art + '" alt="Sample drawing of a cat"><p class="paper-caption" style="margin:16px 0 8px">Guess by Chris</p>' + paper('A space kitten'), 'paper-panel'),
    },
  ]
  var storageKey = 'decodoodle-paper-ui-choices-v1'
  var choices = JSON.parse(localStorage.getItem(storageKey) || '{}')
  var gallery = document.getElementById('gallery')

  samples.forEach(function (sample, index) {
    var section = document.createElement('section')
    section.className = 'comparison'
    section.innerHTML = '<h2>' + (index + 1) + '. ' + sample.name + '</h2><p class="description">' + sample.description + '</p><div class="variants"></div>'
    ;['current', 'new'].forEach(function (variant) {
      var tile = document.createElement('div')
      tile.className = 'variant'
      var choice = document.createElement('label')
      choice.className = 'choice'
      var radio = document.createElement('input')
      radio.type = 'radio'
      radio.name = sample.id
      radio.value = variant
      radio.checked = choices[sample.id] === variant
      radio.addEventListener('change', function () { choices[sample.id] = variant; saveChoices() })
      choice.append(radio, document.createTextNode(variant === 'new' ? 'New · layered paper' : 'Current game'))
      var hint = document.createElement('small')
      hint.textContent = 'Choose this'
      choice.append(hint)
      var frame = document.createElement('iframe')
      frame.title = sample.name + ' — ' + variant
      frame.style.height = sample.height + 'px'
      frame.srcdoc = '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<link rel="stylesheet" href="/dev/' + (variant === 'new' ? 'paper-ui.css' : 'current-ui.css') + '"><link rel="stylesheet" href="/dev/comparison-frame.css">' +
        '</head><body data-picture-phone-style="origami-stage"><div class="demo">' + (variant === 'new' ? sample.fresh : sample.old) + '</div><script src="/dev/comparison-frame.js"><\/script></body></html>'
      window.addEventListener('message', function (event) {
        if (event.source === frame.contentWindow && event.data.type === 'comparison-height') {
          frame.style.height = Math.max(sample.height, event.data.height) + 'px'
        }
      })
      tile.append(choice, frame)
      section.querySelector('.variants').append(tile)
    })
    gallery.append(section)
  })
  document.getElementById('all-current').onclick = function () { chooseAll('current') }
  document.getElementById('all-new').onclick = function () { chooseAll('new') }
  document.getElementById('reset').onclick = function () { choices = {}; saveChoices() }
  updateSummary()

  function chooseAll(variant) {
    samples.forEach(function (sample) { choices[sample.id] = variant })
    saveChoices()
  }
  function saveChoices() {
    localStorage.setItem(storageKey, JSON.stringify(choices))
    document.querySelectorAll('input[type="radio"]').forEach(function (input) {
      input.checked = choices[input.name] === input.value
    })
    updateSummary()
  }
  function updateSummary() {
    var selected = samples.filter(function (sample) { return choices[sample.id] })
    document.getElementById('summary').textContent = selected.length + ' of ' + samples.length + ' chosen'
    document.getElementById('choices').textContent = selected.length ? selected.map(function (sample) {
      return sample.name + ': ' + choices[sample.id]
    }).join(' · ') : 'No choices yet.'
  }
  function paper(content, classes, faceClass) {
    return '<div class="paper ' + (classes || '') + '"><div class="paper-face ' + (faceClass || '') + '">' + content + '</div></div>'
  }
  function paperButton(label, classes, disabled) {
    return '<button class="paper paper-button ' + classes + '"' + (disabled ? ' disabled' : '') + '><span class="paper-face">' + label + '</span></button>'
  }
  function createSampleDrawing() {
    var canvas = document.createElement('canvas')
    canvas.width = 320
    canvas.height = 180
    var context = canvas.getContext('2d')
    context.fillStyle = '#fffef8'
    context.fillRect(0, 0, 320, 180)
    context.fillStyle = '#f5326c'
    context.strokeStyle = '#172663'
    context.lineWidth = 4
    context.beginPath()
    context.moveTo(110, 125)
    context.lineTo(110, 48)
    context.lineTo(135, 70)
    context.quadraticCurveTo(160, 58, 185, 70)
    context.lineTo(210, 48)
    context.lineTo(210, 125)
    context.quadraticCurveTo(160, 157, 110, 125)
    context.fill()
    context.stroke()
    context.fillStyle = '#172663'
    ;[140, 180].forEach(function (x) { context.beginPath(); context.arc(x, 100, 4, 0, Math.PI * 2); context.fill() })
    context.fillStyle = '#ffbd3e'
    context.beginPath()
    context.arc(260, 35, 18, 0, Math.PI * 2)
    context.fill()
    return canvas.toDataURL('image/png')
  }
}())

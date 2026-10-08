;(function () {
  var references = {
    selection: 'https://cdn-ak.f.st-hatena.com/images/fotolife/A/AtelierNoumite/20230114/20230114195439.jpg',
    menu: 'https://cdn-ak.f.st-hatena.com/images/fotolife/A/AtelierNoumite/20230114/20230114195630.jpg',
    tutorial: 'https://cdn-ak.f.st-hatena.com/images/fotolife/A/AtelierNoumite/20230114/20230114195521.jpg',
    completion: 'https://www.vooks.net/img/2017/03/snip_3.jpg',
  }
  var studies = [
    { id:'A', name:'Graph-paper prompt', keeper:true, description:'Your new prompt strip, now with a square grid on the clean top sheet. The irregular yellow backing remains visible.',
      html:'<div style="width:100%"><div class="paper"><p class="paper-face paper-copy">A cat exploring the moon</p></div><div class="paper"><p class="paper-face paper-copy">A penguin playing guitar under a sky full of stars</p></div></div>' },
    { id:'B', name:'Ruled writing paper', keeper:true, description:'Your new writing input, now with horizontal notebook lines. Type here to try it.',
      html:'<div class="paper" style="width:100%"><textarea class="paper-face paper-input" aria-label="Try the ruled paper" placeholder="Write your idea here…"></textarea></div>' },
    { id:'01', name:'Notched title banner', description:'A long teal strip with deliberate cuts and a pale backing. Based on the “Make the cut” reference you supplied.',
      html:'<div class="cut-banner"><span>MAKE THE CUT</span></div>' },
    { id:'02', name:'Menu ribbon + number seal', source:'selection', description:'Wide notched ribbons with chunky polygon badges. Two contrasting states, like the player-selection screen.',
      html:'<div class="menu-ribbon"><span class="number-badge"><span>2</span></span>Play together</div><div class="menu-ribbon selected"><span class="number-badge"><span>1</span></span>Play solo</div>' },
    { id:'03', name:'Solid capsule button', source:'selection', description:'A smooth teal pill and a soft drop shadow. No torn edge or second paper layer. Hover and press it.',
      html:'<button class="solid-pill">Ready to play</button><button class="solid-pill" style="font-size:18px;padding:10px 22px">Continue</button>' },
    { id:'04', name:'Tilted player-count sticker', source:'menu', description:'Bright rounded stickers, thick white outlines, italic numerals, and opposite tilts.',
      html:'<div class="count-stickers"><span class="count-sticker"><b>1–2</b> players</span><span class="count-sticker blue"><b>2–4</b> players</span></div>' },
    { id:'05', name:'Ink-outline speech bubble', source:'selection', description:'A white callout with a navy outline and an angular tail. The shape carries the emphasis, rather than a colored backing.',
      html:'<div class="speech"><span><b class="keycap">X</b> Switch it up!</span></div>' },
    { id:'06', name:'Outlined page heading', source:'menu', description:'Large white letters outlined in dark ink, tilted slightly. A heading that sits directly on the background.',
      html:'<div class="outline-heading">MAIN MENU</div>' },
    { id:'07', name:'Controller hints + divider', source:'selection', description:'Small circular key symbols and unboxed labels, separated from the page by a thin ink rule.',
      html:'<p class="hint-demo">Choose how you want to play</p><div class="footer-hints"><span><b class="keycap">B</b> Back</span><span><b class="keycap">A</b> OK</span></div>' },
    { id:'08', name:'Split celebration banner', source:'completion', description:'Two bold blocks, different colors and angles, heavy white edges. Based on the “Great work!” completion banner.',
      html:'<div class="celebration"><span>GREAT</span><span>WORK!</span></div>' },
    { id:'09', name:'Clipboard progress gauge', source:'tutorial', description:'A tiny clipboard, ruled sheet, semicircular meter, and paper needle. A static CSS study of the tutorial gauge.',
      html:'<div class="clipboard"><div class="clipboard-sheet"><div class="gauge"><div class="gauge-ring"></div><div class="needle"></div></div>LOOKING GOOD!</div></div>' },
    { id:'10', name:'Tutorial key tabs', source:'tutorial', description:'Narrow cream labels with golden borders and protruding button badges. Built to form a compact instruction stack.',
      html:'<div class="tutorial-tabs"><div class="tutorial-tab"><b class="keycap">A</b><span>Cut</span></div><div class="tutorial-tab"><b class="keycap">Y</b><span>Reset shape</span></div><div class="tutorial-tab"><b class="keycap">L</b><span>Rotate</span></div></div>' },
    { id:'11', name:'Curtained instruction stage', source:'tutorial', description:'Scalloped teal curtains around a graph-paper stage. A larger framing treatment for an instruction or reveal.',
      html:'<div class="stage-frame"><i class="curtain left"></i><i class="curtain right"></i><p>Make something<br>great together!</p></div>' },
    { id:'12', name:'Mode tile + selection corners', source:'menu', description:'An oversized multicolor letter with four orange selection corners. A simplified study of the mode selector, without character artwork.',
      html:'<div class="mode-tile"><span class="mode-letter">P</span><i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i></div>' },
  ]
  var storageKey = 'decodoodle-snipperclips-design-map-v1'
  var assignments = JSON.parse(localStorage.getItem(storageKey) || '{}')
  studies.forEach(function (study) {
    var card = document.createElement('article')
    card.className = 'study'
    card.innerHTML = '<div class="study-head"><h3><span class="study-id">' + study.id + '</span>' + study.name + '</h3></div>'
    var frame = document.createElement('iframe')
    frame.title = study.id + ' — ' + study.name
    frame.srcdoc = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<link rel="stylesheet" href="/dev/paper-ui.css"><link rel="stylesheet" href="/dev/comparison-frame.css"><link rel="stylesheet" href="/dev/snipperclips-elements.css">' +
      '</head><body><div class="specimen">' + study.html + '</div><script src="/dev/comparison-frame.js"><\/script></body></html>'
    window.addEventListener('message', function (event) {
      if (event.source === frame.contentWindow && event.data.type === 'comparison-height') {
        frame.style.height = Math.max(265, event.data.height) + 'px'
      }
    })
    var info = document.createElement('div')
    info.className = 'study-info'
    var description = document.createElement('p')
    description.textContent = study.description
    info.append(description)
    if (study.source) {
      var link = document.createElement('a')
      link.href = references[study.source]
      link.target = '_blank'
      link.rel = 'noreferrer'
      link.textContent = 'View original game screenshot ↗'
      info.append(link)
    }
    var label = document.createElement('label')
    label.className = 'assignment'
    label.textContent = 'Use ' + study.id + ' for…'
    var input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'You decide: timer, title, buttons…'
    input.value = assignments[study.id] || ''
    input.addEventListener('input', function () {
      assignments[study.id] = input.value
      localStorage.setItem(storageKey, JSON.stringify(assignments))
      updateMap()
    })
    label.append(input)
    info.append(label)
    card.append(frame, info)
    document.getElementById(study.keeper ? 'keepers' : 'studies').append(card)
  })
  updateMap()
  function updateMap() {
    var chosen = studies.filter(function (study) { return assignments[study.id] && assignments[study.id].trim() })
    document.getElementById('design-map').textContent = chosen.length ? chosen.map(function (study) {
      return study.id + ' (' + study.name + ') → ' + assignments[study.id]
    }).join(' · ') : 'Nothing assigned yet. Tell me the IDs you want to use.'
  }
}())

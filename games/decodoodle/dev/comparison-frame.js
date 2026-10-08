// Keep the entire sample visible, including wrapped text at mobile widths.
new ResizeObserver(function () {
  window.parent.postMessage({ type: 'comparison-height', height: Math.ceil(document.body.getBoundingClientRect().height) }, window.parent.location.origin)
}).observe(document.body)

document.querySelectorAll('button[aria-pressed]').forEach(function (button) {
  button.addEventListener('click', function () {
    button.parentElement.querySelectorAll('button').forEach(function (sibling) {
      sibling.setAttribute('aria-pressed', String(sibling === button))
    })
  })
})

export function wrapRuledInput(input) {
  var paper = document.createElement('div')
  paper.className = 'broken-picture-phone-ruled-paper'
  paper.append(input)
  return paper
}

export function frameDrawing(image) {
  var paper = document.createElement('div')
  paper.className = 'broken-picture-phone-drawing-paper'
  paper.append(image)
  return paper
}

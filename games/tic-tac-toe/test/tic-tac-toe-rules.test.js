import test from 'node:test'
import assert from 'node:assert/strict'

import { isDraw, winner } from '../src/shared/tic-tac-toe-rules.js'

test('finds row, column, and diagonal winners', function () {
  assert.equal(winner(['X', 'X', 'X', '', '', '', '', '', '']), 'X')
  assert.equal(winner(['O', 'X', '', 'O', 'X', '', 'O', '', '']), 'O')
  assert.equal(winner(['O', 'X', 'X', '', 'O', '', '', '', 'O']), 'O')
})

test('recognizes finished and unfinished draws', function () {
  var draw = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']

  assert.equal(winner(draw), '')
  assert.equal(isDraw(draw), true)
  assert.equal(isDraw(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', '']), false)
})

'use strict'

var resumable = require('./index.js')
  , session = eval(resumable)

  exports['should eval code'] = function (test) {
  var session = eval(resumable)
  test.equal(session.eval('2 + 3').result, 5)
  test.done()
}

exports['should eval code in scope'] = function (test) {
  var session = eval(resumable)
    , x = 10
  test.equal(session.eval('x + 1').result, 11)
  test.done()
}

exports['should add variables to scope'] = function (test) {
  var session = eval(resumable)
  test.equal(session
    .eval('var x = 3')
    .eval('x')
    .result, 3)
  test.done()
}

exports['should add variables to scope in a chain'] = function (test) {
  var session = eval(resumable)
  test.equal(session
    .eval('var x = 3')
    .eval('var y = 4')
    .eval('x + y')
    .result, 7)
  test.done()
}

exports['should return undefined for variable declaration'] = function (test) {
  var session = eval(resumable)
  test.equal(session.eval('var x = 3').result, undefined)
  test.done()
}

// These tests are less important,
// but they are a side-effect of the implementation
// so I'll include them here:
exports['should split sessions'] = function (test) {
  var session = eval(resumable)
    , varSession = session.eval('var x = 3')
  varSession.eval('var y = 4')
  test.equal(varSession.eval('typeof y').result, 'undefined')
  test.done()
}

exports['should share variables in a parent session'] = function (test) {
  var session = eval(resumable).eval('var x = 3')
  session.eval('x = 4')
  session.eval('x = 5')
  test.equal(session.eval('x').result, 5)
  test.done()
}

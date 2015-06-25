(function(context) {

  // We need to be able to interact with any function's scope.
  // We can do this by sharing a variable in the global scope.
  var templateName = 'rand' + Math.random().toString().substring(2)

  // Create a template out of `__evalCode`.
  module.exports = context[templateName] =
    ('({ eval: ' + __evalCode).replace('templateName', templateName) + '})'

  // This is our template, where the "magic" happens.
  // `__session` saves the scope and creates new child sessions.
  // `__result` stores the result of the eval.
  // We need `void 0` because if `code` returns something `undefined`
  // `eval` will return the value of the previous statement (for some reaosn).
  // If `code` returns `undefined` then `__result` should be `undefined`.
  function __evalCode(code) {
    var __session 
    var __result = eval(
      '__session = eval(templateName);\n' +
      'void 0;\n' +
      code)
    return { result: __result, eval: __session.eval }
  }

})(typeof window !== 'undefined' ? window
  : typeof global !== 'undefined' ? global
  : this) // Get the global object in Node and the Browser

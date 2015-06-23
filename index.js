(function(context) {
  var templateName = 'rand' + Math.random().toString().substring(2)
  module.exports = context[templateName] =
    ('({ eval: ' + __evalCode).replace('templateName', templateName) + '})'
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
  : this)

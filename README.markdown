resumable-eval
==============

Resumable eval is a microlibrary (<30 LOC) for pausing and resuming eval.
This lets you properly capture of scope of functions in code
and interact with those scopes on an as-needed basis.

For example:

    var resumable = require('resumable-eval')

    var session

    ;(function() {
      var x = 1
      session = eval(resumable) // Save the function scope
    })()

    // Interact with the saved scope
    session
      .eval('x')
      .result // returns 1

    // We can alter the scope too
    session
      .eval('var y = 3')
      .eval('x + y')
      .result // returns 4

Note that trying to do this in the naive way fails:

    var naiveEval

    ;(function() {
      var x = 1
      // This might look like it works
      naiveEval = function(code) { return eval(code) }
    })()

    // This does return 1, but ...
    naiveEval('x')

    // We can't save the scope and add variables this way.
    naiveEval('var y = 3')

    // This fails because y is undefined
    naiveEval('x + y')

This is why we need *resumable-eval* :)

Why this can be useful
======================

Most languages have REPLs, which give you resumable eval in the global scope.
What if you could have a REPL in function scope, without a breakpoint?
*resumable-eval* is a utility that gives you that ability.

Installation
============

    npm install resumable-eval

Lazy sessions
=============

You might want to capture the scope of many functions.
Maybe all of your functions.
But you might not want to call eval everywhere.
In that case, you can implement a lazy pattern:

    var lazySession

    ;(function() {
      var x = 1
      lazySession = function() {
        return eval(resumable)
      }
    })()

Now when we want to use the eval session,

    var session = lazySession()
    session.eval('x')

In this way we can capture the scopes of many functions
but only create sessions on an as-needed basis.

Tests
=====

To run the tests, clone the repo and install nodeunit:

    git clone https://github.com/omphalos/resumable-eval
    cd resumable-eval
    npm install -g nodeunit

Then:

    npm test

License
=======

MIT

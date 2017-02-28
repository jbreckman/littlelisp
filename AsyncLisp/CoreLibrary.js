var Library = require('./Library.js')
var BoxTypes = require('./Box.js')
var StackEntry = require('./StackEntry.js')

class CoreLibrary extends Library {

  getMethodNames() {
    return ['begin', 'list', 'print', 'rest', 'first', 'if', 'let'];
  }

  getName() { return 'core'; }

  getMethod(methodName) {
    return this[methodName].bind(this)
  }

  begin(functionArguments, context, dependencies, state) {
    
  }

  if(functionArguments, context, dependencies, state) {

  }

  let(functionArguments, context, dependencies, state) {

  }

  if(functionArguments, context, dependencies, state) {

  }

  first(functionArguments, context, dependencies, state) {

  }

  rest(functionArguments, context, dependencies, state) {

  }

  list(functionArguments, context, dependencies, state) {
    if (dependencies.length === functionArguments.length) {
      return new BoxTypes.ListBox(dependencies)
    }
    return StackEntry.withFunction(this.runtime.getLibraryBox('core', 'list'), functionArguments, context, functionArguments)
  }

  print(functionArguments, context, dependencies, state) {
    if (dependencies.length === functionArguments.length) {
      console.log(dependencies.map((dependency) => { dependency.value }))
      return dependencies[dependencies.length - 1]
    }
    return StackEntry.withFunction(this.runtime.getLibraryBox('core', 'print'), functionArguments, context, functionArguments)
  }

}

module.exports = CoreLibrary

/*
begin: function(methodArguments, context, payload, deliveredPayload) {
    if (Object.keys(deliveredPayload).length === methodArguments.length) {
      return deliveredPayload[methodArguments.length - 1];
    }
    else {
      var resolvedBegin = new StackEntry('begin', methodArguments, context, {})
      return []
    }
  },

  let: function(input, context) {
    var letContext = input[1].reduce(function(acc, x) {
      acc.scope[x[0].value] = interpret(x[1], context);
      return acc;
    }, new Context({}, context));

    return interpret(input[2], letContext);
  },

  lambda: function(input, context) {
    return new Closure(input, context);
  },

  if: function(input, context) {
    return interpret(input[1], context) ?
      interpret(input[2], context) :
      interpret(input[3], context);
  },

  first: function(input, context) {
    var listResults = interpret(input[1], context)
    return listResults[0];
  },

  rest: function(input, context) {
    var listResults = interpret(input[1], context)
    return listResults.slice(1);
  },

  print: function(input, context) {
    var result = interpret(input[1], context);
    console.log(result);
    return result;
  }*/
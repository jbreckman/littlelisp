/*
var Closure = function(input, context) {
  this.input = input;
  this.context = context;

  this.execute = function(arguments) {
    var lambdaArguments = arguments;
    var lambdaScope = this.input[1].reduce(function(acc, x, i) {
      acc[x.value] = lambdaArguments[i];
      return acc;
    }, {});

    return interpret(this.input[2], new Context(lambdaScope, this.context));
  }
};

var special = {
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
  }
};

var interpretList = function(input, context) {
  if (input.length > 0 && input[0].value in special) {
    return special[input[0].value](input, context);
  } else {
    var list = input.map(function(x) { return interpret(x, context); });
    if (list[0] instanceof Closure) {
      return list[0].execute(list.slice(1));
    } else {
      return list;
    }
  }
};

var interpret = function(input, context) {
  if (context === undefined) {
    return interpret(input, new Context({}));
  } else if (input instanceof Array) {
    return interpretList(input, context);
  } else if (input.type === "identifier") {
    return context.get(input.value);
  } else if (input.type === "number" || input.type === "string") {
    return input.value;
  }
};*/

var parse = require('./AsyncLisp/Parser.js').parse;
var Runtime = require('./AsyncLisp/Runtime.js').Runtime;

var interpret = function(token) {
  return new Runtime(token).execute();
}

console.log(parse);

exports.littleLisp = {
  parse: parse,
  interpret: interpret
};

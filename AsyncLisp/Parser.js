var TokenTypes = require('./Token.js');

var categorize = function(input) {
	if (!isNaN(parseFloat(input))) {
		return new TokenTypes.NumberToken(parseFloat(input));
	} else if (input[0] === '"' && input.slice(-1) === '"') {
		return new TokenTypes.StringToken(input.slice(1,-1));
	} else {
		return new TokenTypes.IdentifierToken(input);
	}
};

var parenthesize = function(input, list) {
	if (list === undefined) {
		return parenthesize(input, []);
	} else {
		var token = input.shift();
		if (token === undefined) {
			return list.pop();
		} else if (token === "(") {
			list.push(parenthesize(input, []));
			return parenthesize(input, list);
		} else if (token === ")") {
			return new TokenTypes.ListToken(list);
		} else {
			return parenthesize(input, list.concat(categorize(token)));
		}
	}
};

var tokenize = function(input) {
	return input.split('"')
		.map(function(x, i) {
			 if (i % 2 === 0) { // not in string
				 return x.replace(/\(/g, ' ( ')
								 .replace(/\)/g, ' ) ');
			 } else { // in string
				 return x.replace(/ /g, "!whitespace!");
			 }
		 })
		.join('"')
		.trim()
		.split(/\s+/)
		.map(function(x) {
			return x.replace(/!whitespace!/g, " ");
		});
};

var parse = function(input) {
	return parenthesize(tokenize(input));
};

exports.parse = parse;
class Token {
  constructor(value) {
    this.value = value;
  }
}

class NumberToken extends Token { }
class StringToken extends Token { }
class IdentifierToken extends Token { }
class FunctionToken extends Token { }
class ListToken extends Token { }

module.exports = {
	NumberToken: NumberToken,
	StringToken: StringToken,
	IdentifierToken: IdentifierToken,
	FunctionToken: FunctionToken,
	ListToken: ListToken
}
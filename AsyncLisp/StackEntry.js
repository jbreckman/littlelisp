var BoxTypes = require('./Box.js');
var TokenTypes = require('./Token.js');

class StackEntry {
	constructor(token, context, dependencies, state) {
		this.token = token
		this.context = context
		this.dependencies = dependencies || []
		this.state = state || {}
	}

	static withFunction(functionBox, functionArguments, context, dependencies, state) {
		if (!state) {
			state = {}
		}
		state.function = functionBox;
		return new StackEntry(new TokenTypes.ListToken(functionArguments), context, dependencies, state)
	}

	execute(runtime) {
		if (this.token instanceof TokenTypes.ListToken) {
			if (this.state.isResolvingFunction) {
				// our first dependency is a FunctionBox - we can now execute that
				delete this.state.isResolvingFunction;

				if (this.dependencies[0] instanceof BoxTypes.FunctionBox) {
					this.state.function = this.dependencies[0]
				}
				else {
					return StackEntry.withFunction(runtime.getLibraryBox('core', 'list'), this.dependencies.concat(this.token.value), this.context)
				}
			}

			if (this.state.function) {
				// we have a method to evaluate
				return this.state.function.getMethod(runtime)(this.token, this.context, this.dependencies, this.state)
			}
			else if (this.token.value.length === 0) {
				return new BoxTypes.ListBox([])
			}
			else {
				var evaluateFunctionEntry = new StackEntry(this.token.value[0], this.context)
				var functionArguments = new TokenTypes.ListToken(this.token.value.slice(1))
				return new StackEntry(functionArguments, this.context, [evaluateFunctionEntry], { isResolvingFunction: true })
			}
			// executing a method
		}
		else if (this.token instanceof TokenTypes.NumberToken) {
			return new BoxTypes.NumberBox(this.token.value);
		}
		else if (this.token instanceof TokenTypes.StringToken) {
			return new BoxTypes.StringBox(this.token.value);
		}
		else if (this.token instanceof TokenTypes.IdentifierToken) {
			return this.context.get(this.token.value);
		}
	}

	step(runtime) {
		for (var i = 0; i < this.dependencies.length; i++) {
			if (this.dependencies[i] instanceof StackEntry) {
				this.dependencies[i] = this.dependencies[i].step(runtime);
				return this;
			}
		}
		return this.execute(runtime);
	}
}

module.exports = StackEntry
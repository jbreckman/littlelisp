var BoxTypes = require('./Box.js');

class Context {
	constructor(scope, parent) {
		this.scope = scope;
		this.parent = parent;
	}

	get(identifier) {
		if (identifier in this.scope) {
			return this.scope[identifier];
		}
		else if (this.parent) {
			return this.parent.get(identifier)
		}
		else {
			return new BoxTypes.NullBox(null);
		}
	}
}

module.exports = Context;
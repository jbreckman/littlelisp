var Context = require('./Context.js');
var BoxTypes = require('./Box.js');
var CoreLibrary = require('./CoreLibrary.js');
var StackEntry = require('./StackEntry.js');

class Runtime {

	constructor(rootToken) {
		this.libraries = {}
		this.libraryMethods = {}
		this.registerLibrary(new CoreLibrary(this))
		this.rootStackEntry = new StackEntry(rootToken, this.defaultContext())
	}

	registerLibrary(library) {
		var libraryName = library.getName()
		this.libraries[libraryName] = library

		library.getMethodNames().forEach((methodName) => {
			this.libraryMethods[methodName] = new BoxTypes.LibraryFunctionBox(libraryName, methodName)
		})
	}

	getLibraryBox(libraryName, methodName) {
		return this.libraryMethods[methodName]
	}

	getLibrary(libraryName) {
		return this.libraries[libraryName]
	}

	defaultContext() {
		return new Context(this.libraryMethods);
	}

	step() {
		this.rootStackEntry = this.rootStackEntry.step(this);
	}

	execute() {
		while (this.rootStackEntry instanceof StackEntry) {
			this.step(this);
		}
		return this.unbox(this.rootStackEntry);
	}

	unbox(box) {
		console.log('unbox', box);
		if (box instanceof BoxTypes.Box) {
			box = box.value;
		}
		if (box instanceof Array) {
			box = box.map(this.unbox)
		}
		return box
	}
}

exports.Runtime = Runtime;
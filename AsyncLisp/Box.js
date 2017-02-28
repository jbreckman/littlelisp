class Box {
	constructor(value) {
		this.value = value;
	}
}

class StringBox extends Box {}
class NumberBox extends Box {}
class ListBox extends Box {}
class NullBox extends Box {}

class FunctionBox extends Box {
	getMethod(runtime) {
		return () => {}
	}
}
class ClosureFunctionBox extends FunctionBox {}
class LibraryFunctionBox extends FunctionBox {
	constructor(libraryName, functionName) {
		super(functionName)
		this.libraryName = libraryName;
	}

	getMethod(runtime) {
		return runtime.getLibrary(this.libraryName).getMethod(this.value)
	}
}

exports.Box = Box;
exports.NullBox = NullBox;
exports.StringBox = StringBox;
exports.NumberBox = NumberBox;
exports.FunctionBox = FunctionBox;
exports.ListBox = ListBox;
exports.ClosureFunctionBox = ClosureFunctionBox;
exports.LibraryFunctionBox = LibraryFunctionBox;
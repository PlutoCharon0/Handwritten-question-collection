Function.prototype._apply = function (context, argsArr) {
	if (typeof this !== 'function') {
		throw new TypeError(`${this} is not a function`)
	}
	if (argsArr && !Array.isArray(argsArr)) {
		throw new TypeError(`${argsArr} is not a array`)
	}
	context =
		context ||
		(typeof global !== 'undefined'
			? global
			: typeof window !== 'undefined'
			? window
			: context)

	const fn = Symbol('key')

	context[fn] = this

	const result = context[fn](...argsArr)

	delete context[fn]

	return result
}

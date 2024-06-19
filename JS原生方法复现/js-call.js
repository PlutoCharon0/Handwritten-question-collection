Function.prototype._call = function (context, ...args) {
	if (typeof this !== 'function') {
		throw new TypeError(`${this} is not a function`)
	}

	context =
		context ||
		(typeof global !== 'undefined'
			? global
			: typeof window !== 'undefined'
			? window
			: undefined)

	const fn = Symbol('key')

	context[fn] = this

	const result = context[fn](...args)

	delete context[fn]

	return result
}

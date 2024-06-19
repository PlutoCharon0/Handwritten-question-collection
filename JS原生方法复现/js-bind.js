Function.prototype._bind = function (context, ...args) {
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

	const _this = this

	return function fn(...rest) {
		if (this instanceof fn) {
			return new _this(...args, ...rest)
		}

		return _this.apply(context, [...args, ...rest])
	}
}

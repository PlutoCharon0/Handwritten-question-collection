function _new(fn, ...args) {
	const obj = Object.create(fn.prototype)

	const result = fn.call(fn, ...args)

	return typeof result === 'object' ? result : obj
}

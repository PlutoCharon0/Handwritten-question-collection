function _new(constructorFn, ...args) {
	const obj = Object.create(constructorFn.prototype)

	const result = constructorFn.call(obj, ...args)

	return result instanceof Object ? result : obj
}

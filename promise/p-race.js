const MyPromise = require('./promise/index')

MyPromise.race = function (promises) {
	return new MyPromise((resolve, reject) => {
		if (promises === null || typeof promises[Symbol.iterator] !== 'function') {
			throw new TypeError(`${promises} is not iterable`)
		}

		promises = [...promises]

		promises.forEach((p) => {
			MyPromise.resolve(p).then(resolve, reject)
		})
	})
}

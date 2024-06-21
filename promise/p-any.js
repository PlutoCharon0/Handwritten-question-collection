const MyPromise = require('./promise/index')
// TODO 待完善
MyPromise.any = function (promises) {
	return new MyPromise((resolve, reject) => {
		if (promises === null || typeof promises[Symbol.iterator] !== 'function') {
			throw new TypeError(`${promises} is not iterable`)
		}

		promises = [...promises]
		if (promises.length === 0)
			return reject(new AggregateError([], 'All promises were rejected'))

		let results = []
		let count = 0
		promises.forEach((p) => {
			MyPromise.resolve(p).then(
				(result) => {
					resolve(result)
				},
				(reason) => {
					results[count++] = reason
					if (results.length === count) reject(results)
				}
			)
		})
	})
}

const promise1 = MyPromise.reject(0)
const promise2 = new MyPromise((resolve) => setTimeout(resolve, 100, 'quick'))
const promise3 = new MyPromise((resolve) => setTimeout(resolve, 500, 'slow'))

const promises = [promise1, promise2, promise3]

MyPromise.any(promises).then((value) => console.log(value))

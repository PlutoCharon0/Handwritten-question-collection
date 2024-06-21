const MyPromise = require('./promise/index')

MyPromise.allSettled = function (promises) {
	return new MyPromise((resolve, reject) => {
		if (promises === null || typeof promises[Symbol.iterator] !== 'function') {
			throw new TypeError('Promise.allSettled accepts an iterable argument')
		}

		promises = [...promises]

		if (promises.length === 0) return resolve([])

		let results = []
		let count = 0
		promises.forEach((p) => {
			MyPromise.resolve(p)
				.then(
					(result) => {
						results[count++] = {
							status: MyPromise.FULFILLED,
							value: result,
						}
					},
					(reason) => {
						results[count++] = {
							status: MyPromise.REJECTED,
							reason: reason,
						}
					}
				)
				.finally(() => {
					if (promises.length === count) resolve(results)
				})
		})
	})
}

const p1 = MyPromise.allSettled([
	MyPromise.reject(1),
	MyPromise.resolve(2),
	MyPromise.resolve(3),
	4,
]).then(
	(data) => {
		console.log('成功', data)
	},
	(reason) => {
		console.log('失败', reason)
	}
)
const p = Promise.allSettled([
	Promise.reject(1),
	Promise.resolve(2),
	Promise.resolve(3),
	4,
]).then(
	(data) => {
		console.log('成功', data)
	},
	(reason) => {
		console.log('失败', reason)
	}
)

const MyPromise = require('./promise/index')

MyPromise.all = function (promises) {
	return new MyPromise((resolve, reject) => {
		if (promises === null || typeof promises[Symbol.iterator] !== 'function') {
			throw new TypeError(`${promises} is not iterable`)
		}

		promises = [...promises]

		if (promises.length === 0) return resolve([])

		let count = 0
		const results = []
		promises.forEach((p) => {
			MyPromise.resolve(p).then(
				(result) => {
					results[count++] = result
					if (results.length === count) resolve(results)
				},
				(reason) => reject(reason)
			)
		})
	})
}

const p1 = MyPromise.all([
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
const p = Promise.all([
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

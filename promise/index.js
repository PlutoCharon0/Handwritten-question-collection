function resolvePromise(promiseForReturn, handledResult, resolve, reject) {
	let customThenFn
	if (handledResult === promiseForReturn) {
		throw new TypeError('Chaining cycle detected for promise')
	} else if (handledResult instanceof MyPromise) {
		handledResult.then(
			(result) => resolvePromise(promiseForReturn, result, resolve, reject),
			(reason) => reject(reason)
		)
	} else if (
		handledResult !== null &&
		(typeof handledResult === 'object' || typeof handledResult === 'function')
	) {
		try {
			customThenFn = handledResult.then
		} catch (error) {
			return reject(error)
		}
		if (typeof customThenFn === 'function') {
			let called = false
			try {
				customThenFn.call(
					handledResult,
					(result) => {
						if (called) return
						called = true

						resolvePromise(promiseForReturn, result, resolve, reject)
					},
					(reason) => {
						if (called) return
						called = true

						reject(reason)
					}
				)
			} catch (error) {
				if (called) return
				called = true
				reject(error)
			}
		} else {
			resolve(handledResult)
		}
	} else {
		resolve(handledResult)
	}
}

class MyPromise {
	static PENDING = 'pending'
	static FULFILLED = 'fulfilled'
	static REJECTED = 'rejected'

	constructor(excutor) {
		this.PromiseResult = undefined
		this.PromiseState = MyPromise.PENDING
		this.handleFulfilledCb = []
		this.handleRejectedCb = []
		try {
			excutor(this.resolve.bind(this), this.reject.bind(this))
		} catch (error) {
			this.reject(error)
		}
	}

	resolve(result) {
		if (this.PromiseState !== MyPromise.PENDING) return
		this.PromiseState = MyPromise.FULFILLED
		this.PromiseResult = result
		this.handleFulfilledCb.forEach((cb) => cb())
	}
	reject(reason) {
		if (this.PromiseState !== MyPromise.PENDING) return
		this.PromiseState = MyPromise.REJECTED
		this.PromiseResult = reason
		this.handleRejectedCb.forEach((cb) => cb())
	}
	then(onFulfilled, onRejected) {
		const promiseForReturn = new MyPromise((resolve, reject) => {
			switch (this.PromiseState) {
				case MyPromise.FULFILLED:
					queueMicrotask(() => {
						try {
							if (typeof onFulfilled !== 'function') {
								resolve(this.PromiseResult)
							} else {
								resolvePromise(
									promiseForReturn,
									onFulfilled(this.PromiseResult),
									resolve,
									reject
								)
							}
						} catch (error) {
							reject(error)
						}
					})
					break
				case MyPromise.REJECTED:
					queueMicrotask(() => {
						try {
							if (typeof onRejected !== 'function') {
								reject(this.PromiseResult)
							} else {
								resolvePromise(
									promiseForReturn,
									onRejected(this.PromiseResult),
									resolve,
									reject
								)
							}
						} catch (error) {
							reject(error)
						}
					})
					break

				case MyPromise.PENDING:
					this.handleFulfilledCb.push(() => {
						queueMicrotask(() => {
							try {
								if (typeof onFulfilled !== 'function') {
									resolve(this.PromiseResult)
								} else {
									resolvePromise(
										promiseForReturn,
										onFulfilled(this.PromiseResult),
										resolve,
										reject
									)
								}
							} catch (error) {
								reject(error)
							}
						})
					})
					this.handleRejectedCb.push(() => {
						queueMicrotask(() => {
							try {
								if (typeof onRejected !== 'function') {
									reject(this.PromiseResult)
								} else {
									resolvePromise(
										promiseForReturn,
										onRejected(this.PromiseResult),
										resolve,
										reject
									)
								}
							} catch (error) {
								reject(error)
							}
						})
					})
					break
			}
		})

		return promiseForReturn
	}
	catch(onRejected) {
		return this.then(undefined, onRejected)
	}
	finally(onFinally) {
		return this.then(
			(result) => {
				return MyPromise.resolve(onFinally()).then(() => result)
			},
			(reason) => {
				return MyPromise.resolve(onFinally()).then(() => {
					throw reason
				})
			}
		)
	}
	static resolve(value) {
		if (value instanceof MyPromise) return value
		if (
			value !== null &&
			(typeof value === 'object' || typeof value === 'function') &&
			typeof value.then === 'function'
		) {
			return new MyPromise((resolve, reject) => {
				value.then(resolve, reject)
			})
		}
		return new MyPromise((resolve) => {
			resolve(value)
		})
	}
	static reject(value) {
		return new MyPromise((resolve, reject) => {
			reject(value)
		})
	}
}

MyPromise.deferred = function () {
	let result = {}
	result.promise = new MyPromise((resolve, reject) => {
		result.resolve = resolve
		result.reject = reject
	})
	return result
}

module.exports = MyPromise

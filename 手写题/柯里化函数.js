// https://juejin.cn/post/6844904093467541517?searchId=2024062519195229B230B8B3080BE01A1F#heading-0
// https://juejin.cn/post/7144733247028035621?searchId=2024062519195229B230B8B3080BE01A1F#heading-0

/**
 * curry函数用于将一个多元函数转换为柯里化的函数。
 * 柯里化（Currying）是将接受多个参数的函数转换为接受一个参数的函数的过程，
 * 这个过程是通过逐个接受参数并返回一个新的接受剩余参数的函数来实现的。
 *
 * @param {Function} fn 要进行柯里化的函数
 * @param {...*} args 函数的初始参数，可以是任意数量和类型的参数
 * @returns {Function} 如果传入的参数数量足够，返回函数的执行结果；
 *                      否则返回一个新的柯里化函数，用于接受剩余参数
 */
function curry(fn, ...args) {
	// 当传入的参数数量达到原函数所需的数量时，执行原函数
	return args.length >= fn.length
		? fn(...args)
		: // 否则返回一个新的柯里化函数，用于接受剩余参数
		  (...args2) => curry(fn, ...args, ...args2)
}
function add1(x, y, z) {
	return x + y + z
}
const add = curry(add1)
console.log(add(1, 2, 3))
console.log(add(1)(2)(3))
console.log(add(1, 2)(3))
console.log(add(1)(2, 3))

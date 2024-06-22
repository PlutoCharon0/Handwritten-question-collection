/**
 * 定义一个 Fibonacci 函数，用于生成 Fibonacci 数列的计算函数。
 * @returns {Function} 返回一个函数，该函数接受一个数字 n 作为参数，返回第 n 个 Fibonacci 数。
 *
    优点：
    1.闭包实现缓存。
    2.单例模式。
 */
function Fibonacci() {
	// 初始化 Fibonacci 数列的前三个数
	const fibonacci = [0, 1, 1]

	// 返回一个闭包函数，用于计算指定位置的 Fibonacci 数
	return function (n) {
		// 如果 fibonacci 数组中已经存在 n 位置的数，则直接返回该数
		if (fibonacci[n]) return fibonacci[n]

		// 通过循环计算 Fibonacci 数列中缺失的数字
		for (let i = fibonacci.length; i <= n; i++) {
			fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]
		}

		// 返回指定位置的 Fibonacci 数
		return fibonacci[n]
	}
}
/**
 * 为 Fibonacci 函数添加一个静态方法 getInstance，用于获取 Fibonacci 函数的实例。
 * 这个方法保证了整个程序中只存在一个 Fibonacci 函数的实例，实现了单例模式。
 * @returns {Function} 返回 Fibonacci 函数的实例。
 */
Fibonacci.getInstance = function () {
	if (!this._instance) this._instance = Fibonacci()
	return this._instance
}

console.log(Fibonacci.getInstance()(1), Fibonacci.getInstance()(20))

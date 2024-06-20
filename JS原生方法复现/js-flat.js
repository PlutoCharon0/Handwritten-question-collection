/**
 * 扩展Array原型，添加一个_flat方法用于扁平化数组。
 * @param {number} [deep=1] - 扁平化的深度，默认为1，即扁平化一层嵌套数组。
 * @returns {Array} 返回扁平化后的数组。
 */
Array.prototype._flat = function (deep = 1) {
	// 当深度计数减至0时，停止递归并返回当前数组
	if (deep === 0) return this

	// 初始化结果数组，用于存放扁平化后的元素
	let res = []

	// 遍历当前数组的每个元素
	for (const item of this) {
		// 如果元素是数组，则递归调用_flat方法减少深度，并将结果合并到res中
		if (Array.isArray(item)) {
			res = res.concat(item._flat(--deep)) // 注意：这里递减deep是在调用前进行的
		} else {
			// 如果元素不是数组，直接将其添加到结果数组中
			res.push(item)
		}
	}

	// 返回最终扁平化后的数组
	return res
}

const arr = [
	1111,
	[2222, [3333, [4444, [5555, [6666, [7777, [8888, [9999]]]]]]]],
]

console.log(arr._flat(2))
console.log(arr.flat(2))
console.log(arr._flat(Infinity))
console.log(arr.flat(Infinity))

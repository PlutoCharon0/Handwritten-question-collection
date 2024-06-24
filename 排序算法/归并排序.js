/**
 * 归并排序函数，使用分治策略对数组进行排序。
 * @param {Array} array 需要排序的数组。
 * @param {Function} compareFn 自定义比较函数，用于决定元素间的大小关系，默认为`defaultCompareFn`，升序排列。
 * @returns {Array} 排序后的数组。
 */
function mergeSort(array, compareFn = defaultCompareFn) {
	if (array.length > 1) {
		const { length } = array
		const middle = length >> 1 // 计算数组中间索引位置
		const left = mergeSort(array.slice(0, middle), compareFn) // 对左侧子数组递归排序
		const right = mergeSort(array.slice(middle, length), compareFn) // 对右侧子数组递归排序
		array = merge(left, right, compareFn) // 合并已排序的左右子数组
	}
	return array
}

/**
 * 默认比较函数，用于比较两个元素的大小（升序）。
 * @param {Any} a 待比较的第一个元素。
 * @param {Any} b 待比较的第二个元素。
 * @returns {Boolean} 若a小于b则返回true，否则返回false。
 */
function defaultCompareFn(a, b) {
	return a < b
}

/**
 * 合并两个已排序的数组，并保持整体有序性。
 * @param {Array} left 已排序的左侧子数组。
 * @param {Array} right 已排序的右侧子数组。
 * @param {Function} compareFn 比较函数，用于确定元素间的关系顺序。
 * @returns {Array} 合并后的新数组，按compareFn规则排序后结果。
 */
function merge(left, right, compareFn) {
	let i = 0
	let j = 0
	const result = []

	// 按照比较函数将左右两个数组中的较小元素依次放入结果数组中
	while (i < left.length && j < right.length) {
		result.push(compareFn(left[i], right[j]) ? left[i++] : right[j++])
	}

	// 将剩余未遍历完的数组元素追加到结果数组中
	return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

console.log(mergeSort([1, 5, 3, 2, 6, 7, 15, 22]))

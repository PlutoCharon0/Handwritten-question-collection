/**
 * 快速排序函数，基于快速排序算法对数组进行排序。
 * @param {Array} array 需要排序的数组。
 * @returns {Array} 排序后的数组。
 * @description 快速排序算法的时间复杂度通常为 O(nlogn)，在最坏情况下为 O(n^2)。
 */
function quickSort(array) {
	/**
	 * 划分函数，选择一个基准值并调整数组元素，使得基准值左侧的元素都小于它，右侧的元素都大于它。
	 * @param {Array} array 待划分的数组。
	 * @param {Number} left 区间开始索引。
	 * @param {Number} right 区间结束索引。
	 * @returns {Number} 基准值所在的新索引位置。
	 */
	function partition(array, left, right) {
		const pivot = array[Math.floor((left + right) / 2)] // 选取基准值：取区间的中间元素
		let i = left // 初始化左指针
		let j = right // 初始化右指针

		// 当左指针小于等于右指针时，执行循环交换操作
		while (i <= j) {
			// 寻找第一个大于等于基准值的元素（从左向右）
			while (array[i] < pivot) {
				i++
			}
			// 寻找第一个小于基准值的元素（从右向左）
			while (array[j] > pivot) {
				j--
			}

			// 如果左右指针相遇或交叉，交换两个元素的位置并将指针移动
			if (i <= j) {
				;[array[i], array[j]] = [array[j], array[i]] // 交换元素
				i++
				j--
			}
		}

		// 返回最终基准值所在的新索引位置
		return i
	}
	/**
	 * 快速排序辅助函数，采用分治策略处理数组的部分区间。
	 * @param {Array} array 待排序的数组。
	 * @param {Number} left 区间开始索引。
	 * @param {Number} right 区间结束索引。
	 * @returns {Array} 排序后的数组。
	 */
	function quick(array, left, right) {
		let index
		if (array.length > 1) {
			index = partition(array, left, right) // 获取基准值划分后的索引位置
			if (left < index - 1) {
				// 如果基准值左边还有元素，则递归排序该区域
				quick(array, left, index - 1)
			}
			if (index < right) {
				// 如果基准值右边还有元素，则递归排序该区域
				quick(array, index, right)
			}
		}
		return array
	}
	return quick(array, 0, array.length - 1)
}

console.log(quickSort([3, 1, 2, 3, 5]))
console.log(quickSort([1, 5, 6, 2, 3, 7, 9, 6, 4]))
console.log(quickSort([1, 5, 8, 6, 7, 3, 7, 9]))

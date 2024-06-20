/* *
 * 在排序数组中使用二分查找算法查找目标值的索引。
 * 二分查找是一种高效的查找算法，它通过不断缩小搜索范围来找到目标值。
 *
 * @param {Array} arr - 有序的数组，数组中的元素必须是可比较的。
 * @param {*} target - 要查找的目标值。
 * @returns {number} - 如果找到目标值，返回其索引；否则返回-1。
 */
function binarySearch(arr, target) {
	// 初始化搜索范围的左右边界
	let left = 0
	let right = arr.length - 1

	// 当左边界不大于右边界时，继续搜索
	while (left <= right) {
		// 计算中间位置，使用位运算符>>来高效地除以2
		let mid = left + ((right - left) >> 1)

		// 如果中间位置的值大于目标值，调整右边界
		if (arr[mid] > target) {
			right = mid - 1
			// 如果中间位置的值小于目标值，调整左边界
		} else if (arr[mid] < target) {
			left = mid + 1
			// 如果中间位置的值等于目标值，找到了目标，返回其索引
		} else {
			return mid
		}
	}

	// 如果没有找到目标值，返回-1
	return -1
}

const arr1 = [1, 2, 4, 5, 7, 8]
const arr2 = [8, 7, 5, 4, 2, 1]
console.log(binarySearch(arr1, 5))
console.log(binarySearch(arr2, 5))

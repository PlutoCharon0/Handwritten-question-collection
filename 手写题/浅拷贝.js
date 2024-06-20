/**
 * 创建一个目标对象的浅拷贝。
 * 浅拷贝意味着只复制对象的第一层属性，如果对象的属性是另一个对象，则只复制引用，而不是复制整个对象。
 *
 * @param {Object} target - 需要被拷贝的对象。
 * @returns {Object} - 返回目标对象的浅拷贝。
 */
function shallowClone(target) {
	// 检查目标是否为对象或null，如果不是，则直接返回目标
	if (typeof target !== 'object' || target === null) {
		return target
	}

	// 根据目标是数组还是普通对象，初始化拷贝结果
	const cloneRes = Array.isArray(target) ? [] : {}

	// 遍历目标对象的所有自有属性（包括Symbol属性），并复制到拷贝结果中
	Reflect.ownKeys(target).forEach((key) => {
		cloneRes[key] = target[key]
	})

	return cloneRes
}

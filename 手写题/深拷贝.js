/**
 * 深度克隆一个对象。
 *
 * 该函数旨在复制一个对象的所有属性，包括嵌套对象和数组，而不改变原始对象或引用。
 * 它处理了不同类型的对象，如函数、Set、Map、WeakMap、WeakSet、Date和RegExp。
 *
 * @param {Object} target - 需要被克隆的对象。
 * @param {WeakMap} map - 用于跟踪已经克隆过的对象，避免无限循环。
 * @returns {Object} - 返回克隆后的对象。
 */
function deepClone(target, map = new WeakMap()) {
	// 检查目标是否为对象或null，若是则直接返回，避免不必要的克隆
	if (typeof target !== 'object' || target === null) {
		return target
	}
	const constructor = target.constructor

	// 判断目标对象的构造函数是否为特定类型，若是则使用构造函数创建新实例进行克隆
	if (
		/^Function|Set|Map|WeakMap|WeakSet|Date|RegExp$/i.test(constructor.name)
	) {
		return new constructor(target)
	}

	// 检查map中是否已存在目标对象的克隆，存在则直接返回克隆对象，避免重复克隆
	if (map.get(target)) return map.get(target)

	// 根据目标对象类型创建一个新的克隆对象，对于数组使用[]，对于其他对象使用Object.create创建
	const cloneRes = Array.isArray(target)
		? []
		: Object.create(Object.getPrototypeOf(target))

	// 在map中记录目标对象和其克隆对象的映射关系
	map.set(target, cloneRes)

	// 遍历目标对象的所有自有属性，并递归克隆每个属性值
	Reflect.ownKeys(target).forEach((key) => {
		cloneRes[key] = deepClone(target[key], map)
	})

	// 返回最终克隆后的对象
	return cloneRes
}

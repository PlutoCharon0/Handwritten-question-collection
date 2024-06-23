const data = [
	{ id: 1, name: '部门1', pid: 0 },
	{ id: 2, name: '部门2', pid: 1 },
	{ id: 3, name: '部门3', pid: 1 },
	{ id: 4, name: '部门4', pid: 3 },
	{ id: 5, name: '部门5', pid: 4 },
	{ id: 6, name: '部门6', pid: 0 },
]

/**
 * 将列表数据转换为树状结构。
 *
 * @param {Array} list - 原始的列表数据，每个元素包含id和pid属性，pid表示父节点的id。
 * @returns {Array} - 返回转换后的树状结构数据，每个元素包含id、pid和其他属性，以及一个children数组用于存放子节点。
 */
function list2Tree(list) {
	// 初始化一个数组用于存放最终的树状结构数据
	const tree = []
	// 初始化一个哈希表用于快速查找列表中对应id的元素
	const hashMap = {}

	// 遍历原始列表数据
	for (let i = 0; i < list.length; i++) {
		// 获取当前元素的父节点id和当前元素的id
		let pid = list[i].pid
		let id = list[i].id

		// 如果哈希表中不存在当前id的元素，则初始化该元素及其children数组
		if (!hashMap[id]) {
			hashMap[id] = {
				children: [],
			}
		}

		// 将当前列表元素的信息合并到哈希表中，包括children数组
		hashMap[id] = {
			...list[i],
			children: hashMap[id].children,
		}

		// 如果当前元素的父节点id为0，表示该元素为根节点，将其添加到tree数组中
		if (pid === 0) {
			tree.push(hashMap[id])
		} else {
			// 如果哈希表中不存在当前元素的父节点id，则初始化该父节点及其children数组
			if (!hashMap[pid]) {
				hashMap[pid] = {
					children: [],
				}
			}
			// 将当前元素添加到其父节点的children数组中
			hashMap[pid].children.push(hashMap[id])
		}
	}
	// 返回转换后的树状结构数据
	return tree
}

console.log(list2Tree(data))

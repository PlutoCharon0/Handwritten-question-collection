const data = [
	{
		id: '1',
		name: '父节点1',
		children: [
			{
				id: '1-1',
				name: '子节点1-1',
				children: [
					{
						id: '1-1-1',
						name: '子节点1-1-1',
					},
					{
						id: '1-1-2',
						name: '子节点1-1-2',
					},
				],
			},
		],
	},
	{
		id: '2',
		name: '父节点2',
		children: [
			{
				id: '2-1',
				name: '子节点2-1',
			},
		],
	},
]

/**
 * 将树结构转换为列表结构。
 *
 * 该函数接受一个树形结构对象作为输入，将其转换为一个一维列表。列表中的每个元素都是树中一个节点的信息，
 * 包括节点的id和name。如果节点有子节点，则递归调用此函数将子节点转换为列表形式，并将其追加到当前节点的列表中。
 * 这样，整个树就被转换为一个平面的列表结构，方便后续处理和展示。
 *
 * @param {Object} tree - 树形结构对象，包含节点id、name以及可能的子节点。
 * @returns {Array} - 转换后的列表结构，包含所有节点的id和name。
 */
function tree2List(tree) {
	// 初始化一个空数组，用于存储转换后的列表结构。
	let list = []

	// 遍历树中的每个节点，将节点信息转换为列表形式。
	tree.forEach((item) => {
		// 创建一个对象，包含当前节点的id和name。
		let step = {
			id: item.id,
			name: item.name,
		}
		// 将当前节点信息添加到列表中。
		list.push(step)
		// 如果当前节点有子节点，则递归调用tree2List函数将子节点转换为列表形式，并追加到当前节点的列表后。
		if (item.children) {
			list = list.concat(tree2List(item.children))
		}
	})
	// 返回转换后的列表结构。
	return list
}

console.log(tree2List(data))

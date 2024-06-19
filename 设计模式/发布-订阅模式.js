// 1- on和once 注册并存储函数
// 2- emit 找到并执行相应的函数
// 3- off 找到并删除相应的函数
// 4- on和once on绑定的事件可以多次执行，除非off; once绑定的函数emit一次即删除，也可以未执行而被off;所以需要在数据结构中标明on、once
// 5- 事件是有序的，有执行先后顺序
class EventBus {
	constructor() {
		this.events = {}
	}

	/**
	 * 监听事件
	 * @param {string} type - 事件类型
	 * @param {Function} fn - 事件处理函数
	 * @param {boolean} isOnce - 是否只执行一次
	 */
	on(type, fn, isOnce = false) {
		// 获取或初始化事件对象
		const events = this.events
		// 如果该类型事件不存在，则初始化一个空数组
		// 初始化 key 的 fn数组
		if (!events[type]) events[type] = []
		// 将事件处理函数及其执行次数标志添加到事件数组中
		events[type].push({
			fn,
			isOnce,
		})
	}

	/**
	 * 为事件监听器注册一个只触发一次的事件处理函数。
	 *
	 * 此函数的目的是为了在特定事件被触发后，自动移除该事件的监听器，以防止相同的事件处理函数被多次调用。
	 * 它通过向内部的on方法传递一个额外的参数来实现这个功能，这个参数指示事件监听器在首次触发后应该被移除。
	 *
	 * @param {string} type - 要监听的事件类型。
	 * @param {Function} fn - 当事件发生时要执行的事件处理函数。
	 */
	once(type, fn) {
		this.on(type, fn, true)
	}

	/**
	 * 取消事件监听器。
	 *
	 * 此方法用于从事件列表中移除一个或所有事件监听器。如果提供了函数参数，则只移除特定的监听器；
	 * 如果没有提供函数参数，则移除该类型的所有监听器。
	 *
	 * @param {string} type - 要取消监听的事件类型。
	 * @param {Function} [fn] - 要取消的特定事件监听器函数。如果未提供，则移除所有监听器。
	 */
	off(type, fn) {
		// 如果没有提供函数参数，则清空指定事件类型的监听器列表
		if (!fn) {
			// 若果fn没有值，就解绑所有 type 的函数
			this.events[type] = []
		} else {
			// 如果提供了函数参数，则寻找并移除指定的监听器函数
			// 解绑单个fn
			const typeFnList = this.events[type]
			if (typeFnList) {
				// 通过过滤移除不等于提供的函数参数的监听器，更新事件列表
				this.events[type] = typeFnList.filter((typeFn) => typeFn.fn !== fn)
			}
		}
	}

	/**
	 * 发送事件并调用对应的事件处理函数。
	 * @param {string} type - 事件的类型。
	 * @param {...any} args - 传递给事件处理函数的参数。
	 */
	emit(type, ...args) {
		// 根据事件类型获取对应的事件处理函数列表。
		const typeFnList = this.events[type]

		// 如果没有找到对应的事件处理函数列表，则直接返回。
		if (!typeFnList) return

		// 遍历事件处理函数列表，调用每个函数，并根据是否为一次性事件进行过滤。
		this.events[type] = typeFnList.filter((typeFn) => {
			// 解构获取事件处理函数和是否为一次性事件的标志。
			const { fn, isOnce } = typeFn

			// 调用事件处理函数。
			fn(...args)
			// 如果不是一次性事件，则保留函数；否则移除。
			// once 执行一次就被过滤掉
			if (!isOnce) return true
			else return false
		})
	}
}

const bus = new EventBus()

function fn1(a, b) {
	console.log('fn1', a, b)
}
function fn2(a, b) {
	console.log('fn2', a, b)
}
function fn3(a, b) {
	console.log('fn3', a, b)
}

bus.on('key1', fn1)
bus.on('key1', fn2)
bus.once('key1', fn3) // 只会被触发一次
bus.on('key2', fn3)

bus.emit('key1', 10, 20) // 触发 fn1、fn2、fn3
bus.emit('key1', 11, 22) // 触发 fn1、fn2

bus.off('key1', fn1) // 解绑 fn1

bus.emit('key1', 100, 200) // 触发 fn2

// 防抖
function debounce(fn, delay) {
	let timer
	return (...args) => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn(...args)
		}, delay)
	}
}
// 节流
function throttle(fn, delay) {
	let timer
	return (...args) => {
		if (!timer) {
			timer = setTimeout(() => {
				fn(...args)
				timer = null
			}, delay)
		}
	}
}

function Green() {
	console.log('green')
}

function Yellow() {
	console.log('yellow')
}

function Red() {
	console.log('red')
}

function handleLightTurn(fn, delay) {
	return new Promise((resolve) => {
		setTimeout(() => {
			fn()
			resolve()
		}, delay)
	})
}

async function trafficLight() {
	while (true) {
		await handleLightTurn(Green, 1000)
		await handleLightTurn(Red, 2000)
		await handleLightTurn(Yellow, 3000)
	}
}

trafficLight()

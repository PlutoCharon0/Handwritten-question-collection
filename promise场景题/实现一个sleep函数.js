function sleep(delay) {
	return new Promise((resolve) => setTimeout(resolve, delay * 1000))
}

async function doSomething() {
  console.log("Start sleeping for 2 seconds...");
  await sleep(2); // 等待2秒
  console.log("Woke up after 2 seconds.");
}

doSomething();
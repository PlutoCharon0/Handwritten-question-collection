// https://blog.touchczy.top/#/Patterns/%E5%91%BD%E4%BB%A4%E6%A8%A1%E5%BC%8F
class Receiver {
	//我是接收者
	execute() {
		console.log('接收者执行请求')
	}
}
class Command {
	//我是命令对象
	constructor(receiver) {
		this.receiver = receiver
	}
	execute() {
		// 调用接收者对应接口执行
		console.log('命令对象处理发布者请求')
		this.receiver.execute()
	}
}
class Invoker {
	//我是发布者
	constructor(command) {
		this.command = command
	}
	invoke() {
		// 调用命令
		console.log('发布者发布请求')
		this.command.execute()
	}
}
const receiver = new Receiver()
const command = new Command(receiver)
const invoker = new Invoker(command)
invoker.invoke()

// https://blog.touchczy.top/#/Patterns/%E4%B8%AD%E4%BB%8B%E8%80%85%E6%A8%A1%E5%BC%8F
// ChatRoom 充当中介 链接用户之间的交流
class ChatRoom {
	logMessage(user, message) {
		const sender = user.getName()
		console.log(`${new Date().toLocaleString()} [${sender}]: ${message}`)
	}
}

class User {
	constructor(name, chatroom) {
		this.name = name
		this.chatroom = chatroom
	}
	getName() {
		return this.name
	}

	send(message) {
		this.chatroom.logMessage(this, message)
	}
}

const chatroom = new ChatRoom()

const user1 = new User('John', chatroom)
const user2 = new User('Mike', chatroom)

user1.send('Hello')
setTimeout(() => {
	user2.send('Hi')
}, 500)

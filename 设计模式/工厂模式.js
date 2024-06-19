//  https://blog.touchczy.top/#/Patterns/%E5%B7%A5%E5%8E%82%E6%96%B9%E6%B3%95%E6%A8%A1%E5%BC%8F
class Shape {
	// 产品基类
	say() {
		console.log(this.name)
	}
}

class Rectangle extends Shape {
	// 长方形产品
	constructor() {
		super()
		this.name = 'Rectangle'
	}
}

class Square extends Shape {
	// 正方形产品
	constructor() {
		super()
		this.name = 'Square'
	}
}

class Circle extends Shape {
	// 圆形产品
	constructor() {
		super()
		this.name = 'Circle'
	}
}

class Factory {
	// 工厂基类
	getProduct() {}
}

class RectangleFactory extends Factory {
	constructor() {
		super()
	}

	getProduct() {
		return new Rectangle()
	}
}

class SquareFactory extends Factory {
	constructor() {
		super()
	}

	getProduct() {
		return new Square()
	}
}

class CircleFactory extends Factory {
	constructor() {
		super()
	}

	getProduct() {
		return new Circle()
	}
}

const rectangle = new RectangleFactory().getProduct()
rectangle.say() // Rectangle

const square = new SquareFactory().getProduct()
square.say() // Square

const circle = new CircleFactory().getProduct()
circle.say() // Circle

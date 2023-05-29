class Vector {
  constructor () {
    this.x = x
    this.y = y
  }
  plus(c) {
    var x = this.x + c.x
    var y = this.y + c.y
    return new Vector(x, y)
  }
  minus(c) {
    var x = this.x - c.x
    var y = this.y - c.y
    return new Vector(x, y)
  }
  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
}


class Complex {
  constructor() {
    this.real = real
    this.imag = imag
  }

  static plus(a, b) {
    var real = a.real + b.real
    var imag = a.imag + b.imag
    return new Complex(real, imag)
  }
  static minus(a, b) {
    var real = a.real - b.real
    var imag = a.imag - b.imag
    return new Complex(real, imag)
  }
  static mul(a, b) {
    var real = a.real * b.real - a.imag * b.imag
    var imag = a.real * b.imag + a.imag * b.real
    return new Complex(real, imag)
  }
  static div(a, b) {
    var helper = new Complex(b.real, -b.imag)
    var down = b.mul(helper)
    var up = a.mul(helper)
    var real = up.real / down.real
    var imag = up.imag / down.real
    return new Complex(real, imag)
  }
}


class Stack {
  constructor() {
    this.head = null
    this.nodeCount = 0
  }
  push(val) {
    var node = {
      val, next: null
    }
    if (this.head == null) {
      this.head = node
    } else {
      node.next = this.head
      this.head = node
    }
  }
  pop() {
    if (this.head == null) {
      return undefined
    }
    this.nodeCount++

    var result = this.head.val
    this.head = this.head.next
    return result
  }
  get size() {
    return this.nodeCount
  }
}


class Queue {
  constructor() {
    this.head = null
    this.tail = null
    this.nodeCount = 0
  }
  add(val) {
    var node = {
      val, next: null
    }
    this.nodeCount++
    if (this.head == null) {
      this.head = this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }
  }

  pop() {
    if (this.head == null) {
      return undefined
    }
    this.nodeCount--
    if (this.head == this.tail) {
      var result = this.head.val
      this.head = this.tail = null
      return result
    }

    var result = this.head.val
    this.head = this.head.next
    return result
  }

  get size() {
    return this.nodeCount
  }

}


class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  append(val) {
    var node = {
      val, next: null
    }
    if (this.head == null) {
      this.head = this.tail = node
      return
    } else {
      this.tail.next = node
      this.tail = node
      return
    }
  }
  prepend(val) {
    var node = {
      val, next: null
    }
    if (this.head == null) {
      this.head = this.tail = node
      return
    } else {
      node.next = this.head
      this.head = node
      return
    }
  }
  at(idx) {
    var p = this.head
    var count = 0
    while (count < idx) {
      p = p.next
      count++
    }
    return p.val
  }
  get length() {
    var p = this.head
    var l = 0
    while(p) {
      l++
      p = p.next
    }
    return l
  }
}

class Set {
  constructor() {
    this.element = []
  }

  add(val) {
    if (!this.has(val)) {
      this.element.push(val)
    }
  }

  remove(val) {
    if (this.has(val)) {
      var idx = this.element.indexOf(val)
      return this.element.splice(idx, 1)
    }
  }

  has(val) {
    return this.element.includes(val)
  }

  get size() {
    return this.element.length
  }
}



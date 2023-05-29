class Vector {

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  plus(vector) {
    let x = this.x + vector.x
    let y = this.y + vector.y
    return new Vector(x, y)
  }

  minus(vector) {
    let x = this.x - vector.x
    let y = this.y - vector.y
    return new Vector(x, y)
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
}

class Complex {
  constructor(real, imag) {
    this.real = real
    this.imag = imag
  }

  static plus(a, b) {
    let real = a.real + b.real
    let imag = a.imag + b.imag
    return new Complex(real, imag)
  }

  plus(c) {
    let real = this.real + c.real
    let imag = this.imag + c.imag
    return new Complex(real, imag)
  }

  static minus(a, b) {
    let real = a.real - b.real
    let imag = a.imag - b.imag
    return new Complex(real, imag)
  }

  minus(c) {
    let real = this.real - c.real
    let imag = this.imag - c.imag
    return new Complex(real, imag)
  }

  static mul(a, b) {
    let real = a.real * b.real + a.imag * b.imag * (-1)
    let imag = a.real * b.imag + b.imag * b.real
    return new Complex(real, imag)
  }

  mul(c) {
    let real = this.real * c.real + this.imag * c.imag * (-1)
    let imag = this.real * c.imag + this.imag * c.real
    return new Complex(real, imag)
  }

  static div(a, b) {
    let helper = new Complex(b.real, -b.imag)
    let up = a.mul(helper)
    let down = b.mul(helper)
    let real = up.real / down.real
    let imag = up.imag / down.real
    return new Complex(real, imag)
  }

  div(c) {
    let helper = new Complex(c.real, -c.imag)
    let up = this.mul(helper)
    let down = c.mul(helper)
    let real = up.real / down.real
    let imag = up.imag / down.real
    return new Complex(real, imag)
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  append(val) {
    let node = {
      val: val,
      next: null
    }
    if (this.head == null) {
      this.head = this.tail = node
      return
    }
    else {
      this.tail.next = node
      this.tail = node
      return
    }
  }

  prepend(val) {
    let node = {
      val: val,
      next: null
    }
    if (this.head === null) {
      this.head = this.tail = node
      return
    }
    else {
      node.next = this.head
      this.head = node
      return
    }
  }

  at(idx) {
    if (this.head === this.tail === null) return null
    let p = this.head
    let count = 0
    while (count < idx) {
      count++
      p = p.next
    }
    return p.val
  }

  get size() {
    let l = 0
    let p = this.head
    while (p) {
      l++
      p = p.next
    }
    return l
  }
}


class Queue {

  constructor() {
    this.head = null
    this.tail = null
    this.count = 0
  }

  add(val) {
    let node = {
      val: val,
      next: null
    }
    if (!this.head) {
      this.head = this.tail = node
    }
    this.tail.next = node
    this.tail = node
    this.count++
  }

  pop() {
    if (!this.head) {
      return
    }
    this.count--
    if (this.head.next === this.tail) {
      let p = this.head.val
      this.head = this.tail = null
      return p
    }

    let p = this.head.val
    this.head = this.head.next
    return p
  }

  get size() {
    return this.count
  }
}

class Stack {

  constructor() {
    this.head = null
    this.count = 0
  }

  push(val) {
    let node = {
      val: val,
      next: null
    }
    if (!this.head) {
      this.head = node
    } else {
      node.next = this.head
      this.head = node
    }
    this.count++
  }

  pop() {
    if (!this.head) return undefined

    this.count--
    let p = this.head.val
    this.head = this.head.next
    return p
  }

  get size() {
    return this.count
  }
}

class MySet {

  constructor() {
    this.MyMap = new MyMap()
  }

  add(key, val) {
    return this.MyMap.set(key, val)
  }

  get(key) {
    return this.MyMap.get(key)
  }

  has(key) {
    return this.MyMap.has(key)
  }

  delete(val) {
    return this.MyMap.delete(val)
  }

  get size() {
    return this.MyMap.size
  }
}

class MyMap {
  constructor() {
    this.keys = []
    this.vals = []
  }

  set(key, val) {
    if (!this.has(key)) {
      this.keys.push(key)
      this.vals.push(val)
    } else {
      this.idx = this.keys.indexOf(key)
      this.vals[this.idx] = val
    }
  }

  get(key) {
    this.idx = this.keys.indexOf(key)
    return this.vals[this.idx]
  }

  has(key) {
    if (this.keys.includes(key)) {
      return true
    }
    return false
  }

  delete(key) {
    if (this.has(key)) {
      this.idx = this.keys.indexOf(key)
      this.keys.splice(this.idx, 1)
      this.vals.splice(this.idx, 1)
      return true
    } else {
      return undefined
    }
  }

  get size() {
    return this.keys.length
  }
}

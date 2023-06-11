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

class PriorityQueue {
  constructor() {
    this._elements = []
  }

  _swap(i, j) {
    var t = this._elements[i]
    this._elements[i] = this._elements[j]
    this._elements[j] = t
  }

  _heapUp(pos) { //递归写法
    if (pos == 0) {
      return
    }
    var parentPos = (pos - 1) >> 1
    if (this._elements[pos] > this._elements[parentPos]) {
      this._swap(pos, parentPos)
      this._heapUp(parentPos)
    }
  }

  _heapDown(pos) { //递归写法
    var leftPos = pos * 2 + 1
    var rightPos = pos * 2 + 2
    var maxIdx = pos
    if (leftPos < this._elements.length && this._elements[leftPos] > this._elements[maxIdx]) {
      maxIdx = leftPos
    }
    if (rightPos < this._elements.length && this._elements[rightPos] > this._elements[maxIdx]) {
      maxIdx = rightPos
    }

    if (maxIdx != pos) {
      this._swap(pos, maxIdx)
      this._heapDown(maxIdx)
    }
  }

  push(val) {
    this._elements.push(val)
    this._heapUp(this._elements.length - 1)
    return this
  }

  pop() {
    if (this._elements.length == 0) {
      return undefined
    }

    if (this._elements.length == 1) {
      return this._elements.pop()
    }

    this._swap(0, this._elements.length - 1)
    var result = this._elements.pop()
    this._heapDown(0)
    return result
  }

  peek() {
    return this._elements[0]
  }

  get size() {
    return this._elements.length
  }
}




RegExp.prototype.mytest = function(str) {
  if (this.exec(str)) {
    return true
  } else {
    return false
  }
}
String.prototype.mysearch = function(target) {
  if (typeof target === 'string') {
    return this.indexOf(target)
  } else {
    var match = target.exec(this)
    if (match) {
      return match.index
    } else {
      return -1
    }
  }
}

String.prototype.mymatch = function(re) {
  if (typeof re === 'string') {
    var re = new RegExp(re)
  }
  if (re.global) {
    re.lastIndex = 0
    var match
    var res = []
    while (match = re.exec(this)) {
      res.push(match[0])
    }
    return res
  } else {
    return re.exec(this)
  }
}

String.prototype.myreplace = function(re, replacer) {
  //只考虑正则的情况
  re.lastIndex = 0
  var res = ''
  var match
  var lastLastIndex = 0
  while (match = re.exec(this)) {
    res += this.slice(lastLastIndex, match.index)
    if (typeof replacer === 'function') {     //1.replacer为函数
      res += replacer(...match, match.index, match.input)
    } else { //2.replacer为$1$&类似字符串
      //先将replacer里面的$&或&1换成match[]
      var replacement = replacer.myreplace(/\$([1-9\&])/g, (_, idx) =>{
        if (idx == '&') {
          return match[0]
        } else {
          return match[idx]
        }
      })
      res += replacement
    }
    lastLastIndex = re.lastIndex
    if (!re.global) {
      lastLastIndex = match.index + match[0].length
      break
    }
  }
  res += this.slice(lastLastIndex)
  return res
}

String.prototype.myreplaceAll = function(re, replacer) {
  if (!re.global) {
    throw new TypeError('String.prototype.myreplaceAll called with a non-global RegExp argument')
  }
  return this.myreplace(re, replacer)
}

String.prototype.mysplit = function(re) {
  var res = []
  if (typeof re === 'string') {  //re为字符串时的循环（也可直接将re转化为正则）
    var l = re.length
    var idx = this.indexOf(re)
    var startIdx = 0
    while (idx != -1) {
      res.push(this.slice(startIdx, idx))
      startIdx = idx + l
      idx = this.indexOf(re, startIdx)
    }
    res.push(this.slice(startIdx))
    return res
  } else {
    if (!re.global) {
      re = new RegExp(re.source, 'g' + re.flags)
    }
    re.lastIndex = 0
    var match
    var startIdx = 0
    while (match = re.exec(this)) {
      res.push(this.slice(startIdx, match.index))
      //如果正则中有括号，split只会将非括号内容视为分隔符,即非括号匹配的内容需要删除，保留括号内字符
      res.push(...match.slice(1))
      startIdx = re.lastIndex
    }
    res.push(this.slice(startIdx))
    return res
  }
}




// RegExp.prototype.mytest
// String.prototype.mysearch
// String.prototype.mymatch
// String.prototype.myreplace
// String.prototype.myreplaceAll
// String.prototype.mysplit
// 利用RegExp.prototype.exec实现以上所有函数
// 调用方式跟自带的一样


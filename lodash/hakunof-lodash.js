var hakunof = {
  compact: function(array) {
    return array.filter(it => it)
  },

  chunk: function(array, size) {
    var res = []
    for (var i = 0; i < array.length; i += size) {
      res.push(array.slice(i, i + size))
    }
    return res
  },

  fill: function(array, value, start = 0, end = array.length) {
    for (var i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },

  drop: function(array, n = 1) {
    return array.slice(n)
  },

  funjudge: function(pre) {
    var flag = false

    if (typeof pre == 'function') {
      return pre
    }

    if (typeof pre == 'object') {
      if (Array.isArray(pre)) {
        var key = pre[0]
        var val = pre[1]
        return (obj) => {
          for (var it in obj) {
            if (it == key && obj[it] ==val) {
              flag = true
              break
            }
          }
          return flag
        }
      } else {
        return (obj) => {
          for (var [key, val] of Object.entries(pre)) {
            if (obj[key] != val) {
              flag = false
              break
            } else {
              flag = true
            }
          }
          return flag
        }
      }
    }

    if (typeof pre == 'string') {
      return (obj) => {
        return obj[pre]
      }
    }
  },

  findIndex: function(array, f, fromIndex = 0) {
    for (var i = fromIndex; i < array.length; i++) {
      if (this.funjudge(f)(array[i])) {
        return i
      }
    }
    return -1
  },

  findLastIndex: function(array, f, fromIndex = array.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
      if (this.funjudge(f)(array[i])) {
        return i
      }
    }
    return -1
  },

  flatten: function(array) {
    for (var i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        var t = array[i].length - 1
        array.splice(i, 1, ...array[i])
        i += t
      }
    }
    return array
  },

  flattenDeep: function(array) {
    for (var i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        array.splice(i, 1, ...array[i])
      }
    }
    return array
  },

  flattenDepth: function(array, depth = 1) {
    var count = 1
    while (count <= depth) {
      for (var i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
          var t = array[i].length - 1
          array.splice(i, 1, ...array[i])
          i += t
        }
      }
      count++
    }
    return array
  },

  fromPairs: function(array) {
    return array.reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})
  },

  toPairs: function(obj) {
    var res = []
    for (key in obj) {
      res.push([key,obj[key]])
    }
    return res
  },

  head: function(array) {
    return array[0]
  },

  indexOf: function(array, val, fromIndex = 0) {
      return array.indexOf(val, fromIndex)
  },

  lastIndexOf: function(array, val, fromIndex = array.length - 1) {
    return array.lastIndexOf(val, fromIndex)
  },

  initial: function(array) {
    return array.slice(0, array.length - 1)
  },

  join: function(array, sep = ',') {
    var str = ''
    for(var i = 0; i < array.length - 1; i++) {
      str += array[i] + '' + sep
    }
    str += array[array.length - 1]
    return str
  },

  last: function(array) {
    return array[array.length - 1]
  },

  pull: function(array, ...val) {
    var set = new Set(val)
    for (var i = 0; i < array.length; i++) {
      if (set.has(array[i])) {
        array.splice(i, 1)
        i--
      }
    }
    return array
  },

  reverse: function(array) {
    function swap(ary, i, j) {
      var t = ary[i]
      ary[i] = ary[j]
      ary[j] = t
    }
    var s = 0
    var e = array.length - 1
    while(s < e) {
      swap(array, s++, e--)
    }
    return array
  },

  every: function(coll, predicate) {
    var flag = true
    for (var val of coll) {
      if (!this.funjudge(predicate)(val)) {
        flag = false
        break
      }
    }
    return flag
  },

  some: function(coll, predicate) {
    for (var val of coll) {
      if (this.funjudge(predicate)(val)) {
        return true
      }
    }
    return false
  },

  countBy: function(coll, predicate) {
    var map = {}
    predicate = this.funjudge(predicate)
    for (var item of coll) {
      if (predicate(item) in map) {
        map[predicate(item)]++
      } else {
        map[predicate(item)] = 1
      }
    }
    return map
  },

  groupBy: function(coll, predicate) {
    var map = {}
    predicate = this.funjudge(predicate)
    for (var item of coll) {
      if (predicate(item) in map) {
        map[predicate(item)].push(item)
      } else {
        map[predicate(item)] = [item]
      }
    }
    return map
  },

  keyBy: function(coll, predicate) {
    var map = {}
    predicate = this.funjudge(predicate)
    for (var item of coll) {
        map[predicate(item)] = item
    }
    return map
  },

  forEach: function(coll, predicate) {
    predicate = this.funjudge(predicate)
    for (var key in coll) {
      predicate(coll[key], key, coll)
    }
    return coll
  },

  map: function(coll, predicate) {
    var res = []
    predicate = this.funjudge(predicate)
    for (var key in coll) {
      res.push(predicate(coll[key]))
    }
    return res
  },

  filter: function(coll, predicate) {
    var res = []
    predicate = this.funjudge(predicate)
    for (var obj in coll) {
      if (predicate(coll[obj])) {
        res.push((coll[obj]))
      }
    }
    return res
  },

  reduce: function(coll, predicate, res = 0) {
    predicate = this.funjudge(predicate)
    for (var key in coll) {
      res = predicate(res, coll[key], key)
    }
    return res
  },

  reduceRight: function(coll, predicate, res = 0) {
    predicate = this.funjudge(predicate)
    if (!Array.isArray(coll)) {
      var keys = Object.keys(coll)
      for (i = keys.length - 1; i >= 0; i--) {
        res = predicate(res, coll[keys[i]], keys[i])
      }
      return res
    } else {
      for (i = coll.length - 1; i >= 0; i--) {
        res = predicate(res, coll[i], i)
      }
      return res
    }
  },

  size: function(coll) {
    return this.reduce(coll, it => it + 1)
  },

  insertIntoSortedArray: function(arr, num, pre) {
    var index = 0
    while (index < arr.length && pre(num) >= pre(arr[index])) {
      index++
    }
    arr.splice(index, 0, num)
    return arr
  },

  sortBy: function(coll, predicate) {
    var res = []
    predicate = this.funjudge(predicate[predicate.length - 1])
    for (var val of coll) {
      this.insertIntoSortedArray(res, val, predicate)
    }
    return res
  },

  sample: function(coll) {
    var idx = (Math.random() * coll.length) | 0
    return coll[idx]
  },

  isUndefined: function(val) {
    return val === undefined
  },

  isNull: function(val) {
    return val === null
  },

  isNil: function(val) {
    return val === null || val === undefined
  },

  max: function(array) {
    if (!array || array.length == 0) {
      return undefined
    } else {
      return Math.max(...array)
    }
  },

  min: function(array) {
    if (!array || array.length == 0) {
      return undefined
    } else {
      return Math.min(...array)
    }
  },

  maxBy: function(array, pre) {
    pre = this.funjudge(pre)
    if (!array || array.length == 0) {
      return undefined
    } else {
      var res = []
      for (var val of array) {
        this.insertIntoSortedArray(res, val, pre)
      }
      return res.at(-1)
    }
  },

  minBy: function(array, pre) {
    pre = this.funjudge(pre)
    if (!array || array.length == 0) {
      return undefined
    } else {
      var res = []
      for (var val of array) {
        this.insertIntoSortedArray(res, val, pre)
      }
      return res[0]
    }
  },

  round: function(num, prec = 0) {
    if (prec >= 0) {
      return num.toFixed(prec) * 1
    } else {
      prec = 10 ** (-prec)
      return Math.round(num / prec) * prec
    }
  },

  sumBy: function(array, predicate) {
    if (!array || array.length == 0) {
      return undefined
    } else {
      predicate = this.funjudge(predicate)
      var sum = 0
      for (var val of array) {
        sum += predicate(val)
      }
      return sum
    }
  },

  flatMap: function(coll, predicate) {
    predicate = this.funjudge(predicate)
    var res = []
    for (var item of coll) {
      res.push(...predicate(item))
    }
    return res
  },

  flatMapDepth: function(coll, predicate, depth = 1) {
    predicate = this.funjudge(predicate)
    var res = []
    for (var item of coll) {
      res.push(predicate(item))
    }
    this.flattenDepth(res, depth )
    return res
  },

  get: function(obj, path, deVal) {
    var res = obj
    if (Array.isArray(path)) {
      for (var item of path) {
        if (!isNaN(item)) {
          item = +item
        }
        res = res[item]
      }
    } else {
      var re = /(\w+)(\[\d+\])?/g
      var match
      while (match = re.exec(path)) {
        res = res[match[1]]
        if (!res) {
          break
        }
        if (match[2]) {
          match[2] = match[2].replace(/\[|\]/g, "")
          res = res[match[2]]
        }
      }
    }
    return res !== undefined ? res : deVal
  },

  has: function(obj, path) {
    if (JSON.stringify(obj) === "{}") {
      return false
    }
    var res = obj
    if (Array.isArray(path)) {
      for (var item of path) {
        if (!isNaN(item)) {
          item = +item
        }
        res = res[item]
      }
    } else {
      var re = /(\w+)(\[\d+\])?/g
      var match
      while (match = re.exec(path)) {
        res = res[match[1]]
        if (!res) {
          break
        }
        if (match[2]) {
          match[2] = match[2].replace(/\[|\]/g, "")
          res = res[match[2]]
        }
      }
    }
    return res === undefined ? false : true
  },

  mapKeys: function(obj, predicate) {
    var newObj = {}
    for (var key in obj) {
      var newKey = predicate(obj[key], key, obj)
      newObj[newKey] = obj[key]
    }
    return newObj
  },

  mapValues: function(obj, predicate) {
    var newObj = {}
    predicate = this.funjudge(predicate)
    for (var key in obj) {
      newObj[key] = predicate(obj[key])
    }
    return newObj
  },

  range: function(start = 0, end, step) {
    if (arguments.length == 1) {
      start = 0
      end = arguments[0]
    }
    var res = []
    if (step == undefined) {
      step = end - start < 0 ? -1 : 1
    }
    if (step == 0) {
      var c = Math.abs(end - start)
    } else {
      var c = Math.abs((end - start) / step)
    }
    var item = start - step
    for (var i = 0; i < c; i++) {
      item += step
      res.push(item)
    }
    return res
  },

  concat: function(array, ...vals) {
    return array.concat(...vals)
  },

  isEqual: function(m, n) {
    if (m === n) {
      return true
    }

    if (m && n && typeof m === 'object' && typeof n === 'object') {
      if (Array.isArray(m) == Array.isArray(n)) {
        if (Array.isArray(m)) { //两者都为数组 先比较长度
          if (m.length != n.length) {
            return false
          }
        } else { //两者都为对象
          var size = 0
          for (var key in m) {
            size++
          }
          for (var key in n) {
            size--
          }
          if (size != 0) {
            return false
          }
        }
        for (var k in m) {
          if (!this.isEqual(m[k], n[k])) {
            return false
          }
        }
        return true
      } else {
        return false
      }
    }

    return m === n
  },

  // str = '{"a":1,"bccc":true,"c":[1,[2,2],{"xxxx":3,"y":[1,2,3]}],"d":{"a":{"b":1}}}'

  parseJSON: function(str) {
    var i = 0
    return parseValue()

    function parseValue() {
      var char = str[i]
      if (char == '{') {
        return parseObject()
      }

      if (char == '[') {
        return parseArray()
      }

      if (char == '"') {
        return parseString()
      }

      if (char == 't') {
        var token = str.slice(i, i + 4)
        if (token == 'true') {
          i += 4
          return true
        } else {
          throw new SyntaxError(`在${i}位置遇到了错误的token`)
        }
      }

      if (char == 'f') {
        var token = str.slice(i, i + 5)
        if (token == 'false') {
          i += 5
          return false
        } else {
          throw new SyntaxError(`在${i}位置遇到了错误的token`)
        }
      }

      if (char == 'n') {
        var token = str.slice(i, i + 4)
        if (token == 'null') {
          i += 4
          return null
        } else {
          throw new SyntaxError(`在${i}位置遇到了错误的token`)
        }
      }

      return parseNumber()
    }

    function parseNumber() {
      var start = i
      while (str[i] >= '0' && str[i] <= '9') {
        i++
      }
      return Number(str.slice(start, i))
    }

    function parseString() {
      i++
      var start = i
      while (str[i] != '"' && i < str.length) {
        i++
      }
      var end = i
      i++ //跳过结束的"
      return str.slice(start, end)
    }

    function parseArray() {
      i++ //跳过[
      var res = []
      if (str[i] == ']') {
        i++
        return res
      }
      while (i < str.length) {
        var value = parseValue()
        res.push(value)
        if (str[i] == ',') {
          i++
          continue
        }
        if (str[i] == ']') {
          i++
          break
        }
      }
      return res
    }

    function parseObject() {
      i++ //跳过{
      var res = {}
      skipSpace()
      if (str[i] == '}') {
        i++
        return res
      }
      while (i < str.length) {
        var name = parseValue()
        skipSpace()
        i++ //skip :
        skipSpace()
        var value = parseValue()
        res[name] = value
        if (str[i] == ',') {
          i++
          continue
        }
        if (str[i] == '}') {
          i++
          break
        }
      }
      return res
    }

    function skipSpace() {
      while(str[i] == ' ' || str[i] == '\n' || str[i] == '\t' || str[i] == 'r') {
        i++
      }
      return
    }

  },

  repeat: function(str = '', n = 1) {
    return '' + str.repeat(n)
  },

  padStart: function(str = '', l = 0, chars = ' ') {
    return chars.repeat(Math.ceil((l - str.length) / chars.length)).slice(0, l - str.length) + str
  },

  padEnd: function(str = '', l = 0, chars = ' ') {
    return str + chars.repeat(Math.ceil((l - str.length) / chars.length)).slice(0, l - str.length)
  },

  pad: function(str = '', l = 0, chars = ' ') {
    var padChars = chars.repeat((l - str.length))
    var left = (l - str.length) / 2 | 0
    var right = l - str.length - left
    return padChars.slice(0, left) + str + padChars.slice(left, left + right)
  },

  keys: function(obj) {
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      return Object.keys(obj)
    } else {
      var res = []
      for (var i = 0; i < obj.length; i++) {
        res.push(i + '')
      }
      return res
    }
  },

  values: function(obj) {
    var res = []
    if (typeof obj === 'object' && !Array.isArray(obj)) {
      for (var key in obj) {
        res.push(obj[key])
      }
    } else {
      for (var val of obj) {
        res.push(val)
      }
    }
    return res
  },

  random: function(lower = 0, upper = 1, float) {
    if (typeof arguments[0] === 'number' && !Number.isInteger(arguments[0])) {
      float = true
    }

    if (arguments.length == 1 && typeof arguments[0] === 'number') {
      lower = 0
      upper = arguments[0]
      return lower + Math.random() * (upper - lower) | 0
    } else if (arguments.length == 1 && typeof arguments[0] === 'boolean') {
      return Math.random
    } else if (arguments.length == 2 && typeof arguments[1] === 'boolean') {
      lower = 0
      upper = arguments[0]
      return lower + Math.random() * (upper - lower)
    } else if (float) {
      return lower + Math.random() * (upper - lower)
    } else {
      return lower + Math.random() * (upper - lower) | 0
    }
  },

  ceil: function(num, prec = 0) {
    var a = 10 ** Math.abs(prec)
    if (prec >= 0) {
      return Math.ceil(num * a) / a
    } else {
      return Math.ceil(num / a) * a
    }
  },

  floor: function(num, prec = 0) {
    var a = 10 ** Math.abs(prec)
    if (prec >= 0) {
      return Math.floor(num * a) / a
    } else {
      return Math.floor(num / a) * a
    }
  },

  cloneDeep: function(val) {
    if (val === null || typeof val !== 'object') {
      return val
    } else if (val instanceof RegExp) {  //判断是否为正则表达式 Object.prototype.toString.call(regex) === '[object RegExp]'
      var cloneReg = new RegExp(val.source, val.flags)
      return cloneReg
    } else {
      var cloneWrap =  Array.isArray(val) ? [] : {}
      for (var key in val) {
        if (val.hasOwnProperty(key)) {
          cloneWrap[key] = this.cloneDeep(val[key])
        }
      }
      return cloneWrap
    }
  },

  trim: function(str = '', chars = ' ') {
    var charsSet = new Set(chars.split(''))
    str = str.split('')
    for (var i = 0; i < str.length; i++) {
      if (charsSet.has(str[i])) {
        str.splice(i, 1)
        i--
      }
    }
    return str.join('')
  },

  trimStart: function(str = '', chars = ' ') {
    var charsSet = new Set(chars.split(''))
    str = str.split('')
    for (var i = 0; i < str.length; i++) {
      if (charsSet.has(str[i])) {
        str.splice(i, 1)
        i--
      } else {
        break
      }
    }
    return str.join('')
  },

  trimEnd: function(str = '', chars = ' ') {
    var charsSet = new Set(chars.split(''))
    str = str.split('')
    for (var i = str.length - 1; i >= 0; i--) {
      if (charsSet.has(str[i])) {
        str.splice(i, 1)
      } else {
        break
      }
    }
    return str.join('')
  },

  assign: function(...obj) {
    return Object.assign(...obj)
  },

  merge: function(obj, other) {
    for (var key in other) {
      if (key in obj) {
        this.merge(other[key], obj[key])
      }
    }
    return Object.assign(obj, other)
  },




}

// : function() {

// },

// 可以按以下顺序实现
// compact,chunk,fill,drop,findIndex,findLastIndex,flatten,flattenDeep,flattenDepth
// fromPairs,toPairs,head,indexOf,lastIndexOf,initial,join,last,pull,reverse,every,some
// countBy,groupBy,keyBy,forEach,map,filter,reduce,reduceRight,size,sortBy,sample,
// isUndefined,isNull,isNil,max,min,maxBy,minBy,round,sumBy
// flagMap,flatMapDepth,get,has,mapKeys,mapValues
// range,stringifyJSON,concat,isEqual,repeat,padStart,padEnd,pad,keys,values,random,
// round,ceil,floor,cloneDeep
// trim,trimStart,trimEnd,assign,merge,





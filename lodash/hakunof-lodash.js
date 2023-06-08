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
      while (res && match = re.exec(path)) {
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
        if (match[2]) {
          match[2] = match[2].replace(/\[|\]/g, "")
          res = res[match[2]]
        }
      }
    }
    if (res) {
      return true
    } else {
      return false
    }
  },

  // mapKeys: function() {

  // },



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





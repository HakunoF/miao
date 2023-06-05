var hakunof = {
  compact: function(array) {
    return array.filter(it => it)
  },

  chunk: function(ary, size) {
    var res = []
    for (var i = 0; i < ary.length; i += size) {
      res.push(ary.slice(i, i + size))
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

  findIndex: function(array, f, fromIndex = 0) {
    for (var i = fromIndex; i < array.length; i++) {
      if (typeof f == 'function') {
          if (f(array[i])) {
            return i
        }
      }

      if (typeof f == 'object') {
        if (Array.isArray(f)) {
          if (f[0] in array[i] && f[1] == array[i][f[0]]) {
            return i
          }
        } else {
          var res = true
          for (var key in f) {
            if (f[key] != array[i][key]) {
              res = false
              break
            }
          }
          if (res) {
            return i
          }
        }
      }

      if (typeof f == 'string') {
        if (f in array[i] && array[i][f] == true) {
          return i
        }
      }
    }
    return -1
  },

  findLastIndex: function(array, f, fromIndex = array.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
      if (typeof f == 'function') {
          if (f(array[i])) {
            return i
        }
      }

      if (typeof f == 'object') {
        if (Array.isArray(f)) {
          if (f[0] in array[i] && f[1] == array[i][f[0]]) {
            return i
          }
        } else {
          var res = true
          for (var key in f) {
            if (f[key] != array[i][key]) {
              res = false
              break
            }
          }
          if (res) {
            return i
          }
        }
      }

      if (typeof f == 'string') {
        if (f in array[i] && array[i][f] == true) {
          return i
        }
      }
    }
    return -1
  },

  flatten: function(array) {
    for (var i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        array.splice(i, 1, ...array[i])
        i++
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
          array.splice(i, 1, ...array[i])
          i++
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
    return slice(0, array.length - 1)
  },

  join: function(array, sep = ',') {
    var str = ''
    for(var i = 0; i < array.length - 1; i++) {
      str += array[i] + sep
    }
    str += array[array.length - 1]
    return str
  },

  last: function(array) {
    return array[array.length - 1]
  },

  : function() {

  },

  : function() {

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



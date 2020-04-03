const JSON5 = require('json5')

const mapToJSON5 = (map) => {

    return JSON5.stringify([...map])

}

const JSON5ToMap = (JSON5) => {

    return new Map(JSON5.parse(JSON5))

}

const strMapToObj = (strMap) => {

    let obj = Object.create(null)

    for (let [k,v] of strMap) {

      obj[k] = v

    }

    return obj

}

const objToStrMap = (obj) => {

    let strMap = new Map()

    for (let k of Object.keys(obj)) {

      strMap.set(k, obj[k])

    }

    return strMap
    
  }

const strMapToJSON5 = (strMap) => {

    return JSON5.stringify(strMapToObj(strMap))

}

const JSON5ToStrMap = (JSON5Str) => {

    return objToStrMap(JSON5.parse(JSON5Str))

}

exports.mapToJSON5 = mapToJSON5

exports.JSON5ToMap = JSON5ToMap

exports.strMapToObj = strMapToObj

exports.objToStrMap = objToStrMap

exports.strMapToJSON5 = strMapToJSON5

exports.JSON5ToStrMap = JSON5ToStrMap
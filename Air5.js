const fs = require('fs')

const chalk = require('chalk')

const JSON5 = require('json5')

let data = new Map()

class AIR {

    constructor(options = {
        name: '',
        directory: './air5',
        autoSave: true
    }) {

        this.name = options.name
        
        this.directory = options.directory

        this.autoSave = options.autoSave

        if (this.directory === undefined) this.directory = './air5'

        if (typeof options.name === 'undefined') this.autoSave = false

        if (this.autoSave === undefined) this.autoSave = true

        this.database = `${this.directory}/${this.name}.air5`

        if (typeof options.name !== 'undefined') {

            if (fs.existsSync(this.directory) === false) {

                fs.mkdirSync(this.directory)

            }

            if (fs.existsSync(this.database) === false) {

                fs.writeFileSync(this.database, mapToJSON5(data))

            }

            data = JSON5ToMap(fs.readFileSync(this.database).toString())

        }

    }

/**
 * Converts Air5 Database To JSON
 * 
 * Example:
 * 
 * ```js
 * air5.toJSON()
 * //==> Air5 Database In JSON
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */

    toJSON() {

        return JSON5.parse(strMapToJSON5(data))

    }

/**
 * Returns Air5 Database Size
 * 
 * Example:
 * 
 * ```js
 * air5.size()
 * //==> 5
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */
    size() {

        return data.size

    }

/**
 * Returns Air5 Database In JSON Format
 * 
 * Example:
 * 
 * ```js
 * air5.data()
 * //==> { key: 'value' }
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */
    data() {

        return this.toJSON(data)

    }

/**
 * Returns All Keys And Their Value As A ForEach Loop
 * 
 * Example:
 * 
 * ```js
 * air5.forEach(data => {
 * 
 *  console.log(data)
 *  //==> { key: 'value' }
 * 
 * })
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */

    forEach(callback) {

        data.forEach(i => callback(i))

        return data.forEach

    }

/**
 * Returns All The Values In The Database As An Array
 * 
 * ```js
 * air.values()
 * //==> ['value1', 'value2', 'value3']
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */

values() {

    const values = []

    for (const [key, val] of data) {

        values.push(val)

    }

    return values

}

/**
 * Returns All The Keys In The Database As An Array
 * 
 * ```js
 * air.keys()
 * //==> ['key1', 'key2', 'key3']
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */

    keys() {

        const keys = []

        for (const [key, value] of data) {

            keys.push(key)

        }

        return keys

    }

/**
 * Returns Random Key As JSON
 * 
 * Example:
 * 
 * ```js
 * air5.random()
 * //==> { randomKey: 'randomValue' }
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */

    random() {

        const array = this.toArray()

        const arr = array[Math.floor(Math.random() * array.length)]

        const res = {}

        res[arr[0]] = arr[1]

        return res

    }

/**
 * Find Via Key, Value, Or Subvalue
 * 
 * Example:
 * 
 * ```js
 * air5.find(value => value === '4832')
 * //==> { key: value }
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */
    
    find(callback, args) {

        if (typeof args !== 'undefined')

        callback = callback.bind(args)

        for (const [key, val] of data) {

            if (callback(val, key, data)) {

                const res = {}

                res[key] = val

                return res

            }

        }

        return undefined

    }

/**
 * Filter Via Key, Value, Or Subvalue
 * 
 * Example:
 * 
 * ```js
 * air5.filter(value => value === '4832')
 * //==> { key: value }
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */
    filter(callback, args) {

        if (typeof args !== 'undefined') {

            callback = callback.bind(args)

        }

        const res = {}

        for (const [key, val] of data) {

            if (callback(val, key, data)) {

                res[key] = val

            }

        }

        return res

    }

    entries() {

        return data.entries()

    }

 /**
 * Set A Key And Value
 * 
 * Example:
 * 
 * ```js
 * air5.set('key', 'value')
 * //==> { key: value }
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */

    set(key, value, path) {

        if (!key) return console.log(chalk.blue('[Air5] '), chalk.gray('No Key Provided... A Key Is Needed'))

        if (!value) return console.log(chalk.blue('[Air5] '), chalk.gray('No Value Provided... A Value Is Needed'))

        if (typeof key !== 'string' || typeof key !== 'number') return console.log(chalk.blue('[Air5] '), chalk.gray('Keys Need To Be Either A String Or Number'))

        if (!path) {

            data.set(key, value)

        }
        
        if (path) {

            data.get(key)[path] = value

        }

        if (this.autoSave === true) this.save()

    }

/**
 * Get A Key And/Or Value
 * 
 * Example:
 * 
 * ```js
 * air5.get('key', 'value')
 * //==> { key: value }
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */

    get(key, path) {

        if (!key) return console.log(chalk.blue('[Air5] '), chalk.gray('No Key Provided... A Key Is Needed'))

        if (typeof key !== 'string' || typeof key !== 'number') return console.log(chalk.blue('[Air5] '), chalk.gray('Keys Need To Be Either A String Or Number'))

        if (key && !path) {

            return data.get(key)

        }

        if (key && path) {

            return data.get(key)[path]

        }
    }

 /**
 * Check If Database Has Key And/Or Value
 * 
 * Example:
 * 
 * ```js
 * air5.has('key', 'value')
 * //==> true/false
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */
    has(key, value) {

        if (!key) return console.log(chalk.blue('[Air5] '), chalk.gray('No Key Provided... A Key Is Needed'))

        if (typeof key !== 'string' || typeof key !== 'number') return console.log(chalk.blue('[Air5] '), chalk.gray('Keys Need To Be Either A String Or Number'))

        if (key && !value) {

            return data.has(key)

        }

        if (key && value) {

            if (typeof data.get(key)[value] !== 'undefined') {

                return true

            } else if (typeof data.get(key)[value] === 'undefined') {

                return false
                
            } else {

                return false
                
            }

        }

    }

 /**
 * Save The Database
 * 
 * Example:
 * 
 * ```js
 * air5.save()
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */

    save(file) {

        if (file !== undefined) {

            fs.writeFileSync(file, mapToJSON5(data))

        } else {

            fs.writeFileSync(this.database, mapToJSON5(data))

        }

    }
    
 /**
 * Clear The Database
 * 
 * Example:
 * 
 * ```js
 * air5.clear()
 * //==> {}
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */
    clear() {

        data.clear()

    }

 /**
 * Add A Key And Its Value If It Does Not Exist
 * 
 * Example:
 * 
 * ```js
 * air5.ensure('key', 'value')
 * //==> { key: value }
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */
    ensure(key, value) {

        if (!key) return console.log(chalk.blue('[Air5] '), chalk.gray('No Key Provided... A Key Is Needed'))

        if (!value) return console.log(chalk.blue('[Air5] '), chalk.gray('No Value Provided... A Value Is Needed'))

        if (typeof key !== 'string' || typeof key !== 'number') return console.log(chalk.blue('[Air5] '), chalk.gray('Keys Need To Be Either A String Or Number'))

        if (!this.has(key)) {

            this.set(key, value)
            
        }
    }

/**
 * Delete A Key And/Or Value
 * 
 * Example:
 * 
 * ```js
 * air5.delete('key', 'value')
 * //==> { key: value }
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */
    delete(key, value) {

        if (!key) return console.log(chalk.blue('[Air5] '), chalk.gray('No Key Provided... A Key Is Needed'))

        if (typeof key !== 'string' || typeof key !== 'number') return console.log(chalk.blue('[Air5] '), chalk.gray('Keys Need To Be Either A String Or Number'))

        if (!value) {

            data.delete(key)

        }

        if (value) {

            delete data.get(key)[value]

        }

        if (this.autoSave === true) this.save()

    }

 /**
 * Convert Database To A Map
 * 
 * Example:
 * 
 * ```js
 * const map = air5.toMap()
 * //==> [Map Constructor]
 * 
 * map.set('key', 'value')
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */
    toMap() {

        return data

    }

/**
 * Converts Database To An Array
 * 
 * Example:
 * 
 * ```js
 * air5.toArray()
 * //==> [Array]
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */
    toArray() {

        const array = []

        for (const [key, value] of data) {

            array.push([key, value])

        }

        return array

    }

 /**
 * Clone The Database
 * 
 * Example:
 * 
 * ```js
 * air5.clone('cloned-database')
 * ```
 * @documentation http://slicewire.gitbook.io/air5
 * @api Public
 * @author SliceWire
 * @license MIT
 */
    clone(name) {

        if (typeof name !== 'string') return console.log(chalk.blue('[Air5] '), chalk.gray('Name Needs To Be A String'))

        return fs.writeFileSync(`${this.directory}/${name}.air5`, mapToJSON5(data))

    }

}

module.exports = AIR

const mapToJSON5 = (map) => {

    return JSON5.stringify([...map])

}

const JSON5ToMap = (JSON5Str) => {

    return new Map(JSON5.parse(JSON5Str))

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
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

        if (this.autoSave === undefined) this.autoSave = true

        this.database = `${this.directory}/${this.name}.air5`

        if (options.name !== undefined) {

            if (fs.existsSync(this.directory) === false) {

                fs.mkdirSync(this.directory)

            }

            if (fs.existsSync(this.database) === false) {

                fs.writeFileSync(this.database, mapToJSON5(data))

            }

            data = JSON5ToMap(fs.readFileSync(this.database).toString())

        }

    }

    data() {
        
        return JSON5.parse(strMapToJSON5(data))

    }

    set(key, value, path) {

        if (!key) return console.log(chalk.blue('[Air5] '), chalk.gray('No Key Provided... A Key Is Needed'))

        if (!value) return console.log(chalk.blue('[Air5] '), chalk.gray('No Value Provided... A Value Is Needed'))

        if (!path) {

            data.set(key, value)

        }
        
        if (path) {

            data.get(key)[path] = value

        }

        if (this.autoSave === true) this.save()

    }

    get(key, path) {

        if (!key) return console.log(chalk.blue('[Air5] '), chalk.gray('No Key Provided... A Key Is Needed'))

        if (key && !path) {

            return data.get(key)

        }

        if (key && path) {

            return data.get(key)[path]

        }
    }

    has(key, value) {

        if (!key) return console.log(chalk.blue('[Air5] '), chalk.gray('No Key Provided... A Key Is Needed'))

        if (key && !value) {

            if (typeof data.get(key) !== 'undefined') {

                return true

            } else if (typeof data.get(key) === 'undefined') {

                return false
                
            } else {

                return false

            }

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

    save() {

        fs.writeFileSync(this.database, mapToJSON5(data))

    }
    
    clear() {

        data.clear()

    }

    ensure(key, value) {

        if (!this.get(key)) {

            this.set(key, value)
            
        }
    }

    delete(key, value) {

        if (!key) return console.log(chalk.blue('[Air5] '), chalk.gray('No Key Provided... A Key Is Needed'))

        if (!value) {

            data.delete(key)

        }

        if (value) {

            delete data.get(key)[value]

        }

        if (this.autoSave === true) this.save()

    }

}

module.exports = AIR;

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
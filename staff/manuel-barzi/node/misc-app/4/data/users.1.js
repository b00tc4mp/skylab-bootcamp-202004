require('../utils/string')
const Email = require('../utils/email')
const fs = require('fs')
require('../utils/function')
const path = require('path')
require('../utils/json')

function find(filter, callback) { // filter => { name: 'pepito', surname: 'grillo' }
    if (typeof filter !== 'object') throw new TypeError(`${filter} is not an object`)
    Function.validate(callback)

    fs.readdir(path.join(__dirname, 'users'), (error, files) => {
        if (error) return callback(error)

        files = files.filter(file => path.extname(file) === '.json')

        const results = []
        
        if (!files.length) return callback(null, results)

        let i = 0;

        (function readFile() {
            fs.readFile(path.join(__dirname, 'users', files[i]), 'utf8', (error, json) => {
                if (error) return callback(error)

                const existingUser = JSON.parse(json)

                const keys = Object.keys(filter)

                for (let j = 0; j < keys.length; j++) {
                    const key = keys[j]

                    const value = filter[key]

                    if (existingUser[key] !== value) {
                        if (++i < files.length) return readFile()

                        return callback(null, results)
                    }
                }

                results.push(existingUser)

                if (++i < files.length) return readFile()

                callback(null, results)
            })
        })()
    })
}

module.exports = {
    find
}
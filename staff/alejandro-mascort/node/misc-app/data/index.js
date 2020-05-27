require('../utils/polyfills/string')
const fs = require('fs')
require('../utils/polyfills/function')
const path = require('path')
require('../utils/json')
const  uid  = require('../utils/uid')

function find(filter,folder, callback) { // filter => { name: 'pepito', surname: 'grillo' }

    String.validate.notVoid(folder)

    if (typeof filter !== 'object') throw new TypeError(`${filter} is not an object`)
    Function.validate(callback)

    fs.readdir(path.join(__dirname, folder), (error, files) => {
        if (error) return callback(error)

        files = files.filter(file => path.extname(file) === '.json')

        const results = []

        if (!files.length) return callback(null, results)

        let i = 0;

        (function readFile() {
            fs.readFile(path.join(__dirname, folder, files[i]), 'utf8', (error, json) => {
                if (error) return callback(error)

                const existing = JSON.parse(json)

                const keys = Object.keys(filter)

                let matches = true

                for (let j = 0; j < keys.length && matches; j++) {
                    const key = keys[j]

                    const value = filter[key]

                    matches = existing[key] === value
                }

                if (matches) {
                    results.push(existing)
                }

                if (++i < files.length) return readFile()

                callback(null, results)
            })
        })()
    })
}

function create(data, folder, callback) {
    data.id = uid()

    fs.writeFile(path.join(__dirname, folder, `${data.id}.json`), JSON.prettify(data), error => {
        if (error) return callback(error)

        callback(null, data.id)
    })
}

function update(id, data, folder, callback) {
    data.id = id

    fs.writeFile(path.join(__dirname, folder,`${id}.json`), JSON.prettify(data), error => {
        if (error) return callback(error)

        callback(null)
    })
}

function remove(id, folder, callback) {
    fs.unlink(path.join(__dirname, folder, `${id}.json`), error => {
        if (error) return callback(error)

        callback(null)
    })
}

module.exports = {
    find,
    create,
    update,
    remove
}
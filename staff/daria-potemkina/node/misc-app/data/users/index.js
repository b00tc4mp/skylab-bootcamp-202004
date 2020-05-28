require('../../utils/polyfills/string')
require('../../utils/polyfills/function')
require('../../utils/polyfills/json')
const fs = require('fs')
const path = require('path')
const { files: { deleteFilesByExtensionFromDirectory }, uid } = require('../../utils')

function find(filter, callback) {
    if (typeof filter !== 'object') throw new TypeError(`${filter} is not an object`) //TODO add polifill
    Function.validate(callback)

    fs.readdir(path.join(__dirname), (error, files) => {
        if (error) return callback(error)

        files = files.filter(file => path.extname(file) === '.json')

        const results = []

        if (!files.length) return callback(null, results)

        let i = 0;

        (function readFile() {
            fs.readFile(path.join(__dirname, files[i]), 'utf8', (error, body) => {
                if (error) return callback(error)

                const existing = JSON.parse(body)

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

function deleteMany(callback) {
    deleteFilesByExtensionFromDirectory(__dirname, '.json', error => {
        if (error) return callback(error)

        callback(null)
    })
}

function create(data, callback) {
    data.id = uid()

    fs.writeFile(path.join(__dirname, `${data.id}.json`), JSON.prettify(data), error => {
        if (error) return callback(error)

        callback(null, data.id)
    })
}

module.exports = {
    find,
    deleteMany,
    create
}
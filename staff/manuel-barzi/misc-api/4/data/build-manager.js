require('../utils/polyfills/string')
require('../utils/polyfills/function')
require('../utils/polyfills/json')
const fs = require('fs')
const path = require('path')
const { Files: { deleteFilesByExtensionFromDirectory }, uid } = require('../utils')

module.exports = target => {
    function find(filter, callback) { // filter => { name: 'pepito', surname: 'grillo' }
        if (typeof filter !== 'object') throw new TypeError(`${filter} is not an object`)

        if (arguments.length > 1) Function.validate(callback)

        const promise = new Promise((resolve, reject) => {
            fs.readdir(path.join(__dirname, target), (error, files) => {
                if (error) return reject(error)

                files = files.filter(file => path.extname(file) === '.json')

                const results = []

                if (!files.length) return resolve(results)

                let i = 0;

                (function readFile() {
                    fs.readFile(path.join(path.join(__dirname, target), files[i]), 'utf8', (error, json) => {
                        if (error) return reject(error)

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

                        resolve(results)
                    })
                })()
            })
        })

        if (arguments.length === 1) return promise

        promise
            .then(results => callback(null, results))
            //.catch(error => callback(error))
            .catch(callback)
    }

    function deleteMany(callback) {
        deleteFilesByExtensionFromDirectory(path.join(__dirname, target), '.json', error => {
            if (error) return callback(error)

            callback()
        })
    }

    function create(data, callback) {
        if (typeof data !== 'object') throw new TypeError(`${data} is not an object`)

        if (arguments.length > 1) Function.validate(callback)

        const promise = new Promise((resolve, reject) => {
            data.id = uid()
    
            fs.writeFile(path.join(path.join(__dirname, target), `${data.id}.json`), JSON.prettify(data), error => {
                if (error) return reject(error)
    
                resolve(data.id)
            })
        })

        if (arguments.length === 1) return promise

        promise
            .then(id => callback(null, id))
            .catch(callback)
    }

    function update(id, data, callback) {
        data.id = id

        fs.writeFile(path.join(path.join(__dirname, target), `${id}.json`), JSON.prettify(data), error => {
            if (error) return callback(error)

            callback(null)
        })
    }

    function remove(id, callback) {
        fs.unlink(path.join(path.join(__dirname, target), `${id}.json`), error => {
            if (error) return callback(error)

            callback(null)
        })
    }

    return {
        find,
        deleteMany,
        create,
        update,
        remove
    }
}
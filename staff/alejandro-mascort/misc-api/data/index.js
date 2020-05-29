require('../utils/polyfills/string')
const fs = require('fs')
require('../utils/polyfills/function')
const path = require('path')
require('../utils/polyfills/json')
const  uid  = require('../utils/uid')


function find(filter,folder, callback) { // filter => { name: 'pepito', surname: 'grillo' }
    if (typeof filter !== 'object') throw new TypeError(`${filter} is not an object`)

    String.validate.notVoid(folder)
    
    if(arguments.length >= 3)  {
        Function.validate(callback)
    }

    let promise = new Promise((resolve, reject) => {
        fs.readdir(path.join(__dirname, folder), (error, files) => {
    
            if (error) return reject(error)
    
            files = files.filter(file => path.extname(file) === '.json')
    
            const results = []
    
            if (!files.length) return resolve(results)
    
            let i = 0;
    
            (function readFile() {
                fs.readFile(path.join(__dirname, folder, files[i]), 'utf8', (error, json) => {
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
    if (arguments.length === 2) return promise

    promise()
        .then(results => callback(null, results))
        .catch(callback)
}

function create(data, folder, callback) {

    if (typeof data !== 'object') throw new TypeError(`${data} is not an object`)
    
    String.validate.notVoid(folder)
    
    if(arguments.length >= 3)  {
        Function.validate(callback)
    }

    data.id = uid()

    let promise = new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, folder, `${data.id}.json`), JSON.prettify(data), error => {
            if (error) return reject(error)
    
            resolve(data.id)
        })
    })

    if (arguments.length === 2) return promise

    promise
        .then(id => callback(null, id))
        .catch(callback)
}

function update(id, data, folder, callback) {
    
    String.validate.notVoid(id)
    
    if (typeof data !== 'object') throw new TypeError(`${data} is not an object`)
    
    String.validate.notVoid(folder)
    
    if(arguments.length >= 4)  {
        Function.validate(callback)
    }

    data.id = id

    let promise = new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, folder,`${id}.json`), JSON.prettify(data), error => {
            if (error) return reject(error)
    
            resolve()
        })
    })

    if (arguments.length === 3) return promise

    promise
        .then(id => callback(null))
        .catch(callback)

}

function remove(id, folder, callback) {
    String.validate.notVoid(id)
        
    String.validate.notVoid(folder)
    
    if(arguments.length >= 3)  {
        Function.validate(callback)
    }

    let promise = new Promise((resolve, reject) => {
        fs.unlink(path.join(__dirname, folder, `${id}.json`), error => {
            if (error) return reject(error)
    
            resolve()
        })
    })

    if (arguments.length === 2) return promise

    promise
        .then(id => callback(null))
        .catch(callback)

}

module.exports = {
    find,
    create,
    update,
    remove
}
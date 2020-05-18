const fs = require('fs')
const path = require('path')
require('../utils/function')

function listContacts(callback) {
    Function.validate(callback)

    fs.readdir(path.join(__dirname,'..','data'), (error, files) => {
        if (error) return callback(error)

        files.forEach((file) => {
            fs.readFile(path.join(__dirname,'..','data',`${file}`), (error, data) => {
                if (error) return callback(error)

                const {name,surname,phone, email,  birth, country} = JSON.parse(data)

                callback(undefined, {name,surname,phone, email,  birth, country})
            })
        })
    })
}

module.exports = listContacts
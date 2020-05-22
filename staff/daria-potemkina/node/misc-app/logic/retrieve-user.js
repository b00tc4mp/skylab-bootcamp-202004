const fs = require('fs')
const path = require('path')

module.exports = (id, callback) => {

    String.validate.notVoid(id)
    Function.validate(callback)


    fs.readFile(path.join(__dirname, '..', 'data', 'users', `${id}.json`), 'utf8', (error, body) => {
        if (error) return callback(error)

        const { name, surname, email } = JSON.parse(body)

        return callback(null, { name, surname, email })

    })

}
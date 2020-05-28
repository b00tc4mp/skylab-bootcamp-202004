require("../utils/polyfills/string")
const { users: { find } } = require("../data")
const Email = require("../utils/email")
const fs = require("fs")
const path = require("path")
const { UnexistenceError } = require('../errors')

module.exports = (email, password, id) => {
    Email.validate(email)
    String.validate.notVoid(password)
    String.validate.notVoid(id)
    
    return new Promise((resolve, reject) => {

    find({ email, password, id }, (error, [user]) => {
        if (error) return reject(error)

        if (!user) return reject(new UnexistenceError("wrong credentials for unregister"));

        if (user) {

            fs.unlink(path.join(__dirname, '..', 'data', 'users', `${id}.json`), error => {
                if (error) return reject(error)
                
                return resolve()
            })
        }
    })
})
}
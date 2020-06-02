require("misc-commons/polyfills/string")
require("misc-commons/polyfills/function")
const {utils: { Email } } = require('misc-commons')
const fs = require("fs")
const path = require("path")

module.exports = (email, password, id) => {
    Email.validate(email)
    String.validate.notVoid(password)
    String.validate.notVoid(id)

    return new Promise ((resolve, reject) => {
        find({ email, password, id }, (error, [user]) => {
            if (error) return reject(error)
    
            if (!user) return reject(new Error("user dosent exist"));
    
            if (user) {
                fs.unlink(path.join(__dirname, '..', 'data', 'users', `${id}.json`), error => {
                    if (error) return reject(error)
                    return resolve()
                })
            }
        })
    })
}
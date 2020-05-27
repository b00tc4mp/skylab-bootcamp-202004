require("../utils/polyfills/string")
require("../utils/polyfills/function")
const { users: { find } } = require("../data")
const Email = require("../utils/email")
const fs = require("fs")
const path = require("path")
debugger
module.exports = (email, password, id, callback) => {
    Email.validate(email)
    Function.validate(callback)
    String.validate.notVoid(password)
    String.validate.notVoid(id)

    find({ email, password, id }, (error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error("user dosent exist"));

        if (user) {
            debugger
            // const { id } = user;
            fs.unlink(path.join(__dirname, '..', 'data', 'users', `${id}.json`), error => {
                if (error) return callback(error)
                return callback(null)
            })
        }
    })
}
const { find } = require('../data/users')
const { findContacts } = require('../data/contacts')
const fs = require('fs')
const path = require('path')
require('../utils/polyfills/function')
require('../utils/polyfills/string')

module.exports = (userId, contactId, callback) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(contactId)

    Function.validate(callback)

    find({ id: userId }, (error, [user]) => {
        if (error) return callback(error)
        if (!user) return callback(new Error(`user with id ${userId} does not exist`))

        findContacts({ user: userId, id: contactId }, (error, [contact]) => {
            if(error) return callback(error)
            if(!contact) return callback(new Error(`contact with id ${contactId} does not exist`))

            fs.unlink(path.join(__dirname, "..", "data", "contacts", `${contactId}.json`), error => {
                if(error) return callback(error)

                callback(null)
            })
        })
    })
}
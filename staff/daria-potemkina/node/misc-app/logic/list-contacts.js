const { find } = require('../data/users')
const { findContacts } = require('../data/contacts')
require('../utils/polyfills/function')
require('../utils/polyfills/string')

module.exports = (userId, callback)  => {
    String.validate.notVoid(userId)

    Function.validate(callback)

    find({id: userId}, (error, [user]) =>{
        if(error) return callback(error)
        if(!user) return callback(new Error(`user with id ${userId} does not exist`))

        findContacts({user: userId}, (error, contacts) =>{
            if(error) return callback(error)
            if(!contacts.length) return callback(new Error('contacts is empty'))

            callback(null, contacts)
        })
    })
}
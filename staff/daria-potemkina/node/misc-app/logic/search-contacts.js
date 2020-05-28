const { find } = require('../data/users')
const { findContacts } = require('../data/contacts')
require('../utils/polyfills/function')
require('../utils/polyfills/string')

module.exports = (userId, query, callback) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(query)

    Function.validate(callback)

    find({id: userId}, (error, [user])=>{
        if (error) return callback(error)
        if(!user) return callback(new Error(`user with id ${userId} does not exist`))
        debugger
        findContacts({user: userId}, (error, contacts) =>{
            if(error) return callback(error)
            if(!contacts.length) return callback(new Error('contacts is empty'))

            let results = []

            count = 0

            for (let i in contacts){
                //TODO have to normalize the results, case insensitive for query
                const values = Object.values(contacts[i])
                const matches = values.some(value => value.includes(query))

                if(matches) results.push(contacts[i])

                count++

                if(count === contacts.length) {
                    if (!results.length) return callback(new Error(`no results`))
                    callback(null, results)
                }
            }
        })
    })
}
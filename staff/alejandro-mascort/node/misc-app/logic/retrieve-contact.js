require('../utils/string')
require('../utils/function')
const { find } = require('../data/findData')

module.exports = (userId, contactId, callback) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(contactId)
    Function.validate(callback)

    find({ id: userId }, 'users',(error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with id ${userId} does not exist`))

        find({ contactId }, 'contacts',(error, [contact]) => {
            if (error) return callback(error)
    
            if (!contact) return callback(new Error(`contact with id ${contactId} does not exist`))
    
            callback(null, contact)
        })
    })
}

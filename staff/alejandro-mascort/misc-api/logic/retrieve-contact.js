require('../utils/polyfills/string')
require('../utils/polyfills/function')
const { find } = require('../data')

const { UnexistenceError} = require('../errors')

module.exports = (userId, contactId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(contactId)

    return new Promise((resolve, reject) => {
        find({ id: userId }, 'users',(error, users) => {
            if (error) return reject(error)
    
            const [user] = users
    
            if (!user) return reject(new UnexistenceError(`user with id ${userId} does not exist`))
    
            find({ contactId }, 'contacts',(error, [contact]) => {
                if (error) return reject(error)
        
                if (!contact) return reject(new UnexistenceError(`contact with id ${contactId} does not exist`))
        
                resolve(contact)
            })
        })
    })
}

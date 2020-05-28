require('../utils/polyfills/string')
require('../utils/polyfills/function')
const { find } = require('../data')
const { UnexistenceError} = require('../errors')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return new Promise((resolve,reject) => {
        find({ id: userId }, 'users',(error, users) => {
            if (error) return reject(error)
    
            const [user] = users
            
            if (!user) return reject(new UnexistenceError(`user with id ${userId} does not exist`))
    
            delete user.id
            delete user.password
    
            resolve(user)
        })
    })
    
}
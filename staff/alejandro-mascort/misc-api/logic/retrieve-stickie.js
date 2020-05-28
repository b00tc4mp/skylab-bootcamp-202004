require('../utils/polyfills/string')
require('../utils/polyfills/function')
const { find } = require('../data')

const { UnexistenceError} = require('../errors')

module.exports = (userId, stickieId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(stickieId)

    return new Promise((resolve, reject) => {
        find({ id: userId }, 'users',(error, users) => {
            if (error) return reject(error)
    
            const [user] = users

            if (!user) return reject(new UnexistenceError(`user with id ${userId} does not exist`))
    
            find({ stickieId }, 'stickies',(error, stickies) => {
                if (error) return reject(error)

                const [stickie] = stickies
        
                if (!stickie) return reject(new UnexistenceError(`stickie with id ${stickieId} does not exist`))
        
                resolve(stickie)
            })
        })
    })
}

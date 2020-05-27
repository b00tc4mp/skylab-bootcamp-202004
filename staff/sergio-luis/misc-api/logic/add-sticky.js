require('../utils/polyfills/string')
require('../utils/polyfills/json')
const { users, stickies } = require('../data')

module.exports = (userId, sticky, callback) => {
    if (typeof sticky !== 'object') throw new TypeError(`${sticky} is not an object`)
    const {tag,message}=sticky
    String.validate.notVoid(userId)
    String.validate.notVoid(tag)
    String.validate.notVoid(message)

    users.find({id:userId}, (error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with ${userId} does not exist`))
        
        sticky.user = userId

        stickies.create(sticky,(error,id)=>{
            if (error) return callback(error)

            callback(null, id)
        })
    })
}
           
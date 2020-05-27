require('../utils/polyfills/string')
require('../utils/polyfills/function')
const Email = require('../utils/email')
const { users: { find, remove } } = require('../data')


module.exports = (userId,email,password, callback) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)
    Function.validate(callback)

   find({ email },(error, [user]) => {
        if (error) return callback(error)

        if (!user) return callback(new Error(`user with e-mail ${email} does not exist`))

        if(user.id!==userId) return callback(new Error("trying to unregister other user"))

        if (user.password !== password) return callback(new Error('wrong password'))
        
        remove(user.id,(error)=>{
            if(error) return callback(error)
            return callback(null, `Deleted user ${email}`)
        })
    })
}
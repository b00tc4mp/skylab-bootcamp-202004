require('../utils/polyfills/string')
require('../utils/polyfills/function')
const Email = require('../utils/email')
const { users: { find, remove } } = require('../data')
const {CredentialsError,UnexistenceError} = require('../errors');


module.exports = (userId,email,password) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)

    return new Promise((resolve,reject)=>{
        find({ email },(error, users) => {
            const [user] = users
             if (error) return reject(error)
     
             if (!user) return reject(new UnexistenceError(`user with e-mail ${email} does not exist`))
     
             if(user.id!==userId) return reject(new CredentialsError("trying to unregister other user"))
     
             if (user.password !== password) return reject(new CredentialsError('wrong password'))
             
             remove(user.id,(error)=>{
                 if(error) return reject(error)
                 return resolve(`Deleted user ${email}`)
             })
         })
    })
   
}
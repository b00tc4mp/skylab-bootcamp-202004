require('../utils/polyfills/string')
const {users: {find, update}} = require('../data')
const { UnexistenceError, CredentialsError, ForbiddenError } = require('../errors')

module.exports = (userId, data) => {
    String.validate.notVoid(userId)

    if(typeof data !== 'object') throw new TypeError (`${data} is not a JSON`) 
    if(data.password && !data.oldPassword) throw new CredentialsError("oldPassword is required")
    if(data.email) throw new ForbiddenError ("Email cannot be updated")

    else if (data.password && data.oldPassword){
        return new Promise((resolve, reject)=>{
            find({ id: userId }, (error, users) => { debugger
                if (error) return reject(error)
                
                const [user] = users
                 
                if (!user) return reject(new UnexistenceError(`user with id ${userId} does not exist`))
                if (user.password !== data.oldPassword) return reject(new CredentialsError('Wrong password'))
            
                delete data.oldPassword
                update(userId, data, error=>{
                    if (error) return reject(error)

                    delete user.password
                    resolve(user)     
                })
            })
        })
    }
    else {
        return new Promise((resolve, reject)=>{
            update(userId, data, (error, user)=>{
                if (error) return reject(error)
                
                resolve(user)            
            })
        })
    }
}
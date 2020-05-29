require('../utils/polyfills/string')
require('../utils/polyfills/json')
const { users, stickies } = require('../data')
const {UnexistenceError} = require('../errors');

module.exports = (userId, sticky) => {
    if (typeof sticky !== 'object') throw new TypeError(`${sticky} is not an object`)
    const {tag,message}=sticky
    String.validate.notVoid(userId)
    String.validate.notVoid(tag)
    String.validate.notVoid(message)
    
    return new Promise((resolve,reject)=>{
        users.find({id:userId}, (error, [user]) => {
            if (error) return reject(error)
    
            if (!user) return reject(new UnexistenceError(`user with ${userId} does not exist`))
            
            sticky.user = userId
    
            stickies.create(sticky,(error,id)=>{
                if (error) return reject(error)
               resolve(id)
            })
        })      
    })
}
           
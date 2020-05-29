const { users, stickies } = require('../data')
require("../utils/polyfills/string")

const {UnexistenceError , CredentialsError} = require('../errors');

module.exports = (userId, stickieId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(stickieId)

    return new Promise((resolve,reject)=>{
        users.find({ id:userId },(error, _user) => {
            const [user] = _user
            if (error) return reject(error)
            
            if (!user) return reject(new UnexistenceError(`user with id: ${userId}, does not exist`))
    
            stickies.find({id:stickieId}, (error, _stickies) => {
                const [sticky]= _stickies
                if (error) return reject(error)
                if (!sticky) return reject(new UnexistenceError(`this ${stickieId} does not exist`))
                if(sticky.user!==userId) return reject(new CredentialsError("this sticky is not yours"))
            
                stickies.remove(stickieId,(error)=>{
                    if(error) return reject(error)
                    return resolve(stickieId)
                }) 
            })
        })
    })
}
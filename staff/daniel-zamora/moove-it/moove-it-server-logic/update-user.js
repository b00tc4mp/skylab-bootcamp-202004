require('moove-it-commons/polyfills/string')
const { mongoose : {ObjectId}, models: { User } } = require('moove-it-data')
const {errors: { UnexistenceError, CredentialsError, ForbiddenError }} = require('moove-it-commons')

module.exports = (userId, data) => {
    String.validate.notVoid(userId)
    if(typeof data !== 'object') throw new TypeError (`${data} is not a JSON object`) 
    if(data.password && !data.oldPassword) throw new CredentialsError("oldPassword is required")
    if(data.email) throw new ForbiddenError ("Email cannot be updated")
    
        return User.findOne({_id: ObjectId(userId)})
            .then(user => {
                if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
                
                if(data.password && data.oldPassword){
                    if(data.oldPassword !== user.password) throw new CredentialsError('Wrong old password')
                    delete data.password
                    delete data.oldPassword
                    return User.updateOne({_id: ObjectId(userId)}, { $set:  data })

                } else { return User.updateOne({_id: ObjectId(userId)}, { $set: data })}
            })
    .then(({result: { nModied }})=> {
        if(nModied === 0) return "No changes"
        return 'User updated'
    })        
}




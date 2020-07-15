require('misc-commons/polyfills/string')
const { mongo } = require('misc-data')
const { ObjectId } = mongo
const {errors: { UnexistenceError, CredentialsError, ForbiddenError }} = require('misc-commons')

module.exports = (userId, data) => {
    String.validate.notVoid(userId)
    if(typeof data !== 'object') throw new TypeError (`${data} is not a JSON`) 
    if(data.password && !data.oldPassword) throw new CredentialsError("oldPassword is required")
    if(data.email) throw new ForbiddenError ("Email cannot be updated")
    
    return mongo.connect()
    .then(connection => {
        const users = connection.db().collection('users')

        return users.findOne({_id: ObjectId(userId)})
            .then(user => {
                if(!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
                
                if(data.password && data.oldPassword){
                    if(data.oldPassword !== user.password) throw new CredentialsError('Wrong old password')
                    delete data.password
                    delete data.oldPassword
                    return users.updateOne({_id: ObjectId(userId)}, { $set:  data })

                } else { return users.updateOne({_id: ObjectId(userId)}, { $set: data })}
            })
    .then(({result: { nModied }})=> {
        if(nModied === 0) return "No changes"
        return 'User updated'
    })        
    })
}




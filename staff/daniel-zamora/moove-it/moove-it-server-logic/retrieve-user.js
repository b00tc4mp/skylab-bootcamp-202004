require('moove-it-commons/polyfills/string')
const { errors: {UnexistenceError} } = require('moove-it-commons')
const { mongoose : {ObjectId}, models: { User } } = require('moove-it-data')

module.exports = (userId) => {
    String.validate.notVoid(userId)

    return (async () => {

        const user = await User.findOne({ _id: ObjectId(userId) })
        
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)
                
        const {name, surname, email} = user
            
        return {name, surname, email}
        })()
} 
require('misc-commons/polyfills/string')
const { errors: {UnexistenceError} } = require('misc-commons')
const { mongoose : {ObjectId}, models: { User } } = require('misc-data')

module.exports = (userId) => {
    // String.validate.notVoid(userId)

    return User.findOne({ _id: ObjectId(userId) })
        
        .then(user => {
            if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

            
            const {name, surname, email} = user
    
            return {name, surname, email}
        })
} 
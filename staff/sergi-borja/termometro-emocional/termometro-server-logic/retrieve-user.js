require('termometro-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('termometro-data')

/**
 * Recieves an userId, searches an user in the API, then returns it
 * 
 * @param {string} userId The userId
 * 
 * @returns {<String>} returns the entire user
 * 
 * @throws {TypeError} If user doesn't exists
 * @throws {Error} if the userId doesn't accomplish the expected validations
 */

module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findOne({ _id: ObjectId(userId) }).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

            user.id = user._id.toString()

            delete user._id
            // delete user.__v

            return user
        })
}
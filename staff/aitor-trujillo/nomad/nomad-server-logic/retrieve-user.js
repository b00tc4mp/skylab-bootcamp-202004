/**
 * Retrieves user info.
 * 
 * @param {string} userId The workspace values. 
 * 
 * @returns {Promise<String>} The user object if it resolves, an error if it rejects.
 * 
 * @throws {Error} If userId does not matches any user.
 */

require('nomad-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('nomad-data')

module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findOne({ _id: ObjectId(userId) }).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

            user.id = user._id.toString()

            delete user._id
            delete user.password
            delete user.__v

            return user
        })
}
/**
 * returns user parametres
 * @param {string} userId Id of user
 * @throws {TypeError} Throws an error if user not exist
 */
require('work-meeting-commons/polyfills/string')
const { models: { User } } = require('work-meeting-data')

module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

            user.id = user._id.toString()

            delete user._id
            // delete user.password
            // delete user.cart
            // delete user.orders
            // delete user.__v

            return user
        })
}
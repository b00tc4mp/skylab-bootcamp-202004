require('coohappy-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('coohappy-data')

/**
 * Retrieve user.
 * 
 * @param {string} userId id of the current user
 * 
 * @throws {Error} When api return some error 
 *
 */

module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findOne({ _id: ObjectId(userId) }, { __v: 0, password: 0, foodList: 0, laundry: 0}).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

            user.id = user._id.toString()

            delete user._id

            return user
        })
}
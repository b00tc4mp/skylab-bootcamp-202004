require("gluttony-commons/polyfills/string")
const { models: { Users } } = require("gluttony-data")

/**
 * @param  {string} userId
 * @returns Promise
 */
module.exports = userId => {
    String.validate.notVoid(userId)

    return Users.findById(userId, "name surname email").lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

            user.id = user._id

            delete user._id

            return user
        })
}
/**
 * it will return a user
 * 
 * @param {String} userId it will find a user by his Id
 * 
 * @throws {Unexistance Error} if user doesn't match  in the database
 * 
 * @returns a user
 */

require('cook-wise-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('cook-wise-data')

module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findOne({ _id: ObjectId(userId) }, { __v: 0, recipes: 0, favoriterecipes: 0, password: 0 }).lean()
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
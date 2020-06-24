/**
 * Retrieved User.
 * 
 * @param {string} userId The id of the user normaly we take this value by token. 
 * 
 * @throws {VoidError} if don`t introduce any userId.
 * @throws {Error} if the userId don`t exist in database.
 * 
 * @return {Object} return a object with the {name,surname,email,id}.
 *
 */

require('books-commons/polyfills/string')
const { mongoose: { ObjectId }, models: { User } } = require('books-data')

module.exports = userId => {
    String.validate.notVoid(userId)

    return User.findOne({ _id: ObjectId(userId) }, { __v: 0, password: 0 ,books: 0,following:0,rating:0}).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} does not exist`)

            user.id = user._id.toString()

            delete user._id
            delete user.password
            delete user.__v
      
            return user
        })
}
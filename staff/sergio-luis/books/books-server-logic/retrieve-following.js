/**
 * Retrieve following.
 * 
 * @param {string} userId take by token.  
 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return {Object} return an array of followings.
 *
 */

require('books-commons/polyfills/string')
require('books-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('books-commons')
const { models: { User} } = require('books-data')



module.exports = (userId) => {
    String.validate.notVoid(userId)


    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);

        const followingUsers = await User.find({ followers: userId }).lean();
        debugger
        user.following.leng
        if(!followingUsers.length)throw new UnexistenceError("you don`t have any users following");
        

        const _followingUsers = followingUsers.map(user => {
            user.id = user._id.toString();
            delete user._id;
            delete user.__v;
            delete user.password;
            return user
        })
        return _followingUsers
    })()
}
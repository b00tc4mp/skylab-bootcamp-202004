/**
 * toggle-following.
 * 
 * @param {string} userId take by token.  
 * @param {string} followingUserId following Id).  
 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return Don`t return nothing if the message is created.
 *
 */

require('books-commons/polyfills/string')
require('books-commons/polyfills/json')
const { errors: { UnexistenceError ,CredentialsError} } = require('books-commons')
const { models: { User} } = require('books-data')



module.exports = (userId, followingUserId) => {
    String.validate.notVoid(userId)
    String.validate.notVoid(followingUserId)
    if(userId===followingUserId) throw new CredentialsError("you can`t follow yourself");
    return (async () => {
        const [user, following] = await Promise.all([
            User.findById(userId),
            User.findById(followingUserId),
        ])

        if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`);
        if (!following) throw new UnexistenceError(`user with id ${followingUserId} does not exist`);
      
        if(!user.following.includes(followingUserId)){
            await User.findByIdAndUpdate(userId, {$addToSet: { following: followingUserId }})
            await User.findByIdAndUpdate(followingUserId, {$addToSet: { followers: userId }})
        }else{
            await User.findByIdAndUpdate(userId, {$pull: { following: followingUserId }})
            await User.findByIdAndUpdate(followingUserId, {$pull: { followers: userId }})
        }
    })()
}
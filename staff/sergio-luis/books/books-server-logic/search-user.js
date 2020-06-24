/**
 * Search User.
 * 
 * @param {string} query query for search user by name.  
 *
 * @throws {UnexistenceError} if don`t find any user with this name in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return {Object}  return an array of users.
 *
 */

require('books-commons/polyfills/string')

const { errors: { UnexistenceError } } = require('books-commons')
const { models: { User } } = require('books-data')

module.exports = (query) => {

    String.validate.notVoid(query)
    let user

    return (async() => {
        user = await User.find({ email: { $regex: `${query}`, $options: 'i' } }).lean().sort({ email: 1 }).limit(10)
        if (!user.length) throw new UnexistenceError("This user search don`t find any results")
    
        const _user = user.map(user=>{
            user.id = user._id.toString()
            delete user._id;
            delete user.password
            delete user.__v
            return user
        })
       
        return _user
    })()
}

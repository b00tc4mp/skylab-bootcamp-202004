/**
 * Search User.
 * 
 * @param {string} userId take by token.  
 * @param {string} query query for search user by name.  
 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return {Object}  return an array of books.
 *
 */

require('books-commons/polyfills/string')

const { errors: { UnexistenceError } } = require('books-commons')
const { models: { User } } = require('books-data')

module.exports = (query) => {

    String.validate.notVoid(query)
    let user

    return (async() => {
        user = await User.find({ name: { $regex: `${query}`, $options: 'i' } }).lean().sort({ email: 1 }).limit(10)
        if (!user.length) throw new UnexistenceError("This user search don`t find any results")
    
        user.forEach(user=>{
            delete user.password
            delete user.__v
        })
 
        return user
    })()
}

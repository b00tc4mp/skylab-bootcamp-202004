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
const { utils: {call} } = require('books-commons')
const context = require('./context')

module.exports = function (token,query) {
    String.validate.notVoid(token)
    if(query)String.validate.notVoid(query)
 
    return (async() => {
        const resp = await call('GET',`${this.API_URL}/users/search/${query||''}`,undefined,{ 'Authorization': `Bearer ${token}` });
        const {status,body} = resp

        if (status === 201) {
            return JSON.parse(body)
        } else {
            const { error } = JSON.parse(body)

            throw new Error(error)
        }
    })()
}.bind(context)

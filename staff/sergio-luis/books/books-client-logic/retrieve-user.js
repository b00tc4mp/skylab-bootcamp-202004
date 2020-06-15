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
const { utils: {call} } = require('books-commons')
const context = require('./context')

module.exports = function (token) {
    String.validate.notVoid(token)

    return (async()=>{
        const resp = await call('GET',`${this.API_URL}/users/`,undefined,{ 'Authorization': `Bearer ${token}` });
        const {status,body} = resp
        debugger
        if (status === 200) {
            return JSON.parse(body)
        } else {
            const { error } = JSON.parse(body)

            throw new Error(error)
        }
    })()
}.bind(context)
/**
 * Retrieved User.
 * 
 * @param {string} token. 
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

module.exports = function (query) {
    if(query)String.validate.notVoid(query)

    return (async()=>{
        const token = await this.storage.getItem('token')

        const resp = await call('GET',`${this.API_URL}/users/${query || ''}`,undefined,{ 'Authorization': `Bearer ${token}` });
        const {status,body} = resp

        if (status === 201) {
            return JSON.parse(body)
        } else {
            const { error } = JSON.parse(body)

            throw new Error(error)
        }
    })()
}.bind(context)
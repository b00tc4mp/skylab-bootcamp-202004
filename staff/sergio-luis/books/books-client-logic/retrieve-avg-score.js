/**
 * Retrieve Avg score
 * 
 * @param {string} userId The id of the user normaly we take this value by query. 
 * 
 * @throws {VoidError} if don`t introduce any userId.
 * @throws {Error} if the userId don`t exist in database.
 * 
 * @return {number} return a Number with avg score.
 *
 */

require('books-commons/polyfills/string')
const { utils: { call } } = require('books-commons')
const context = require('./context')

module.exports = function (query) {
    String.validate.notVoid(query)

    return (async()=>{
        const resp =  await call(
            'GET',
            `${this.API_URL}/books/score/retrieve/${query}`,undefined,undefined)
        
        const { status, body } = resp

        if (status === 200) {
            const avg = JSON.parse(body)
            return avg
        }else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })()
}.bind(context)
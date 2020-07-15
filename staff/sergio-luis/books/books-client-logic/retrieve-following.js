/**
 * Retrieve following.
 *
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return {Object} return an array of followings.
 *
 */


const { utils: { call } } = require('books-commons')
const context = require('./context')

module.exports = function () {

    return (async () => {
        const token = await this.storage.getItem('token')
        const resp = await call(
            'GET',
            `${this.API_URL}/books/following/retrieve`,undefined,
            { 'Authorization': `Bearer ${token}` })

            const { status, body } = resp

        if (status === 201) {
            const following = JSON.parse(body)
            return following
        
        }else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })()
}.bind(context)
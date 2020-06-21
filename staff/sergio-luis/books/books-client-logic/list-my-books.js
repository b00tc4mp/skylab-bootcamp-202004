/**
 * list-my-books.
 * 
 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return {Object}  return an array of books.
 *
 */

const { utils: {call} } = require('books-commons')
const context = require('./context')

module.exports = function (idUser) {

    return (async() => {
        const token = await this.storage.getItem('token')
        const resp =  await call(
            'GET',
            `${this.API_URL}/books/list/mybooks/${idUser||''}`,undefined,
            {'Authorization': `Bearer ${token}` })
        
        const { status, body } = resp
        if (status === 201) {
            const books = JSON.parse(body)
            return books
        }else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }

    })()
}.bind(context)
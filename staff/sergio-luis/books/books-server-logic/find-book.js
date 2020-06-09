/**
 * Find books.
 * 
 * @param {string} query query of search book, can search by codebar or name 

 * @throws {UnexistenceError} if don`t find any results.
 * @throws {VoidError} if don`t introduce any query.
 * 
 * @return {Object} Return a array of objects books.
 *
 */


require('books-commons/polyfills/string')

const { errors: { UnexistenceError } } = require('books-commons')
const fetch = require('node-fetch')

module.exports = (query) => {
    String.validate.notVoid(query)

    return (async () => {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)

        const {items} = await response.json()

        if(typeof items === 'undefined') throw new UnexistenceError('Can`t find any book')

        const books = items.map(item=> {
            const { volumeInfo} = item

            const {title,description,industryIdentifiers,imageLinks} =volumeInfo

            const [{identifier}] =industryIdentifiers
    
            const {thumbnail} = imageLinks

            return {title, image:thumbnail,description,barCode:identifier}

        })
         
       return  await books
    })()
}


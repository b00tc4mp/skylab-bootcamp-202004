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
        try{
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)

            const {items} = await response.json()
    
            if(typeof items === 'undefined') throw new UnexistenceError('Can`t find any book')
   
            const books = items.map(item=> {
        
                let { volumeInfo} = item
                let {title,description,industryIdentifiers,imageLinks} =volumeInfo
             
                let identifier;
                if(!description) description = 'not available';

                if(!industryIdentifiers) {
                    industryIdentifiers = 'not available'
                    identifier = 'not available'
                }else{
                    [{identifier}] =industryIdentifiers
                }

                let {thumbnail} = imageLinks
                if(!thumbnail) thumbnail = 'not available'

                return {title, image:thumbnail,description,barCode:identifier}
            })
             
           return  await books
        }catch (error){
            throw new Error('Not find any book with this description')
        }
  
    })()
}


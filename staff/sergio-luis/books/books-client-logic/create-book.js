/**
 * Create book.
 * 
 * @param {string} title book's title.  
 * @param {string} image book's url image.  
 * @param {string} description book's description.  
 * @param {string} barCode code of the book.  

 * @throws {UnexistenceError} if don`t find userId in data base.
 * @throws {VoidError} if the input fiels ar empty.
 * 
 * @return Don`t return nothing if the book is created.
 *
 */

require('books-commons/polyfills/string')
const { utils: {call} } = require('books-commons')
const context = require('./context')


module.exports = function (title, image, description, barCode) {
    String.validate.notVoid(title)
    String.validate.notVoid(image)
    String.validate.notVoid(barCode)

    return (async () => {
        const token = await this.storage.getItem('token')
        const resp =  await call(
            'POST',
            `${this.API_URL}/books/create`,
            JSON.stringify({title,image,description,barCode}),
            { 'Content-type': 'application/json','Authorization': `Bearer ${token}` })
        
        const { status, body } = resp
        if (status === 201){
            return body
        }else {
            const { error } = JSON.parse(body)
            throw new Error(error)
        }
    })()
}.bind(context)




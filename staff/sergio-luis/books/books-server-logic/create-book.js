/**
 * Create book.
 * 
 * @param {string} userId take by token.  
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
require('books-commons/polyfills/json')
const { errors: { UnexistenceError } } = require('books-commons')
const { models: { User, Book } } = require('books-data')


module.exports = (userId, title, image, description, barCode) => {

    String.validate.notVoid(userId)
    String.validate.notVoid(title)
    String.validate.notVoid(image)
    String.validate.notVoid(barCode)


    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new UnexistenceError("This user doesn't exists")

        const createdBook =await Book.create({
            title,
            image,
            description,
            barCode,
            ownerUserId: userId,
            actualUserId: userId,
            travelKm: 0,
        })
      
        return createdBook._id.toString()
    })()
}




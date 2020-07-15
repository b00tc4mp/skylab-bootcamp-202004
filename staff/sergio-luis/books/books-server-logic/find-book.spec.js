const findBook = require('./find-book')
const { expect } = require('chai')
const {errors: {VoidError}} = require('books-commons')

describe('server-logic-find-books', () => {

    let query

    it('should sucedd when a valid search', async() =>{
        query = 'lord' 

        const books = await findBook(query)
       
        books.forEach(({title, image,barCode}) => {
            expect(title).to.exist
            expect(title).to.be.a('string')
            expect(image).to.exist
            expect(image).to.be.a('string')
            expect(barCode).to.exist
            expect(barCode).to.be.a('string')
        });
    })

    it('should fail on incorrect search', async() =>{
        query = 'jksdghfjkadgsjhadgsafk' 
        try {
            await findBook(query)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal('Not find any book with this description')
        }
    })
    it('should fail on empty query', () =>{
        query = '' 
        expect(() => {
            findBook(query)
        }).to.throw(VoidError, 'string is empty or blank')
    })
       
})
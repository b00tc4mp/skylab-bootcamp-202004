require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
const { random } = Math
const deleteBook = require('./delete-book')
const { expect } = require('chai')

require('books-commons/polyfills/json')

const { mongoose, models: { User, Book } } = require('books-data')
const bcrypt = require('bcryptjs')
const { errors: { VoidError } } = require('books-commons')

describe('server-logic-delete-book', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash, createBook, bookId


    beforeEach(async() => {
        await [Book.deleteMany(),User.deleteMany()]
       
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: hash })

        userId = user.id

        title = "Lord of the Flies"
        image = "http://books.google.com/books/content?id=z--HMbPXdD0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        description = "Critical essays and notes on the novel and its author accompany the story of a group of British schoolboys marooned on a desert island"
        barCode = "0399506438"

        createdBook = await Book.create({
            title,
            image,
            description,
            barCode,
            ownerUserId: userId,
            actualUserId: userId,
            travelKm: 0
        })

        bookId = createdBook._id.toString()

    })

    it('Sould success to delete a book', async() => {
        const _deleteBook = await deleteBook(userId, bookId)

        expect(_deleteBook).to.be.undefined

        const _book = await Book.findById(bookId)

        expect(_book).to.be.null
    })

    it('Sould fail to delete a book dont find user', async() => {

        userId = '5edf984ec1be038dc909f783'
        try {
            await deleteBook(userId, bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("This user doesn't exists")
        }
    })

    it('Sould fail to delete a book don`t find a book', async() => {

        bookId = '5edfa26edf0b6a9235ee2539'
        try {
            await deleteBook(userId, bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("This book doesn't exists")
        }
    })

    it('Sould fail to try delete a book with a userId diferent of the owner', async() => {

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: hash })

        userId = user.id

        try {
            await deleteBook(userId, bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("You can`t delete this book because it not yours!")
        }
    })


    it('should fail on non-string field', () => {
        expect(() => {
            deleteBook(true, bookId)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            deleteBook(userId, 123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            deleteBook('', bookId)
        }).to.throw(VoidError, 'string is empty or blank')
        expect(() => {
            deleteBook(userId, '')
        }).to.throw(VoidError, 'string is empty or blank')
    })


    afterEach(async() => {
       await User.deleteMany()
       await Book.deleteMany()
    })

    after (async() => {
        return await mongoose.disconnect();
    })
})
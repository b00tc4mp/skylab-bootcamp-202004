require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
const {random} = Math
const createBook = require('./create-book')
const { expect } = require('chai')

require('books-commons/polyfills/json')

const { mongoose, models: { User ,Book} } = require('books-data')
const bcrypt = require('bcryptjs')
const { errors: { VoidError} } = require('books-commons')

describe('server-logic-create-book', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash,book


    beforeEach( () =>

        User.deleteMany()
        .then(() => {
            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`

            return bcrypt.hash(password, 10)
        })
        .then(_hash => hash = _hash)
        .then(()=>User.create({ name, surname, email, password: hash }))
        .then(user => userId = user.id)



    )

    describe('Creat a book', () => {
       book = {
            title: "Lord of the Flies",
            image: "http://books.google.com/books/content?id=z--HMbPXdD0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            description: "Critical essays and notes on the novel and its author accompany the story of a group of British schoolboys marooned on a desert island",
            barCode: "0399506438"
          }

        it('should succeed to add a book', async() =>{
            const bookId = await createBook(userId, book.title,book.image,book.description,book.barCode)

            const _book = await Book.findById(bookId)
    
            expect(_book.title).to.exist
            expect(_book.title).to.be.a('string')
            expect(_book.image).to.exist
            expect(_book.image).to.be.a('string')
            expect(_book.barCode).to.exist
            expect(_book.barCode).to.be.a('string')
            expect(_book.ownerUserId).to.exist
            expect(_book.ownerUserId.toString()).to.equal(userId)
            expect(_book.actualUserId).to.exist
            expect(_book.actualUserId.toString()).to.equal(userId)
            expect(_book.title).to.be.a('string')   
        })
                
        it('should fail when to don`t find a user', async() =>{
            userId='5edfa731dc7edc93965e8f68'

            try{
                await createBook(userId, book.title,book.image,book.description,book.barCode)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal("This user doesn't exists")
            }    
        })

    })

    describe('Invalid fields',()=> {

            it('should fail on non-string field', () => {
                expect(() => {
                    createBook(true, book.title,book.image,book.description,book.barCode)
                }).to.throw(TypeError, 'true is not a string')
                expect(() => {
                    createBook(userId, 123,book.image,book.description,book.barCode)
                }).to.throw(TypeError, '123 is not a string')
                expect(() => {
                    createBook(userId, book.title,book.image,book.description,false)
                }).to.throw(TypeError, 'false is not a string')
                expect(() => {
                    createBook(userId, book.title,123,book.description,book.barCode)
                }).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on empty field', () => {
                expect(() => {
                    createBook('', book.title,book.image,book.description,book.barCode)
                }).to.throw(VoidError, 'string is empty or blank')
                expect(() => {
                    createBook(userId, '',book.image,book.description,book.barCode)
                }).to.throw(VoidError, 'string is empty or blank')
                expect(() => {
                    createBook(userId, book.title,book.image,book.description,'')
                }).to.throw(VoidError, 'string is empty or blank')
                expect(() => {
                    createBook(userId, book.title,'',book.description,book.barCode)
                }).to.throw(VoidError, 'string is empty or blank')
            })
    

    })

    afterEach(async() => {
        await User.deleteMany()
        await Book.deleteMany()
    })

    after (async() => {
        return await mongoose.disconnect();
    })
})
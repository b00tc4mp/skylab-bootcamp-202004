require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL ,SECRET} } = process
const { random } = Math
const createBook= require('./create-book')
const { expect } = require('chai')
require('books-commons/polyfills/json')

const { mongoose, models: { User, Book} } = require('books-data')
const { errors: { VoidError } } = require('books-commons')
const {jwtPromised} = require('books-node-commons')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')

context.API_URL = API_URL
context.storage = AsyncStorage


describe('client-logic-create-book', () => {
    let name, surname, email, password, encryptedPassword, userId;
    let title, image,description,barCode, bookId,token;

    before (async() => {
        await mongoose.connect(MONGODB_URL, {unifiedTopology: true});
        await Promise.all([User.deleteMany(), Book.deleteMany()]);
    })

    beforeEach(async() => {
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, surname, email, password: encryptedPassword });
        userId = user.id;

        title = `title-${random()}`;
        image = `http://books.google.com/books/content?id=z--HMbPXdD0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;
        description=`description-${random()}`
        barCode = `${random()}`;

        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',token)
    })

    describe('Creat a book', () => {
        it('should succeed to add a book', async() =>{
            bookId = await createBook(title,image,description,barCode)
            
            const _book = await Book.findById(bookId)
       
            expect(_book.title).to.exist
            expect(_book.title).to.equal(title)
            expect(_book.image).to.exist
            expect(_book.image).to.equal(image)
            expect(_book.description).to.exist
            expect(_book.description).to.equal(description)
            expect(_book.barCode).to.exist
            expect(_book.barCode).to.equal(barCode)
            expect(_book.ownerUserId).to.exist
            expect(_book.ownerUserId.toString()).to.equal(userId)
            expect(_book.actualUserId).to.exist
            expect(_book.actualUserId.toString()).to.equal(userId)
        })
                
        it('should fail when to don`t find a user', async() =>{
            userId='5edfa731dc7edc93965e8f68'
            const _token = token = await jwtPromised.sign({ sub: userId }, SECRET)
            await context.storage.setItem('token',_token)
            try{
                await createBook(title,image,description,barCode)
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
                    createBook(123,image,description,barCode)
                }).to.throw(TypeError, '123 is not a string')
                expect(() => {
                    createBook(title,image,description,false)
                }).to.throw(TypeError, 'false is not a string')
                expect(() => {
                    createBook(title,123,description,barCode)
                }).to.throw(TypeError, '123 is not a string')
            })

            it('should fail on empty field', () => {
                expect(() => {
                    createBook('',image,description,barCode)
                }).to.throw(VoidError, 'string is empty or blank')
                expect(() => {
                    createBook(title,image,description,'')
                }).to.throw(VoidError, 'string is empty or blank')
                expect(() => {
                    createBook(title,'',description,barCode)
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
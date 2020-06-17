require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL ,SECRET} } = process
const { random } = Math
const calculateDistanceBook = require('./calculate-distance-book')
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


describe("client-logic-calculate-distance-book", () => {
    let name, surname, email, password, encryptedPassword, userId;
    let secondName, secondSurname, secondEmail, secondPassword, secondEncryptedPassword, secondUserId;
    let title, barCode, travelKm, bookId;
    let userLatitude,userLongitude;
    let secondUserLatitude,secondUserLongitude;
    let token;

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

        secondName = `secondUser-${random()}`;
        secondSurname = `secondSurname-${random()}`;
        secondEmail = `secondEmail-${random()}@gmail.com`;
        secondPassword = `secondPassword-${random()}`;
        secondEncryptedPassword = await bcrypt.hash(secondPassword, 10);

        const secondUser = await User.create({ name: secondName, surname: secondSurname, email: secondEmail, password: secondEncryptedPassword })
        secondUserId = secondUser.id

        title = `title-${random()}`;
        barCode = `${random()}`;
        travelKm = random();
        const book = await Book.create({ title, barCode, travelKm, ownerUserId: userId ,actualUserId: userId,});
        bookId = book.id;

        userLatitude = random()
        userLongitude = random()
        secondUserLatitude = random()
        secondUserLongitude = random()

        await User.findByIdAndUpdate(userId,{$set: {gpsCoordinates:{latitude:userLatitude,longitude:userLongitude}}})
        await User.findByIdAndUpdate(secondUserId,{$set: {gpsCoordinates:{latitude:secondUserLatitude,longitude:secondUserLongitude}}})

        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',token)
    })

    it("should succeed travel book", async() => {
        await calculateDistanceBook(secondUserId,bookId)

        const book = await Book.findById(bookId)

        expect(book).to.exist
        expect(book.travelKm).to.greaterThan(0) 
    })
    it("should succeed travel add more km to a book", async() => {
        await calculateDistanceBook(secondUserId,bookId)
    
        const book = await Book.findById(bookId)

        expect(book).to.exist
        expect(book.travelKm).to.greaterThan(0) 

        await calculateDistanceBook(secondUserId,bookId)
        const _book = await Book.findById(bookId)
 
        expect(_book).to.exist
        expect(_book.travelKm).to.greaterThan(book.travelKm)

    })

    it("should fail don`texist userId", async() => {
        userId = '5edf984ec1be038dc909f783'
        const _token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',_token)
        try {
            await calculateDistanceBook(secondUserId,bookId)
            throw new Error('should not reach this point')
       } catch (error) {
           expect(error).to.exist
           expect(error).to.be.an.instanceof(Error)
           expect(error.message).to.equal(`user with id ${userId} does not exist`)
       }
    })

    it('Sould fail dont find secondUserId', async () => {
        secondUserId = '5edf984ec1be038dc909f783'

        try {
            await calculateDistanceBook(secondUserId,bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${secondUserId} does not exist`)
        }
    })
    it('Sould fail dont find bookId', async () => {
        bookId = '5edf984ec1be038dc909f783'

        try {
            await calculateDistanceBook(secondUserId,bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`book with id ${bookId} does not exist`)
        }
    })
    it('Sould fail dont have first user gpsCoordinates', async () => {
        await User.findByIdAndUpdate(userId,{$set: {gpsCoordinates:{latitude:undefined,longitude:undefined}}})
   
        try {
            await calculateDistanceBook(secondUserId,bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does have gps coordinates`)
        }
    })
    it('Sould fail dont have second user gpsCoordinates', async () => {
        await User.findByIdAndUpdate(secondUserId,{$set: {gpsCoordinates:{latitude:undefined,longitude:undefined}}})

        try {
            await calculateDistanceBook(secondUserId,bookId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${secondUserId} does have gps coordinates`)
        }
    })


    it('should fail on non-string field', () => {
     expect(() => {
            calculateDistanceBook(123,bookId)
        }).to.throw(TypeError, '123 is not a string')
        expect(() => {
            calculateDistanceBook(secondUserId,false)
        }).to.throw(TypeError, 'false is not a string')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            calculateDistanceBook('',bookId)
        }).to.throw(VoidError, 'string is empty or blank')
        expect(() => {
            calculateDistanceBook(secondUserId,'')
        }).to.throw(VoidError, 'string is empty or blank')
    })

    afterEach(async() => {
        await Promise.all([User.deleteMany(), Book.deleteMany()]);
    })

    after (async() => {
        await Promise.all([User.deleteMany(), Book.deleteMany()]);
        await mongoose.disconnect();
    })
})
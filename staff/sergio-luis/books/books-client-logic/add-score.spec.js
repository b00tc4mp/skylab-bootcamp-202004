require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL ,SECRET} } = process
const { random } = Math
const addScore = require('./add-score')
const { expect } = require('chai')
require('books-commons/polyfills/json')

const { mongoose, models: { User} } = require('books-data')
const { errors: { VoidError } } = require('books-commons')
const {jwtPromised} = require('books-node-commons')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')

context.API_URL = API_URL
context.storage = AsyncStorage

describe("client-logic-add-score", () => {
    let name, surname, email, password, encryptedPassword, userId;
    let secondName, secondSurname, secondEmail, secondPassword, secondEncryptedPassword, secondUserId;
    let thirdName, thirdSurname, thirdEmail, thirdPassword, thirdEncryptedPassword, thirdUserId;
    let points,token

    before (async() => {
        await mongoose.connect(MONGODB_URL, {unifiedTopology: true});
        await Promise.all([User.deleteMany()]);
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

        thirdName = `thirdUser-${random()}`;
        thirdSurname = `thirdSurname-${random()}`;
        thirdEmail = `thirdEmail-${random()}@gmail.com`;
        thirdPassword = `thirdPassword-${random()}`;
        thirdEncryptedPassword = await bcrypt.hash(thirdPassword, 10);

        const thirdUser = await User.create({ name: thirdName, surname: thirdSurname, email: thirdEmail, password: thirdEncryptedPassword })
        thirdUserId = thirdUser.id


        points =Math.floor(Math.random() * 6)
        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',token)

    })

    it("should succeed add score to a user", async() => {
        const _points =Math.floor(Math.random() * 6)

        await addScore(secondUserId, _points)

        const secondUser = await User.findById(secondUserId)
        
        const [{user,points}] = secondUser.score
     
        expect(user.toString()).to.equal(userId)
        expect(points).to.equal(points)
        expect(secondUser.avgScore).to.equal(_points)
    })


    it("should succeed add more than one vote", async() => {
        const _points =Math.floor(Math.random() * 6)

        await addScore(secondUserId, _points)

        const _token = await jwtPromised.sign({ sub: thirdUserId }, SECRET)
        await context.storage.setItem('token',_token)

        await addScore(secondUserId, _points)

        const secondUser = await User.findById(secondUserId)

        expect(secondUser.avgScore).to.equal((_points+_points)/2)
      
    })

    it("should fail to vote 2 times with same userId ", async() => {
        const _points =Math.floor(Math.random() * 6)
    
        try {
            await addScore(secondUserId, _points)
            await addScore(secondUserId, _points)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("You already give points to this user")
        }
      
    })


    it('Sould fail dont find user', async () => {
        userId = '5edf984ec1be038dc909f783'
        const _token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',_token)
        try {
            await addScore(secondUserId, points)
             throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })
    it('Sould fail to vote yourself', async () => {

        try {
            await addScore(userId, points)
             throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("You can't vote yourself")
        }
    })

    it('Sould fail dont a secondUserId', async () => {
        secondUserId = '5edf984ec1be038dc909f783'

        try {
            await addScore(secondUserId, points)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${secondUserId} does not exist`)
        }
    })

    it('Sould fail to put points greater than 5', async () => {
        points = 6

        try {
            await addScore(secondUserId, points)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`the max value it is 5`)
        }
    })


    it('should fail on non-string field', () => {
        expect(() => {
            addScore(123, points)
        }).to.throw(TypeError, '123 is not a string')
        expect(() => {
            addScore(secondUserId, 'points')
        }).to.throw(Error, 'points is not a number')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            addScore('', points)
        }).to.throw(VoidError, 'string is empty or blank')

       points = undefined
        expect(() => {
            addScore(secondUserId, points)
        }).to.throw(Error, 'undefined is not a number')
    })

    afterEach(async() => {
        await User.deleteMany();
    })

    after (async() => {
        await User.deleteMany();
        await mongoose.disconnect();
    })
})
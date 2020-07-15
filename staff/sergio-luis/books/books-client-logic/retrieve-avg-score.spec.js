require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL } } = process

const retrieveAvgScore = require('./retrieve-avg-score')
const { random } = Math
const { expect } = require('chai')
require('books-commons/polyfills/json')
const { errors: { VoidError} } = require('books-commons')
const { mongoose, models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')
const context = require('./context')
context.API_URL = API_URL

describe("client-logic-retrieve-avg-score", () => {
    let name, surname, email, password, encryptedPassword, userId;
    let avgScore;

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

        avgScore =Math.floor(Math.random() * 6)
    
    })

    it("should succeed retrieve avg score user", async() => {
        await User.findByIdAndUpdate(userId, {$set: { avgScore }})

        const avg = await retrieveAvgScore(userId)
   
        expect(avg).to.exist
        expect(avg).to.equal(avgScore)
    })


    it('Sould fail dont find user', async () => {
        userId = '5edf984ec1be038dc909f783'

        try {
            await retrieveAvgScore(userId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`user with id ${userId} does not exist`)
        }
    })
 
    it('Sould fail dont have score', async () => {

        try {
            await retrieveAvgScore(userId)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal('no score')
        }
    })


    it('should fail on non-string field', () => {
        expect(() => {
            retrieveAvgScore(true)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            retrieveAvgScore(123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            retrieveAvgScore('')
        }).to.throw(VoidError, 'string is empty or blank')
    })

    afterEach(async() => {
        await User.deleteMany();
    })

    after (async() => {
        await User.deleteMany();
        await mongoose.disconnect();
    })
})
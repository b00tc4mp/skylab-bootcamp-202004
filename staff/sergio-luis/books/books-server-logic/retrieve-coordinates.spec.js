require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
const { random } = Math
const retrieveCoodinates = require('./retrieve-coordinates')
const { expect } = require('chai')

require('books-commons/polyfills/json')

const { mongoose, models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')
const { errors: { VoidError } } = require('books-commons')

describe("retrieve-coordinates", () => {
    let name, surname, email, password, encryptedPassword, userId;
    let latitude,longitude,gpsCoordinates

    before (async() => {
        await mongoose.connect(MONGODB_URL, {unifiedTopology: true});
        await User.deleteMany()
    })

    beforeEach(async() => {
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, surname, email, password: encryptedPassword });
        userId = user.id;

        latitude = random()
        longitude = random()
        gpsCoordinates = {latitude,longitude}
    })

    it("should succeed retrieve gps coordinates", async() => {
        await User.findByIdAndUpdate(userId, {$set:{gpsCoordinates}})

        const coordinates = await retrieveCoodinates(userId)
debugger
        expect(coordinates).to.exist
        expect(coordinates.latitude).to.equal(latitude)
        expect(coordinates.longitude).to.equal(longitude) 
    })

    it("should fail to no exist a user", async() => {
        userId = '5edf984ec1be038dc909f783'
        try {
            await retrieveCoodinates(userId)
            throw new Error('should not reach this point')
       } catch (error) {
           expect(error).to.exist
           expect(error).to.be.an.instanceof(Error)
           expect(error.message).to.equal(`user with id ${userId} does not exist`)
       }
    })

    it("should fail to no exist coordinates", async() => {
    
        try {
            await retrieveCoodinates(userId)
            throw new Error('should not reach this point')
       } catch (error) {
           expect(error).to.exist
           expect(error).to.be.an.instanceof(Error)
           expect(error.message).to.equal("the user don`t have gps coordinates")
       }
    })



    it('should fail on non-string field', () => {
        expect(() => {
            retrieveCoodinates(true)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            retrieveCoodinates(123)
        }).to.throw(TypeError, '123 is not a string')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            retrieveCoodinates('')
        }).to.throw(VoidError, 'string is empty or blank')
    })

    afterEach(async() => {
        await User.deleteMany()
    })

    after (async() => {
        await User.deleteMany()
        await mongoose.disconnect();
    })
})
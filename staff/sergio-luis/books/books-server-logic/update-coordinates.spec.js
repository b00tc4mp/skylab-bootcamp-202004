require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
const { random } = Math
const updateCoordinates = require('./update-coordinates')
const { expect } = require('chai')

require('books-commons/polyfills/json')

const { mongoose, models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')
const { errors: { VoidError } } = require('books-commons')

describe("update-coordinates", () => {
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
    })

    it("should succeed add gps coordinates", async() => {
        await updateCoordinates(userId,latitude,longitude)

        const user = await User.findById(userId)

        expect(user).to.exist
        expect(user.gpsCoordinates.latitude).to.equal(latitude)
        expect(user.gpsCoordinates.longitude).to.equal(longitude) 
    })

    it("should succeed update gps coordinates", async() => {
        await updateCoordinates(userId,latitude,longitude)

        const _latitude = random();
        const _longitude = random();

        await updateCoordinates(userId,_latitude,_longitude)

        const user = await User.findById(userId)

        expect(user).to.exist
        expect(user.gpsCoordinates.latitude).to.equal(_latitude)
        expect(user.gpsCoordinates.longitude).to.equal(_longitude) 
    })
    it("should fail to no exist a user", async() => {
        userId = '5edf984ec1be038dc909f783'
        try {
            await updateCoordinates(userId,latitude,longitude)
            throw new Error('should not reach this point')
       } catch (error) {
           expect(error).to.exist
           expect(error).to.be.an.instanceof(Error)
           expect(error.message).to.equal(`user with id ${userId} does not exist`)
       }
    })


    it('should fail on non-string field', () => {
        expect(() => {
            updateCoordinates(true,latitude,longitude)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            updateCoordinates(userId,'latitude',longitude)
        }).to.throw(TypeError, 'latitude is not a number')
        expect(() => {
            updateCoordinates(userId,latitude,'longitude')
        }).to.throw(TypeError, 'longitude is not a number')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            updateCoordinates('',latitude,longitude)
        }).to.throw(VoidError, 'string is empty or blank')
        expect(() => {
            updateCoordinates(userId,undefined,longitude)
        }).to.throw(Error, 'undefined is not a number')
        expect(() => {
            updateCoordinates(userId,latitude,undefined)
        }).to.throw(Error, 'undefined is not a number')
    })

    afterEach(async() => {
        await User.deleteMany()
    })

    after (async() => {
        await User.deleteMany()
        await mongoose.disconnect();
    })
})
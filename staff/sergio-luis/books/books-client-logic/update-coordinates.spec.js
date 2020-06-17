require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL,SECRET } } = process
const { random } = Math
const updateCoordinates = require('./update-coordinates')
const { expect } = require('chai')

require('books-commons/polyfills/json')

const { mongoose, models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')
const {jwtPromised} = require('books-node-commons')
const { errors: { VoidError }} = require('books-commons')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')

context.API_URL = API_URL
context.storage = AsyncStorage

describe("client-logic-update-coordinates", () => {
    let name, surname, email, password, encryptedPassword, userId,token;
    let latitude,longitude,gpsCoordinates;

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
       
        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',token)

        await updateCoordinates(latitude,longitude)

        const user = await User.findById(userId)

        expect(user).to.exist
        expect(user.gpsCoordinates.latitude).to.equal(latitude)
        expect(user.gpsCoordinates.longitude).to.equal(longitude) 
    })

    it("should succeed update gps coordinates", async() => {
        gpsCoordinates={latitude,longitude}
        await User.findByIdAndUpdate(userId, { $set: { gpsCoordinates } })
    
        const _latitude = random();
        const _longitude = random();

        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',token)

        await updateCoordinates(_latitude,_longitude)

        const user = await User.findById(userId)

        expect(user).to.exist
        expect(user.gpsCoordinates.latitude).to.equal(_latitude)
        expect(user.gpsCoordinates.longitude).to.equal(_longitude) 
    })
    it("should fail to no exist a user", async() => {
        userId = '5edf984ec1be038dc909f783'
        const _token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.storage.setItem('token',_token)
        try {
            await updateCoordinates(latitude,longitude)
            throw new Error('should not reach this point')
       } catch (error) {
           expect(error).to.exist
           expect(error).to.be.an.instanceof(Error)
           expect(error.message).to.equal(`user with id ${userId} does not exist`)
       }
    })


    it('should fail on non-string field', () => {
        expect(() => {
            updateCoordinates('latitude',longitude)
        }).to.throw(TypeError, 'latitude is not a number')
        expect(() => {
            updateCoordinates(latitude,'longitude')
        }).to.throw(TypeError, 'longitude is not a number')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            updateCoordinates(undefined,longitude)
        }).to.throw(Error, 'undefined is not a number')
        expect(() => {
            updateCoordinates(latitude,undefined)
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
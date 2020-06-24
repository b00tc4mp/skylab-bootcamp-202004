require('dotenv').config()

const bcrypt = require('bcryptjs')
const { jwtPromised } = require('aquaponics-node-commons')
const { env: { MONGODB_URL_TEST: MONGODB_URL, SECRET } } = process
require('aquaponics-commons/polyfills/json')
const retrieveLastTemperature = require('./retrieve-last-temperature')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User,Temperature } } = require('aquaponics-data')
global.fetch = require('node-fetch')
const __context__ = require('./context')
const AsyncStorage = require('not-async-storage')
const { API_URL } = require('./context')

__context__.storage = AsyncStorage
__context__.API_URL = API_URL

describe('logic - retrieve last temperature', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, role, phone,  admin,date

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        role = 'admin'
        phone = random()
        encryptedPassword = await bcrypt.hash(password, 10);
        date=new Date()
        admin = await User.create({ name, surname, email, password: encryptedPassword, phone, role });
        userId = admin.id;
        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await __context__.storage.setItem('token', token)

    })

    describe('when user already exist', () => {
        beforeEach(() => {
            admin = { name, surname, email, password, role, phone }
            return Promise.all([
                Temperature.create({ temperature:26, date }),
                Temperature.create({ temperature:25, date }),
                Temperature.create({ temperature:24, date })
            ])
                .then(([result]) => userId = result.id)
        })

        it('should return last temperature', () => {
            return retrieveLastTemperature()
                .then(lastTemperature => {
                    expect(lastTemperature).to.be.an.instanceOf(Object)
                    expect(lastTemperature.date).to.exist
                    expect(lastTemperature.temperature).to.exist
                    expect(lastTemperature.temperature).to.be.a('number')
                    expect(lastTemperature.temperature).to.equal(24)
                })
        })
    })

    describe('when user does not exist', () => {
        it('should fail when user does not exists', async () => {
            await User.deleteMany()
            try {
                await retrieveLastTemperature()
            } catch (error) {
                expect(error).to.be.exist
                expect(error.message).to.equal(`user with ${userId} does not exist`)

            }
        })
    })

    afterEach(async () => {
        await User.deleteMany()
        await Temperature.deleteMany()
    })

    after(async () => await mongoose.disconnect)
})
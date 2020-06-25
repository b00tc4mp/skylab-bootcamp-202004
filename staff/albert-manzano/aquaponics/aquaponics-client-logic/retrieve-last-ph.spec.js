require('dotenv').config()

const bcrypt = require('bcryptjs')
const { jwtPromised } = require('aquaponics-node-commons')
const { env: { MONGODB_URL_TEST: MONGODB_URL, SECRET } } = process
require('aquaponics-commons/polyfills/json')
const retrieveLastPh = require('./retrieve-last-ph')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User,Ph } } = require('aquaponics-data')
global.fetch = require('node-fetch')
const __context__ = require('./context')
const AsyncStorage = require('not-async-storage')
const { API_URL } = require('./context')

__context__.storage = AsyncStorage
__context__.API_URL = API_URL

describe('logic - retrieve last ph', () => {
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
                Ph.create({ ph: 6, date }),
                Ph.create({ ph: 5, date }),
                Ph.create({ ph: 4, date })
            ])
                .then(([result]) => userId = result.id)
        })

        it('should return last ph', () => {
            return retrieveLastPh()
                .then(lastPh => {
                    expect(lastPh).to.be.an.instanceOf(Object)
                    expect(lastPh.date).to.exist
                    expect(lastPh.ph).to.exist
                    expect(lastPh.ph).to.be.a('number')
                    expect(lastPh.ph).to.equal(4)
                })
        })
    })

    describe('when user does not exist', () => {
        it('should fail when user does not exists', async () => {
            await User.deleteMany()
            try {
                await retrieveLastPh()
            } catch (error) {
                expect(error).to.be.exist
                expect(error.message).to.equal(`user with ${userId} does not exist`)

            }
        })
    })

    afterEach(async () => {
        await User.deleteMany()
        await Ph.deleteMany()
    })

    after(async () => await mongoose.disconnect)
})
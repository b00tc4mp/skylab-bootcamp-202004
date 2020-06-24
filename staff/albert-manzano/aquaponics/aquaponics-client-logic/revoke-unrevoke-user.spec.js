require('dotenv').config()

const bcrypt = require('bcryptjs')
const { jwtPromised } = require('aquaponics-node-commons')
const { env: { MONGODB_URL_TEST: MONGODB_URL, SECRET } } = process
require('aquaponics-commons/polyfills/json')
const revokeUnrevokeUser = require('./revoke-unrevoke-user')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('aquaponics-data')
global.fetch = require('node-fetch')
const __context__ = require('./context')
const AsyncStorage = require('not-async-storage')
const { API_URL } = require('./context')
__context__.storage = AsyncStorage
__context__.API_URL = API_URL


describe('logic - revoke-unrevoke-user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, role, phone, encryptedPassword

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        role = 'admin'
        phone = random()
        encryptedPassword = await bcrypt.hash(password, 10);

        admin = await User.create({ name, surname, email, password: encryptedPassword, phone, role });

        userId = admin.id;
        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await __context__.storage.setItem('token', token)
    })

    describe('when user already exist',  () => {
        it('should change status', async() => {
            const response = await revokeUnrevokeUser(userId)
            expect(response).to.not.exist
            let user = await User.find()
            expect(user.length).to.equal(1)
            expect(user.password).to.be.undefined
            expect(user[0].name).to.equal(name)
            expect(user[0].surname).to.equal(surname)
            expect(user[0].email).to.equal(email)
            expect(user[0].role).to.equal(role)
            expect(user[0].phone).to.equal(phone)
            expect(user[0].confirmed).to.equal(false)
            expect(user[0].status).to.equal("disable")
            const enable = await revokeUnrevokeUser(userId)
            expect(enable).to.not.exist
            user = await User.find()
            expect(user.length).to.equal(1)
            expect(user.password).to.be.undefined
            expect(user[0].name).to.equal(name)
            expect(user[0].surname).to.equal(surname)
            expect(user[0].email).to.equal(email)
            expect(user[0].role).to.equal(role)
            expect(user[0].phone).to.equal(phone)
            expect(user[0].confirmed).to.equal(false)
            expect(user[0].status).to.equal("enable")
        })
    })

    describe('when user does not exist', () => {
        it('should fail when user does not exists', async () => {
            await User.deleteMany()
            try {
                await revokeUnrevokeUser(userId)
            } catch (error) {
                expect(error).to.be.exist
                expect(error.message).to.equal(`user with ${userId} does not exist`)

            }
        })
    })
    afterEach(async () => await User.deleteMany())

    after(async () => await mongoose.disconnect)
})
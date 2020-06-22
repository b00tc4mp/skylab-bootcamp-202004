require('dotenv').config()


const bcrypt = require('bcryptjs')
const { jwtPromised } = require('aquaponics-node-commons')
const { env: { MONGODB_URL_TEST: MONGODB_URL, SECRET } } = process
require('aquaponics-commons/polyfills/json')
const retrieveAllUsers = require('./retrieve-all-users')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('aquaponics-data')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')
const { API_URL } = require('./context')
const { __context__ } = require('not-async-storage')
context.__storage__ = AsyncStorage
__context__.API_URL = API_URL
context.API_URL = API_URL

describe('logic - retrieveAllUsers', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, role, phone, name1, surname1, email1, password1, role1, phone1, userId1

    beforeEach(async () => {
        name = `name-${random()}`;
        surname = `surname-${random()}`;
        email = `email-${random()}@gmail.com`;
        password = `password-${random()}`;
        phone = random()
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, surname, email, password: encryptedPassword, phone });
        userId = user.id;
        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await context.__storage__.setItem('token', token)

        name1 = `name-${random()}`;
        surname1 = `surname-${random()}`;
        email1 = `email-${random()}@gmail.com`;
        password1 = `password-${random()}`;
        phone1 = random()
    })

    describe('when user already exist', () => {
        beforeEach(() => {
            const admin = { name, surname, email, password, role, phone }

            return User.create(admin)
                .then(result => userId = result.id)
        })

        it('should return the users data', async () => {
            const token = await context.__storage__.getItem('token')
            const allUsers = await retrieveAllUsers()
            expect(allUsers.length).to.equal(1)
            expect(allUsers.password).to.be.undefined

        })

        it('should return credentials error', async () => {
            const user = { name: name1, surname: surname1, email: email1, password: password1, role: role1, phone: phone1 }
            await User.create(user)
            await context.__storage__.setItem('token', token)

            const allUsers = await User.find()
            expect(allUsers.length).to.equal(2)
            const result = await retrieveAllUsers(userId)
            expect(result.length).to.equal(2)
            expect(result[0].password).to.be.undefined
            expect(result[0].name).to.equal(name)
            expect(result[0].surname).to.equal(surname)
            expect(result[0].email).to.equal(email)
            expect(result[0].role).to.equal(role)
            expect(result[0].phone).to.equal(phone)
            expect(result[1].password).to.be.undefined
            expect(result[1].name).to.equal(name1)
            expect(result[1].surname).to.equal(surname1)
            expect(result[1].email).to.equal(email1)
            expect(result[1].role).to.equal(role1)
            expect(result[1].phone).to.equal(phone1)

        })
    })

    it('use app as user should fail', () => {
        const user = { name: name1, surname: surname1, email: email1, password: password1, role: role1, phone: phone1 }
        return User.create(user)
            .then(result1 => userId1 = result1.id)
            .then()
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`your role does not allow you to acces here`)
            })
    })
    describe('when user does not exist', () => {
        it('should fail when user does not exists', () => {
            userId = '123455678990'
            return retrieveAllUsers()
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.exist
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error.message).to.equal(`user with ${userId} does not exist`)
                })
        })
    })
    afterEach(async () => await User.deleteMany())

    after(async () => await mongoose.disconnect)
})


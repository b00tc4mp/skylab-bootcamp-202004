require('dotenv').config()

const bcrypt = require('bcryptjs')
const { jwtPromised } = require('aquaponics-node-commons')
const { env: { MONGODB_URL_TEST: MONGODB_URL, SECRET } } = process
require('aquaponics-commons/polyfills/json')
const updateUser = require('./update-user')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Temperature } } = require('aquaponics-data')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')
const { API_URL } = require('./context')

context.__storage__ = AsyncStorage
context.API_URL = API_URL
describe("update-user", () => {
    let name, surname, email, password, encryptedPassword, userId, token, phone
    let _name, _surname, _email;


    before(async () => {
        await mongoose.connect(MONGODB_URL, { unifiedTopology: true });
        await User.deleteMany();
    })

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

        _name = `name-${random()}`;
        _surname = `surname-${random()}`;
        _email = `email-${random()}@gmail.com`;
    })

    it('should update the user data', () => {
        _name = `name-${random()}`
        _surname = `surname-${random()}`

        const updates = { name: _name, surname: _surname, email, password, phone }

        return updateUser(userId, updates)
            .then(() => User.find())
            .then(results => {
                expect(results).to.have.lengthOf(1)

                const [user] = results

                expect(user.name).to.equal(_name)
                expect(user.surname).to.equal(_surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    })

    it('should fail when user does not exist', () => {
        return updateUser(userId, { name, surname, email, password })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with userId ${userId} does not exist`)
            })
    })

    it('should fail on wrong input', () => {

        expect(() => {
            updateUser(userId, { name: true })
        }).to.throw(TypeError, `${true} is not a string`)

        expect(() => {
            updateUser(userId, { email: true })
        }).to.throw(TypeError, `${true} is not a string`)

        expect(() => {
            updateUser(userId, { name: 9 })
        }).to.throw(TypeError, `${9} is not a string`)

        expect(() => {
            updateUser(userId, true)
        }).to.throw(TypeError, `${true} is not an object`)

        expect(() => {
            updateUser(userId, undefined)
        }).to.throw(TypeError, `${undefined} is not an object`)

        expect(() => {
            updateUser(userId, 9)
        }).to.throw(TypeError, `${9} is not an object`)

        expect(() => {
            updateUser(userId, { surname: true })
        }).to.throw(TypeError, `${true} is not a string`)

        expect(() => {
            updateUser(userId, { email: 9 })
        }).to.throw(TypeError, `${9} is not a string`)

        expect(() => {
            updateUser(userId, { surname: 9 })
        }).to.throw(TypeError, `${9} is not a string`)

        expect(() => {
            updateUser(userId, { phone: true })
        }).to.throw(TypeError, `${true} is not a number`)

        expect(() => {
            updateUser(userId, { phone: "hello" })
        }).to.throw(TypeError, `hello is not a number`)

    })

})
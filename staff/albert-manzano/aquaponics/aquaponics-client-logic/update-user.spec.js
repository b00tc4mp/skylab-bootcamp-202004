require('dotenv').config()

const bcrypt = require('bcryptjs')
const { jwtPromised } = require('aquaponics-node-commons')
const { env: { MONGODB_URL_TEST: MONGODB_URL, SECRET } } = process
require('aquaponics-commons/polyfills/json')
const updateUser = require('./update-user')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('aquaponics-data')
global.fetch = require('node-fetch')
const __context__ = require('./context')
const AsyncStorage = require('not-async-storage')
const { API_URL } = require('./context')

__context__.storage = AsyncStorage
__context__.API_URL = API_URL

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
        role= 'user'

        const user = await User.create({ name, surname, email, password: encryptedPassword, phone ,role});
        debugger
        userId = user.id;
        token = await jwtPromised.sign({ sub: userId }, SECRET)
        await __context__.storage.setItem('token', token)

        _name = `name-${random()}`;
        _surname = `surname-${random()}`;
        _email = `email-${random()}@gmail.com`;
    })

    it('should update the user data', async () => {
        _name = `name-${random()}`
        _surname = `surname-${random()}`
        debugger
        const userUpdate = { name: _name, surname: _surname, email: _email, role: "admin" }

        await updateUser(userId, userUpdate)
        const results = await User.find()

        expect(results).to.have.lengthOf(1)
        
        expect(results[0].name).to.equal(_name)
        expect(results[0].surname).to.equal(_surname)
        expect(results[0].email).to.equal(_email)
        expect(results[0].password).to.equal(encryptedPassword)
        expect(results[0].role).to.equal("admin")
        expect(results[0].phone).to.equal(phone)

    })

    it('should fail when user does not exist', async () => {
        await User.deleteMany()
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

    afterEach(async () => {
        await User.deleteMany()
    })

    after(async () => await mongoose.disconnect)
})
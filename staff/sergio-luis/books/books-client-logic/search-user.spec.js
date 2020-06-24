require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL, TEST_API_URL: API_URL,SECRET } } = process

const searchUser = require('./search-user')
const { random } = Math
const { expect } = require('chai')
require('books-commons/polyfills/json')
const { errors: { VoidError} } = require('books-commons')
const { mongoose, models: { User} } = require('books-data')
const {jwtPromised} = require('books-node-commons')
const bcrypt = require('bcryptjs')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')

context.API_URL = API_URL
context.storage = AsyncStorage

describe('client-logic-search-user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash,token;


    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: hash })
        userId = user.id

        token = await jwtPromised.sign({ sub: userId}, SECRET)
        await context.storage.setItem('token',token)
    })

    it('Sould success to find a owner user by email', async () => {
        query = 'mail'

        const [user] = await searchUser(query)

        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.id).to.equal(userId)
    })

    it('Sould succed to no find any user', async () => {
        query = 'hgdhsagjhagsdasjh'

        try {
            await searchUser(query)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal("This user search don`t find any results")
        }
    })

    it('should fail on non-string field', () => {
        expect(() => {
            searchUser(true)
        }).to.throw(TypeError, 'true is not a string')
        expect(() => {
            searchUser(123)
        }).to.throw(TypeError, '123 is not a string')
    })

    afterEach(async () => {
        await User.deleteMany()
    })

    after (async() => {
        return await mongoose.disconnect();
    })
})
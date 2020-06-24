require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
const { random } = Math
const searchUser = require('./search-user')
const { expect } = require('chai')

require('books-commons/polyfills/json')

const { mongoose, models: { User } } = require('books-data')
const bcrypt = require('bcryptjs')
const { errors: { VoidError } } = require('books-commons')

describe('server-logic-search-user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash


    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: hash })

        userId = user.id
    })

    it('Sould success to find a owner user', async () => {
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

    it('should fail on non-string field', () => {
        expect(() => {
            searchUser('')
        }).to.throw(VoidError, 'string is empty or blank')

    })


    afterEach(async () => {
        await User.deleteMany()
    })

    after (async() => {
        return await mongoose.disconnect();
    })
})
require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retriveUser = require('./retrieve-user')
const { random } = Math
const { expect } = require('chai')
require('takemytask-commons/polyfills/json')
const { mongoose, models: { User } } = require('takemytask-data')
const bcrypt = require('bcryptjs')

describe('logic - register user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    const fakeId = '5ee0ed9a603a0a4f3c650fe1'
    let name, surname, email, password, adress, user

    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        adress = `street-${random()}`

        const hash = await bcrypt.hash(password, 10)

        user = await User.create({name, surname, email, password: hash, adress})

        userId = user.id
    })

    it('should succeed on retriving user', async () => {
        const result = await retriveUser(userId)
            expect(result).to.exist
            expect(result.name).to.be.equal(user.name)
            expect(result.surname).to.be.equal(user.surname)
            expect(result.email).to.be.equal(user.email)
            expect(result.adress).to.be.equal(user.adress)
    })

    it('should fail on retriving user', async () => {
        result = await retriveUser(fakeId)
            .catch( error => {
                expect(error).to.exist
                expect(error.message).to.be.equal(`user with id: ${fakeId} dont exists`)
            })
    })
    
    //TODO finish test with unhappy path

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})
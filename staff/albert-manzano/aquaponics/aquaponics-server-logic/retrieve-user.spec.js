require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
require('aquaponics-commons/polyfills/json')
const retrieveUser = require('./retrieve-user')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('aquaponics-data')

describe('logic - retrieveUser', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId,role,phone

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                role = 'admin'
                phone = random()
            })
    )

    describe('when user already exist', () => {
        beforeEach(() => {
            const user = { name, surname, email, password, role,  phone}

            return User.create(user)
                .then(result => userId = result.id)
        })

        it('should return the user data', () => {
            return retrieveUser(userId)
                .then(user => {
                    expect(user.password).to.be.undefined
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.phone).to.equal(phone)
                    expect(user.role).to.equal(role)
                })
        })
    })

    it('should fail when user does not exists', () => {
        userId = '123455678990'
        return retrieveUser(userId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal(`user with ${userId} does not exist`)
            })
    })

    it('should return a type error', () => {
        userId = undefined
        expect(() => {
            retrieveUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 9
        expect(() => {
            retrieveUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect(() => {
            retrieveUser(userId)
        }).to.throw(TypeError, `${userId} is not a string`)
    })

    it('should return an error', () => {
        userId = ''
        expect(() => {
            retrieveUser(userId)
        }).to.throw(Error, `${userId} is empty or blank`)
    })

    afterEach(async() =>await User.deleteMany())

    after(async() => await mongoose.disconnect)
})
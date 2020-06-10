require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const updateUser = require('./update-user')
const { random } = Math
const { expect } = require('chai')
require('aquaponics-commons/polyfills/json')
const { mongoose, models: { User } } = require('aquaponics-data')

describe('logic-updateUser', () => {
    before(() => mongoose.connect(MONGODB_URL))
    let name, surname, email, password, userId, _name, _surname, phone

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
            const user = { name, surname, email, password, role, phone }

            return User.create(user)
                .then(result => userId = result.id)
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
    })

    it('should fail when user does not exist', () => {
        return updateUser(userId, { name, surname, email, password })
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
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

    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect)
})
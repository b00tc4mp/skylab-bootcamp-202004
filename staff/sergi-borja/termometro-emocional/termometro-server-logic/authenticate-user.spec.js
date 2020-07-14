require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
require('termometro-commons/polyfills/json')
const { mongoose, models: { User } } = require('termometro-data')
const bcrypt = require('bcryptjs')

describe('logic - authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash, plan, mood, sex, age
    let genderArray = ['M', 'F']

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                age = Math.floor(Math.random() * 100);
                sex = genderArray[Math.floor(genderArray.length * Math.random())];
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                mood = {
                    date: Date.now(),
                    score: Math.floor(Math.random() * 10)
                }
                plan = 'twice';

                return bcrypt.hash(password, 10)
            })
            .then(_hash => hash = _hash)
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, surname, age, sex, email, password: hash, plan, mood })
                .then(user => userId = user.id)
        )

        it('should succeed on correct credentials', () =>
            authenticateUser(email, password)
                .then(_userId => {
                        expect(_userId).to.equal(userId)
                    })
        )

        it('should fail on wrong password', () => {
            password += 'wrong-'

            return authenticateUser(email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal('Contraseña incorrecta')
                })
        })
    })

    it('should fail when user does not exist', () =>
        authenticateUser(email, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal('Este email no existe')
            })
    )

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})
require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, JWT_SECRET: SECRET, TEST_API_URL: API_URL } } = process

const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
require('termometro-commons/polyfills/json')
const { mongoose, models: { User } } = require('termometro-data')
const bcrypt = require('bcryptjs')
require('termometro-commons/ponyfills/xhr')
require('termometro-commons/ponyfills/atob')
const context = require('./context')
const { utils: { jwtPromised } } = require('termometro-commons')
const user = require('termometro-data/models/schemas/user')


context.API_URL = API_URL

describe('logic - register user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash, age, sex, location, token
    let genderArray = ['M', 'F']

    beforeEach(async () => {

        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        age = Math.floor(Math.random() * 100);
        sex = genderArray[Math.floor(genderArray.length * Math.random())];
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        location = 'Barcelona'
        return bcrypt.hash(password, 10)
    }

    )

    it('should succeed registering an Admin', () =>

        registerUser(name, surname, age, sex, location, email, password, token)
            .then(() => User.find())
            .then(users => {
                expect(users.length).to.equal(1)

                const [user] = users

                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)

                return bcrypt.compare(password, user.password)
            })
    )

    describe('when user already exists', () => {
        beforeEach(async () => await User.create({ name, surname, age, sex, location, email, password }))

        it('should fail on trying to register an existing user', () =>
            registerUser(name, surname, age, sex, location, email, password, token)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist

                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`Este email ya está en uso!`)
                })
        )
    })

    describe('should succeed registering a Member', () => {
        beforeEach(async () => {

            await User.deleteMany()

            await User.create({ name, surname, age, sex, location, email, password })

            name = `name-${random()}`
            surname = `surname-${random()}`
            age = Math.floor(Math.random() * 100);
            sex = genderArray[Math.floor(genderArray.length * Math.random())];
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            location = 'Barcelona'
            return bcrypt.hash(password, 10)
        })

        it('should succes on registering a MEMBER', async () => {
            const admin = await User.findOne({})

            const token = await jwtPromised.sign({ sub: admin.id }, SECRET)

             return registerUser(name, surname, age, sex, location, email, password, token)
                .then(() => {
                    return User.findOne({ name: name })
                        .then(member => {
                            expect(member.admin.toString()).to.equal(admin.id.toString())
                        })
                })
        })
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})
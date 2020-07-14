require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const updateCart = require('./update-user')
const { expect } = require('chai')
require('termometro-commons/polyfills/json')
require('termometro-commons/polyfills/math')
const { random, randomIntegerBetween } = Math
const { errors: { UnexistenceError, ValueError } } = require('termometro-commons')
const { mongoose, models: { User } } = require('termometro-data')
const updateUser = require('./update-user')


describe('logic - update user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, mood, sex, age, data, location, userToUpdate
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
                data = {
                    name: 'Sergi'
                }
                location = 'Barcelona'
            })
    )

    describe('prove update works', () => {
        beforeEach(() =>
            User.create({ name, surname, age, sex, location, email, password, mood })
                .then(user => userId = user.id)
        )

        it('should succeed on updating credentials', async () => {
            const result = await updateUser(userId, data)

            expect(result).to.be.undefined

            const users = await User.find()

            expect(users.length).to.equal(1)

            const [user] = users

            expect(user.name).to.equal('Sergi')

            // const match = await bcrypt.compare(password, user.password)

            // expect(match).to.be.true

        })
    })

    describe('if user does not exist', () => {
        beforeEach(() =>
            User.deleteMany()
        )

        it('should fail on updating credentials', () => {
            updateUser(userId, data)
                .then(() => { throw new Error('El usuario que quieres actualizar no existe') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal('El usuario que quieres actualizar no existe')
                })

        })
    })

    describe('if email already exists', () => {
        beforeEach(async () => {
            const userCreated = await User.create({ name, surname, age, sex, location, email, password, mood })

            data = {
                email: userCreated.email
            }

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
            data = {
                name: 'Sergi'
            }
            location = 'Barcelona'

            userToUpdate = await User.create({ name, surname, age, sex, location, email, password, mood })

        })


        it('should fail on updating credentials', () => {
            updateUser(userToUpdate.id, data)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal('Este email ya está en uso!')
                })

        })
    })


    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})
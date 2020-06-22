require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const { expect } = require('chai')
require('termometro-commons/polyfills/json')
require('termometro-commons/polyfills/math')
const { random, randomIntegerBetween } = Math
const { errors: { UnexistenceError, ValueError } } = require('termometro-commons')
const { mongoose, models: { User } } = require('termometro-data')
const unRegisterUser = require('./un-register-user.js')


describe('logic - un Register user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, mood, sex, location, age, data
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
                location = 'Barcelona'
            })
    )

    describe('prove deleting members', () => {
        beforeEach(async () => {
            await User.create({ name, surname, age, sex, location, email, password, mood })
            
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
            location = 'Barcelona'
        })

        it('should succeed on deleting members', async () => {

            const admin = await User.findOne({})
           
            
            await User.create({ name, surname, age, sex, location, email, password, mood, admin: admin._id })

            const member = await User.findOne({admin: admin._id})

            const result = await unRegisterUser(member._id)

            expect(result).to.be.undefined

            const __users = await User.find()

            expect(__users.length).to.equal(1)

            const [user] = __users

            expect(user.members).to.deep.equal([])

        })

        it('should succeed on deleting admins', async () => {

            const admin = await User.findOne({})

            const result = await unRegisterUser(admin._id)

            expect(result).to.be.undefined

            const _users = await User.find()

            expect(_users.length).to.equal(0)

        })
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})
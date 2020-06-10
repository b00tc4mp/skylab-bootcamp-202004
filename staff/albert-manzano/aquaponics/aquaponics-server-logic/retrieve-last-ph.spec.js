require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
require('aquaponics-commons/polyfills/json')
const retrieveLastPh = require('./retrieve-last-ph')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Ph } } = require('aquaponics-data')

describe('logic - retrieveLastPh', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, role, phone, date
    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                role = 'admin'
                phone = random()
                Ph.deleteMany()
                date = new Date()
            })
    )

    describe('when user already exist', () => {
        beforeEach(() => {
            const admin = { name, surname, email, password, role, phone }
            return Promise.all([
                User.create(admin),
                Ph.create({ ph: 7, date }),
                Ph.create({ ph: 8, date }),
                Ph.create({ ph: 8, date })
            ])
            .then(([result]) => userId = result.id)
        })

        it('should return last ph', () => {
            return retrieveLastPh(userId)
                .then(lastPh => {
                    Ph.find()
                    
                    expect(lastPh).to.be.an.instanceOf(Object)
                    expect(lastPh.date).to.exist
                    expect(lastPh.date).to.be.an.instanceOf(Date)
                    expect(lastPh.ph).to.exist
                    expect(lastPh.ph).to.be.a('number')
                    expect(lastPh.ph).to.equal(8)
                })
        })

        it('use app as user should fail', () => {
            const user = { name, surname, email: "hello@gmail.com", password, role: "user", phone }
            return User.create(user)
                .then(result => userId = result.id)
                .then()
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`your role does not allow you to acces here`)
                })
        })
    })

    it('should return a type error', () => {
        userId = undefined
        expect(() => {
            retrieveLastPh(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 9
        expect(() => {
            retrieveLastPh(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect(() => {
            retrieveLastPh(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = ''
        expect(() => {
            retrieveLastPh(userId)
        }).to.throw(Error, `${userId} is empty or blank`)
    })

    describe('when user does not exist', () => {
        it('should fail when user does not exists', () => {
            userId = '123455678990'
            return retrieveLastPh(userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.exist
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error.message).to.equal(`user with ${userId} does not exist`)
                })
        })
    })


    afterEach(() => User.deleteMany())

    after(() => mongoose.disconnect)
})
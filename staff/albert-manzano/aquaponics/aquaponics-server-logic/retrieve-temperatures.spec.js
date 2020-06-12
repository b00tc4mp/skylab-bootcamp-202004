require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
require('aquaponics-commons/polyfills/json')
const retrieveTemperatures = require('./retrieve-temperatures')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Temperature } } = require('aquaponics-data')

describe('logic - retrieveTemperatures', () => {
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
                Temperature.deleteMany()
                date = new Date()
            })
    )

    describe('when user already exist', () => {
        beforeEach(() => {
            const admin = { name, surname, email, password, role, phone }
            return Promise.all([
                User.create(admin),
                Temperature.create({ temperature: 25, date }),
                Temperature.create({ temperature: 20, date }),
                Temperature.create({ temperature: 26, date })
            ])
            .then(([result]) => userId = result.id)
        })

        it('should return last temperature', () => {
            return retrieveTemperatures(userId)
                .then(temperatures=> {
                    Temperature.find()
                    expect(temperatures).to.be.an.instanceOf(Array)
                    expect(temperatures[0].date).to.exist
                    expect(temperatures[1].date).to.exist
                    expect(temperatures[2].date).to.exist
                    expect(temperatures[0].temperature).to.exist
                    expect(temperatures[1].temperature).to.exist
                    expect(temperatures[2].temperature).to.exist
                    expect(temperatures[0].date).to.be.an.instanceOf(Date)
                    expect(temperatures[1].date).to.be.an.instanceOf(Date)
                    expect(temperatures[2].date).to.be.an.instanceOf(Date)
                    expect(temperatures[0].temperature).to.be.a('number')
                    expect(temperatures[1].temperature).to.be.a('number')
                    expect(temperatures[2].temperature).to.be.a('number')
                    expect(temperatures[0].temperature).to.equal(25)
                    expect(temperatures[1].temperature).to.equal(20)
                    expect(temperatures[2].temperature).to.equal(26)
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
            retrieveTemperatures(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 9
        expect(() => {
            retrieveTemperatures(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect(() => {
            retrieveTemperatures(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = ''
        expect(() => {
            retrieveTemperatures(userId)
        }).to.throw(Error, `${userId} is empty or blank`)
    })

    describe('when user does not exist', () => {
        it('should fail when user does not exists', () => {
            userId = '123455678990'
            return retrieveTemperatures(userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.exist
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error.message).to.equal(`user with ${userId} does not exist`)
                })
        })
    })


    afterEach(async () => {
        await User.deleteMany()
        await Temperature.deleteMany()
    })

    after(async () => await mongoose.disconnect)
})
require('dotenv').config()

const { env: { MONGODB_URL_TEST: MONGODB_URL } } = process
require('aquaponics-commons/polyfills/json')
const retrieveLastTemperature = require('./retrieve-last-temperature')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Temperature } } = require('aquaponics-data')
global.fetch = require('node-fetch')
const context = require('./context')
const AsyncStorage = require('not-async-storage')
const { API_URL } = require('./context')

context.__storage__ = AsyncStorage
context.API_URL = API_URL

describe('logic - retrieveLastTemperature', () => {
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
            return retrieveLastTemperature(userId)
                .then(lastTemperature => {
                    expect(lastTemperature).to.be.an.instanceOf(Object)
                    expect(lastTemperature.date).to.exist
                    expect(lastTemperature.date).to.be.an.instanceOf(Date)
                    expect(lastTemperature.temperature).to.exist
                    expect(lastTemperature.temperature).to.be.a('number')
                    expect(lastTemperature.temperature).to.equal(26)
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

      describe('when user does not exist', () => {
        it('should fail when user does not exists', () => {
            userId = '123455678990'
            return retrieveLastTemperature(userId)
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
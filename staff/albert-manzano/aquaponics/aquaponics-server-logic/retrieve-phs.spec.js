require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process
require('aquaponics-commons/polyfills/json')
const retrievePhs = require('./retrieve-phs')
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Ph } } = require('aquaponics-data')

describe('logic - retrievePhs', () => {
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
                Ph.create({ ph: 6, date }),
                Ph.create({ ph: 7, date }),
                Ph.create({ ph: 7, date })
            ])
                .then(([result]) => userId = result.id)
        })

        it('should array of phs', () => {
            return retrievePhs(userId)
                .then(phs => {
                    expect(phs).to.be.an.instanceOf(Array)
                    expect(phs.length).to.equal(3)
                    expect(phs[0].date).to.exist
                    expect(phs[1].date).to.exist
                    expect(phs[2].date).to.exist
                    expect(phs[0].ph).to.exist
                    expect(phs[1].ph).to.exist
                    expect(phs[2].ph).to.exist
                    expect(phs[0].date).to.be.an.instanceOf(Date)
                    expect(phs[1].date).to.be.an.instanceOf(Date)
                    expect(phs[2].date).to.be.an.instanceOf(Date)
                    expect(phs[0].ph).to.be.a('number')
                    expect(phs[1].ph).to.be.a('number')
                    expect(phs[2].ph).to.be.a('number')
                    expect(phs[0].ph).to.equal(6)
                    expect(phs[1].ph).to.equal(7)
                    expect(phs[2].ph).to.equal(7)
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
            retrievePhs(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = 9
        expect(() => {
            retrievePhs(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = true
        expect(() => {
            retrievePhs(userId)
        }).to.throw(TypeError, `${userId} is not a string`)

        userId = ''
        expect(() => {
            retrievePhs(userId)
        }).to.throw(Error, `${userId} is empty or blank`)
    })

    describe('when user does not exist', () => {
        it('should fail when user does not exists', () => {
            userId = '123455678990'
            return retrievePhs(userId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.exist
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error.message).to.equal(`user with ${userId} does not exist`)
                })
        })
    })


    afterEach(() => {
        return Promise.all([
            User.deleteMany(),
            Ph.deleteMany()
        ])
    })

    after(() => mongoose.disconnect)
})
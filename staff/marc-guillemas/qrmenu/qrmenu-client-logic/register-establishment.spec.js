require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL  } } = process

const registerEstablishment = require('./register-establishment')
const { random } = Math
const { expect } = require('chai')
require('qrmenu-commons/polyfills/json')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')
const { mongo } = require('qrmenu-data')
const bcrypt = require('bcryptjs')
const context = require('./context')
require('qrmenu-commons/ponyfills/xhr')

context.API_URL = API_URL

describe('logic - register establishment', () => {
    let establishments
    before(() => mongo.connect(MONGODB_URL)
        .then(connection => establishments = connection.db().collection('establishments'))
    )

    let  establishment, nif, email, password

    beforeEach(() =>
        establishments.deleteMany()
            .then(() => {
                establishment = `establishment-${random()}`
                nif = `${generateNIF()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )

    it('should succeed on valid data', () =>
        
        registerEstablishment(establishment, nif, email, password)
            .then(() => establishments.find().toArray())
            .then(establishments => {
                debugger
                expect(establishments.length).to.equal(1)

                const [_establishment] = establishments

                expect(_establishment.establishment).to.equal(establishment)
                expect(_establishment.nif).to.equal(nif)
                expect(_establishment.staff[0].email).to.equal(email)

                return bcrypt.compare(password, _establishment.staff[0].password)
            })
            .then(match => expect(match).to.be.true)
    )

    // describe('when user already exists', () => {
    //     beforeEach(() => User.create({ nif, email, password }))

    //     it('should fail on trying to register an existing user', () =>
    //         registerUser(establishment, nif, email, password)
    //             .then(() => { throw new Error('should not reach this point') })
    //             .catch(error => {
    //                 expect(error).to.exist

    //                 expect(error).to.be.an.instanceof(Error)
    //                 expect(error.message).to.equal(`user with e-mail ${email} already exists`)
    //             })
    //     )
    // })

    // afterEach(() => establishments.deleteMany())

    after(() => establishments.deleteMany({}).then(mongo.disconnect))
})
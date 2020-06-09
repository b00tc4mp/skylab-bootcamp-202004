require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const authenticateEstablishment = require('./authenticate-establishment')
const { random } = Math
const { expect } = require('chai')
require('qrmenu-commons/polyfills/json')
const { mongoose, models: { Establishment } } = require('qrmenu-data')
const bcrypt = require('bcryptjs')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')

describe('logic - authenticate user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, nif, email, password, establishmentId, hash

    beforeEach(() =>
        Establishment.deleteMany()
        .then(() => {
            name = `name-${random()}`
            nif =  generateNIF()
            email = `e-${random()}@mail.com`
            password = `password${random()}`

            return bcrypt.hash(password, 10)
        })
        .then(_hash => hash = _hash)
    )

    describe('when user already exists', () => {
        debugger
        beforeEach(() =>
            Establishment.create({ name, nif, email, password: hash })
                .then(establishment => establishmentId = establishment.id)
        )

        it('should succeed on correct credentials', () =>
            authenticateEstablishment(email, password)
                .then(_userId => expect(_userId).to.equal(establishmentId))
        )

        it('should fail on wrong password', () => {
            password += 'wrong-'

            return authenticateEstablishment(email, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`wrong password`)
                })
        })
    })

    it('should fail when user does not exist', () =>
        authenticateEstablishment(email, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
            })
    )

    afterEach(() => Establishment.deleteMany())

    after(mongoose.disconnect)
})
require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveEstablishment = require('./retrieve-establishment')
const { random } = Math
const { expect } = require('chai')
require('qrmenu-commons/polyfills/json')
const { mongoose, models: { Establishment } } = require('qrmenu-data')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')
describe('logic - retrieve user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let establishment, nif, email, password, establishmentId

    beforeEach(() =>
        Establishment.deleteMany()
        .then(() => {
            establishment = `name-${random()}`
            nif =  generateNIF()
            email = `e-${random()}@mail.com`
            password = `password${random()}`
        })
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            Establishment.create({ establishment, nif, email, password })
                .then(establishment => establishmentId = establishment.id)
        )

        it('should succeed on correct user id', () =>
            retrieveEstablishment(establishmentId)
                .then(_establishment => {
                    debugger
                    expect(_establishment.establishment).to.equal(establishment)
                    expect(_establishment.nif).to.equal(nif)
                    expect(_establishment.email).to.equal(email)
                    expect(_establishment.password).to.be.undefined
                    expect(_establishment.dishes).to.be.undefined
                    expect(_establishment.orders).to.be.undefined
                    expect(_establishment.staff).to.be.undefined
                })
        )
    })

    it('should fail when user does not exist', () => {
        const establishmentId = '5ed1204ee99ccf6fae798aef'

        return retrieveEstablishment(establishmentId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with id ${establishmentId} does not exist`)
            })
    })

    afterEach(() => Establishment.deleteMany())

    after(mongoose.disconnect)
})
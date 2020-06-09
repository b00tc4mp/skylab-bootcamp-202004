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

    let name, nif, email, password, establishmentId

    beforeEach(() =>
        Establishment.deleteMany()
        .then(() => {
            name = `name-${random()}`
            nif =  generateNIF()
            email = `e-${random()}@mail.com`
            password = `password${random()}`
        })
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            Establishment.create({ name, nif, email, password })
                .then(establishment => establishmentId = establishment.id)
        )

        it('should succeed on correct user id', () =>
            retrieveEstablishment(establishmentId)
                .then(establishment => {
                    expect(establishment.name).to.equal(name)
                    expect(establishment.nif).to.equal(nif)
                    expect(establishment.email).to.equal(email)
                    expect(establishment.password).to.be.undefined
                    expect(establishment.dishes).to.be.undefined
                    expect(establishment.orders).to.be.undefined
                    expect(establishment.staff).to.be.undefined
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
require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const retrieveEstablishment = require('./retrieve-establishment')
const { random } = Math
const { expect } = require('chai')
require('qrmenu-commons/polyfills/json')
const { mongoose, models: { Establishment } } = require('qrmenu-data')
const {utils: {generateNIF: {generateNIF}}} = require('qrmenu-commons')
const bcrypt = require('bcryptjs')
describe('logic - retrieve worker', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let establishment, nif, email, password, establishmentId, hash

    beforeEach(() =>
        Establishment.deleteMany()
        .then(() => {
            establishment = `establishment-${random()}`
            nif =  generateNIF()
            email = `e-${random()}@mail.com`
            password = `password${random()}`

            return bcrypt.hash(password, 10)
        })
        .then(_hash => hash = _hash)
    )

    describe('when user already exists', () => {
        beforeEach(() =>
            Establishment.create({ establishment, nif, staff: [{email, password: hash}] })
                .then(establishment => establishmentId = establishment.id)
        )

        it('should succeed on correct worker id', () => {
            retrieveEstablishment(establishmentId)
            .then(_establishment => {
                
                expect(_establishment).to.equal(establishment)
            })
            
            
            
        })
    })

    it('should fail when user does not exist', () => {
        const establishmentId = '5ed1204ee99ccf6fae798aef'

        return retrieveEstablishment(establishmentId)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`Establishment with id ${establishmentId} does not exist`)
            })
    })

    afterEach(() => Establishment.deleteMany())

    after(mongoose.disconnect)
})
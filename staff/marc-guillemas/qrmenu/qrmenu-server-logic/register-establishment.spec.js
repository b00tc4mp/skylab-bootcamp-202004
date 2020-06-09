require('dotenv').config()

const {env: {TEST_MONGODB_URL: MONGODB_URL}} = process

const registerEstablishment = require('./register-establishment')
const { random } = Math
const { expect } = require('chai')
const { utils: {generateNIF: {generateNIF}} } = require('qrmenu-commons')
const bcrypt = require('bcryptjs')
const { models: { Establishment }, mongoose } = require('qrmenu-data')

describe('logic - register establishment', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, nif, email, password

    beforeEach(() => 
        Establishment.deleteMany()
            .then(() => {
                name = `name-${random()}`
                nif =  generateNIF()
                email = `e-${random()}@mail.com`
                password = `password${random()}`
            })
    )

    it('should succeed on valid data', async () => {
        const result = await registerEstablishment(name, nif, email, password)

        expect(result).to.be.undefined

        const establishments = await Establishment.find()

        expect(establishments.length).to.equal(1)

        const [establishment] = establishments

        expect(establishment.name).to.equal(name)
        expect(establishment.nif).to.equal(nif)
        expect(establishment.email).to.equal(email)

        const match = await bcrypt.compare(password, establishment.password)

        expect(match).to.be.true
    })

    describe('when establishment already exists', () => {
        beforeEach(() => Establishment.create({ name, nif, email, password }))

        it('should fail on trying to register an existing user', async () => {
            try {
                await registerEstablishment(name, nif, email, password)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with nif ${nif} already exists`)
            }
        })
    })

    afterEach(() => Establishment.deleteMany())


    after(() => mongoose.disconnect())
})
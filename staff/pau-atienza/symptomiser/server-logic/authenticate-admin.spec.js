require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const authenticateAdmin = require('./authenticate-admin')
const { random } = Math
const { expect } = require('chai')
require('commons/polyfills/json')
const { mongoose, models: { Admin } } = require('data')
const bcrypt = require('bcryptjs')
const { errors: { UnexistenceError, VoidError, CredentialsError } } = require('commons')

describe('server logic - authenticate admin', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let username, email, password, adminId, hash

    beforeEach(() =>
        Admin.deleteMany()
            .then(() => {
                username = `username-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                return bcrypt.hash(password, 10)
            })
            .then(_hash => hash = _hash)
    )

    describe('when admin already exists', () => {
        beforeEach(() =>
            Admin.create({ username, email, password: hash })
                .then(admin => adminId = admin.id)
        )

        it('should succeed on correct credentials', () =>
            authenticateAdmin(email, password)
                .then(_adminId => expect(_adminId).to.equal(adminId))
        )

        it('should fail on wrong password', () => {
            password += 'wrong-'

            return authenticateAdmin(email, password)
                .catch(error => {
                    expect(error).to.be.an.instanceof(CredentialsError)
                    expect(error.message).to.equal(`wrong password`)
                })
        })
    })

    it('should fail when admin does not exist', () =>
        authenticateAdmin(email, password)
            .catch(error => {
                expect(error).to.be.an.instanceof(UnexistenceError)
                expect(error.message).to.equal(`Admin with e-mail ${email} does not exist`)
            })
    )

    it('should fail when inputs with incorrect format are introduced', async () => {

        try {
            authenticateAdmin( "", password)

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(VoidError)
            expect(error.message).to.equal(`string is empty or blank`)
        }

        try {
            authenticateAdmin( email, "")

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(VoidError)
            expect(error.message).to.equal(`string is empty or blank`)
        }

        try {
            authenticateAdmin( [""], password)

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(` is not a string`)
        }

        try {
            authenticateAdmin( email, [""])

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(` is not a string`)
        }
    })

    afterEach(() => Admin.deleteMany())

    after(mongoose.disconnect)
})
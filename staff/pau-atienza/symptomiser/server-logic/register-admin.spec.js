require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL } } = process

const registerAdmin = require('./register-admin')
const { random } = Math
const { expect } = require('chai')
require('commons/polyfills/json')
const { mongoose, models: { Admin } } = require('data')
const bcrypt = require('bcryptjs')

const { errors: { DuplicityError, VoidError } } = require('commons')

describe('logic - register admin', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let username, email, password

    beforeEach(async () => {
        await Admin.deleteMany()

        username = `username-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should succeed on valid data', async () => {
        const result = await registerAdmin(username, email, password)

        expect(result).to.be.undefined

        const admins = await Admin.find()

        expect(admins.length).to.equal(1)

        const [admin] = admins

        expect(admin.username).to.equal(username)
        expect(admin.email).to.equal(email)

        const match = await bcrypt.compare(password, admin.password)

        expect(match).to.be.true
    })

    describe('when admin already exists', () => {
        beforeEach(() => Admin.create({ username, email, password }))

        it('should fail on trying to register an existing admin', async () => {
            try {
                await registerAdmin(username, email, password)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(DuplicityError)
                expect(error.message).to.equal(`${email} is already in use`)
            }
        })
    })

    it('should fail when inputs with incorrect format are introduced', async () => {
        try {
            registerAdmin("", email, password)

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(VoidError)
            expect(error.message).to.equal(`string is empty or blank`)
        }

        try {
            registerAdmin(username, "", password)

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(VoidError)
            expect(error.message).to.equal(`string is empty or blank`)
        }

        try {
            registerAdmin(username, email, "")

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(VoidError)
            expect(error.message).to.equal(`string is empty or blank`)
        }

        try {
            registerAdmin([], email, password)

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(` is not a string`)
        }

        try {
            registerAdmin(username, [""], password)

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(` is not a string`)
        }

        try {
            registerAdmin(username, email, [""])

        } catch (error) {
            expect(error).to.exist

            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(` is not a string`)
        }
    })

    afterEach(() => Admin.deleteMany())

    after(mongoose.disconnect)
})
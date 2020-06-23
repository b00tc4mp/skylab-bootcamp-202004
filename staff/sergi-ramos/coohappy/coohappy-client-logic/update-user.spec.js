require('dotenv').config()

const { env: { TEST_MONGODB_URL: MONGODB_URL, JWT_SECRET } } = process

const updateUser = require('./update-user')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('coohappy-data')

const jwtPromised = require('jsonwebtoken')
global.fetch = require('node-fetch')
const notAsyncStorage = require('not-async-storage')
const logic = require('.')
const atob = require('atob')

const bcrypt = require('bcryptjs')
const { errors: { CredentialsError, VoidError } } = require('coohappy-commons')

describe('logic - update-user', () => {
    before(() => mongoose.connect(MONGODB_URL))

    let name, surname, email, password, userId, hash, newName, newSurname, newEmail, newPassword

    beforeEach(() =>
        User.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`

                newName = `newName-${random()}`
                newSurname = `newSurname-${random()}`
                newEmail = `newEmail-${random()}`
                newPassword = `newPassword-${random()}`

                return bcrypt.hash(password, 10)
            })
            .then(_hash => hash = _hash)
            .then(() => User.create({ name, surname, email, password: hash }))
            .then(user => { userId = user.id })
            .then(() => jwtPromised.sign({ sub: userId }, JWT_SECRET))
            .then(token => logic.__context__.storage.setItem('TOKEN', token))
    )
    describe('when user already exists', () => {

        it('should succeed on correct credentials, 2 changes name and password', async () => {
            await updateUser({ name: newName, oldPassword: password, newPassword })
            const user = await User.findById(userId)
            const match = await bcrypt.compare(newPassword, user.password)
            expect(user.name).to.equal(newName)
            expect(match).to.equal(true)
        })
        it('should succeed on correct credentials, 2 changes surname and email without newPassword', async () => {
            await updateUser({ email: newEmail, surname: newSurname, oldPassword: password })
            const user = await User.findById(userId)

            expect(user.surname).to.equal(newSurname)
            expect(user.email).to.equal(newEmail)
        })
    })

    describe('when data is empty or blank', () => {

        it('should faild on blank or empty data', async () => {

            try {
                await updateUser({ name: '', oldPassword: password })

            } catch (error) {

                const user = await User.findById(userId)
                expect(error).to.exist
                expect(error.message).to.equal('Some field is empty or blank')
                expect(user.name).to.equal(name)

            }

        })
        it('should fail on wrong oldPassword credentials', async () => {

            try {
                await updateUser( { email: newEmail, surname: newSurname, oldPassword: '123455678' })

            } catch (error) {
                const user = await User.findById(userId)
                expect(error).to.exist
                expect(error.message).to.equal('Wrong password')
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)

            }
        })
        it('should fail on empty oldPassword credentials', async () => {

            try {
                await updateUser( { email: newEmail, surname: newSurname })

            } catch (error) {
                const user = await User.findById(userId)
                expect(error).to.exist
                expect(error.message).to.equal('missing password')
                expect(error instanceof Error).to.equal(true)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)

            }
        })
    })
    describe('when user does not exists', () => {

        beforeEach(() => User.deleteMany())
        it('should fail on correct credentials, 2 changes name and password', async () => {
            try {
                await updateUser( { name: newName, oldPassword: password, newPassword })
                throw new Error('this error has not to appear')
            } catch (error) {

                expect(error).to.exist
                expect(error.message).to.equal(`User with id ${userId} does not exist`)
            }
        })
    })


    afterEach( async () => await User.deleteMany())

    after(mongoose.disconnect)
})
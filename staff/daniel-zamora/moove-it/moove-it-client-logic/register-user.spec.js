require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } } = process
const { mongoose, models: { User } } = require('moove-it-data')
global.XMLHttpRequest = require('xhr2')

const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
// const { errors: { DuplicityError, CredentialsError } } = require('moove-it-commons')
const context = require('./context')

context.API_URL = API_URL

describe('logic - register user', () => {
    before(() =>
        mongoose.connect(MONGODB_URL).then(() => User.deleteMany()))

    let name, surname, email, password, passwordConfirmation

    beforeEach(() => {
        

        name = `name`
        surname = `surname`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
        passwordConfirmation = password
    })


    it('should succeed on valid data', async () => {
        
        await registerUser(name, surname, email, password, passwordConfirmation)
        const user = await User.findOne({email})
        // const [user] = users
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
    })

    describe('when user already exists', () => {
        beforeEach(() => {
            return User.create({ name, surname, email, password })
        })

        it('should fail on trying to register an existing user', () =>
            registerUser(name, surname, email, password, passwordConfirmation)
                .then(() => { throw new Error("Should throw error") })
                .catch(error => {
                    expect(error).to.be.an.instanceof(Error)
                    expect(error.message).to.equal(`${email} already exist`)
                })
        )
    })

    it('should fail when incorrect inputs are introduced', () => {
        try {
            registerUser(1, surname, email, password, passwordConfirmation)
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try {
            registerUser('', surname, email, password, passwordConfirmation)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is not alphabetic`)
        }

        try {
            registerUser(name, 1, email, password, passwordConfirmation)
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try {
            registerUser(name, '', email, password, passwordConfirmation)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is not alphabetic`)
        }

        try {
            registerUser(name, surname, 1, password, passwordConfirmation)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`1 is not an e-mail`)
        }

        try {
            registerUser(name, surname, '', password, passwordConfirmation)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(` is not an e-mail`)
        }

        try {
            registerUser(name, surname, email, 1, passwordConfirmation)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`1 is not a string`)
        }

        try {
            registerUser(name, surname, email, '', passwordConfirmation)
        } catch (error) {
            expect(error).to.be.an.instanceof(Error)
            expect(error.message).to.equal(`"" length is not greater or equal than 8`)
        }
    })

    afterEach(() => User.deleteMany())
    after(mongoose.disconnect)

})
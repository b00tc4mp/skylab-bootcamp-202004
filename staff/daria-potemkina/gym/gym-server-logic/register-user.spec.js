require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const registerUser = require('./register-user')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('gym-data')
const bcrypt = require('bcryptjs')

describe('logic - registerUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let name, surname, email, password, _name, _surname, _email, _password

    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should add a user to the database', async() => {
        const result = await registerUser(name, surname, email, password)

        expect(result).to.be.undefined

        const users = await User.find()

        expect(users).to.have.lengthOf(1)

        const [user] = users

        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)

        const match = await bcrypt.compare(password, user.password)
        expect(match).to.be.true

    })

    describe('when user already exists', () => {
        beforeEach(() => User.create({ name, surname, email, password }))

        it('should return an error when the user already exists', async () => {
            try {
                await registerUser(name, surname, email, password)

                throw new Error('should not reach this point')

            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with e-mail ${email} already exists`)
            }
        })
    })

        it('should return an type error when synchronous error exists', () => {
            _name = undefined
            expect(() => {
                registerUser(_name, surname, email, password)
            }).to.throw(TypeError, `${_name} is not a string`)

            _name = 123
            expect(() => {
                registerUser(_name, surname, email, password)
            }).to.throw(TypeError, `${_name} is not a string`)

            _name = true
            expect(() => {
                registerUser(_name, surname, email, password)
            }).to.throw(TypeError, `${_name} is not a string`)

            _surname = undefined
            expect(() => {
                registerUser(name, _surname, email, password)
            }).to.throw(TypeError, `${_surname} is not a string`)

            _surname = 123
            expect(() => {
                registerUser(name, _surname, email, password)
            }).to.throw(TypeError, `${_surname} is not a string`)

            _surname = true
            expect(() => {
                registerUser(name, _surname, email, password)
            }).to.throw(TypeError, `${_surname} is not a string`)

            _email = undefined
            expect(() => {
                registerUser(name, surname, _email, password)
            }).to.throw(TypeError, `${_email} is not a string`)

            _email = 123
            expect(() => {
                registerUser(name, surname, _email, password)
            }).to.throw(TypeError, `${_email} is not a string`)

            _email = true
            expect(() => {
                registerUser(name, surname, _email, password)
            }).to.throw(TypeError, `${_email} is not a string`)

            _password = undefined
            expect(() => {
                registerUser(name, surname, email, _password)
            }).to.throw(TypeError, `${_password} is not a string`)

            _password = 123
            expect(() => {
                registerUser(name, surname, email, _password)
            }).to.throw(TypeError, `${_password} is not a string`)

            _password = true
            expect(() => {
                registerUser(name, surname, email, _password)
            }).to.throw(TypeError, `${_password} is not a string`)

        })

        it('should return an error when synchronous error exists', () => {
            _name = ''
            expect(() => {
                registerUser(_name, surname, email, password)
            }).to.throw(Error, 'string is empty or blank')

            _name = '    '
            expect(() => {
                registerUser(_name, surname, email, password)
            }).to.throw(Error, 'string is empty or blank')

            _surname = ''
            expect(() => {
                registerUser(name, _surname, email, password)
            }).to.throw(Error, 'string is empty or blank')

            _surname = '    '
            expect(() => {
                registerUser(name, _surname, email, password)
            }).to.throw(Error, 'string is empty or blank')

            _email = ''
            expect(() => {
                registerUser(name, surname, _email, password)
            }).to.throw(Error, 'string is empty or blank')

            _email = '    '
            expect(() => {
                registerUser(name, surname, _email, password)
            }).to.throw(Error, 'string is empty or blank')

            _email = 'pepito.perez'
            expect(() => {
                registerUser(name, surname, _email, password)
            }).to.throw(Error, `${_email} is not an e-mail`)

            _email = 'pepito.perez@mail'
            expect(() => {
                registerUser(name, surname, _email, password)
            }).to.throw(Error, `${_email} is not an e-mail`)

            _email = 'pepito.perez.com'
            expect(() => {
                registerUser(name, surname, _email, password)
            }).to.throw(Error, `${_email} is not an e-mail`)

            _password = ''
            expect(() => {
                registerUser(name, surname, email, _password)
            }).to.throw(Error, 'string is empty or blank')

            _password = '    '
            expect(() => {
                registerUser(name, surname, email, _password)
            }).to.throw(Error, 'string is empty or blank')

        })

        afterEach(() => User.deleteMany())

        after(mongoose.disconnect)
    })
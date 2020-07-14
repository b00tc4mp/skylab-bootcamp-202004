require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
const { mongoose, models: { User } } = require('gym-data')
const bcrypt = require('bcryptjs')

describe('logic - authenticateUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    let name, surname, email, password, userId, _email, _password, hash

    beforeEach(async () => {
        await User.deleteMany()

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`

        hash = await bcrypt.hash(password, 10)
    })

    describe('when user already exists', () => {
        beforeEach(async () => {
            const user = await User.create({ name, surname, email, password: hash })

            userId = user._id.toString()
        })

        it('should secceed on correct credentials', async () => {
            const _userId = await authenticateUser(email, password)

            expect(_userId).to.equal(userId)
        })


        it('should fail on wrong credentials - password', async () => {
            _password = '123456789'

            try {
                await authenticateUser(email, _password)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal('wrong credentials')
            }
        })
    })

    it('should fail when user does not exist', async () => {
        try {
            await authenticateUser(email, password)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error)
            expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
        }
    })


    it('it should return an type error', () => {
        _email = undefined
        expect(() => {
            authenticateUser(_email, password)
        }).to.throw(TypeError, `${_email} is not a string`)

        _email = 123
        expect(() => {
            authenticateUser(_email, password)
        }).to.throw(TypeError, `${_email} is not a string`)

        _email = true
        expect(() => {
            authenticateUser(_email, password)
        }).to.throw(TypeError, `${_email} is not a string`)

        _password = undefined
        expect(() => {
            authenticateUser(email, _password)
        }).to.throw(TypeError, `${_password} is not a string`)

        _password = 123
        expect(() => {
            authenticateUser(email, _password)
        }).to.throw(TypeError, `${_password} is not a string`)

        _password = true
        expect(() => {
            authenticateUser(email, _password)
        }).to.throw(TypeError, `${_password} is not a string`)
    })

    it('should return an error', () => {
        _email = ''
        expect(() => {
            authenticateUser(_email, password)
        }).to.throw(Error, 'string is empty or blank')

        _email = '    '
        expect(() => {
            authenticateUser(_email, password)
        }).to.throw(Error, 'string is empty or blank')

        _email = 'pepito.perez'
        expect(() => {
            authenticateUser(_email, password)
        }).to.throw(Error, `${_email} is not an e-mail`)

        _email = 'pepito.perez@mail'
        expect(() => {
            authenticateUser(_email, password)
        }).to.throw(Error, `${_email} is not an e-mail`)

        _email = 'pepito.perez.com'
        expect(() => {
            authenticateUser(_email, password)
        }).to.throw(Error, `${_email} is not an e-mail`)

        _password = ''
        expect(() => {
            authenticateUser(email, _password)
        }).to.throw(Error, 'string is empty or blank')

        _password = '   '
        expect(() => {
            authenticateUser(email, _password)
        }).to.throw(Error, 'string is empty or blank')
    })

    afterEach(() => User.deleteMany())

    after(mongoose.disconnect)
})
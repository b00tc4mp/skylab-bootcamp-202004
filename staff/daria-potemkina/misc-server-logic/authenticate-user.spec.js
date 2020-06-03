require('dotenv').config()

const { env: { MONGODB_URL_TEST } } = process

const authenticateUser = require('./authenticate-user')
const { random } = Math
const { expect } = require('chai')
const { mongo } = require('misc-data')

describe('logic - authenticateUser', () => {
    let users

    before(() =>
        mongo.connect(MONGODB_URL_TEST)
            .then(connection => users = connection.db().collection('users')))

    let name, surname, email, password, userId, _email, _password

    beforeEach(() => 
        users.deleteMany()
            .then(() => {
                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
            })
    )

    describe('when user already exists', () => {
        beforeEach(() => {
            const user = { name, surname, email, password }

            return users.insertOne(user)
                .then(result => userId = result.insertedId.toString())
        })

        it('should secceed on correct credentials', () => {
            return authenticateUser(email, password)
                .then(_userId => expect(_userId).to.equal(userId))
        })

        it('should fail on wrong credentials - password', () => {
            _password = '123456789'

            return authenticateUser(email, _password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).to.exist
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error.message).to.equal('wrong credentials')
                })
        })
    })

    it('should fail when user does not exist', () => {
        return authenticateUser(email, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal(`user with e-mail ${email} does not exist`)
            })
    })


    it('it should return an type error', () => {
        _email = undefined
        expect( () => {
            authenticateUser(_email, password)
        }).to.throw(TypeError, `${_email} is not a string`)

        _email = 123
        expect( () => {
            authenticateUser(_email, password)
        }).to.throw(TypeError, `${_email} is not a string`)

        _email = true
        expect( () => {
            authenticateUser(_email, password)
        }).to.throw(TypeError, `${_email} is not a string`)

        _password = undefined
        expect( () => {
            authenticateUser(email, _password)
        }).to.throw(TypeError, `${_password} is not a string`)

        _password = 123
        expect( () => {
            authenticateUser(email, _password)
        }).to.throw(TypeError, `${_password} is not a string`)

        _password = true
        expect( () => {
            authenticateUser(email, _password)
        }).to.throw(TypeError, `${_password} is not a string`)
    })

    it('should return an error', () => {
        _email = ''
        expect( () => {
            authenticateUser(_email, password)
        }).to.throw(Error, `${_email} is empty or blank`)

        _email = '    '
        expect( () => {
            authenticateUser(_email, password)
        }).to.throw(Error, `${_email} is empty or blank`)

        _email = 'pepito.perez'
        expect( () => {
            authenticateUser(_email, password)
        }).to.throw(Error, `${_email} is not an e-mail`)

        _email = 'pepito.perez@mail'
        expect( () => {
            authenticateUser(_email, password)
        }).to.throw(Error, `${_email} is not an e-mail`)

        _email = 'pepito.perez.com'
        expect( () => {
            authenticateUser(_email, password)
        }).to.throw(Error, `${_email} is not an e-mail`)

        _password = ''
        expect( () => {
            authenticateUser(email, _password)
        }).to.throw(Error, `${_password} is empty or blank`)

        _password = '   '
        expect( () => {
            authenticateUser(email, _password)
        }).to.throw(Error, `${_password} is empty or blank`)
    })

    afterEach(() => users.deleteMany())

    after(() => users.deleteMany().then(mongo.disconnect))
})
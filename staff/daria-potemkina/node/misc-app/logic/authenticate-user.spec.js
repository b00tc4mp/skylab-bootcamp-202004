const authenticateUser = require('./authenticate-user')
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const uid = require('../utils/uid')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
require('../utils/json')

describe('logic - authenticateUser', () =>{
    let id, name, surname, email, password, _email, _password

    const data = path.join(__dirname, '..', 'data', 'users')

    beforeEach(done =>{
        deleteFilesByExtensionFromDirectory(data, '.json', error =>{
            if(error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`
            id = uid()

            fs.writeFile(path.join(data, `${id}.json`), JSON.prettify({ id, name, surname, email, password }), error =>{
                if(error) return done(error)

                done()
            })
        })
    })

    it('should succed on correct data', done =>{
        authenticateUser(email, password, (error, userId) =>{
            expect(error).to.be.null
            expect(userId).to.equal(id)

            done()
        })
    })

    it('should fail on wrong credentials - e-mail', done =>{
        _email = 'pepito@mail.com'

        authenticateUser(_email, password, (error, userId) =>{
            expect(error).to.exist
            expect(error.message).to.equal(`user with e-mail ${_email} does not exist`)

            expect(userId).to.be.undefined

            done()
        })
    })

    it('should fail on wrong credentials - password', done =>{
        _password = '123456789'

        authenticateUser(email, _password, (error, userId) =>{
            expect(error).to.exist
            expect(error.message).to.equal('wrong password')

            expect(userId).to.be.undefined

            done()
        })
    })

    it('it should return an type error', () =>{
        _email = undefined
        expect(function () {
            authenticateUser(_email, password, function(){})
        }).to.throw(TypeError, `${_email} is not a string`)

        _email = 123
        expect(function () {
            authenticateUser(_email, password, function(){})
        }).to.throw(TypeError, `${_email} is not a string`)

        _email = true
        expect(function () {
            authenticateUser(_email, password, function(){})
        }).to.throw(TypeError, `${_email} is not a string`)

        _password = undefined
        expect(function () {
            authenticateUser(email, _password, function(){})
        }).to.throw(TypeError, `${_password} is not a string`)

        _password = 123
        expect(function () {
            authenticateUser(email, _password, function(){})
        }).to.throw(TypeError, `${_password} is not a string`)

        _password = true
        expect(function () {
            authenticateUser(email, _password, function(){})
        }).to.throw(TypeError, `${_password} is not a string`)

        expect(function () {
            authenticateUser(email, password, undefined)
        }).to.throw(TypeError, 'undefined is not a function')

        expect(function () {
            authenticateUser(email, password, 123)
        }).to.throw(TypeError, '123 is not a function')

        expect(function () {
            authenticateUser(email, password, false)
        }).to.throw(TypeError, 'false is not a function')
    })

    it('should return an error', () =>{
        _email = ''
        expect(function () {
            authenticateUser(_email, password, function(){})
        }).to.throw(Error, `${_email} is empty or blank`)

        _email='    '
        expect(function () {
            authenticateUser(_email, password, function(){})
        }).to.throw(Error, `${_email} is empty or blank`)

        _email = 'pepito.perez'
        expect(function () {
            authenticateUser(_email, password, function(){})
        }).to.throw(Error, `${_email} is not an e-mail`)

        _email = 'pepito.perez@mail'
        expect(function () {
            authenticateUser(_email, password, function(){})
        }).to.throw(Error, `${_email} is not an e-mail`)

        _email = 'pepito.perez.com'
        expect(function () {
            authenticateUser(_email, password, function(){})
        }).to.throw(Error, `${_email} is not an e-mail`)

        _password = 'pepa'
        expect(function () {
            authenticateUser(email, _password, function(){})
        }).to.throw(Error, `${_password} length is not greater or equal than 8`)
    })

    afterEach(done => {
        deleteFilesByExtensionFromDirectory(data, '.json', error => {
            if (error) return done(error)

            done()
        })
    })
})
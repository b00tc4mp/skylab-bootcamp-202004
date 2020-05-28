const registerUser = require('./register-user')
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const uid = require('../utils/uid')
require('../utils/json')


describe('logic - registerUser', () => {
    let name, surname, email, password, _name, _surname, _email, _password

    const data = path.join(__dirname, '..', 'data', 'users')

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(data, '.json', error => {
            if (error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`

            done()
        })
    })

    it('should register an user in Data', done => {
        registerUser(name, surname, email, password, (error, id) => {
            expect(error).to.be.null

            expect(id).to.be.a('string')

            fs.readdir(data, (error, files) => {
                expect(error).to.be.null

                userFile = files.filter(file => path.extname(file) === '.json')

                expect(userFile).to.have.lengthOf(1)
                expect(userFile.includes(`${id}.json`)).to.be.true

                fs.readFile(path.join(data, `${id}.json`), (error, file) => {
                    expect(error).to.be.null

                    const { id: _id, name: _name, surname: _surname, email: _email, password: _password } = JSON.parse(file)

                    expect(_id).to.equal(id)
                    expect(_name).to.equal(name)
                    expect(_surname).to.equal(surname)
                    expect(_email).to.equal(email)
                    expect(_password).to.equal(password)

                    done()
                })


            })
        })
    })

    it('shout return an error when the user already exists', done => {
        const id = uid()
        fs.writeFile(path.join(data, `${id}.json`), JSON.prettify({ id, name, surname, email, password }), error => {
            expect(error).to.be.null

            registerUser(name, surname, email, password, (error, _id) => {
                expect(error).to.exist
                expect(error.message).to.equal(`user with ${email} is already exists`)

                expect(_id).to.be.undefined

                fs.readdir(data, (error, files) => {
                    expect(error).to.be.null

                    userFile = files.filter(file => path.extname(file) === '.json')

                    expect(userFile).to.have.lengthOf(1)
                    expect(userFile.includes(`${id}.json`)).to.be.true

                    done()
                })
            })
        })
    })

    it('should return an type error when synchronous error exists', () => {
        _name = undefined
        expect(function () {
            registerUser(_name, surname, email, password, function(){})
        }).to.throw(TypeError, `${_name} is not a string`)

        _name = 123
        expect(function () {
            registerUser(_name, surname, email, password, function(){})
        }).to.throw(TypeError, `${_name} is not a string`)

        _name = true
        expect(function () {
            registerUser(_name, surname, email, password, function(){})
        }).to.throw(TypeError, `${_name} is not a string`)

        _surname = undefined
        expect(function () {
            registerUser(name, _surname, email, password, function(){})
        }).to.throw(TypeError, `${_surname} is not a string`)

        _surname = 123
        expect(function () {
            registerUser(name, _surname, email, password, function(){})
        }).to.throw(TypeError, `${_surname} is not a string`)

        _surname = true
        expect(function () {
            registerUser(name, _surname, email, password, function(){})
        }).to.throw(TypeError, `${_surname} is not a string`)

        _email = undefined
        expect(function () {
            registerUser(name, surname, _email, password, function(){})
        }).to.throw(TypeError, `${_email} is not a string`)

        _email = 123
        expect(function () {
            registerUser(name, surname, _email, password, function(){})
        }).to.throw(TypeError, `${_email} is not a string`)

        _email = true
        expect(function () {
            registerUser(name, surname, _email, password, function(){})
        }).to.throw(TypeError, `${_email} is not a string`)

        _password = undefined
        expect(function () {
            registerUser(name, surname, email, _password, function(){})
        }).to.throw(TypeError, `${_password} is not a string`)

        _password = 123
        expect(function () {
            registerUser(name, surname, email, _password, function(){})
        }).to.throw(TypeError, `${_password} is not a string`)

        _password = true
        expect(function () {
            registerUser(name, surname, email, _password, function(){})
        }).to.throw(TypeError, `${_password} is not a string`)

        expect(function () {
            registerUser(name, surname, email, password, undefined)
        }).to.throw(TypeError, 'undefined is not a function')

        expect(function () {
            registerUser(name, surname, email, password, 123)
        }).to.throw(TypeError, '123 is not a function')

        expect(function () {
            registerUser(name, surname, email, password, false)
        }).to.throw(TypeError, 'false is not a function')

    })

    it('should return an error when synchronous error exists', () =>{
        _name = ''
        expect(function () {
            registerUser(_name, surname, email, password, function(){})
        }).to.throw(Error, `${_name} is empty or blank`)

        _name='    '
        expect(function () {
            registerUser(_name, surname, email, password, function(){})
        }).to.throw(Error, `${_name} is empty or blank`)

        _surname = ''
        expect(function () {
            registerUser(name, _surname, email, password, function(){})
        }).to.throw(Error, `${_surname} is empty or blank`)

        _surname='    '
        expect(function () {
            registerUser(name, _surname, email, password, function(){})
        }).to.throw(Error, `${_surname} is empty or blank`)

        _email = ''
        expect(function () {
            registerUser(name, surname, _email, password, function(){})
        }).to.throw(Error, `${_email} is empty or blank`)

        _email='    '
        expect(function () {
            registerUser(name, surname, _email, password, function(){})
        }).to.throw(Error, `${_email} is empty or blank`)

        _email = 'pepito.perez'
        expect(function () {
            registerUser(name, surname, _email, password, function(){})
        }).to.throw(Error, `${_email} is not an e-mail`)

        _email = 'pepito.perez@mail'
        expect(function () {
            registerUser(name, surname, _email, password, function(){})
        }).to.throw(Error, `${_email} is not an e-mail`)

        _email = 'pepito.perez.com'
        expect(function () {
            registerUser(name, surname, _email, password, function(){})
        }).to.throw(Error, `${_email} is not an e-mail`)

        _password = 'pepa'
        expect(function () {
            registerUser(name, surname, email, _password, function(){})
        }).to.throw(Error, `${_password} length is not greater or equal than 8`)

    })

    afterEach(done => {
        deleteFilesByExtensionFromDirectory(data, '.json', error => {
            if (error) return done(error)

            done()
        })
    })
})
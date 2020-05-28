const retrieveUser = require('./retrieve-user')
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
const uid = require('../utils/uid')
require('../utils/json')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')


describe('logic - retrieveUser', () =>{
    let id, name, surname, email, password, _id

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

    it('should return the user data', done =>{
        retrieveUser(id, (error, user) =>{
            expect(error).to.be.null

            expect(user.id).to.be.undefined
            expect(user.password).to.be.undefined
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)

            done()
        })
    })

    it('should return an error on wrong id', done =>{
        _id = '123455678990'
        retrieveUser(_id, (error, user)=>{
            expect(error).to.be.exist
            expect(error.message).to.equal(`user with id ${_id} does not exist`)

            expect(user).to.be.undefined

            done()
        })
    })

    it('should return a type error', () =>{
        _id = undefined
        expect(function () {
            retrieveUser(_id, function(){})
        }).to.throw(TypeError, `${_id} is not a string`)

        _id = 123
        expect(function () {
            retrieveUser(_id, function(){})
        }).to.throw(TypeError, `${_id} is not a string`)

        _id = true
        expect(function () {
            retrieveUser(_id, function(){})
        }).to.throw(TypeError, `${_id} is not a string`)

        expect(function () {
            retrieveUser(id, undefined)
        }).to.throw(TypeError, 'undefined is not a function')

        expect(function () {
            retrieveUser(id, 123)
        }).to.throw(TypeError, '123 is not a function')

        expect(function () {
            retrieveUser(id, false)
        }).to.throw(TypeError, 'false is not a function')
    })

    it('should return an error', () =>{
        _id = ''
        expect(function () {
            retrieveUser(_id, function(){})
        }).to.throw(Error, `${_id} is empty or blank`)

        _id='    '
        expect(function () {
            retrieveUser(_id, function(){})
        }).to.throw(Error, `${_id} is empty or blank`)
    })

    afterEach(done => {
        deleteFilesByExtensionFromDirectory(data, '.json', error => {
            if (error) return done(error)

            done()
        })
    })
})
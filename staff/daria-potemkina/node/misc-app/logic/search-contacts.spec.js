const searchContacts = require('./search-contacts')
const { random, floor } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
require('../utils/json')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const { find } = require('../data/users')

describe('logic-searchContacts', () => {
    let userId, name, surname, email, phone, birthdate, country, _name, _surname, _email, password, contactId, query, _userId

    const data = path.join(__dirname, '..', 'data', 'contacts')
    const _data = path.join(__dirname, '..', 'data', 'users')

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(data, '.json', error => {
            if (error) return done(error)

            deleteFilesByExtensionFromDirectory(_data, '.json', error => {
                if (error) return done(error)

                _name = `name-${random()}`
                _surname = `surname-${random()}`
                _email = `e-${random()}@mail.com`
                password = `password-${random()}`
                userId = uid()

                fs.writeFile(path.join(_data, `${userId}.json`), JSON.prettify({ id: userId, name: _name, surname: _surname, email: _email, password }), error => {
                    if (error) done(error)

                    find({ id: userId }, (error, [user]) => {
                        if (error) done(error)

                        userId = user.id
                        name = `name-${random()}`
                        surname = `surname-${random()}`
                        email = `e-${random()}@mail.com`
                        phone = `${random()}`
                        birthdate = `${floor(random() * 10)}-${floor(random() * 10)}-${floor(random() * 10000)}`
                        country = `country-${random()}`
                        contactId = uid()

                        fs.writeFile(path.join(data, `${contactId}.json`), JSON.prettify({ user: userId, name, surname, email, phone, birthdate, country, id: contactId }), error => {
                            if (error) done(error)

                            done()
                        })

                    })
                })

            })

        })
    })

    it('should succed on correct data', done => {
        query = name
        searchContacts(userId, query, (error, results) => {
            expect(error).to.be.null

            expect(results).to.exist
            expect(results).to.be.a('array')
            expect(results.length).to.be.greaterThan(0)
            expect(results[0].name).to.equal(query)
            expect(results[0].surname).to.equal(surname)
            expect(results[0].email).to.equal(email)
            expect(results[0].phone).to.equal(phone)
            expect(results[0].birthdate).to.equal(birthdate)
            expect(results[0].country).to.equal(country)
            expect(results[0].id).to.equal(contactId)
            expect(results[0].user).to.equal(userId)

            done()
        })
    })

    it('should return no results when user has no contacts yet', done => {
        deleteFilesByExtensionFromDirectory(data, '.json', error => {
            expect(error).to.be.null

            searchContacts(userId, 'mail', (error, results) => {
                expect(error).to.exist
                expect(error.message).to.equal('contacts is empty')

                expect(results).to.be.undefined

                done()
            })
        })
    })

    it('should return an error when user does not exist', done => {
        deleteFilesByExtensionFromDirectory(_data, '.json', error => {
            expect(error).to.be.null
            
            searchContacts(userId, 'mail', (error, results) => {
                expect(error).to.exist
                expect(error.message).to.equal(`user with id ${userId} does not exist`)

                expect(results).to.be.undefined

                done()
            })
        })
    })

    it('should return a type error', () => {
        query = 'email'
        _userId = undefined
        expect(function () {
            searchContacts(_userId, query, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        _userId = 123
        expect(function () {
            searchContacts(_userId, query, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        _userId = false
        expect(function () {
            searchContacts(_userId, query, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        query = undefined
        expect(function () {
            searchContacts(userId, query, function () { })
        }).to.throw(TypeError, `${query} is not a string`)

        query = 123
        expect(function () {
            searchContacts(userId, query, function () { })
        }).to.throw(TypeError, `${query} is not a string`)

        query = true
        expect(function () {
            searchContacts(userId, query, function () { })
        }).to.throw(TypeError, `${query} is not a string`)

        query = 'email'
        expect(function () {
            searchContacts(userId, query, undefined)
        }).to.throw(TypeError, 'undefined is not a function')

        expect(function () {
            searchContacts(userId, query, 123)
        }).to.throw(TypeError, '123 is not a function')

        expect(function () {
            searchContacts(userId, query, false)
        }).to.throw(TypeError, 'false is not a function')
    })

    it('it should return an error', () => {
        _userId = ''
        expect(function () {
            searchContacts(_userId, query, function () { })
        }).to.throw(Error, `${_userId} is empty or blank`)

        _userId = '     '
        expect(function () {
            searchContacts(_userId, query, function () { })
        }).to.throw(Error, `${_userId} is empty or blank`)

        query = ''
        expect(function () {
            searchContacts(userId, query, function () { })
        }).to.throw(Error, `${query} is empty or blank`)

        query = '     '
        expect(function () {
            searchContacts(userId, query, function () { })
        }).to.throw(Error, `${query} is empty or blank`)
    })

    afterEach(done => {
        deleteFilesByExtensionFromDirectory(_data, '.json', error => {
            if (error) return done(error)

            deleteFilesByExtensionFromDirectory(data, '.json', error => {
                if (error) return done(error)

                done()
            })
        })
    })
})
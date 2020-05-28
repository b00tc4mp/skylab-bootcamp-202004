const listContacts = require('./list-contacts')
const { random, floor } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
require('../utils/json')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const { find } = require('../data/users')

describe('logic - listContacts', () => {
    let userId, name, surname, email, phone, birthdate, country, _name, _surname, _email, password, contactId, _userId

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

    it('should succed on correct data', done =>{
        listContacts(userId, (error, contacts) =>{
            expect(error).to.be.null

            expect(contacts).to.exist
            expect(contacts.length).to.be.greaterThan(0)
            expect(contacts[0].id).to.be.a('string')
            expect(contacts[0].user).to.be.a('string')
            expect(contacts[0].name).to.be.a('string')
            expect(contacts[0].surname).to.be.a('string')
            expect(contacts[0].email).to.be.a('string')
            expect(contacts[0].phone).to.be.a('string')
            expect(contacts[0].birthdate).to.be.a('string')
            expect(contacts[0].country).to.be.a('string')

            done()
        })
    })

    it('should return no results when user has no contacts yet', done => {
        deleteFilesByExtensionFromDirectory(data, '.json', error => {
            expect(error).to.be.null

            listContacts(userId, (error, contacts) => {
                expect(error).to.exist
                expect(error.message).to.equal('contacts is empty')

                expect(contacts).to.be.undefined

                done()
            })
        })
    })

    it('should return an error when user does not exist', done => {
        deleteFilesByExtensionFromDirectory(_data, '.json', error => {
            expect(error).to.be.null

            listContacts(userId, (error, contacts) => {
                expect(error).to.exist
                expect(error.message).to.equal(`user with id ${userId} does not exist`)

                expect(contacts).to.be.undefined

                done()
            })
        })
    })

    it('should return a type error', () => {
        _userId = undefined
        expect(function () {
            listContacts(_userId, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        _userId = 123
        expect(function () {
            listContacts(_userId, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        _userId = false
        expect(function () {
            listContacts(_userId, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        expect(function () {
            listContacts(userId, undefined)
        }).to.throw(TypeError, 'undefined is not a function')

        expect(function () {
            listContacts(userId, 123)
        }).to.throw(TypeError, '123 is not a function')

        expect(function () {
            listContacts(userId, false)
        }).to.throw(TypeError, 'false is not a function')
    })

    it('it should return an error', () => {
        _userId = ''
        expect(function () {
            listContacts(_userId, function () { })
        }).to.throw(Error, `${_userId} is empty or blank`)

        _userId = '     '
        expect(function () {
            listContacts(_userId, function () { })
        }).to.throw(Error, `${_userId} is empty or blank`)
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
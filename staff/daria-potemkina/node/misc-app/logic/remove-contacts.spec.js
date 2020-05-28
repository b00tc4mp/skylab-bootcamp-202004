const removeContacts = require('./remove-contacts')
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
const { random, floor } = Math
require('../utils/json')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const { find } = require('../data/users')

describe('logic-searchContacts', () => {
    let userId, name, surname, email, phone, birthdate, country, _name, _surname, _email, password, contactId, _userId, _contactId

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

    it('should remove the contact successfully', done =>{
        removeContacts(userId, contactId, error =>{
            expect(error).to.be.null

            fs.readdir(data, (error, files) =>{
                expect(error).to.be.null

                contactFiles = files.filter(file => path.extname(file) === '.json')

                expect(contactFiles.length).to.equal(0)

                done()
            })
        })
    })

    it('should return an error when user does not exist', done => {
        deleteFilesByExtensionFromDirectory(_data, '.json', error => {
            expect(error).to.be.null

            removeContacts(userId, contactId, error => {
                expect(error).to.exist
                expect(error.message).to.equal(`user with id ${userId} does not exist`)

                done()
            })
        })
    })

    it('should return an error when the contact to remove does not exist', done => {
        deleteFilesByExtensionFromDirectory(data, '.json', error => {
            expect(error).to.be.null

            removeContacts(userId, contactId, error => {
                expect(error).to.exist
                expect(error.message).to.equal(`contact with id ${contactId} does not exist`)

                done()
            })
        })
    })

    it('should return a type error', () => {
        _userId = undefined
        expect(function () {
            removeContacts(_userId, contactId, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        _userId = 123
        expect(function () {
            removeContacts(_userId, contactId, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        _userId = false
        expect(function () {
            removeContacts(_userId, contactId, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        _contactId = undefined
        expect(function () {
            removeContacts(userId, _contactId, function () { })
        }).to.throw(TypeError, `${_contactId} is not a string`)

        _contactId = 123
        expect(function () {
            removeContacts(userId, _contactId, function () { })
        }).to.throw(TypeError, `${_contactId} is not a string`)

        _contactId = false
        expect(function () {
            removeContacts(userId, _contactId, function () { })
        }).to.throw(TypeError, `${_contactId} is not a string`)

        expect(function () {
            removeContacts(userId, contactId, undefined)
        }).to.throw(TypeError, 'undefined is not a function')

        expect(function () {
            removeContacts(userId, contactId, 123)
        }).to.throw(TypeError, '123 is not a function')

        expect(function () {
            removeContacts(userId, contactId, false)
        }).to.throw(TypeError, 'false is not a function')
    })

    it('it should return an error', () => {
        _userId = ''
        expect(function () {
            removeContacts(_userId, contactId, function () { })
        }).to.throw(Error, `${_userId} is empty or blank`)

        _userId = '     '
        expect(function () {
            removeContacts(_userId, contactId, function () { })
        }).to.throw(Error, `${_userId} is empty or blank`)

        _contactId = ''
        expect(function () {
            removeContacts(userId, _contactId, function () { })
        }).to.throw(Error, `${_contactId} is empty or blank`)

        _contactId = '     '
        expect(function () {
            removeContacts(userId, _contactId, function () { })
        }).to.throw(Error, `${_contactId} is empty or blank`)
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
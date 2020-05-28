const searchStickies = require('./search-stickies')
const { random } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
require('../utils/json')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const { find } = require('../data/users')

describe.only('logic-searchStickies', () => {
    let userId, name, surname, email, password, stickyId, query, _userId

    const data = path.join(__dirname, '..', 'data', 'stickies')
    const _data = path.join(__dirname, '..', 'data', 'users')

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(data, '.json', error => {
            if (error) return done(error)

            deleteFilesByExtensionFromDirectory(_data, '.json', error => {
                if (error) return done(error)

                name = `name-${random()}`
                surname = `surname-${random()}`
                email = `e-${random()}@mail.com`
                password = `password-${random()}`
                userId = uid()

                fs.writeFile(path.join(_data, `${userId}.json`), JSON.prettify({ id: userId, name, surname, email, password }), error => {
                    if (error) done(error)

                    find({ id: userId }, (error, [user]) => {
                        if (error) done(error)

                        userId = user.id
                        note = `note-${random()}`
                        stickyId = uid()

                        fs.writeFile(path.join(data, `${stickyId}.json`), JSON.prettify({ user: userId, note, id: stickyId }), error => {
                            if (error) done(error)

                            done()
                        })

                    })
                })

            })

        })
    })

    it('should return a result', done => {
        query = 'note'
        searchStickies(userId, query, (error, results) => {
            expect(error).to.be.null

            expect(results).to.exist
            expect(results).to.be.a('array')
            expect(results.length).to.be.greaterThan(0)
            expect(results[0].note.includes(query)).to.be.true
            expect(results[0].id).to.equal(stickyId)
            expect(results[0].user).to.equal(userId)

            done()
        })
    })

    it('should return no results when user has no stickies yet', done => {
        deleteFilesByExtensionFromDirectory(data, '.json', error => {
            expect(error).to.be.null

            searchStickies(userId, 'note', (error, results) => {
                expect(error).to.exist
                expect(error.message).to.equal('stickies is empty')

                expect(results).to.be.undefined

                done()
            })
        })
    })

    it('should return an error when user does not exist', done => {
        deleteFilesByExtensionFromDirectory(_data, '.json', error => {
            expect(error).to.be.null
            
            searchStickies(userId, 'note', (error, results) => {
                expect(error).to.exist
                expect(error.message).to.equal(`user with id ${userId} does not exist`)

                expect(results).to.be.undefined

                done()
            })
        })
    })

    it('should return a type error', () => {
        query = 'note'
        _userId = undefined
        expect(function () {
            searchStickies(_userId, query, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        _userId = 123
        expect(function () {
            searchStickies(_userId, query, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        _userId = false
        expect(function () {
            searchStickies(_userId, query, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        query = undefined
        expect(function () {
            searchStickies(userId, query, function () { })
        }).to.throw(TypeError, `${query} is not a string`)

        query = 123
        expect(function () {
            searchStickies(userId, query, function () { })
        }).to.throw(TypeError, `${query} is not a string`)

        query = true
        expect(function () {
            searchStickies(userId, query, function () { })
        }).to.throw(TypeError, `${query} is not a string`)

        query = 'note'
        expect(function () {
            searchStickies(userId, query, undefined)
        }).to.throw(TypeError, 'undefined is not a function')

        expect(function () {
            searchStickies(userId, query, 123)
        }).to.throw(TypeError, '123 is not a function')

        expect(function () {
            searchStickies(userId, query, false)
        }).to.throw(TypeError, 'false is not a function')
    })

    it('it should return an error', () => {
        _userId = ''
        expect(function () {
            searchStickies(_userId, query, function () { })
        }).to.throw(Error, `${_userId} is empty or blank`)

        _userId = '     '
        expect(function () {
            searchStickies(_userId, query, function () { })
        }).to.throw(Error, `${_userId} is empty or blank`)

        query = ''
        expect(function () {
            searchStickies(userId, query, function () { })
        }).to.throw(Error, `${query} is empty or blank`)

        query = '     '
        expect(function () {
            searchStickies(userId, query, function () { })
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
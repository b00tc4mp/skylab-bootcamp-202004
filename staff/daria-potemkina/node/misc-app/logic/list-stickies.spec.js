const listStickies = require('./list-stickies')
const { random } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
require('../utils/json')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const { find } = require('../data/users')

describe('logic - listStickies', () => {
    let userId, name, surname, email, password, stickyId, _userId

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
                        stickytId = uid()

                        fs.writeFile(path.join(data, `${stickytId}.json`), JSON.prettify({ user: userId, note , id: stickytId }), error => {
                            if (error) done(error)

                            done()
                        })

                    })
                })

            })

        })
    })

    it('should return user stickies', done =>{
        listStickies(userId, (error, stickies) =>{
            expect(error).to.be.null

            expect(stickies).to.exist
            expect(stickies.length).to.be.greaterThan(0)
            expect(stickies[0].id).to.be.a('string')
            expect(stickies[0].user).to.be.a('string')
            expect(stickies[0].note).to.be.a('string')

            done()
        })
    })

    it('should return no results when user has no stickies yet', done => {
        deleteFilesByExtensionFromDirectory(data, '.json', error => {
            expect(error).to.be.null

            listStickies(userId, (error, stickies) => {
                expect(error).to.exist
                expect(error.message).to.equal('stickies is empty')

                expect(stickies).to.be.undefined

                done()
            })
        })
    })

    it('should return an error when user does not exist', done => {
        deleteFilesByExtensionFromDirectory(_data, '.json', error => {
            expect(error).to.be.null

            listStickies(userId, (error, stickies) => {
                expect(error).to.exist
                expect(error.message).to.equal(`user with id ${userId} does not exist`)

                expect(stickies).to.be.undefined

                done()
            })
        })
    })

    it('should return a type error', () => {
        _userId = undefined
        expect(function () {
            listStickies(_userId, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        _userId = 123
        expect(function () {
            listStickies(_userId, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        _userId = false
        expect(function () {
            listStickies(_userId, function () { })
        }).to.throw(TypeError, `${_userId} is not a string`)

        expect(function () {
            listStickies(userId, undefined)
        }).to.throw(TypeError, 'undefined is not a function')

        expect(function () {
            listStickies(userId, 123)
        }).to.throw(TypeError, '123 is not a function')

        expect(function () {
            listStickies(userId, false)
        }).to.throw(TypeError, 'false is not a function')
    })

    it('it should return an error', () => {
        _userId = ''
        expect(function () {
            listStickies(_userId, function () { })
        }).to.throw(Error, `${_userId} is empty or blank`)

        _userId = '     '
        expect(function () {
            listStickies(_userId, function () { })
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
const addSticky = require('./add-sticky')
const { random } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
require('../utils/json')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const { find } = require('../data/users')

describe('logic - addSticky', () => {
    let id, name, surname, email, password, note, _id, _note

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
                const userId = uid()

                fs.writeFile(path.join(_data, `${userId}.json`), JSON.stringify({ id: userId, name, surname, email, password }, null, 4), error => {
                    if (error) done(error)

                    find({ id: userId }, (error, [user]) => {
                        if (error) done(error)

                        id = user.id
                        note = `note-${random()}`

                        done()
                    })
                })

            })

        })
    })

    it('should add a sticky', done => {
        addSticky(id, { note }, (error, stickyId) => {
            expect(error).to.be.null

            expect(stickyId).to.be.a('string')

            fs.readdir(data, (error, files) => {
                expect(error).to.be.null

                stickyFiles = files.filter(file => path.extname(file) === '.json')

                expect(stickyFiles).to.have.lengthOf(1)
                expect(stickyFiles.includes(`${stickyId}.json`)).to.be.true

                fs.readFile(path.join(data, `${stickyId}.json`), (error, file) => {
                    expect(error).to.be.null

                    const content = JSON.parse(file)

                    expect(content.id).to.equal(stickyId)
                    expect(content.note).to.equal(note)
                    expect(content.user).to.equal(id)

                    done()
                })
            })
        })
    })

    it('should fail when the user does not exist', done => {
        deleteFilesByExtensionFromDirectory(_data, '.json', error => {
            if (error) done(error)

            addSticky(id, { note }, (error, stickyId) => {
                expect(error).to.exist
                expect(error.message).to.equal(`user id ${id} does not exist`)

                expect(stickyId).to.be.undefined

                done()
            })
        })
    })

    it('should return a type error', () => {
        _id = undefined
        expect(function () {
            addSticky(_id, { note }, function () { })
        }).to.throw(TypeError, `${_id} is not a string`)

        _id = 123
        expect(function () {
            addSticky(_id, { note }, function () { })
        }).to.throw(TypeError, `${_id} is not a string`)

        _id = false
        expect(function () {
            addSticky(_id, { note }, function () { })
        }).to.throw(TypeError, `${_id} is not a string`)

        _note = undefined
        expect(function () {
            addSticky(id, { note: _note }, function () { })
        }).to.throw(TypeError, `${_note} is not a string`)

        _note = 123
        expect(function () {
            addSticky(id, { note: _note }, function () { })
        }).to.throw(TypeError, `${_note} is not a string`)

        _note = false
        expect(function () {
            addSticky(_id, { note: _note }, function () { })
        }).to.throw(TypeError, `${_note} is not a string`)

        let sticky = undefined
        expect(function () {
            addSticky(id, sticky, function () { })
        }).to.throw(TypeError, `${sticky} is not an object`)

        sticky = 123
        expect(function () {
            addSticky(id, sticky, function () { })
        }).to.throw(TypeError, `${sticky} is not an object`)

        sticky = true
        expect(function () {
            addSticky(id, sticky, function () { })
        }).to.throw(TypeError, `${sticky} is not an object`)

        expect(function () {
            addSticky(id, { note }, undefined)
        }).to.throw(TypeError, 'undefined is not a function')

        expect(function () {
            addSticky(id, { note }, 123)
        }).to.throw(TypeError, '123 is not a function')

        expect(function () {
            addSticky(id, { note }, false)
        }).to.throw(TypeError, 'false is not a function')
    })

    it('should return an error', () => {
        _id = ''
        expect(function () {
            addSticky(_id, { note }, function () { })
        }).to.throw(Error, `${_id} is empty or blank`)

        _id = '    '
        expect(function () {
            addSticky(_id, { note }, function () { })
        }).to.throw(Error, `${_id} is empty or blank`)

        _note = ''
        expect(function () {
            addSticky(id, { note: _note }, function () { })
        }).to.throw(Error, `${_note} is empty or blank`)

        _note = '    '
        expect(function () {
            addSticky(id, { note: _note }, function () { })
        }).to.throw(Error, `${_note} is empty or blank`)
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

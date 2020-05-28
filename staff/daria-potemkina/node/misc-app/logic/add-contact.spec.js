const addContact = require('./add-contact')
const { random, floor } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
require('../utils/json')
const { deleteFilesByExtensionFromDirectory } = require('../utils/files')
const { find } = require('../data/users')

describe('logic - addContact', () => {
    let id, name, surname, email, phone, birthdate, country, _name, _surname, _email, password, __name, __surname, __email, __phone, __birthdate, __country, __id

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
                const userId = uid()

                fs.writeFile(path.join(_data, `${userId}.json`), JSON.stringify({ id: userId, name: _name, surname: _surname, email: _email, password }, null, 4), error => {
                    if (error) done(error)

                    find({ id: userId }, (error, [user]) => {
                        if (error) done(error)

                        id = user.id
                        name = `name-${random()}`
                        surname = `surname-${random()}`
                        email = `e-${random()}@mail.com`
                        phone = `${random()}`
                        birthdate = `${floor(random() * 10)}-${floor(random() * 10)}-${floor(random() * 10000)}`
                        country = `country-${random()}`

                        done()
                    })
                })

            })

        })
    })

    it('should succed on correct data', done => {
        addContact(id, { name, surname, email, phone, birthdate, country }, (error, contactId) => {
            expect(error).to.be.null

            expect(contactId).to.be.a('string')

            fs.readdir(data, (error, files) => {
                expect(error).to.be.null

                contactFiles = files.filter(file => path.extname(file) === '.json')

                expect(contactFiles).to.have.lengthOf(1)
                expect(contactFiles.includes(`${contactId}.json`)).to.be.true

                fs.readFile(path.join(data, `${contactId}.json`), (error, file) => {
                    expect(error).to.be.null

                    const content = JSON.parse(file)

                    expect(content.id).to.equal(contactId)
                    expect(content.name).to.equal(name)
                    expect(content.surname).to.equal(surname)
                    expect(content.email).to.equal(email)
                    expect(content.phone).to.equal(phone)
                    expect(content.birthdate).to.equal(birthdate)
                    expect(content.country).to.equal(country)
                    expect(content.user).to.equal(id)

                    done()
                })
            })
        })
    })

    it('should fail when the user does not exist', done =>{
        deleteFilesByExtensionFromDirectory(_data, '.json', error =>{
            if (error) done(error)

            addContact(id, { name, surname, email, phone, birthdate, country }, (error, contactId) =>{
                expect(error).to.exist
                expect(error.message).to.equal(`user id ${id} does not exist`)

                expect(contactId).to.be.undefined

                done()
            })
        }) 
    })

    it('should return a type error', () =>{
        __id = undefined
        expect(function () {
            addContact(__id, {name, surname, email, phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__id} is not a string`)

        __id = 123
        expect(function () {
            addContact(__id, {name, surname, email, phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__id} is not a string`)

        __id = false
        expect(function () {
            addContact(__id, {name, surname, email, phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__id} is not a string`)

        __name = undefined
        expect(function () {
            addContact(id, {name: __name, surname, email, phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__name} is not a string`)

        __name = 123
        expect(function () {
            addContact(id, {name: __name, surname, email, phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__name} is not a string`)

        __name = true
        expect(function () {
            addContact(id, {name: __name, surname, email, phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__name} is not a string`)

        __surname = 123
        expect(function () {
            addContact(id, {name, surname: __surname, email, phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__surname} is not a string`)

        __surname = true
        expect(function () {
            addContact(id, {name, surname: __surname, email, phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__surname} is not a string`)

        __email = 123
        expect(function () {
            addContact(id, {name, surname, email: __email, phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__email} is not a string`)

        __email = true
        expect(function () {
            addContact(id, {name, surname, email: __email, phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__email} is not a string`)

        __phone = undefined
        expect(function () {
            addContact(id, {name, surname, email, phone: __phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__phone} is not a string`)

        __phone = 123
        expect(function () {
            addContact(id, {name, surname, email, phone: __phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__phone} is not a string`)

        __phone = true
        expect(function () {
            addContact(id, {name, surname, email, phone: __phone, birthdate, country}, function(){})
        }).to.throw(TypeError, `${__phone} is not a string`)

        __birthdate = 123
        expect(function () {
            addContact(id, {name, surname, email, phone, birthdate: __birthdate, country}, function(){})
        }).to.throw(TypeError, `${__birthdate} is not a string`)

        __birthdate = true
        expect(function () {
            addContact(id, {name, surname, email, phone, birthdate: __birthdate, country}, function(){})
        }).to.throw(TypeError, `${__birthdate} is not a string`)

        __country = 123
        expect(function () {
            addContact(id, {name, surname, email, phone, birthdate, country: __country}, function(){})
        }).to.throw(TypeError, `${__country} is not a string`)

        __country = true
        expect(function () {
            addContact(id, {name, surname, email, phone, birthdate, country: __country}, function(){})
        }).to.throw(TypeError, `${__country} is not a string`)

        let contact = undefined
        expect(function () {
            addContact(id, contact, function(){})
        }).to.throw(TypeError, `${contact} is not an object`)

        contact = 123
        expect(function () {
            addContact(id, contact, function(){})
        }).to.throw(TypeError, `${contact} is not an object`)

        contact = true
        expect(function () {
            addContact(id, contact, function(){})
        }).to.throw(TypeError, `${contact} is not an object`)

        expect(function () {
            addContact(id, {name, surname, email, __phone, birthdate, country}, undefined)
        }).to.throw(TypeError, 'undefined is not a function')

        expect(function () {
            addContact(id, {name, surname, email, __phone, birthdate, country}, 123)
        }).to.throw(TypeError, '123 is not a function')

        expect(function () {
            addContact(id, {name, surname, email, __phone, birthdate, country}, false)
        }).to.throw(TypeError, 'false is not a function')
    })

    it('should return an error', () =>{
        __id = ''
        expect(function () {
            addContact(__id, {name, surname, email, phone, birthdate, country}, function(){})
        }).to.throw(Error, `${__id} is empty or blank`)

        __id = '    '
        expect(function () {
            addContact(__id, {name, surname, email, phone, birthdate, country}, function(){})
        }).to.throw(Error, `${__id} is empty or blank`)

        __name = ''
        expect(function () {
            addContact(id, {name: __name, surname, email, phone, birthdate, country}, function(){})
        }).to.throw(Error, `${__name} is empty or blank`)

        __name='    '
        expect(function () {
            addContact(id, {name: __name, surname, email, phone, birthdate, country}, function(){})
        }).to.throw(Error, `${__name} is empty or blank`)

        __surname='    '
        expect(function () {
            addContact(id, {name, surname: __surname, email, phone, birthdate, country}, function(){})
        }).to.throw(Error, `${__surname} is empty or blank`)

        __email='    '
        expect(function () {
            addContact(id, {name, surname, email: __email, phone, birthdate, country}, function(){})
        }).to.throw(Error, `${__email} is empty or blank`)

        __email = 'pepito.perez'
        expect(function () {
            addContact(id, {name, surname, email: __email, phone, birthdate, country}, function(){})
        }).to.throw(Error, `${__email} is not an e-mail`)

        __email = 'pepito.perez@mail'
        expect(function () {
            addContact(id, {name, surname, email: __email, phone, birthdate, country}, function(){})
        }).to.throw(Error, `${__email} is not an e-mail`)

        __email = 'pepito.perez.com'
        expect(function () {
            addContact(id, {name, surname, email: __email, phone, birthdate, country}, function(){})
        }).to.throw(Error, `${__email} is not an e-mail`)

        __phone='    '
        expect(function () {
            addContact(id, {name, surname, email, phone: __phone, birthdate, country}, function(){})
        }).to.throw(Error, `${__phone} is empty or blank`)

        __birthdate='    '
        expect(function () {
            addContact(id, {name, surname, email, phone, birthdate: __birthdate, country}, function(){})
        }).to.throw(Error, `${__birthdate} is empty or blank`)

        __country='    '
        expect(function () {
            addContact(id, {name, surname, email, phone, birthdate, country: __country}, function(){})
        }).to.throw(Error, `${__country} is empty or blank`)
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

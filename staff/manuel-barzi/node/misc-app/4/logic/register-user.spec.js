const registerUser = require('./register-user')
const { random } = Math
const fs = require('fs')
const path = require('path')
const { expect } = require('chai')
require('../utils/polyfills/json')
const { Files: { deleteFilesByExtensionFromDirectory }, uid } = require('../utils')

describe('logic - register user', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password

    beforeEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            name = `name-${random()}`
            surname = `surname-${random()}`
            email = `e-${random()}@mail.com`
            password = `password-${random()}`

            done()
        })
    })

    it('should succeed on valid data', done => {
        registerUser(name, surname, email, password, error => {
            expect(error).to.be.null

            fs.readdir(path.join(data, 'users'), (error, files) => {
                if (error) return done(error)

                files = files.filter(file => path.extname(file) === '.json')

                expect(files.length).to.equal(1)

                const [file] = files

                fs.readFile(path.join(data, 'users', file), 'utf8', (error, json) => {
                    expect(error).to.be.null

                    expect(json).to.exist

                    const user = JSON.parse(json)

                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)

                    done()
                })
            })

        })
    })

    describe('when user already exists', () => {
        beforeEach(done => {
            const userId = uid()

            const user = { name, surname, email, password, id: userId }

            fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(user), error => {
                if (error) return done(error)

                done()
            })
        })

        it('should fail on trying to register an existing user', done => {
            registerUser(name, surname, email, password, error => {
                expect(error).to.exist

                expect(error).to.be.an.instanceof(Error)
                expect(error.message).to.equal(`user with e-mail ${email} already exists`)

                done()
            })
        })
    })

    afterEach(done => {
        deleteFilesByExtensionFromDirectory(path.join(data, 'users'), '.json', error => {
            if (error) return done(error)

            done()
        })
    })
})
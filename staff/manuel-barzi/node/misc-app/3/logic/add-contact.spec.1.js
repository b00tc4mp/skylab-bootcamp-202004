const addContact = require('./add-contact')
const { random } = Math
const fs = require('fs')
const path = require('path')
const uid = require('../utils/uid')
const { expect } = require('chai')
require('../utils/json')

describe.only('logic - addContact', () => {
    const data = path.join(__dirname, '..', 'data')

    let name, surname, email, password, userId

    beforeEach(done => {
        fs.readdir(path.join(data, 'users'), (error, files) => {
            if (error) return done(error)

            files = files.filter(file => path.extname(file) === '.json')

            debugger

            if (!files.length) {
                fs.readdir(path.join(data, 'contacts'), (error, files) => {
                    if (error) return done(error)

                    files = files.filter(file => path.extname(file) === '.json')

                    if (!files.length) {
                        name = `name-${random()}`
                        surname = `surname-${random()}`
                        email = `e-${random()}@mail.com`
                        password = `password-${random()}`
                        userId = uid()

                        const user = { name, surname, email, password }

                        fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(user), error => {
                            if (error) return done(error)

                            done()
                        })

                        return
                    }

                    let deleted = 0

                    files.forEach(file => fs.unlink(path.join(data, 'contacts', file), error => {
                        if (error) return done(error)

                        deleted++

                        if (deleted === files.length) {
                            name = `name-${random()}`
                            surname = `surname-${random()}`
                            email = `e-${random()}@mail.com`
                            password = `password-${random()}`
                            userId = uid()

                            const user = { name, surname, email, password }

                            fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(user), error => {
                                if (error) return done(error)

                                done()
                            })
                        }
                    }))
                })

                return
            }

            let deleted = 0

            files.forEach(file => fs.unlink(path.join(data, 'users', file), error => {
                if (error) return done(error)

                deleted++

                if (deleted === files.length) {
                    fs.readdir(path.join(data, 'contacts'), (error, files) => {
                        if (error) return done(error)

                        files = files.filter(file => path.extname(file) === '.json')

                        let deleted = 0

                        files.forEach(file => fs.unlink(path.join(data, 'contacts', file), error => {
                            if (error) return done(error)

                            deleted++

                            if (deleted === files.length) {
                                name = `name-${random()}`
                                surname = `surname-${random()}`
                                email = `e-${random()}@mail.com`
                                password = `password-${random()}`
                                userId = uid()

                                const user = { name, surname, email, password }

                                fs.writeFile(path.join(data, 'users', `${userId}.json`), JSON.prettify(user), error => {
                                    if (error) return done(error)

                                    done()
                                })
                            }
                        }))
                    })
                }
            }))
        })
    })

    it('should succeed on valid data', done => {
        addContact(userId, { name, surname, email }, (error, id) => {
            expect(error).to.be.null

            expect(id).to.be.a('string')

            fs.readFile(path.join(data, 'contacts', `${id}.json`), 'utf8', (error, content) => {
                expect(error).to.be.null

                expect(content).to.exist

                const contact = JSON.parse(content)

                expect(contact.name).to.equal(name)
                expect(contact.surname).to.equal(surname)
                expect(contact.email).to.equal(email)

                done()
            })
        })
    })

    false && afterEach(done => {
        fs.readdir(path.join(data, 'users'), (error, files) => {
            if (error) return done(error)

            files = files.filter(file => path.extname(file) === '.json')

            if (!files.length) {
                fs.readdir(path.join(data, 'contacts'), (error, files) => {
                    if (error) return done(error)

                    files = files.filter(file => path.extname(file) === '.json')

                    let deleted = 0

                    files.forEach(file => fs.unlink(path.join(data, 'contacts', file), error => {
                        if (error) return done(error)

                        deleted++

                        if (deleted === files.length) {
                            done()
                        }
                    }))
                })

                return
            }

            let deleted = 0

            files.forEach(file => fs.unlink(path.join(data, 'users', file), error => {
                if (error) return done(error)

                deleted++

                if (deleted === files.length) {
                    fs.readdir(path.join(data, 'contacts'), (error, files) => {
                        if (error) return done(error)

                        files = files.filter(file => path.extname(file) === '.json')

                        let deleted = 0

                        files.forEach(file => fs.unlink(path.join(data, 'contacts', file), error => {
                            if (error) return done(error)

                            deleted++

                            if (deleted === files.length) {
                                done()
                            }
                        }))
                    })
                }
            }))
        })
    })
})
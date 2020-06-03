const { expect } = require('chai')
const registerUser = require('./register-user')
global.XMLHttpRequest = require('xhr2')
const { utils: { call } } = require('misc-commons')
const { random } = Math
// TODO do not use call for creating scenarios, but misc-data and direct db CRUD

describe('registerUser', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `e-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should succeed on correct data', done => {
        registerUser(name, surname, email, password, error => {
            expect(error).to.be.undefined

            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                `{ "username": "${email}", "password": "${password}" }`,
                { 'Content-type': 'application/json' },
                (error, status, body) => {
                    expect(error).to.be.null
                    expect(status).to.equal(200)

                    const { token } = JSON.parse(body)

                    expect(token).to.exist

                    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                        undefined,
                        { Authorization: `Bearer ${token}` },
                        (error, status, body) => {
                            expect(error).to.be.null
                            expect(status).to.equal(200)

                            const user = JSON.parse(body)

                            expect(user.name).to.equal(name)
                            expect(user.surname).to.equal(surname)
                            expect(user.username).to.equal(email)
                            expect(user.password).to.be.undefined

                            done()
                        }
                    )
                })
        })
    })

    describe('when user already exists', () => {
        beforeEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
                { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (error) return done(new Error(error.message))
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))

                    done()
                })
        })

        it('should fail alerting user already exists', done => {
            registerUser(name, surname, email, password, error => {
                expect(error).to.exist

                expect(error.message).to.equal(`user with username \"${email}\" already exists`)

                done()
            })
        })
    })

    it.skip('should fail on non-string field', () => {
        expect(() => {
            registerUser(undefined, surname, email, password, function () { })
        }).to.throw(TypeError, 'undefined is not a string')

        expect(() => {
            registerUser(1, surname, email, password, function () { })
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            registerUser(true, surname, email, password, function () { })
        }).to.throw(TypeError, 'true is not a string')

        expect(() => {
            registerUser(name, undefined, email, password, function () { })
        }).to.throw(TypeError, 'undefined is not a string')

        expect(() => {
            registerUser(name, 1, email, password, function () { })
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            registerUser(name, true, email, password, function () { })
        }).to.throw(TypeError, 'true is not a string')

        // TODO same for the other fields
    })

    it.skip('should fail on non-alphabetic field', () => {
        expect(() => {
            registerUser('1', surname, email, password, function () { })
        }).to.throw(Error, '1 is not alphabetic')

        expect(() => {
            registerUser('$', surname, email, password, function () { })
        }).to.throw(Error, '$ is not alphabetic')

        expect(() => {
            registerUser('%', surname, email, password, function () { })
        }).to.throw(Error, '% is not alphabetic')

        expect(() => {
            registerUser(name, '&', email, password, function () { })
        }).to.throw(Error, '& is not alphabetic')

        expect(() => {
            registerUser(name, '(', email, password, function () { })
        }).to.throw(Error, '( is not alphabetic')

        expect(() => {
            registerUser(name, '?', email, password, function () { })
        }).to.throw(Error, '? is not alphabetic')

        // TODO same for the other fields
    })

    it.skip('should fail on non-function callback', () => {
        expect(() => {
            registerUser(name, surname, email, password, 1)
        }).to.throw(TypeError, '1 is not a function')

        expect(() => {
            registerUser(name, surname, email, password, true)
        }).to.throw(TypeError, 'true is not a function')

        expect(() => {
            registerUser(name, surname, email, password, 'text')
        }).to.throw(TypeError, 'text is not a function')

        expect(() => {
            registerUser(name, surname, email, password)
        }).to.throw(TypeError, 'undefined is not a function')
    })

    afterEach(done => {
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
            `{ "username": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (error) return done(error)
                if (status !== 200) return done(new Error(`unexpected status ${status}`))

                const { token } = JSON.parse(body)

                call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    `{ "password": "${password}" }`,
                    {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    (error, status, body) => {
                        if (error) return done(new Error(error.message))
                        if (status !== 204) return done(new Error(`undexpected status ${status}`))

                        done()
                    })
            })
    })
})
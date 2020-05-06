describe('registerUser', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    it('should succeed on correct data', done => {
        registerUser(name, surname, email, password, error => {
            expect(error).to.be.undefined

            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                `{ "username": "${email}", "password": "${password}" }`,
                { 'Content-type': 'application/json' },
                (error, status, body) => {
                    expect(error).to.be.undefined
                    expect(status).to.equal(200)

                    const { token } = JSON.parse(body)

                    expect(token).to.exist

                    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                        undefined,
                        { Authorization: `Bearer ${token}` },
                        (error, status, body) => {
                            expect(error).to.be.undefined
                            expect(status).to.equal(200)

                            const user = JSON.parse(body)

                            expect(user.name).to.equal(name)
                            expect(user.surname).to.equal(surname)
                            expect(user.username).to.equal(email)
                            expect(user.password).to.be.undefined

                            done()

                        })
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

        it('should fail because el user already exist', done => {
            registerUser(name, surname, email, password, error => {
                expect(error).to.exist

                expect(error.message).to.equal(`user with username \"${email}\" already exists`)

                done()
            })
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


    it('should return an type error', () => {
        expect(function () {
            registerUser(undefined, surname, email, password, function(){})
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            registerUser(name, undefined, email, password, function(){})
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            registerUser(name, surname, undefined, password, function(){})
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            registerUser(name, surname, email, undefined, function(){})
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            registerUser(true, surname, email, password, function(){})
        }).to.throw(TypeError, 'true is not a string')

        expect(function () {
            registerUser(name, true, email, password, function(){})
        }).to.throw(TypeError, 'true is not a string')

        expect(function () {
            registerUser(name, surname, false, password, function(){})
        }).to.throw(TypeError, 'false is not a string')

        expect(function () {
            registerUser(name, surname, email, false, function(){})
        }).to.throw(TypeError, 'false is not a string')

        expect(function () {
            registerUser(123, surname, email, password, function(){})
        }).to.throw(TypeError, '123 is not a string')

        expect(function () {
            registerUser(name, 5, email, password, function(){})
        }).to.throw(TypeError, '5 is not a string')

        expect(function () {
            registerUser(name, surname, 5, password, function(){})
        }).to.throw(TypeError, '5 is not a string')

        expect(function () {
            registerUser(name, surname, email, 12345678, function(){})
        }).to.throw(TypeError, '12345678 is not a string')

    })

    it('shoul return an error', function () {
        expect(function () {
            registerUser('123', surname, email, password, function(){})
        }).to.throw(Error, '123 contains non-alphabetic characters')

        expect(function () {
            registerUser('Juan-David', surname, email, password, function(){})
        }).to.throw(Error, 'Juan-David contains non-alphabetic characters')

        expect(function () {
            registerUser('???', surname, email, password, function(){})
        }).to.throw(Error, '??? contains non-alphabetic characters')

        expect(function () {
            registerUser(name, 'grillo?', email, password, function(){})
        }).to.throw(Error, 'grillo? contains non-alphabetic characters')

        expect(function () {
            registerUser(name, '123', email, password, function(){})
        }).to.throw(Error, '123 contains non-alphabetic characters')

        expect(function () {
            registerUser(name, '123', email, password, function(){})
        }).to.throw(Error, '123 contains non-alphabetic characters')

        expect(function () {
            registerUser(name, surname, 'pepito', password, function(){})
        }).to.throw(Error, 'pepito is not an email')

        expect(function () {
            registerUser(name, surname, 'pepito@mail', password, function(){})
        }).to.throw(Error, 'pepito@mail is not an email')

        expect(function () {
            registerUser(name, surname, '123.com', password, function(){})
        }).to.throw(Error, '123.com is not an email')

        expect(function () {
            registerUser(name, surname, email, '123', function(){})
        }).to.throw(Error, 'password does not have the min length')

    })


})
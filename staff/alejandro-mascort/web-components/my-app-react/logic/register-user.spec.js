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
                { 'Content-type': 'application/json' }, (error, status, body) => {
                    expect(error).to.be.undefined
                    expect(status).to.equal(200)

                    const { token } = JSON.parse(body)

                    expect(token).to.exist

                    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                        undefined,
                        { 'Authorization': `Bearer ${token}` }, (error, status, body) => {
                            expect(error).to.be.undefined
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
                { 'Content-type': 'application/json' }, (error, status, body) => {
                    expect(error).to.be.undefined
                    expect(status).to.equal(201)
                    expect(body).to.equal('')

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

    it('should fail on non-string field', () => {
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

    it('should fail on non-alphabetic field', () => {
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

    it('should fail on non-function callback', () => {
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
}) 
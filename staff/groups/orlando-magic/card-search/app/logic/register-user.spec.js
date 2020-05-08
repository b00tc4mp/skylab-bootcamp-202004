describe('registerUser', () => {
    let name, surname, username, email, password

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        username = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}`
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    it('should succeed on correct data', done => {
        registerUser(username, email, password, error => {
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

                            expect(user.nickname).to.equal(username)
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
                `{ "nickname": "${username}", "username": "${email}", "password": "${password}" }`,
                { 'Content-type': 'application/json' }, (error, status, body) => {
                    expect(error).to.be.undefined
                    expect(status).to.equal(201)
                    expect(body).to.equal('')

                    done()
                })
        })

        it('should fail alerting user already exists', done => {
            registerUser(username, email, password, error => {
                expect(error).to.exist

                expect(error.message).to.equal(`user with username \"${email}\" already exists`)

                done()
            })
        })
    })

    it('should fail on non-string field', () => {
        expect(() => {
            registerUser(undefined, email, password, function () { })
        }).to.throw(TypeError, 'undefined is not a string')

        expect(() => {
            registerUser(1, email, password, function () { })
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            registerUser(true, email, password, function () { })
        }).to.throw(TypeError, 'true is not a string')

        expect(() => {
            registerUser(name, undefined, password, function () { })
        }).to.throw(Error, 'undefined is not an e-mail')

    })

    it('should fail on non-alphabetic field', () => {
        expect(() => {
            registerUser('1', email, password, function () { })
        }).to.throw(Error, '1 is not alphabetic')

        expect(() => {
            registerUser('$', email, password, function () { })
        }).to.throw(Error, '$ is not alphabetic')

        expect(() => {
            registerUser('%', email, password, function () { })
        }).to.throw(Error, '% is not alphabetic')

        expect(() => {
            registerUser('(', email, password, function () { })
        }).to.throw(Error, '( is not alphabetic')

        expect(() => {
            registerUser('?', email, password, function () { })
        }).to.throw(Error, '? is not alphabetic')

    })

    it('should fail on non-function callback', () => {
        expect(() => {
            registerUser(username, email, password, 1)
        }).to.throw(Error, '1 is not a function')

        expect(() => {
            registerUser(username, email, password, true)
        }).to.throw(Error, 'true is not a function')

        expect(() => {
            registerUser(username, email, password, 'text')
        }).to.throw(Error, 'text is not a function')

        expect(() => {
            registerUser(username, email, password)
        }).to.throw(Error, 'undefined is not a function')
    })
}) 
describe('authenticateUser', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })


    describe('when user already exists', () => {
        beforeEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
                { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (error) return done(new Error(error.message))
                    if (status !== 201) return done(new Error(`unexpected status ${status}`))

                    done()
                })
        })

        it('should succeed on correct data', done => {
            authenticateUser(email, password, (error, token) => {
                expect(error).to.be.undefined

                expect(token).to.be.a('string')

                done()
            })
        })

        it('should fail on incorrect credentials (e-mail)', done => {
            const _email = email.substring(0, 3) + '-' + email.substring(3)

            authenticateUser(_email, password, (error, token) => {
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal('username and/or password wrong')
                expect(token).to.be.undefined

                done()

            })
        })

        it('should fail on incorrect credentials (password)', done => {
            const _password = password.substring(0, 3) + '-' + password.substring(3)

            authenticateUser(email, _password, (error, token) => {
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal('username and/or password wrong')
                expect(token).to.be.undefined

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

    describe('when user does not exists', () => {
        it('should fail on no exist user', done => {
            authenticateUser(email, password, (error, token) => {
                expect(error).to.exist
                expect(error.message).to.equal('username and/or password wrong')

                expect(token).to.be.undefined

                done()
            })
        })
    })


    it('should return an type error', () => {
        expect(function () {
            authenticateUser(undefined, password, function () { })
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            authenticateUser(email, undefined, function () { })
        }).to.throw(TypeError, 'undefined is not a string')

        expect(function () {
            authenticateUser(1, password, function () { })
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            authenticateUser(email, 1, function () { })
        }).to.throw(TypeError, '1 is not a string')

        expect(function () {
            authenticateUser(true, password, function () { })
        }).to.throw(TypeError, 'true is not a string')

        expect(function () {
            authenticateUser(email, false, function () { })
        }).to.throw(TypeError, 'false is not a string')
    })

    it('should return an error', () => {
        expect(function () {
            authenticateUser('123@ma', password, function () { })
        }).to.throw(Error, '123@ma is not an email')

        expect(function () {
            authenticateUser(email, '  ', function () { })
        }).to.throw(Error, 'password is empty or blank')

        expect(function () {
            authenticateUser(email, '', function () { })
        }).to.throw(Error, 'password is empty or blank')
    })


})
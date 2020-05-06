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
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))

                    done()
                })
        })

        it('should succeed on correct credentials', done =>
            authenticateUser(email, password, (error, token) => {
                expect(error).to.be.undefined

                expect(token).to.be.a('string')

                done()
            })
        )

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
    })

    describe('when user does not exist', () => {
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

        const _name = names.random()
        const _surname = surnames.random()
        const _email = `${_name.toLowerCase().split(' ').join('')}${_surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        const _password = passwords.random()
        
      

        it('should fail not exist user', done =>{
            authenticateUser(_email, _password, (error,token)=>{
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal('username and/or password wrong')

                expect(token).to.be.undefined

                done()
            })

        })

        it('should fail with error 401',done=>{   
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                `{ "username": "${_email}", "password": "${_password}" }`,
                { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (error) expect(error.message).to.equal('username and/or password wrong');
                
                    if (status === 401) expect(status).to.equal(401);

                    const { token } = JSON.parse(body)
                    expect(token).to.be.undefined

                    done()
                }
            )
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
describe('retrieveUsersById', () => {
    let name, surname, email, password, _token, username, follow

    let _name,_surname, _email, _password, _id, _username
    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
        username = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}`

        _name = names.random()
        _surname = surnames.random()
        _email = `${_name.toLowerCase().split(' ').join('')}${_surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        _password = passwords.random()
        _username = `${_name.toLowerCase().split(' ').join('')}${_surname.toLowerCase().split(' ').join('')}`

        follow = []
    })

    beforeEach(done => {
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{ "nickname": "${username}", "username": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (error) return done(new Error(error.message))
                if (status !== 201) return done(new Error(`undexpected status ${status}`))

                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{"username" : "${email}", "password" : "${password}"}`, { 'Content-type': 'application/json' }, (error, status, body) => {
                    if (error) return done(new Error(error.message))
                    if (status !== 200) return done(new Error(`undexpected status ${status}`))
                    let { token } = JSON.parse(body)
                    _token = token

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    `{ "nickname": "${_username}", "username": "${_email}", "password": "${_password}" }`,
                    { 'Content-type': 'application/json' },
                    (error, status, body) => {
                        if (error) return done(new Error(error.message))
                        if (status !== 201) return done(new Error(`undexpected status ${status}`))
                        
                        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{"username" : "${_email}", "password" : "${_password}"}`, { 'Content-type': 'application/json' }, 
                        (error, status, body) => {
                            if (error) return done(new Error(error.message))
                            if (status !== 200) return done(new Error(`undexpected status ${status}`))

                            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
                            undefined,
                            { Authorization: `Bearer ${_token}` },
                            (error, status, body) => {
                                if (error) return done(new Error(error.message))
                                if (status !== 200) return done(new Error(`undexpected status ${status}`))

                                let users = JSON.parse(body)

                                users = users.filter(function (user) {
                                    const { nickname, username } = user

                                    return username.toLowerCase().includes(_email)
                                })

                                users = users.map(({ nickname, username, id }) => ({ nickname, email: username, id }))
                                
                                _id = users[0].id

                                follow.push(_id)
                                done()
                            }
                        )
                    })
                })
            })
        })
    })

    it('it should succeed on correct data', done => {
        retrieveUsersById(_token, follow , (error, users)=>{
            expect(error).to.be.undefined
            expect(users).to.exist
            expect(users).to.be.an('array')
            expect(users.length).to.be.greaterThan(0)
            expect(users[0].nickname).to.equal(_username)
            done()
        })
    })

    it('it should not fail if there are no follows', done => {
        let _follow = []
        retrieveUsersById(_token, _follow , (error, users)=>{
            expect(error).to.be.undefined
            expect(users).to.exist
            expect(users).to.be.an('array')
            expect(users.length).to.equal(0)
            done()
        })
    })

    it('should fail if token is incorrect', done => {
        const __token = 'aaaaaaaaaaaaaaa'
        retrieveUsersById(__token, [],(error, users) => {
            expect(error).to.exist
            expect(error.message).to.equal('invalid token')

            done()
        })
    })

    it('should fail if token is not a string', () => {
        expect(() => {
            retrieveUsersById(1, [],(error, users) => {})
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            retrieveUsersById(true, [],(error, users) => {})
        }).to.throw(TypeError, 'true is not a string')

        expect(() => {
            retrieveUsersById(undefined, [],(error, users) => {})
        }).to.throw(TypeError, 'undefined is not a string')        
    })
})
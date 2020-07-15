describe('retrieveUserFollowing', () => {
    let name, surname, email, password, _token, username, user, following

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

                                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
                                {
                                    Authorization: `Bearer ${token}`
                                },
                                (error, status, body) => {
                                    if (error) return done(new Error(error.message))
                                    if (status !== 200) return done(new Error(`undexpected status ${status}`))

                                    call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/`, undefined,
                                        {
                                            Authorization: `Bearer ${token}`
                                        },
                                        (error, status) => {
                                            if (error) return done(new Error(error.message))
                                            if (status !== 200) return done(new Error(`undexpected status ${status}`))

                                            let user = JSON.parse(body)

                                            let { following = [] } = user

                                            let index = following.indexOf(_id)

                                            if (index < 0) following.push(_id)
                                            else following.splice(index, 1)

                                            call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify({ following }),
                                                {
                                                    Authorization: `Bearer ${token}`,
                                                    'Content-type': 'application/json'
                                                },
                                                (error, status, body) => {
                                                    if (error) return done(new Error(error.message))
                                                    if (status !== 204) return done(new Error(`undexpected status ${status}`))
                                                    done()

                                                })
                                        })
                                })
                            }
                        )
                    })
                })
            })
        })
    })

    it('should succeed on correct data', done => {
        retrieveUserFollowing(_token, (error, following) => {
            expect(error).to.be.undefined
            expect(following).to.be.an('array')
            expect(following.length).to.be.greaterThan(0)
            expect(following[0]).to.equal(_id)

            done()
        })
    })

    it('should fail if token is incorrect', done => {
        const __token = 'aaaaaaaaaaaaaaa'
        retrieveUserFollowing(__token, (error, following) => {
            expect(error).to.exist
            expect(error.message).to.equal('invalid token')
            expect(following).to.be.undefined

            done()
        })
    })

    it('should fail if token is not a string', () => {
        expect(() => {
            retrieveUserFollowing(1, (error, following) => {})
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            retrieveUserFollowing(true, (error, following) => {})
        }).to.throw(TypeError, 'true is not a string')

        expect(() => {
            retrieveUserFollowing(undefined, (error, following) => {})
        }).to.throw(TypeError, 'undefined is not a string')        
    })
})
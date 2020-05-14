describe('retrieveUserCards', () => {
    let name, surname, email, password, _token, username

    let _name,_surname, _email, _password, _id, _username
    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
        username = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}`

    })

    beforeEach(done => {
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{ "nickname": "${username}", "username": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (error) return done(new Error(error.message))
                if (status !== 201) return done(new Error(`undexpected status ${status}`))

            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{"username" : "${email}", "password" : "${password}"}`, { 'Content-type': 'application/json' }, 
            (error, status, body) => {
                if (error) return done(new Error(error.message))
                if (status !== 200) return done(new Error(`undexpected status ${status}`))
                let { token } = JSON.parse(body)
                _token = token

                call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/`, undefined,
                {
                    Authorization: `Bearer ${token}`
                },
                (error, status) => {
                    if (error) return done(new Error(error.message))
                    if (status !== 200) return done(new Error(`undexpected status ${status}`))

                    let user = JSON.parse(body)

                    let { myCards = [] } = user

                    myCards.push('683a5707-cddb-494d-9b41-51b4584ded69')
                    call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify({ myCards }),
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
        })
    })

    it('should succeed on correct data without id', done => {
        retrieveUserCards(_token, (error, cards) => {
            expect(error).to.be.undefined
            expect(cards).to.be.an('array')

            done()
        })
    })

    it('should succeed on correct data with an id', done => {
        let _name = names.random()
            _surname = surnames.random()
            _email = `${_name.toLowerCase().split(' ').join('')}${_surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
            _password = passwords.random()
            _username = `${_name.toLowerCase().split(' ').join('')}${_surname.toLowerCase().split(' ').join('')}`

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
                    let { token } = JSON.parse(body)

                    call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/`, undefined,
                    {
                        Authorization: `Bearer ${token}`
                    },
                    (error, status) => {
                        if (error) return done(new Error(error.message))
                        if (status !== 200) return done(new Error(`undexpected status ${status}`))

                        let user = JSON.parse(body)

                        let { myCards = [] } = user

                        myCards.push('683a5707-cddb-494d-9b41-51b4584ded69')                        

                        call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify({ myCards }),
                        {
                            Authorization: `Bearer ${token}`,
                            'Content-type': 'application/json'
                        },
                        (error, status, body) => {
                            if (error) return done(new Error(error.message))
                            if (status !== 204) return done(new Error(`undexpected status ${status}`))
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

                                retrieveUserCards(_token, (error, cards) => {
                                    expect(error).to.be.undefined
                                    expect(cards).to.be.an('array')
                        
                                    done()
                                },_id)
                            })

                        })

                    })

                })
        })
        
    })

    it('should fail if token is incorrect', done => {
        const __token = 'aaaaaaaaaaaaaaa'
        retrieveUserCards(__token, (error, cards) => {
            expect(error).to.exist
            expect(error.message).to.equal('invalid token')

            done()
        })
    })

    it('should fail if token is not a string', () => {
        expect(() => {
            retrieveUserCards(1, (error, cards) => {})
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            retrieveUserCards(true, (error, cards) => {})
        }).to.throw(TypeError, 'true is not a string')

        expect(() => {
            retrieveUserCards(undefined, (error, cards) => {})
        }).to.throw(TypeError, 'undefined is not a string')        
    })
})
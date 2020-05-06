describe('toggleFollowUser', () => {

    let name, surname, password, email, followingId, _token
    let _name, _surname, _password, _email

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()

        _name = names.random()
        _surname = surnames.random()
        _email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        _password = passwords.random()
    })

    describe('when both user exist', () => {
        beforeEach(done => {

            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{"name":"${name}","surname":"${surname}","username":"${email}","password":"${password}"}`,
                { "Content-type": 'application/json' }, (error, status) => {
                    if (error) return done(new Error(error.message))

                    if (status === 201) {

                        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                            `{"username":"${email}","password":"${password}"}`,
                            { "Content-type": 'application/json' }, (error, status, body) => {
                                if (error) return done(new Error(error.message))

                                if (status === 200) {
                                    let { token } = JSON.parse(body);
                                    _token = token
                                    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
                                        undefined,
                                        { 'Authorization': `Bearer ${token}` },
                                        (error, status, body) => {
                                            if (error) return done(error)

                                            if (status === 200) {

                                                let users = JSON.parse(body)

                                                let { id } = users.find(({ username }) => {
                                                    return (username === email)
                                                })

                                                followingId = id

                                                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                                                    `{"name":"${_name}","surname":"${_surname}","username":"${_email}","password":"${_password}"}`,
                                                    { "Content-type": 'application/json' }, (error, status) => {
                                                        if (error) return done(new Error(error.message))

                                                        done()
                                                    }
                                                )
                                            }
                                        })
                                }
                            })
                    }
                })
        })

        it('should succed on adding following', done => {
            toggleFollowUser(_token, followingId, (error) => {
                if (error) return done(new Error(error.message))

                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    undefined,
                    { 'Authorization': `Bearer ${_token}` }, (error, status, body) => {
                        if (error) return done(new Error(error.message))
                        if (status === 200) {

                            let { following } = JSON.parse(body)
                            expect(following).to.exist
                            expect(following).to.be.an.instanceOf(Array)
                            expect(following).to.include(followingId)

                            done()
                        }
                    })
            })
        })
        it('should remove following', done => {
            call('PATCH',
                'https://skylabcoders.herokuapp.com/api/v2/users',
                `"following":"${followingId}"`,
                { "Content-type": "application/json", "Authorization": `Bearer ${_token}` },
                (error, status) => {
                    if (error) return done(new Error(error.message))

                    if (status === 200) {
                        toggleFollowUser(_token, followingId, (error) => {
                            if (error) return done(new Error(error.message))

                            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                                undefined,
                                { 'Authorization': `Bearer ${_token}` }, (error, status, body) => {
                                    if (error) return done(new Error(error.message))

                                    if (status === 200) {

                                        debugger
                                        let { following } = JSON.parse(body)
                                        expect(following).to.exist
                                        expect(following).to.be.an.instanceOf(Array)
                                        expect(following.length).to.be(0)
                                        expect(following).to.not.include(followingId)
                                       
                                    }
                                })
                        })
                    }
                })
                done()
        })
    })
})

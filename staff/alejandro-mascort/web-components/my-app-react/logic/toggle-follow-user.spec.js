describe('toggleFollowUser', () => {
    let name, surname, email, password, _token, users

    let _name,_surname, _email, _password, _id
    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()

        _name = names.random()
        _surname = surnames.random()
        _email = `${_name.toLowerCase().split(' ').join('')}${_surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        _password = passwords.random()
    })

    beforeEach(done => {
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
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
                    `{ "name": "${_name}", "surname": "${_surname}", "username": "${_email}", "password": "${_password}" }`,
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
                                    const { name, surname, username } = user

                                    return username.toLowerCase().includes(_email)
                                })

                                users = users.map(({ name, surname, username, id }) => ({ name, surname, email: username, id }))
                                
                                _id = users[0].id

                                done()
                            }
                        )
                    })
                })
            })
        })
    })

    it('should succeed on pushing a new id', done => {
        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
            expect(error).to.be.undefined
            expect(state).to.equal(200)
            expect(body).to.exist

            let user = JSON.parse(body)

            expect(user.following).to.be.undefined
            
            toggleFollowUser(_token, _id, error => {
                expect(error).to.be.undefined

                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    undefined,
                    { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                        expect(error).to.be.undefined
                        expect(state).to.equal(200)
                        expect(body).to.exist

                        let _user = JSON.parse(body)

                        expect(_user.following).to.exist
                        expect(_user.following.length).to.be.greaterThan(0)

                        expect(_user.following[0]).to.equal(_id)
                        expect(_user.following[0]).to.be.an('string')

                        done()
                })
            
            })
        })
    })
})
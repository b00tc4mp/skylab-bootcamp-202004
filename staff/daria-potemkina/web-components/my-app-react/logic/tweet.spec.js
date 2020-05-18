describe('tweet', () => {
    let name, surname, email, password, _token
    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
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

                    done()
                })
            })
    })

    it('should create array tweets if not created before', done => {
        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                undefined,
                { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                    expect(error).to.be.undefined
                    expect(state).to.equal(200)
                    expect(body).to.exist

                    const user = JSON.parse(body)

                    expect(user.tweets).to.be.undefined

                    let message = 'hello world'
                    tweet(_token, message, error => {
                        expect(error).to.be.undefined

                        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                            undefined,
                            { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                                expect(error).to.be.undefined
                                expect(state).to.equal(200)
                                expect(body).to.exist

                                const user = JSON.parse(body)

                                expect(user.tweets).to.exist
                                expect(user.tweets.length).to.be.greaterThan(0)

                                expect(user.tweets[0].text).to.exist
                                expect(user.tweets[0].date).to.exist
                                expect(user.tweets[0].text).to.equal(message)
                                expect(user.tweets[0].date).to.be.an('string')

                                done()
                        })
                    
                    })
                })
            })


    it('should fail if invalid token is introduced', done => {
        const __token = 'aaaaaaaaaaaa'
        const message = 'hello world'

        tweet(__token, message, error => {
            expect(error).to.exist
            expect(error.message).to.equal('invalid token')

            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                undefined,
                { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
                    expect(error).to.be.undefined
                    expect(state).to.equal(200)
                    expect(body).to.exist

                    const user = JSON.parse(body)

                    expect(user.tweets).to.be.undefined

                    done()
                })
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
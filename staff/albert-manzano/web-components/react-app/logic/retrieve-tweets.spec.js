describe('retrieveTweets', () => {


    describe('should take tweets', () => {

        let name, surname, password, email, _token
        let date = new Date
        let tweet = `["message":"hello world", "date": ${date}, "username": ${email}]`

        beforeEach(() => {
            name = names.random()
            surname = surnames.random()
            email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
            password = passwords.random()

        })

        describe('retrieve tweets', () => {

            beforeEach(done => {
                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    `{"name":"${name}","surname":"${surname}","username":"${email}","password":"${password}"}`,
                    { "Content-type": 'application/json' }, (error, status, body) => {
                        if (error) return done(new Error(error.message))

                        if (status === 201) {

                            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                                `{"username":"${email}","password":"${password}"}`,
                                { "Content-type": 'application/json' }, (error, status, body) => {
                                    if (error) return done(new Error(error.message))

                                    if (status === 200) {

                                        let { token } = JSON.parse(body)
                                        _token = token
                                        done()



                                    }
                                })
                        }
                    })
            })
            it('should retrieve tweet', done => {
                call('PATCH',
                    'https://skylabcoders.herokuapp.com/api/v2/users',
                    `tweets:[${tweet}]`,
                    { "Content-type": "application/json", "Authorization": `Bearer ${_token}` },
                    (error, status) => {
                        if (error) return done(new Error(error.message))

                        if (status === 200)
                            retrieveTweets = (_token, (tweets) => {
                                if (error) { return done(error.message) }

                                expect(tweets).to.exist
                                expect(tweets).to.be.an.instanceOf(Array)
                                expect(tweets.length).to.be(1)
                                expect(tweets).to.be.deepEqual(tweet)
                                
                            })
                    })
                    done()
            })
        })
    })
})
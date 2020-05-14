
describe('isUserAuthenticated', () => {
    let email, password, _token


    describe('validates existing token', () => {
        beforeEach(done=>{

            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{  "username": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (error) return done(new Error(error.message))
                if (status !== 201) return done(new Error(`undexpected status ${status}`))

                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                    `{ "username": "${email}", "password": "${password}" }`,
                    { 'Content-type': 'application/json' },
                    (error, status, body) => {
                        if (error) return done(new Error(error.message));
                        if (status !== 200) return done(new Error(`undexpected status ${status}`));

                        const { token } = JSON.parse(body);
                        _token = token

                        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                            undefined,
                            { Authorization: `Bearer ${token}` },
                            (error, status, body) => {
                                if (error) return done(new Error(error.message));
                                if (status !== 200) return done(new Error(`undexpected status ${status}`));

                                const { username } = JSON.parse(body)
                                expect(username).to.equal(email)
                                done()

                            })
                    })
            })
        })
       
        it('should succed validating th token', done => {
            isUserAuthenticated(_token, error => {
                expect(error).to.be.undefined;
                done()
            });
        });
    })
})


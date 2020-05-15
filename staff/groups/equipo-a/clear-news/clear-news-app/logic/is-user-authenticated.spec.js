
describe('isUserAuthenticated', () => {
    let email, password, _token
    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

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
                        _token = token;

                        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                            undefined,
                            { Authorization: `Bearer ${token}` },
                            (error, status, body) => {
                                if (error) return done(new Error(error.message));
                                if (status !== 200) return done(new Error(`undexpected status ${status}`));

                                const { username } = JSON.parse(body);
                                expect(username).to.equal(email);
                                done()

                            })
                    })
            })
        })
       
        it('should succed validating the token', done => {
            isUserAuthenticated(_token, error => {
                expect(error).to.be.undefined;
                done()
            });
        });
        it('should fail token incorrect', done => {
            const __token="1";
           
            isUserAuthenticated(__token, error => {
                expect(error).to.exist;

                done()
            });
        })
    })
})


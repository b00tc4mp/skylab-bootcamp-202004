

describe('isUserAuthenticated', () => {
    let _name, surname, email, password


    beforeEach(() => {
        _name = names.random();
        surname = surnames.random();
        email = `${_name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`;
        password = passwords.random();
  
    })

    describe('Async Test', () => {

        it('Should succeed on correct token', done => {
            call('POST',
                'https://skylabcoders.herokuapp.com/api/v2/users',
                `{"name":"${_name}","surname":"${surname}","username":"${email}","password":"${password}", "app":"footify"} `, { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                        `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                        (error, status, body) => {
                            if (status !== 200) return done(new Error(`undexpected status ${status}`))
                            const { token } = JSON.parse(body)

                            isUserAuthenticated(token, (error,isAuthenticated) =>{
                                expect(error).to.be.undefined
                                expect(isAuthenticated).to.equal(true)
                                done()
                            })

                    })      
            })
         })
               
        

        it('Should fail on correct incorrect token', done => {
            call('POST',
                'https://skylabcoders.herokuapp.com/api/v2/users',
                `{"name":"${_name}","surname":"${surname}","username":"${email}","password":"${password}", "app":"footify"} `, { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                        `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                        (error, status, body) => {
                            if (status !== 200) return done(new Error(`undexpected status ${status}`))
                            const { token } = JSON.parse(body)

                            const _token = token.substring(0,6);

                            isUserAuthenticated(_token, (error,isAuthenticated) =>{
                                expect(error).to.be.undefined
                                expect(isAuthenticated).to.equal(false)
                                done()
                            })

                    })      
            })
        })
               
        

        afterEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (error) return done(error);
                    if (status !== 200) return done(new Error(`unexpected status ${status}`));
    
                    const { token } = JSON.parse(body);
    
                    call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                        `{ "password": "${password}" }`, {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        (error, status, body) => {
                            if (error) return done(new Error(error.message));
                            if (status !== 204) return done(new Error(`undexpected status ${status}`));
    
                            done();
                        })
                })
        })
    

    })
})    


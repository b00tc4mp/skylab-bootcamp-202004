describe('authenticateUser', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    it('should succeed on correct credentials', done => {
        registerUser(name, surname, email, password, error => {
            expect(error).to.be.undefined

            authenticateUser(email, password, (error, token) => {
                expect(error).to.be.undefined
        
                expect(token).to.be.a('string')

                done()
            })
        })
    })

            it('should fail on incorrect credentials (e-mail)', done => {
                const _email = 'incorrect-' + email

                authenticateUser(_email, password, (error, token) => {
                    expect(error).to.be.an.instanceOf(Error)
                    expect(error.message).to.equal('username and/or password wrong')
    
                    expect(token).to.be.undefined
    
                    done()
                })
        })

        it('should fail on incorrect credentials (password)', done => {
            const _password = 'incorrect-' + password

            authenticateUser(email, _password, (error, token) => {
                expect(error).to.be.an.instanceOf(Error)
                expect(error.message).to.equal('username and/or password wrong')

                expect(token).to.be.undefined

                done()
            })
    })

        afterAll(done => {
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


// describe.only('Retrieve users', () => {
//     let name, surname, email, password

//     beforeEach(() => {
//         name = names.random()
//         surname = surnames.random()
//         email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
//         password = passwords.random()
//     })

   
//     describe('Asynchronous tests', () => {
//         let _token;
//         beforeEach(done => {
//             call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
//                 `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
//                 { 'Content-type': 'application/json' },
//                 (error, status, body) => {
//                     if (error) return done(new Error(error.message))
//                     if (status !== 201) return done(new Error(`undexpected status ${status}`))
//                         call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
//                             `{ "username": "${email}", "password": "${password}" }`,
//                             { 'Content-type': 'application/json' },
//                             (error, status, body) => {
//                                 debugger
//                             if (error) return done(new Error(error.message))
//                             if (status !== 201) return done(new Error(`undexpected status ${status}`))

//                             const { token } = JSON.parse(body)
//                             _token = token
//                             done()
//                         })
//             })
//         })

//         it('test retrive user function', done=>{
//             retrieveUser(_token,(error,users)=>{

//                 expect(error).to.be.undefined
//                 const{name,surname,username} = users;
//                 expect(name).to.equal(name)
//                 expect(surname).to.equal(surname)
//                 expect(username).to.equal(email)

//                 done()
//             })
//         })

//         it('test with status 200', done=>{
//             call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
//             undefined,
//             { 'Authorization': `Bearer ${_token}` },
//             (error, status, body) => {
//                 if (error) return expect(error).to.be.undefined
    
//                 if (status === 200) expect(status).to.equal(200)
    
//             }
//         )
//         })


//     }) 
    
    
// })

          
            
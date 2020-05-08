describe('Register - User', () => {
    let name, surname, email, password,confirmPassword

    beforeEach(() => {
        name = names.random();
        surname = surnames.random();
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`;
        password = passwords.random();
        confirmPassword = password;
    })

    describe('Async Test',()=>{

        it('should succeed on correct data', done => {
            registerUser(name, surname, email, password,confirmPassword, error => {
                expect(error).to.be.undefined

                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                    `{ "username": "${email}", "password": "${password}" }`,
                    { 'Content-type': 'application/json' },
                    (error, status, body) => {
                        expect(error).to.be.undefined
                        expect(status).to.equal(200)
    
                        const { token } = JSON.parse(body)
    
                        expect(token).to.exist
    
                        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                            undefined,
                            { Authorization: `Bearer ${token}` },
                            (error, status, body) => {
                                expect(error).to.be.undefined
                                expect(status).to.equal(200)
    
                                const user = JSON.parse(body)
    
                                expect(user.name).to.equal(name)
                                expect(user.surname).to.equal(surname)
                                expect(user.username).to.equal(email)
                                expect(user.password).to.be.undefined
    
                                done()
                            }
                        )
                    })
            })
        })

      
        describe('when user already exists', () => {
            beforeEach(done => {
                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
                    { 'Content-type': 'application/json' },
                    (error, status, body) => {
                        if (error) return done(new Error(error.message))
                        if (status !== 201) return done(new Error(`undexpected status ${status}`))
    
                        done()
                    })
            })
    
            it('should fail alerting user already exists', done => {
                registerUser(name, surname, email, password, confirmPassword, error => {
                    expect(error).to.exist
    
                    expect(error.message).to.equal(`user with username \"${email}\" already exists`)
    
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
    
    
    it('should fail on non-string field', () => {
        expect(() => {
            registerUser(undefined, surname, email, password,confirmPassword, () =>{ })
        }).to.throw(TypeError, 'undefined is not a string')

        expect(() => {
            registerUser(1, surname, email, password, confirmPassword, () =>{ })
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            registerUser(true, surname, email, password, confirmPassword, () =>{ })
        }).to.throw(TypeError, 'true is not a string')

        expect(() => {
            registerUser(name, undefined, email, password, confirmPassword, () =>{ })
        }).to.throw(TypeError, 'undefined is not a string')

        expect(() => {
            registerUser(name, 1, email, password, confirmPassword, () =>{ })
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            registerUser(name, true, email, password, confirmPassword, () =>{ })
        }).to.throw(TypeError, 'true is not a string')

       
    })

    it('should fail on non-alphabetic field', () => {
        expect(() => {
            registerUser('1', surname, email, password, confirmPassword, () =>{ })
        }).to.throw(Error, '1 is not alphabetic')

        expect(() => {
            registerUser('$', surname, email, password, confirmPassword, () =>{ })
        }).to.throw(Error, '$ is not alphabetic')

        expect(() => {
            registerUser('%', surname, email, password, confirmPassword, () =>{ })
        }).to.throw(Error, '% is not alphabetic')

        expect(() => {
            registerUser(name, '&', email, password, confirmPassword, () =>{ })
        }).to.throw(Error, '& is not alphabetic')

        expect(() => {
            registerUser(name, '(', email, password, confirmPassword, () =>{ })
        }).to.throw(Error, '( is not alphabetic')

        expect(() => {
            registerUser(name, '?', email, password, confirmPassword, () =>{ })
        }).to.throw(Error, '? is not alphabetic')

    })

    it('should fail on incorrect email', ()=>{
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}`

        expect(() => {
            registerUser(name, surname, email, password, confirmPassword, () =>{ })
        }).to.throw(Error, `${email} is not an e-mail`)
    })
    it('should fail on min lenght password and confirmPassword', ()=>{
        let _password = password.substring(0,4)
        let _confirmPassword = _password
        expect(() => {
            registerUser(name, surname, email, _password, _confirmPassword, () =>{ })
        }).to.throw(Error, `"${_password}" length is not greater or equal than 8`)
    })
    it('should fail diferents password and confirmPassword', ()=>{
        let __confirmPassword = password + 'letter'
        expect(() => {
            registerUser(name, surname, email, password, __confirmPassword, () =>{ })
        }).to.throw(Error, `The password is not the same.`)
    })
    it('should fail on not function callback', ()=>{
        expect(() => {
            registerUser(name, surname, email, password, confirmPassword, undefined)
        }).to.throw(TypeError,`undefined is not a function`)
    })




 
})
describe("authenticateUser",() => {
    //Crear un usuario
    let name, surname, email, password

    beforeEach( () =>{
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    describe('when user already exists', () => {
        beforeEach( done =>{
         
            call("POST", 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (error) return done(new Error(error.message))

                if (status !== 201) return done(new Error(`undexpected status ${status}`))
                done()
            })
        })

        it('should succeed on correct credentials', done =>{
            authenticateUser(email, password, (error, token) => {
                expect(error).to.be.undefined

                expect(token).to.be.a('string')
                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                undefined, { Authorization: `Bearer ${token}` }, (error, status, response)=>{
                    expect(error).to.be.undefined

                    expect(status).to.equal(200)
                    const {username} = JSON.parse(response)
                    expect(username === email).to.equal(true)
                    done()
                })
            })
        })

        it('should not succeed on incorrect credentials', done =>{
            authenticateUser(email + 'x', password, (error, token) => {
                expect(error).to.be.an.instanceOf(Error)

                expect(error.message).to.equal('username and/or password wrong')
                expect(token).to.be.undefined
                
                authenticateUser(email, password + 'x', (error, token) => {
                    expect(error).to.be.an.instanceOf(Error)
    
                    expect(error.message).to.equal('username and/or password wrong')
                    expect(token).to.be.undefined
                    done()
                })
            })
        })

        it('should not succeed on invalid credentials', () =>{
            expect(
                ()=>{authenticateUser(1, password, (error, token) => {})}
            ).to.throw('1 is not a string')
            
            expect(
                ()=>{authenticateUser(email, 1, (error, token) => {})}
            ).to.throw('1 is not a string')

            expect(
                ()=>{authenticateUser(email, '', (error, token) => {})}
            ).to.throw('password is empty or blank')

            expect(
                ()=>{authenticateUser('123', password, (error, token) => {})}
            ).to.throw('123 is not an e-mail')

            expect(
                ()=>{authenticateUser(email, password, 1)}
            ).to.throw('1 is not a function')
        })

        afterEach(done => {
            let body = `{"username": "${email}", "password": "${password}" }`
            let headers = { "Content-type": "application/json" };
            let url = 'https://skylabcoders.herokuapp.com/api/v2/users/auth' 

            call("POST", url, body, headers, (error, status, response) => {
                if (error) return done(error)
                if (status !== 200) return done(new Error(`unexpected status ${status}`))
                const { token } = JSON.parse(response)
                body = `{"password": "${password}"}`
                url = 'https://skylabcoders.herokuapp.com/api/v2/users'
                headers = {"Content-type": "application/json" , Authorization: `Bearer ${token}`}
                call("DELETE", url, body, headers, (error, status, body) => {
                    if (error) return done(new Error(error.message))

                    if (status !== 204) return done(new Error(`undexpected status ${status}`))
                    done()
                })
            })
        })  
    })
}).timeout(10000)
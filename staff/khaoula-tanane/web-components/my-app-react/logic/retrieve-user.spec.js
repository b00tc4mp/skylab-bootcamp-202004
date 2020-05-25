describe('Retrieve users', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

   
    describe('Asynchronous tests', () => {
        let _token;
        beforeEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
                { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (error) return done(new Error(error.message))
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))
                        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                            `{ "username": "${email}", "password": "${password}" }`,
                            { 'Content-type': 'application/json' },
                            (error, status, body) => {
                            if (error) return done(new Error(error.message))
                            if (status !== 200) return done(new Error(`undexpected status ${status}`))

                            const { token } = JSON.parse(body)
                            _token = token
                            done()
                        })
            })
        })

        it('test retrive user function', done=>{
            retrieveUser(_token,(error,user)=>{

                expect(error).to.be.undefined
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)

                done()
            })
        })



    }) 
    
})



describe('register ', ()=>{
    let name,surname, email, password

    beforeEach( ()=> {
        name = names.random()
        name = name.toLowerCase()
        surname = surnames.random()
        email = `${name.split('').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    it('should succeed with correct credentials', done => { 
        register(name, surname, email, password, error =>{
            if (error) return done(new Error(error.message))
            
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
            `{ "username": "${email}", "password": "${password}"}`,
            { 'Content-type': 'application/json' },
            (error, status, response) => {
                expect(error).to.be.undefined
                expect(status).to.be.equal(200)

                const {token} = JSON.parse(response)
                expect(token).to.exist

                
                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, { Authorization: `Bearer ${token}` },
                (error, status, response) => {
                    debugger
                    expect(error).to.be.undefined
                    expect(status).to.be.equal(200)

                    const user = JSON.parse(response)

                    expect(user.name).to.be.equal(name)
                    expect(user.surname).to.be.equal(surname)
                    expect(user.username).to.be.equal(email)
                    expect(user.password).to.be.undefined

                    done()
                }
                 )


            }
             )

        }) 
    }
    )

})


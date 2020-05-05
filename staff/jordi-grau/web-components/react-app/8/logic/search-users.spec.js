describe ('testing search user', () => {
    
    let name, surname, email, password
    let _token = ""

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    it ("sholud return an array of users that includes the specified query ", done => {

    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users', `{"name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}"  }`, 
    { 'Content-type': 'application/json' },(error, status, response) => {
        if (error) throw new  Error (console.error(error) )
        if (status === 201) {  
            expect(error).to.be.undefined
            expect(status).to.equal(201)      

            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{ "username": "${email}", "password": "${password}"  }`,
            { 'Content-type': 'application/json' }, (error, status, response) => {
                if (error) throw new  Error (console.error(error) )
                expect(error).to.be.undefined
                if (status === 200) {
                  
                    const { token } =  JSON.parse(response)
                    expect(token).to.exist
                    
                    token = token.toString()
                    searchUsers("mel", token, (result) => {
                        expect(result).to.be.a('array')
                        expect(result).to.have.lengthOf.above(0)

                        
                        
                    } )
                }
                
            }
             )
        }
    })   

    })

    it ('should trow an error', () => {
        expect( () => {

            searchUsers(1, _token, (result) => {
                expect(result).to.be.undefined
    
            })
        }).to.throw(Error, "1 it's not a string")
     }    )

}
)
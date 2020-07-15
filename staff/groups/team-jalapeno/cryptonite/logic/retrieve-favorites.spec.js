describe('retrieve-favorites', () =>{

    let name, surname, email, password
    let favorites = []
    
    beforeEach( () => {
        name = names.random()
        name = name.toLowerCase()
        surname = surnames.random()
        email = `${name.split('').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
        favorites[0] = favoriteCoins1.random() 
        favorites[1] = favoriteCoins2.random() 
        favorites[2] = favoriteCoins3.random() 
    
    })
       
    
    it('should succeed on create user with correct data', done => { 
         const url = 'https://skylabcoders.herokuapp.com/api/v2/users'
         const body = JSON.stringify({name, surname, username: email, password, favorites})
         const headers =  { 'Content-type': 'application/json' }

        
            call('POST', url, body, headers, (error, status, response) => {
        
                if(error) return done (new Error(error))

                if(status === 201) { 
                    
                    const url = 'https://skylabcoders.herokuapp.com/api/v2/users/auth'
                    const body = `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`
                    const headers =  { 'Content-type': 'application/json' }

                    call('POST', url, body, headers, (error, status, response) => {
                        if(error) return done (new Error(error))

                        if(status === 200) {
                            const {token} = JSON.parse(response)

                            call('GET','https://skylabcoders.herokuapp.com/api/v2/users', undefined,
                            { Authorization: `Bearer ${token}` }, (error, status, response) =>{
                                if (error) return done( new Error(error))

                                if (status === 200){

                                const {favorites} = JSON.parse(response)
                                
                                retrieveFavorites((error, data) => {
                                    
                                    expect(error).to.be.undefined
                                    expect(data).to.exist
                                    expect(favorites.length).to.equal(3)
                                    
                                    done()
                                }, 
                                favorites 
                                    
                                )

                                }else{
                                    return done(new Error(error))
                                }

                            } )
                            
                        }else{
                           const {error} = JSON.parse(response)
                    
                            return done( new Error(error))
                        }
                    } )
                    
                } else {
                    const {error} = JSON.parse(response)
                    
                    return done( new Error(error))
                }
                
            })
        })
    
    it('Should fail on wrong array of favorites',   done =>{
        const url = 'https://skylabcoders.herokuapp.com/api/v2/users'
         const body = JSON.stringify({name, surname, username: email, password, favorites})
         const headers =  { 'Content-type': 'application/json' }

        call('POST', url, body, headers, (error, status, response) => {
        
            if(error) return done (new Error(error))

            if(status === 201) { 

                retrieveFavorites( (error, data) => {
                    
                    expect(error).to.be.undefined
                    expect(data.length).to.equal(0)
                    
                    done()

                }, ['test1', 'test2'])

            } else {
                const {error} = JSON.parse(response)
                
                return done( new Error(error))
            }
        

        })
    } )  
   
    afterEach(done => {
        const body = JSON.stringify({ username: email, password })
        const headers = { 'Content-type': 'application/json' }
        const url = 'https://skylabcoders.herokuapp.com/api/v2/users/auth'

        call('POST', url, body, headers, (error, status, response) => {
            if (error) return done(new Error(error.message))
    
            if (status === 200) {

                const { token } = JSON.parse(response)

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
            } else return done(new Error(`unexpected status ${status}`))
        })
    })

})


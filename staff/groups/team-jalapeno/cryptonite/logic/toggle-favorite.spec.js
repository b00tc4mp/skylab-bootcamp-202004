describe('Toggle favorite', () => {

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

        it('should toggle crypto', done=>{
            let cryptoId = 'btc'
            
            toggleFavorite(_token , cryptoId, (error)=>{
                expect(error).to.be.undefined

                let url = 'https://skylabcoders.herokuapp.com/api/v2/users/'
                let body = undefined
                let headers = { 'Authorization': `Bearer ${_token}` }
            
            
                call('GET', url, body, headers, (error, status, response) => {
                    if (error) return callback(error)
            
                    if (status === 200) {
                        let { favorites = [] } = JSON.parse(response)
                        
                        expect(favorites.includes(cryptoId)).to.equal(true)
                        expect(favorites[0]).to.equal(cryptoId)


                        toggleFavorite(_token , cryptoId, (error)=>{
                            expect(error).to.be.undefined
                        
                            call('GET', url, body, headers, (error, status, response) => {
                                if (error) return callback(error)
                        
                                if (status === 200) {
                                    let { favorites = [] } = JSON.parse(response)
                                    
                                    expect(favorites.length).to.equal(0)

                                    done()
                        
                                }
                            })
                        })
            
                    }
                })
            })
        }).timeout(10000)

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
    
})


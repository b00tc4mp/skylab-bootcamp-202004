describe('Add portfolio', () => {

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

        it('should add to portfolio', done=>{
            let portfolioInfo = {id: 'trx', quantity: 100}
            
            addPortfolioCrypto(_token , portfolioInfo, (error)=>{
                expect(error).to.be.undefined

                let url = 'https://skylabcoders.herokuapp.com/api/v2/users/'
                let body = undefined
                let headers = { 'Authorization': `Bearer ${_token}` }
            
            
                call('GET', url, body, headers, (error, status, response) => {
                    if (error) return callback(error)
            
                    if (status === 200) {
                        let { portfolio = [] } = JSON.parse(response)
                        
                        expect(portfolio.length).to.equal(1)
                        expect(portfolio[0].id).to.equal(portfolioInfo.id)
                        expect(portfolio[0].quantity).to.equal(portfolioInfo.quantity)

                        done()
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


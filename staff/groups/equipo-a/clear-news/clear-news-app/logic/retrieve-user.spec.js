describe('retrieveUser', () => {
    let _name, _surname, _email, _password,_categories,_country, _token

    beforeEach(() => {
        _name = names.random()
        _surname = surnames.random()
        _email = `${_name.toLowerCase().split(' ').join('')}${_surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        _password = passwords.random()
        _categories = {
            business: true,
            entertainment: true,
            general: false,
            health: false,
            science: true,
            sports: false,
            technology: true
        }
        _country = countries.random();
    })

    

    describe('when user already exists', () => {
        beforeEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
        `{"name": "${_name}", "surname": "${_surname}", "username": "${_email}", "password": "${_password}", "categories": ${JSON.stringify(_categories)}, "country": "${_country}"}`,
        { 'Content-type': 'application/json' },
                (error, status) => {
                    if (error) return done(new Error(error.message))
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))
                    // call('POST', )
                    
                    done()
                })
        })
        
        it('should succeed on correct credentials', done =>{
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
            `{ "username": "${_email}", "password": "${_password}" }`,
            { 'Content-type': 'application/json' },
            (error, status, body) => {

                if (error) return callback(error)

                if (status === 200) {
                    const { token } = JSON.parse(body)
                    retrieveUser(token, (error, {name, surname, email, categories, country}) => {
                        expect(error).to.be.undefined
                        expect(token).to.be.a('string')
                        expect(name).to.equal(_name)
                        expect(surname).to.equal(_surname)
                        expect(email).to.equal(_email)
                        expect(categories).to.include(_categories);
                        expect(country).to.equal(_country)
        
                    
                    })
                    
                } else {
                    const { error } = JSON.parse(body)

                    callback(new Error(error))

                } done()
            })
            
        })

        it('should fail on incorrect token', done => {
            const _token = "1"

            retrieveUser(_token,  (error) => {
                expect(error).to.be.an.instanceOf(Error)
                
                done()
            })
        })

       


     
      /*   afterEach(done => {
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
*/   
});
});

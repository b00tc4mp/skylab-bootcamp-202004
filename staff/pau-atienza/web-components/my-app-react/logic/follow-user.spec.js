describe('toggleFollowUser', () => {
    let email, _email, following
    describe('when user already exist', () => {
        let name, surname, password, _name, _surname, _password, token, _token
 
        beforeEach(() => {
            name = names.random()
            surname = surnames.random()
            email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
            password = passwords.random()

            _name = names.random()
            _surname = surnames.random()
            _email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
            _password = passwords.random()
        })

        describe('when following already exists', () => {
            beforeEach( done =>{
                
                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
                { "Content-type": "application/json" },
                (error, status, response) => {
                    if (error) return done(new Error(error.message))
    
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))
                    
                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    `{ "name": "${_name}", "surname": "${_surname}", "username": "${_email}", "password": "${_password}" }`,
                    { "Content-type": "application/json" },
                    (error, status, response) => {
                        if (error) return done(new Error(error.message))
        
                        if (status !== 201) return done(new Error(`undexpected status ${status}`))
                        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                        `{"username": "${_email}", "password": "${_password}" }`,
                        { "Content-type": "application/json" },
                        (error, status, response) => {
                            if (error) return done(new Error(error.message))
            
                            if (status !== 201) return done(new Error(`undexpected status ${status}`))
                            let {_token} = JSON.parse(response)
                            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                            `{"username": "${email}", "password": "${password}" }`,
                            { "Content-type": "application/json" },
                            (error, status, response) => {
                                if (error) return done(new Error(error.message))
                
                                if (status !== 201) return done(new Error(`undexpected status ${status}`))
                                let {token} = JSON.parse(response)
                                done()
                            })
                        })
                    })
                })
            })
            //We have now two authenticated users with two tokens (token and _token)
            it('should succeed on existing users', done => {
                //We get the id from the second user
                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all', undefined,
                { Authorization: `Bearer ${_token}`},
                (error, status, response) => {
                    if (error) return done(new Error(error.message))
    
                    if (status !== 200) return done(new Error(`undexpected status ${status}`))
                    let {_id} = JSON.parse(response).find(({email, __email = email})=>__email === _email)
                    //we get the array of followers from the first user
                    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
                    { Authorization: `Bearer ${token}`},
                    (error, status, response) => {
                        if (error) return done(new Error(error.message))
                        
                        if (status !== 200) return done(new Error(`undexpected status ${status}`))
                        let {following = []} = JSON.parse(response)
                        //The first user follows the second
                        toggleFollowUser(token, _id, following, (error, followerID)=>{
                            expect(error).to.be.undefined
                            expect(followerID).to.be.a('string')
                            //Check the id was added
                            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
                            { Authorization: `Bearer ${token}`},
                            (error, status, response) => {
                                expect(error).to.be.undefined
                                let {following = []} = JSON.parse(response)
                                expect(following[0]).to.equal(_id)

                                //We unfollow the user
                                toggleFollowUser(token, _id, following, (error, followerID)=>{
                                    expect(error).to.be.undefined
                                    expect(followerID).to.be.a('string')
                                    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
                                    { Authorization: `Bearer ${token}`},
                                    (error, status, response) => {
                                        expect(error).to.be.undefined
                                        let {following = []} = JSON.parse(response)
                                        expect(following[0]).to.be.undefined
                                        done()
                                    })
                                })
                            })
                        })
                    })
                })
            }).timeout(10000)

            // describe('when following is already followed', () => {
            //     beforeEach(() => {
            //         const user = users.find(user => user.email === email)

            //         user.follows = [following]
            //     })

            //     it('should succeed and following become unfollowed', () => {
            //         toggleFollowUser(email, following)

            //         const user = users.find(user => user.email === email)

            //         expect(user).to.exist
            //         expect(user.name).to.equal(name)
            //         expect(user.surname).to.equal(surname)
            //         expect(user.email).to.equal(email)
            //         expect(user.password).to.equal(password)

            //         expect(user.follows).to.exist
            //         expect(user.follows).to.have.length(0)
            //     })
            // })
            afterEach(done => {
                call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{ "password": "${password}" }`,
                {'Content-type': 'application/json', Authorization: `Bearer ${token}`},
                (error, status, body) => {
                    if (error) return done(new Error(error.message))

                    if (status !== 204) return done(new Error(`undexpected status ${status}`))
                    call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    `{ "password": "${_password}" }`,
                    {'Content-type': 'application/json', Authorization: `Bearer ${_token}`},
                    (error, status, body) => {
                        if (error) return done(new Error(error.message))

                        if (status !== 204) return done(new Error(`undexpected status ${status}`))
                        done()
                    })
                })
               
            })
        })

        // describe('when following does not exist', () => {
        //     beforeEach(() => following = `${names.random().toLowerCase().split(' ').join('')}${surnames.random().toLowerCase().split(' ').join('')}@mail.com`)

        //     it('should fail alerting following user e-mail does not exist', () =>
        //         expect(() => {toggleFollowUser(email, following)}).to.throw(Error, `The user with e-mail ${following} does not exist`)
        //     )
        // })


    })

    // describe('when user does not exist', () => {
    //     beforeEach(() => {
    //         email = `${names.random().toLowerCase().split(' ').join('')}${surnames.random().toLowerCase().split(' ').join('')}@mail.com`

    //         following = `${names.random().toLowerCase().split(' ').join('')}${surnames.random().toLowerCase().split(' ').join('')}@mail.com`
    //     })

    //     it('should fail alerting user e-mail does not exist', () =>
    //         expect(() => toggleFollowUser(email, following)).to.throw(Error, `The user with e-mail ${following} does not exist`)
    //     )
    // })

    // it("should return an error email is not a string", function(){
    //     let email = 'pauatienza@hotmail.com'
    //     let following = 'khaoulatanane@hotmail.com'
    //     expect(() => toggleFollowUser(123, following)).to.throw(TypeError, '123 is not a string') 
    //     expect(() => toggleFollowUser(email, 123)).to.throw(TypeError, '123 is not a string') 

    // })

    // it("should return an error the email does not pass the criteria", function(){
    //     let email = 'pauatienza@hotmail.com'
    //     let following = 'khaoulatanane@hotmail.com'
    //     expect(() => toggleFollowUser('123', following)).to.throw(Error, '123 is not an e-mail') 
    //     expect(() => toggleFollowUser(email, '123')).to.throw(Error, '123 is not an e-mail')
    // })
})
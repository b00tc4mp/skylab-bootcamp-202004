describe('retrieveUser', () =>{
    let name, surname, email, password, _token

    beforeEach( () => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    beforeEach(done => {
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (error) return done(new Error(error.message))
                if (status !== 201) return done(new Error(`undexpected status ${status}`))
                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{"username" : "${email}", "password" : "${password}"}`, { 'Content-type': 'application/json' }, (error, status, body) => {
                    if (error) return done(new Error(error.message))
                    if (status !== 200) return done(new Error(`undexpected status ${status}`))
                    let { token } = JSON.parse(body)
                    _token = token

                    done()
                })
            })
    })

    it('should return user data', done =>{
        retrieveUser(_token, (error, user) =>{
            expect(error).to.be.undefined

            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
            expect(user.password).to.be.undefined

            done()
        })
    })

    it('shoud return an error because invalid token is passed', done =>{
        let __token = '12132fkdjfkdjfkdjd'
        retrieveUser(__token, (error, user) =>{
            expect(error).to.exist
            expect(error.message).to.equal('invalid token')

            expect(user).to.be.undefined

            done()
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

    it('should return a type error', () => {
        _token = 1234567
        expect(() => {
            retrieveUser(_token, function() {})
        }).to.throw(TypeError, `${_token} is not a string`)

        _token = undefined
        expect(function(){
            retrieveUser(_token,  function() {})
        }).to.throw(TypeError, `${_token} is not a string`)
    })

})
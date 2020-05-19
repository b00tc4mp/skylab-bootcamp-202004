describe.only('is-user-authenticated', () => {
    let name,surname,email,password, _token

    beforeEach(done => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
        call ('POST','https://skylabcoders.herokuapp.com/api/v2/users',
        `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' }, (error, status) => {
            if (error) return done(error)
            if (status !== 201) return done(new Error(error.message))
            call('POST','https://skylabcoders.herokuapp.com/api/v2/users/auth', `{"username": "${email}", "password": "${password}"}`,
            { 'Content-type': 'application/json' }, (error, status, body) => {
                if (error) return done(error)
                if (status !== 200) return done(new Error(error.message))
                const { token } = JSON.parse(body)
                expect(token).to.exist
                _token = token

                done()
            })
        })
        
    })

    it('should succed if a valid token is used', done => {
        isUserAuthenticated(_token, (error, validToken) => {
            expect(error).to.be.undefined
            expect(validToken).to.be.true
            done()
        })
    })

    it('should fail if not valid token is used', done => {
        isUserAuthenticated('aaaaaaaaaaaa', (error, validToken) => {
            expect(error).to.be.not.undefined
            expect(error.message).to.equal('invalid token')
            expect(validToken).to.be.undefined
            done()
        })
    })

    it('should fail if token is not a string', () => {
        expect(() =>{
            isUserAuthenticated(1,1)
        }).to.throw(TypeError, '1 is not a string')
    })

    it('should fail if callback is not a function', () => {
        expect(() =>{
            isUserAuthenticated(_token,1)
        }).to.throw(Error, '1 is not a function')
    })

})
describe('retrieveUser', () => {
    let name, surname, email, password,_token

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    beforeEach( done => {
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
        `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' }, (error, status, body) => {
            if(error) return done(new Error(error.message))
            if(status !== 201) return done(new Error('status failure'))
            expect(body).to.equal('')

            call('POST',
            'https://skylabcoders.herokuapp.com/api/v2/users/auth',
            `{"username": "${email}","password": "${password}"}`,
            { 'Content-type': 'application/json' }, 
            (error, status, body) => {
                if(error) return done(new Error(error.message))
                if(status !== 200) return done(new Error('status failure'))
                
                const { token }  = JSON.parse(body)
                _token = token

                done()
            })
        })
    })

    it('should succeed on correct data', done => {
        retrieveUser(_token, (error, name, surname, email) => {
            expect(error).to.be.undefined
            expect(name).to.equal(name)
            expect(surname).to.equal(surname)
            expect(email).to.equal(email)

            done()
        })
    })

    it('should fail if token is incorrect', done => {
        const __token = 'aaaaaaaaaaaaaaa'
        retrieveUser(__token, (error, name, surname, email) => {
            expect(error).to.exist
            expect(error.message).to.equal('invalid token')
            expect(name).to.be.undefined
            expect(surname).to.be.undefined
            expect(email).to.be.undefined

            done()
        })
    })

    it('should fail if token is not a string', () => {
        expect(() => {
            retrieveUser(1, (error, name, surname, email) => {})
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            retrieveUser(true, (error, name, surname, email) => {})
        }).to.throw(TypeError, 'true is not a string')

        expect(() => {
            retrieveUser(undefined, (error, name, surname, email) => {})
        }).to.throw(TypeError, 'undefined is not a string')        
    })
})
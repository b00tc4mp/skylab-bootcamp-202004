describe('authenticateUser', function () {
    let name, surname, email, password

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
    })

    beforeEach(done => {
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
            { 'Content-type': 'application/json' }, (error, status, body) => {
                if(error) return done(new Error(error.message))
                if(status !== 201) return done(new Error('status failure'))

                done()
            })
    })

    it('should succeed on correct credentials', done =>  {
        authenticateUser(email, password, (error, token) => {
            expect(error).to.be.undefined
            expect(token).to.exist
            expect(token).to.be.a('string')
            done()
        })
    })

    describe('if user introduces incorrect credentials', () => {
        
        it('should fail on incorrect email', done =>  {
            const _email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(10*Math.random())}@mail.com`
            authenticateUser(_email, password, (error, token) => {
                expect(error).to.exist
                expect(token).to.be.undefined
                
                done()
            })
        })

        it('should fail on incorrect password', done =>  {
            const _email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(10*Math.random())}@mail.com`
            authenticateUser(email, email, (error, token) => {
                expect(error).to.exist
                expect(token).to.be.undefined
                
                done()
            })
        })
    })

    it('should fail on a non email input', () => {
        expect(()=>{ 
            authenticateUser('alejandro', password, () => {})
        }).to.throw(Error, 'alejandro is not an e-mail')
    })

    it('should fail if password is empty or blank', () => {
        expect(() => {
            authenticateUser(email, '', () => {})
        }).to.throw(Error, 'password is empty or blank')

        expect(() => {
            authenticateUser(email, '      ', () => {})
        }).to.throw(Error, 'password is empty or blank')
    })

    it('should fail on non-string field', () => {
        expect(() => {
            authenticateUser(email, true, function () { })
        }).to.throw(TypeError, 'true is not a string')

        expect(() => {
            authenticateUser(email, undefined, function () { })
        }).to.throw(TypeError, 'undefined is not a string')

        expect(() => {
            authenticateUser(1, password, function () { })
        }).to.throw(TypeError, '1 is not a string')

        expect(() => {
            authenticateUser(true, password, function () { })
        }).to.throw(TypeError, 'true is not a string')
    })

    it('should fail on non-function callback', () => {
        expect(() => {
            authenticateUser(email, password, 1)
        }).to.throw(TypeError, '1 is not a function')

        expect(() => {
            authenticateUser(email, password, true)
        }).to.throw(TypeError, 'true is not a function')

        expect(() => {
            authenticateUser(email, password, 'text')
        }).to.throw(TypeError, 'text is not a function')

        expect(() => {
            authenticateUser(email, password)
        }).to.throw(TypeError, 'undefined is not a function')
    })
})
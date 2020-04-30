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
                expect(error).to.be.undefined
                expect(status).to.equal(201)
                expect(body).to.equal('')

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
})
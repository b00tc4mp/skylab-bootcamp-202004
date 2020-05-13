
describe('authenticate', () => {
    let name, surname, email, password

    beforeEach(done => {
        name = names.random().toLowerCase()
        surname = surnames.random()
        email = `${name.split('').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
        
        const body = JSON.stringify({ name, surname, username: email, password })
        const headers = { 'Content-type': 'application/json' }
        const url = 'https://skylabcoders.herokuapp.com/api/v2/users'
    
        call('POST', url, body, headers, (error, status, response) => {
            if (error) return done(new Error(error.message))
            if (status !== 201) return done(new Error(`undexpected status ${status}`))

            done()
        })
    })

    it('it should succeed on correct credentials', done => {
        authenticateUser(email, password, (error, token) => {
            expect(error).to.be.undefined
            expect(token).to.exist
    
            done()
        })
    })

    it('should receive useful token', done => {
        authenticateUser(email, password, (error, token) => {
            expect(error).to.be.undefined
            expect(token).to.exist
            expect(token).to.be.a('string')
    
            done()
        })
    })
    
    it('should fail on wrong email', done => {
        const _email = '_' + email
        authenticateUser(_email, password, (error, token) => {
            expect(error).to.be.an.instanceof(Error)
            // expect(error.message).to.equal('')
    
            expect(token).to.be.undefined
    
            done()
        })
    })
    
    it('should fail on wrong password', done => {
        const _password = '_' + password
        authenticateUser(email, _password, (error, token) => {
            expect(error).to.be.an.instanceof(Error)
            // expect(error.message).to.equal('')
    
            expect(token).to.be.undefined
    
            done()
        })
    })

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


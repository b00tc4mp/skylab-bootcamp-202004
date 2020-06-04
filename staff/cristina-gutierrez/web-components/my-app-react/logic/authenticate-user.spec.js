describe('authenticateUser', function () {
    let name, surname, email, password

    beforeEach(function () {
        users.length = 0

        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

        /* users.push({ name, surname, email, password }) */
    })
    it('should succeed on correct data', done => {
        registerUser(name, surname, email, password, error => {
            expect(error).to.be.undefined

                authenticateUser(email , password , (error, token) => {
                    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                        undefined,
                        { 'Authorization': `Bearer ${token}` },
                        (error, status, body) => {
                            expect(error).to.be.undefined
                            expect(status).to.equal(200)

                            const user = JSON.parse(body)

                            expect(user.name).to.equal(name)
                            expect(user.surname).to.equal(surname)
                            expect(user.username).to.equal(email)
                            expect(user.password).to.be.undefined

                            done()
                        }
                    )
                })
        })
    })
    it('should succeed on correct credentials', function () {
        expect(function () {
            authenticateUser(email, password)
        }).not.to.throw()
    })

    it('should fail on incorrect credentials', function () {
        const _email = email.substring(0, 3) + '-' + email.substring(3)

        expect(function () {
            authenticateUser(_email, password)
        }).to.throw(Error, 'wrong credentials')

        const _password = password.substring(0, 3) + '-' + password.substring(3)

        expect(function () {
            authenticateUser(email, _password)
        }).to.throw(Error, 'wrong credentials')
    })
})
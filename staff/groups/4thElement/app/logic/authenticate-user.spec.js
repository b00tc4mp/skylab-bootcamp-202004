describe('authenticateUser', function() {
    let name, surname, email, password

    before(() => {
        thElement = true
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()

    })
    it('should succeed on correct data', done => {
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{ "thElement": "true", "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
            (error, status) => {
                if (error) return done(new Error(error.message))
                if (status !== 201) return done(new Error(`unexpected ${status}`))


                authenticateUser(email, password, (error, token) => {
                    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                        undefined, { 'Authorization': `Bearer ${token}` },
                        (error, status, body) => {
                            if (error) return done(new Error(error.message))
                            if (status !== 200) return done(new Error(`unexpected ${status}`))

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

    it('should succeed on correct credentials', function() {
        expect(function() {
            authenticateUser(email, password)
        }).not.to.throw(Error, 'wrong credentials')
    })

    // it('should fail on incorrect credentials', function() {
    //     const _email = email.substring(0, 3) + '-' + email.substring(3)

    //     expect(function() {
    //         authenticateUser(_email, password)
    //     }).to.throw(Error, 'wrong credentials')

    //     const _password = password.substring(0, 3) + '-' + password.substring(3)
    //         //Borji comepitilines
    //     expect(function() {
    //         authenticateUser(email, _password)
    //     }).to.throw(Error, 'wrong credentials')
    // })
})
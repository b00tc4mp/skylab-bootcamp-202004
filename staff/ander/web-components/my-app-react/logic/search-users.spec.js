describe('search-users', () => {
    let query, name, surname, email, password, _token

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail.com`
        password = passwords.random()
        query = name
    })

    describe('When users exists', () => {
        beforeEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                (error, status) => {
                    debugger
                    if (error) return done(new Error(error.message))
                    if (status !== 201) return done(new Error(`unexpected ${status}`))

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                        `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                        (error, status, body) => {

                            const { token } = JSON.parse(body)
                            _token = token

                            done()
                        })
                })
        })

        it('should succeed finding the user', done => {
            searchUsers(_token, query, (error, users) => {
                const [user] = users
                expect(error).to.be.undefined
                expect(user.name).to.equal(name)


                done();
            })
        })
    })

    describe('When theres no matching query!==everything babe', () => {
        it('should return an empty array', done => {
            searchUsers(_token, query, (error, users) => {
                expect(users.length).to.equal(0)
                    /* expect(user.name).to.equal(name) */


                done();
            })
        })
    })
})
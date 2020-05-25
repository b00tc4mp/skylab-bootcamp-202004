describe('searchUsers', () => {
    let name, surname, email, password, _token

    beforeEach(() => {
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

    it('should return an empty array with no results', done => {
        searchUsers(_token, 'dhsdjshdjahhdfhjdhfjdhfjdhjk', (error, users) => {

            expect(users.length).to.equal(0)

            done()
        })
    })

    it('should return an array with results', done => {
        searchUsers(_token, 'pepito', (error, users) => {
            expect(error).to.be.undefined

            expect(users.length).to.be.greaterThan(0)
            expect(users[0].name).to.exist
            expect(users[0].surname).to.exist
            expect(users[0].email).to.exist
            expect(users[0].id).to.exist

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

    it('should return an error', () => {
        expect(() => {
            searchUsers(_token, '    ', function(){})
        }).to.throw(Error, 'query is empty')
    })

    it('should return a type error', () => {
        let __token = 123
        expect(() => {
            searchUsers(__token, 'hola', function(){})
        }).to.throw(TypeError, '123 is not a string')
    })
})
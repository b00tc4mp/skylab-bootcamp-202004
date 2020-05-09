describe('toggleFavouriteCard', () => {
    let name, surname, email, password, _token, username, id

    beforeEach(() => {
        name = names.random()
        surname = surnames.random()
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`
        password = passwords.random()
        username = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}`
        id = '8dfa70c9-11bc-4a21-9baa-18b3f8044087'
    })

    beforeEach(done => {
        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{ "nickname": "${username}", "username": "${email}", "password": "${password}" }`,
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

    it('should succeed on pushing a new id', done => {
        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${_token}` }, (error, state, body) => {
            expect(error).to.be.undefined
            expect(state).to.equal(200)
            expect(body).to.exist

            let user = JSON.parse(body)

            expect(user.myCards).to.be.undefined
            
            toggleFavouriteCard(_token, id, error => {
                expect(error).to.be.undefined

                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    undefined,
                    { Authorization: `Bearer ${_token}` }, (error, state, body) => {
                        expect(error).to.be.undefined
                        expect(state).to.equal(200)
                        expect(body).to.exist

                        let _user = JSON.parse(body)

                        expect(_user.myCards).to.exist
                        expect(_user.myCards.length).to.be.greaterThan(0)

                        expect(_user.myCards[0]).to.equal(id)
                        expect(_user.myCards[0]).to.be.a('string')

                        done()
                })
            })
        })
    })
})
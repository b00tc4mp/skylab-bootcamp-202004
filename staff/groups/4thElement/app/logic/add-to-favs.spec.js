describe('add-to-favs', () => {
    let thElement, sportState, spotSelected, name, surname, email, password, _token

    beforeEach(() => {
        thElement = true
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('')}@mail1.com`
        password = passwords.random()
        spotSelected = surfSpots[Math.floor(Math.random() * surfSpots.length)]
        sportState = 'surf'
    })

    describe('Adds an spot to the users favorites list', () => {
        beforeEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{ "thElement": "true", "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (error) return done(new Error(error.message))
                    if (status === 409) {
                        const { error: _error } = JSON.parse(body)
                        return done(new Error(_error))
                    }
                    if (status !== 201) return done(new Error(`unexpected ${status}`))

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                        `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                        (error, status, body) => {
                            if (error) return done(new Error(error.message))
                            if (status !== 200) return done(new Error(`unexpected ${status}`))

                            const { token } = JSON.parse(body)
                            _token = token
                            done()
                        })
                })
        })

        it('should success on adding the spot to the fav List', done => {
            addToFavs(_token, spotSelected, sportState, (error) => {
                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
                    {
                        'Authorization': `Bearer ${_token}`
                    },
                    (error, status, body) => {
                        if (error) return done(new Error(error.message))
                        if (status !== 200) return done(new Error(`unexpected ${status}`))
                        const user = JSON.parse(body)

                        expect(error).to.be.undefined
                        expect(user.favSpots).to.exist
                        expect(user.favSpots.length).to.equal(1)
                        expect(user.favSpots[0]).to.equal(spotSelected.name)

                    })

                done();
            })
        })

    })

})




describe('fav-list', () => {
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

    describe('Return an array with users favorite spots', () => {
        beforeEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
                `{ "thElement": "true", "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (error) return done(new Error(error.message))
                    if(status===409) {
                        const {error: _error} = JSON.parse(body)
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

                            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
                                {
                                    'Authorization': `Bearer ${_token}`
                                },
                                (error, status, body) => {
                                    if (error) return done(new Error(error.message))

                                    if (status === 200) {
                                        const userLoged = JSON.parse(body)

                                        const { favSpots = [] } = userLoged

                                        let indexOfName;
                                        let acc = 0;
                                        favSpots.map((element) => {
                                            halo = element.name.indexOf(spotSelected.name)
                                            if (halo !== -1) indexOfName = acc;
                                            acc++
                                        })

                                        if (indexOfName === undefined) {
                                            spotSelected.following = true
                                            spotSelected.sportType = sportState
                                            favSpots.push(spotSelected)
                                        } else {
                                            favSpots.splice(indexOfName, 1)
                                        }

                                        call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify({ favSpots }),
                                            {
                                                'Authorization': `Bearer ${_token}`,
                                                'Content-type': 'application/json'
                                            },
                                            (error, status, body) => {
                                                if (error) return done(error)

                                                if (status === 204) {
                                                    done()
                                                } else {
                                                    const { error } = JSON.parse(body)

                                                    done(new Error(error))
                                                }
                                            })
                                    } else {
                                        const { error } = JSON.parse(body)

                                        done(new Error(error.message))
                                    }
                                })
                        })
                })
        })

        it('should succes on mounting an array using de favorite spots from the user logged', done => {
            favList(_token, sportState, (error, filteredArray) => {
                expect(filteredArray).to.exist
                expect(filteredArray.length).to.equal(1)
                expect(error).to.be.undefined

                done();
            })
        })

    })

})





describe('addFwitter', () => {
    let _name, surname, email, password, player, message


    beforeEach(() => {
        _name = names.random();
        surname = surnames.random();
        email = `${_name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`;
        password = passwords.random();
        player = playersTop.random()
        message = messages.random()
    })

    describe('Async Test', () => {

        it('Should succeed on correct data', done => {
            call('POST',
                'https://skylabcoders.herokuapp.com/api/v2/users',
                `{"name":"${_name}","surname":"${surname}","username":"${email}","password":"${password}", "app":"footify"} `, { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                        `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                        (error, status, body) => {
                            if (status !== 200) return done(new Error(`undexpected status ${status}`))
                            const { token } = JSON.parse(body)

                            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                                undefined, { Authorization: `Bearer ${token}` },
                                (error, status, body) => {
                                    if (status !== 200) return done(new Error(`undexpected status ${status}`))

                                    call('GET', `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?&p=${player}`,
                                        undefined, undefined,
                                        (error, status, body) => {
                                            if (status !== 200) return done(new Error(`undexpected status ${status}`))

                                            let { player: results } = JSON.parse(body)


                                            results.forEach(result => {
                                                const { dateBorn, strCutout, strPlayer, strPosition, strSport, strTeam, strNumber, strBirthLocation, idPlayer, strHeight, strWeight, idTeam } = result

                                                if (strCutout !== null && strSport === 'Soccer') {

                                                    call('GET', `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${idTeam}`,
                                                        undefined, undefined,
                                                        (error, status, body) => {
                                                            if (status !== 200) return done(new Error(`undexpected status ${status}`))

                                                            let { teams: results } = JSON.parse(body)
                                                            results.forEach(result => {
                                                                const { strTeamBadge } = result

                                                                addFwitter(idPlayer, strPlayer, message, token, (error, results) => {
                                                                    expect(error).to.be.undefined
                                                                    expect(results).to.be.undefined

                                                                    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, { Authorization: `Bearer ${token}` },
                                                                        (error, status, body) => {
                                                                            if (status !== 200) return done(new Error(`undexpected status ${status}`))
                                                                            const user = JSON.parse(body)

                                                                            const { name, surname, username, app, fwitter } = user
                                                                            expect(name).to.be.a('string');
                                                                            expect(name).to.exist
                                                                            expect(surname).to.be.a('string');
                                                                            expect(surname).to.exist
                                                                            expect(username).to.be.a('string');
                                                                            expect(username).to.exist
                                                                            expect(app).to.be.a('string');
                                                                            expect(app).to.exist
                                                                            expect(fwitter).to.exist


                                                                            const [{ id, fwitt }] = fwitter
                                                                            expect(id).to.be.a('string');
                                                                            expect(id).to.exist
                                                                            expect(fwitt).to.exist

                                                                            const [{ message, date }] = fwitt
                                                                            expect(message).to.be.a('string');
                                                                            expect(message).to.exist
                                                                            expect(date).to.be.a('string');
                                                                            expect(date).to.exist
                                                                            done()

                                                                        })
                                                                })
                                                            })

                                                        })
                                                }
                                            })
                                            
                                        })
                                })
                        })
                })

        })

        it('Should fail on icorrect Token', done => {
            call('POST',
                'https://skylabcoders.herokuapp.com/api/v2/users',
                `{"name":"${_name}","surname":"${surname}","username":"${email}","password":"${password}", "app":"footify"} `, { 'Content-type': 'application/json' },
                (error, status, body) => {
                    if (status !== 201) return done(new Error(`undexpected status ${status}`))

                    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                        `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                        (error, status, body) => {
                            if (status !== 200) return done(new Error(`undexpected status ${status}`))
                            const { token } = JSON.parse(body)

                            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
                                undefined, { Authorization: `Bearer ${token}` },
                                (error, status, body) => {
                                    if (status !== 200) return done(new Error(`undexpected status ${status}`))

                                    call('GET', `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?&p=${player}`,
                                        undefined, undefined,
                                        (error, status, body) => {
                                            if (status !== 200) return done(new Error(`undexpected status ${status}`))

                                            let { player: results } = JSON.parse(body)


                                            results.forEach(result => {
                                                const { dateBorn, strCutout, strPlayer, strPosition, strSport, strTeam, strNumber, strBirthLocation, idPlayer, strHeight, strWeight, idTeam } = result

                                                if (strCutout !== null && strSport === 'Soccer') {

                                                    call('GET', `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${idTeam}`,
                                                        undefined, undefined,
                                                        (error, status, body) => {
                                                            if (status !== 200) return done(new Error(`undexpected status ${status}`))

                                                            let { teams: results } = JSON.parse(body)
                                                            results.forEach(result => {
                                                                const { strTeamBadge } = result

                                                                const _token = token.substring(0,6)
                                                                addFwitter(idPlayer, strPlayer, message, _token, (error, results) => {
                                                                    expect(error).to.exist
                                                                    expect(error).to.instanceOf(Error);
                                                                    expect(error.message).to.equal('invalid token')
                                                                    expect(results).to.be.undefined
                                                                    done()
                        
                                                                })
                                                            })

                                                        })

                                                }
                                            })  
                                        })
                                })
                        })
                })

        })

        


        afterEach(done => {
            call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                `{ "username": "${email}", "password": "${password}" }`, { 'Content-type': 'application/json' },
                (error, status, body) => {

                    if (error) return done(error)
                    if (status !== 200) return done(new Error(`unexpected status ${status}`))

                    const { token } = JSON.parse(body)

                    call('DELETE', 'https://skylabcoders.herokuapp.com/api/v2/users',
                        `{ "password": "${password}" }`, {
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
    })


})
describe("count number of card for comments", () => {

    let name, surname, email, password, confirmPassword, player, message, cardColor
    let result = []
    let fwitter = []

    beforeEach((done) => {
        name = names.random();
        surname = surnames.random();
        email = `${name.toLowerCase().split(' ').join('')}${surname.toLowerCase().split(' ').join('').concat('-').concat(Math.random())}@mail.com`;
        password = passwords.random();
        confirmPassword = password;
        player = playersTop.random()
        message = messages.random()
        cardColor = 'green'

        //register
        call('POST',
            'https://skylabcoders.herokuapp.com/api/v2/users',
            `{"name":"${name}","surname":"${surname}","username":"${email}","password":"${password}", "app":"footify"} `,
            { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (status !== 201) return done(new Error(`undexpected status ${status}`))

                //atuhenticate
                call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
                    `{ "username": "${email}", "password": "${password}" }`,
                    { 'Content-type': 'application/json' },
                    (error, status, body) => {
                        if (status !== 200) return done(new Error(`undexpected status ${status}`))

                        const { token } = JSON.parse(body);

                        expect(token).to.exist
                        //retrieve all users
                        call("GET", "https://skylabcoders.herokuapp.com/api/v2/users/all", undefined,
                            { Authorization: `Bearer ${token}` }, (error, status, body) => {
                                if (status !== 200) return done(new Error(`undexpected status ${status}`))
                                const users = JSON.parse(body)

                                let userId
                                users.forEach(({ id: idUser, username }) => {

                                    if (email === username) {
                                        userId = idUser
                                    }
                                })

                                //search players

                                call('GET', `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?&p=${player}`,
                                    undefined, undefined, (error, status, body) => {
                                        if (status !== 200) return done(new Error(`undexpected status ${status}`))
                                        let _players = []

                                        let { player: results } = JSON.parse(body)



                                        let counterSoccerPlayers = 0
                                        let counterSearchTeam = 0

                                        results.forEach(result => {
                                            const { dateBorn, strCutout, strPlayer, strPosition, strSport, strTeam, strNumber, strBirthLocation, idPlayer, strHeight, strWeight, idTeam } = result

                                            if (strCutout !== null && strSport === 'Soccer') {
                                                counterSoccerPlayers++
                                                let splitName = strPlayer.split(' ');
                                                let firstName = splitName[0];
                                                let surname = splitName[1];


                                                call('GET', `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${idTeam}`,
                                                    undefined, undefined, (error, status, body) => {
                                                        if (status !== 200) return done(new Error(`undexpected status ${status}`))
                                                        let team = []
                                                        let { teams: results } = JSON.parse(body)

                                                        results.forEach(result => {
                                                            const { strTeamBadge } = result

                                                            team.push({
                                                                emblem: strTeamBadge
                                                            })
                                                        })

                                                        const [{ emblem }] = team

                                                        counterSearchTeam++

                                                        let like = 0
                                                        _players.push({
                                                            date: notNull(dateBorn),
                                                            image: strCutout,
                                                            firstName: notNull(firstName),
                                                            surname: notNull(surname),
                                                            position: notNull(strPosition),
                                                            clubName: notNull(strTeam),
                                                            number: notNull(strNumber),
                                                            born: notNull(strBirthLocation),
                                                            id: notNull(idPlayer),
                                                            weight: notNull(strWeight),
                                                            height: notNull(strHeight),
                                                            teamId: notNull(idTeam),
                                                            club: emblem,
                                                            likes: like
                                                        })


                                                        //add fwitt

                                                        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, {
                                                            Authorization: `Bearer ${token}`
                                                        },
                                                            (error, status, body) => {


                                                                const user = JSON.parse(body)
                                                                let { fwitter = [] } = user

                                                                let pushFwitt = false;

                                                                if (fwitter.length === 0) {
                                                                    const resultFwitter = {
                                                                        id: idPlayer,
                                                                        name: `${firstName} ${surname}`,
                                                                        fwitt: [{
                                                                            message: message,
                                                                            date: new Date().toDateString(),
                                                                            _date: Date.now(),
                                                                            greenCard: 0,
                                                                            yellowCard: 0,
                                                                            redCard: 0,
                                                                        }]
                                                                    }

                                                                    fwitter.push(resultFwitter)

                                                                } else {
                                                                    fwitter.forEach(({ id, fwitt }) => {
                                                                        if (id === idPlayer) {
                                                                            const newFwitt = {
                                                                                message: message,
                                                                                date: new Date().toDateString(),
                                                                                _date: Date.now(),
                                                                                greenCard: 0,
                                                                                yellowCard: 0,
                                                                                redCard: 0,
                                                                            }
                                                                            fwitt.unshift(newFwitt);
                                                                            pushFwitt = true;
                                                                        }
                                                                    })
                                                                    if (!pushFwitt) {
                                                                        const addNewFwitter = {
                                                                            id: _players.id,
                                                                            name: `${firstName} ${surname}`,
                                                                            fwitt: [{
                                                                                message: message,
                                                                                date: new Date().toDateString(),
                                                                                _date: Date.now(),
                                                                                greenCard: 0,
                                                                                yellowCard: 0,
                                                                                redCard: 0,
                                                                            }]
                                                                        }
                                                                        fwitter.push(addNewFwitter)
                                                                    }
                                                                }

                                                                call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify({ fwitter }), {
                                                                    Authorization: `Bearer ${token}`,
                                                                    'Content-type': 'application/json'
                                                                },
                                                                    (error, status, body) => {

                                                                        //retrieve fwitts

                                                                        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
                                                                            undefined, { Authorization: `Bearer ${token}` },
                                                                            (error, status, body) => {
                                                                                expect(error).to.be.undefined
                                                                                expect(status).to.equal(200)

                                                                                let users = JSON.parse(body)

                                                                                
                                                                                users.forEach(({ id: idUser, name: nameUser, surname: surnameUser, fwitter }) => {

                                                                                    if (fwitter) {
                                                                                        results.push({ idUser, nameUser, surnameUser, fwitter })
                                                                                    }
                                                                                })

                                                                               
                                                                                result = results.map(({ idUser, nameUser, surnameUser, fwitter }) => {

                                                                                    fwitter.map(({ id, name, fwitt }) => {
                                                                                        fwitt.map(({ message, date, _date, greenCard, yellowCard, redCard }) => {
                                                                                            if (_date) result.push({ idUser, nameUser, surnameUser, name, message, date, _date, greenCard, yellowCard, redCard })
                                                                                        })
                                                                                    })
                                                                                    result.sort(function (a, b) {
                                                                                        return parseInt(b._date) - parseInt(a._date);
                                                                                    });
                                                                                    result.length = 20;
                                                                                    return result
                                                                                })

                                                                                //toggle card comment

                                                                                call("GET", "https://skylabcoders.herokuapp.com/api/v2/users", undefined,
                                                                                    { Authorization: `Bearer ${token}` }, (error, status, body) => {
                                                                                        if (error) return callback(error);


                                                                                        const user = JSON.parse(body);
                                                                                        if (user.red === undefined) user.red = []
                                                                                        if (user.yellow === undefined) user.yellow = []
                                                                                        if (user.green === undefined) user.green = []

                                                                                        let { red = [], yellow = [], green = [] } = user
                                                                                        let actualIndexId
                                                                                        let actualIndexMessage

                                                                                        switch (cardColor) {
                                                                                            case 'red':


                                                                                                actualIndexId = red.map((red) => { return red.id }).indexOf(userId)
                                                                                                actualIndexMessage = red.map((red) => { return red.message }).indexOf(message)

                                                                                                if (actualIndexId !== -1 && actualIndexMessage !== -1) red.splice(actualIndexMessage, 1)
                                                                                                else red.push({ id: userId, message: message })

                                                                                                break
                                                                                            case 'yellow':

                                                                                                actualIndexId = yellow.map((yellow) => { return yellow.id }).indexOf(userId)
                                                                                                actualIndexMessage = yellow.map((yellow) => { return yellow.message }).indexOf(message)

                                                                                                if (actualIndexId !== -1 && actualIndexMessage !== -1) yellow.splice(actualIndexMessage, 1)
                                                                                                else yellow.push({ id: userId, message: message })


                                                                                                break
                                                                                            case 'green':

                                                                                                actualIndexId = green.map((green) => { return green.id }).indexOf(userId)
                                                                                                actualIndexMessage = green.map((green) => { return green.message }).indexOf(message)

                                                                                                if (actualIndexId !== -1 && actualIndexMessage !== -1) green.splice(actualIndexMessage, 1)
                                                                                                else green.push({ id: userId, message: message })


                                                                                                break

                                                                                            default:
                                                                                                return callback(error)
                                                                                        }





                                                                                        call("PATCH", "https://skylabcoders.herokuapp.com/api/v2/users", JSON.stringify(user),
                                                                                            { Authorization: `Bearer ${token}`, "Content-type": "application/json" },
                                                                                            (error, status, body) => {
                                                                                                if (error) return callback(error);

                                                                                             


                                                                                            }
                                                                                        )
                                                                                    }
                                                                                )
                                                                            }
                                                                        )
                                                                    }
                                                                )
                                                            }
                                                        )
                                                    }
                                                )
                                            }
                                        })
                                    }
                                )
                            }
                        )
                    }
                )
            }
        )
    })
    it('', done => {
        commentCards(result, token, (error, results) => {
            expect(error).to.be.undefined
            expect(results.length).to.exist
           
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
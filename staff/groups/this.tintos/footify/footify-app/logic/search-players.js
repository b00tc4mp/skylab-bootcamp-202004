function searchPlayers(query, callback) {
    if (query === '') throw new Error('Any result search');

    String.validate(query)
    Function.validate(callback)

    // change the name for exemple 'Piqué'.latinise() => 'Pique'
    var _query = query.latinise()

    let _players = []
    call('GET', `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?&p=${_query}`,
        undefined, undefined, (error, status, body) => {
            if (error) throw callback(error)

            if (status === 200) {

                let { player: results } = JSON.parse(body)
                if (!results) return callback(new Error('sorry, no players found :('))


                let counterSoccerPlayers = 0
                let counterSearchTeam = 0

                results.forEach(result => {
                    const { dateBorn, strCutout, strPlayer, strPosition, strSport, strTeam, strNumber, strBirthLocation, idPlayer, strHeight, strWeight, idTeam } = result

                    if (strCutout !== null && strSport === 'Soccer') {
                        counterSoccerPlayers++
                        let splitName = strPlayer.split(' ');
                        let firstName = splitName[0];
                        let surname = splitName[1];

                        
                        searchTeam(idTeam, (error, _idTeam) => {
                            const [{ emblem }] = _idTeam
                            if (error) throw console.error(error)
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

                            if (counterSoccerPlayers === counterSearchTeam) {
                                callback(undefined, _players)
                            }

                        })
                    }
                })



            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        })
}
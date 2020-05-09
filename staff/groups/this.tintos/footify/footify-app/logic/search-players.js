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

                results.forEach(result => {
                    const { dateBorn, strCutout, strPlayer, strPosition, strSport, strTeam, strNumber, strBirthLocation, idPlayer, strHeight, strWeight } = result
                    if (strCutout !== null && strSport === 'Soccer') {

                        _players.push({
                            date: notNull(dateBorn),
                            image: notNull(strCutout),
                            football_player: notNull(strPlayer),
                            position: notNull(strPosition),
                            club: notNull(strTeam),
                            number: notNull(strNumber),
                            born: notNull(strBirthLocation),
                            id: notNull(idPlayer),
                            weight: notNull(strWeight),
                            height: notNull(strHeight)
                        })
                    }

                })

                callback(undefined, _players)
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        })
}





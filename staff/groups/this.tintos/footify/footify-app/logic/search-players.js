function searchPlayers(query, callback) {

    String.validate(query)
    Function.validate(callback)
    
    let _players = []
    call('GET', `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?&p=${query}`,
        undefined, undefined, (error, status, body) => {
            if (error) throw callback(error)

            if (status === 200) {

                let { player: results } = JSON.parse(body)

                results.forEach(result => {
                    const { dateBorn, strCutout, strPlayer, strPosition, strSport, strTeam,strNumber,strBirthLocation,idPlayer,strHeight,strWeight } = result
                    if (strCutout !== null && strSport === 'Soccer')
                        _players.push({
                            date: dateBorn, image: strCutout, football_player: strPlayer,
                            position: strPosition, club: strTeam, number: strNumber, born: strBirthLocation,
                            id: idPlayer, weight: strWeight, height: strHeight})
                })

                callback(undefined, _players)
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        })
}

// searchPlayers('messi', (error, _players) => {

//     console.log(_players)
// })

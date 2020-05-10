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
                let counter = 0
                results.forEach(result => {
                    const { dateBorn, strCutout, strPlayer, strPosition, strSport, strTeam, strNumber, strBirthLocation, idPlayer, strHeight, strWeight,idTeam } = result
                    if (strCutout !== null && strSport === 'Soccer') {

                            let _emblem = '';

                            searchTeam(idTeam,(error,_idTeam)=>{
                                if(error) throw console.error(error)
                                const [emblem] = _idTeam
                                _emblem = emblem
                                if(results.length === counter)
                                _players.push({emblem: notNull(_emblem)})
                                
                            })
                        

                        let splitName = strPlayer.split(' ');
                        let firstName = splitName[0];
                        let surname = splitName[1];

                        counter++

                        _players.push({
                            date: notNull(dateBorn),
                            image: strCutout,
                            firstName: notNull(firstName),
                            surname: notNull(surname),
                            position: notNull(strPosition),
                            club: notNull(strTeam),
                            number: notNull(strNumber),
                            born: notNull(strBirthLocation),
                            id: notNull(idPlayer),
                            weight: notNull(strWeight),
                            height: notNull(strHeight),
                            
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





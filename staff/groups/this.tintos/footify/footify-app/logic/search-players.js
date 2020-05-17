/**
 * Checks user credentials.
 * 
 * @param {string} query The query of the player search. 
 * @param {callback} callback The expression to be called after checking credentials, receiving an Error and _players array.
 * 
 * @returns {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @returns {Object} _players It receives a array in case credentials are correct with the info of the searched player.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If does not match the expected format.
 */



function searchPlayers(query, callback) {
    if (query === '') return callback(new Error('The field is empty'));

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


                        let team = []
                        call('GET', `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${idTeam}`,
                            undefined, undefined, (error, status, body) => {
                                if (error) throw callback(error)
                    
                                if (status === 200) {
                    
                                    let { teams: results } = JSON.parse(body)
                    
                                    results.forEach(result => {
                                        const {strTeamBadge } = result
                    
                                        team.push({
                                             emblem: strTeamBadge
                                        })
                                    })

                                    const [{emblem}] = team  

                                    counterSearchTeam++

                                        let like = 0
                                    _players.push({
                                        date: notNull(dateBorn,'-'),
                                        image: strCutout,
                                        firstName: notNull(firstName,'-'),
                                        surname: notNull(surname,'-'),
                                        position: notNull(strPosition,'-'),
                                        clubName: notNull(strTeam,'-'),
                                        number: notNull(strNumber,'-'),
                                        born: notNull(strBirthLocation,'-'),
                                        id: notNull(idPlayer,'-'),
                                        weight: notNull(strWeight,'-'),
                                        height: notNull(strHeight,'-'),
                                        teamId: notNull(idTeam,'-'),
                                        club: emblem,
                                        likes: like
                                    })

                                    if (counterSoccerPlayers === counterSearchTeam) {
                                        callback(undefined, _players)
                                    }
                                } else {
                                    const { error } = JSON.parse(body)
                    
                                    callback(new Error(error))
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


function searchTeam(teamId, callback) {
    if(teamId === '') throw new Error('Any team search');
    
    String.validate(teamId);
    Function.validate(callback);

    let team = []
    call('GET', `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`,
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

                callback(undefined, team)
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        })
}


/**
 * Checks user credentials.
 * 
 * @param {string} teamId The id of the team player. 
 
 * @param {callback} callback The expression to be called after checking credentials, receiving an Error or a body.
 * @return {string} Return a string with a emplem of the team.
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If e-mail does not match the expected format.
 *
 */



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

/**
 * Invoked after remote authentication.
 * 
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @param {string} emblem It receives a emblem in case of sucess.
 * 
 */
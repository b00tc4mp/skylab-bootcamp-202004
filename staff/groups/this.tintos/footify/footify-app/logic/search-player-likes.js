/**
 * Checks user credentials.
 * 
 * @param {Object} players Array of objects of the all players and info og them
 * @param {string} token The token of the current user. 
 * @param {callback} callback The expression to be called after checking credentials, error, players, users.
 * 
 * @returns {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @returns {Object} _players It receives a array in case credentials are correct with the info of the searched player.
 * @returns {Object} users It receives a array in case credentials are correct with the info of the users.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If does not match the expected format.
 */


function searchPlayersLikes(players, token, callback) {
    if (players === undefined) return callback(new Error('sorry, no players found :('));

    String.validate.notVoid(token);
    Function.validate(callback)

    let likePlayers = []
    call("GET", "https://skylabcoders.herokuapp.com/api/v2/users/all", 
    undefined, { Authorization: `Bearer ${token}` }, 
    (error, status, body) => {
    
        if (error) return callback(error);

        if (status === 200) {

            let users = JSON.parse(body);
            users = users.filter((user) => {
                return user.app === "footify";
            });

            users.forEach(({ likes = [] }) => {
                if (likes) {
                    for (like of likes) {
                        likePlayers.push(like);
                    }
                }
            });
            const resultsLikes = results(likePlayers)

            for (var i = 0; i < resultsLikes.length; i++) {
                for (y = 0; y < players.length; y++) {
                    if (Object.keys(resultsLikes[i])[0] === players[y].id) {
                        players[y].likes = resultsLikes[i][Object.keys(resultsLikes[i])[0]]
                    }
                }
            }

            // sort by value
            players = players.sort(function(a, b) {

                return b.likes - a.likes
            })
            callback(undefined, players, users)
        } else {
            const { error } = JSON.parse(body)
            callback(new Error(error));
        }
    })
}
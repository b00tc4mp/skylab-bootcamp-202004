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
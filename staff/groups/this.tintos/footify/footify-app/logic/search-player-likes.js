function searchPlayersLikes(players, token, callback) {
    debugger

    let likePlayers = []
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
        undefined, { Authorization: `Bearer ${token}` }, (error, status, body) => {

            if (error) return callback(error)
            if (status === 200) {

                let users = JSON.parse(body)
                users = users.filter((user) => {
                    return user.app === 'footify'
                })

                users.forEach(({ likes = [] }) => {

                    if (likes) {
                        for (like of likes) {

                            likePlayers.push(like)

                        }
                    }
                })

                const resultsLikes = results(likePlayers)

                callback(undefined, resultsLikes)
            }
            else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }
        })
}

function seachTimes(like, likePlayers) {
    var count = 0;

    for (var i = 0; i < likePlayers.length; i++) {
        if (like === likePlayers[i]) {
            count++
        }
    }

    return like + ' ' + count
}

function results(likePlayers) {
    var auxLikes = []
    var result = []
    for (var i = 0; i < likePlayers.length; i++) {

        if (!auxLikes.includes(likePlayers[i])) {
            auxLikes.push(likePlayers[i]);
            result.push(searchTimes(likePlayers[i], likePlayers));
        }
    }
    return result;
}
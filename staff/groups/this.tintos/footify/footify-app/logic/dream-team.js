/**
 * Checks user credentials.
 * 

 * @param {string} token The token of the current user.
 * @param {callback} callback The expression to be called after checking credentials, receiving an Error amb playersImg.
 * 
 * @returns {Object} playersImg _players It receives a array in case credentials are correct with the info of the searched player(with the url's of images).
 * @returns {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 */


function dreamTeam(token, callback) {

    String.validate.notVoid(token);
    Function.validate(callback)

    let likePlayers = []
    let resultsLikes
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
                resultsLikes = results(likePlayers)
                let resultsSorted = []

                for (resultsLike of resultsLikes) {
                    if (Object.keys(resultsLike)[0] !== '[' && Object.keys(resultsLike)[0] !== ']') {
                        resultsSorted.push({ id: Object.keys(resultsLike)[0], likes: resultsLike[Object.keys(resultsLike)[0]] })
                    }
                }
                resultsLikes = resultsSorted.sort(function (a, b) {

                    return b.likes - a.likes
                })
                let posRank = 0
                let resultsLikesRank = resultsLikes.map(result => {
                    posRank++
                    result.posRank = posRank
                    return result
                })

                let playersImg = []
                let counter = 0
                for (var i = 0; i < 11; i++) {

                    let query = resultsLikesRank[i].id
                    call('GET', `https://skylabcoders.herokuapp.com/proxy?url=http://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${query}`,
                        undefined, { 'Content-type': 'application/json', "Access-Control-Allow-Origin": "*" }, (error, status, body) => {


                            if (status === 200) {

                                const { players } = JSON.parse(body)
                                const { idPlayer, strPlayer, strCutout } = players[0]
                                counter++
                                let pos = resultsLikes.map(function (e) { return e.id; }).indexOf(idPlayer);
                                const posRanking = resultsLikes[pos].posRank
                                const likes = resultsLikes[pos].likes
                                playersImg.push({ strPlayer, strCutout, posRanking, likes,idPlayer })
                                if (counter === 11) {
                                    callback(undefined, playersImg)
                                }
                            }
                        })
                }

            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error));
            }
        })
}
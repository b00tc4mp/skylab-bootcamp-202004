function commentCards(userfwitts, token, callback) {

    call("GET", "https://skylabcoders.herokuapp.com/api/v2/users/all", undefined,
        { Authorization: `Bearer ${token}` }, (error, status, body) => {

            if (error) return callback(error);

            if (status === 200) {

                const users = JSON.parse(body)

                let usersHaveCards = users.filter((user) => {
                    return user.red || user.green || user.yellow

                })
                console.log(userfwitts)
                //for red card
                usersHaveCards.forEach(user => {
                    for (red of user.red) {
                        for (userfwitt of userfwitts) {
                            if (userfwitt !== undefined) {
                                if (red.id === userfwitt.idUser && red.message === userfwitt.message) {
                                    userfwitt.redCard++
                                }
                            }
                        }
                    }
                })
                //for yellow card
                usersHaveCards.forEach(user => {
                    for (yellow of user.yellow) {
                        for (userfwitt of userfwitts) {
                            if (userfwitt !== undefined) {
                                if (yellow.id === userfwitt.idUser && yellow.message === userfwitt.message) {
                                    userfwitt.yellowCard++
                                }
                            }
                        }
                    }
                })
                //for green card
                usersHaveCards.forEach(user => {
                    for (green of user.green) {
                        for (userfwitt of userfwitts) {
                            if (userfwitt !== undefined) {
                                if (green.id === userfwitt.idUser && green.message === userfwitt.message) {
                                    userfwitt.greenCard++
                                }
                            }
                        }
                    }
                })
                callback(undefined, userfwitts)

            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error));
            }
        })
}



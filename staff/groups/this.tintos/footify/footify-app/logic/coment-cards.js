/**
 * Checks user credentials.
 * 
 * @param {userfwitts} All the information of the person who has fwitted(date, number of cards, id user, id player...).
 * @param {string} token The token of the current user. 
 * @param {callback} callback The expression to be called after checking credentials, receiving an Error and userFwitts(modified, with new card added).
 * 
 * @returns {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @returns {Object} userFwitts It receives a array in case credentials are correct.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If does not match the expected format.
 */

function commentCards(email, userfwitts, token, callback) {

    if (userfwitts.length === 0) throw new Error(`${userfwitts} no have length`)
    //String.validate.notVoid(token);
    //Function.validate(callback);

    call("GET", "https://skylabcoders.herokuapp.com/api/v2/users/all", undefined,
        { Authorization: `Bearer ${token}` }, (error, status, body) => {

            if (error) return callback(error);

            if (status === 200) {

                const users = JSON.parse(body)

                let usersHaveCards = users.filter((user) => {
                    return user.red || user.green || user.yellow
                })


                //for red card
                usersHaveCards.forEach(user => {
                    for (red of user.red) {
                        for (userfwitt of userfwitts) {
                          
                            if (userfwitt !== undefined) {
                                if (red.id === userfwitt.idUser && red.message === userfwitt.message) {
                                    userfwitt.redCard++
                                    if (email === user.username) {
                                        userfwitt.bckgRed = 'bkgrred'
                                        userfwitt.bckgYellow = ''
                                        userfwitt.bckgGreen = ''
                                    }

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

                                    if (email === user.username) {
                                        userfwitt.bckgRed = ''
                                        userfwitt.bckgYellow = 'bkgryellow'
                                        userfwitt.bckgGreen = ''
                                    }
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
                                    if (email === user.username) {
                                        userfwitt.bckgRed = ''
                                        userfwitt.bckgYellow = ''
                                        userfwitt.bckgGreen = 'bkgrgreen'
                                    }
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





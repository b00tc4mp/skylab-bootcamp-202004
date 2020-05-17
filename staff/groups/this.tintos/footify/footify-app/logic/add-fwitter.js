/**
 * Checks add Fwitter credentials.
 * 
 * @param {string} idPlayer The id of player. 
 * @param {string} _name The player name.
 * @param {string} _message The message public by the User.
 * @param {string} token The token of the current user.
 * @param {callback} callback The expression to be called after checking credentials, receiving an Error.
 * 
 * @returns {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 *
 */


function addFwitter(idPlayer, _name, _message, token, callback) {
    String.validate.notVoid(idPlayer);
    String.validate.notVoid(_name);
    String.validate.notVoid(_message);
    String.validate.notVoid(token);

    Function.validate(callback);

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, {
        Authorization: `Bearer ${token}`
    },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const user = JSON.parse(body)
                const { fwitter = [] } = user

                let pushFwitt = false;

                if (fwitter.length === 0) {
                    const resultFwitter = {
                        id: idPlayer,
                        name: _name,
                        fwitt: [{
                            message: _message,
                            date: new Date().toDateString(),
                            _date: Date.now(),
                            greenCard: 0,
                            yellowCard: 0,
                            redCard: 0,
                        }]
                    }

                    fwitter.push(resultFwitter)

                } else {
                    fwitter.forEach(({ id, fwitt }) => {
                        if (id === idPlayer) {
                            const newFwitt = {
                                message: _message,
                                date: new Date().toDateString(),
                                _date: Date.now(),
                                greenCard: 0,
                                yellowCard: 0,
                                redCard: 0,
                            }
                            fwitt.unshift(newFwitt);
                            pushFwitt = true;
                        }
                    })
                    if (!pushFwitt) {
                        const addNewFwitter = {
                            id: idPlayer,
                            name: _name,
                            fwitt: [{
                                message: _message,
                                date: new Date().toDateString(),
                                _date: Date.now(),
                                greenCard: 0,
                                yellowCard: 0,
                                redCard: 0,
                            }]
                        }
                        fwitter.push(addNewFwitter)
                    }
                }

                call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify({ fwitter }), {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json'
                },
                    (error, status, body) => {
                        if (error) return callback(error)

                        if (status === 204) {
                            callback()
                        } else {
                            const { error } = JSON.parse(body)

                            callback(new Error(error))
                        }
                    })

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
<<<<<<< Updated upstream
 * @param {string} token It receives a token in case credentials are correct.
 *
=======
>>>>>>> Stashed changes
 */
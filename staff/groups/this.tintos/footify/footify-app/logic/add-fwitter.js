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

                if (fwitter.length ===  0) {
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

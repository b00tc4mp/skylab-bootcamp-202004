function addFwitter(idPlayer, _name, _message, token, callback) {
    String.validate.alphabetic(idPlayer);
    String.validate.alphabetic(_name);
    String.validate.alphabetic(_message);
    String.validate.alphabetic(_token);

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



// addFwitter('1231212', 'joaquin', 'teste 1',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWI5Mzc3ZDZlMjVmYzAwMTU4MDEyMzMiLCJpYXQiOjE1ODkyMDM2NjIsImV4cCI6MTU4OTIwNzI2Mn0.B0AMM5EJ0-xKKPdbSOPecf240SscD0FYrakfzpgxSi8',
//     (error, results) => {
//         console.log(results)
//     })
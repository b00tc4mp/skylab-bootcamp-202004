function toogleFollowPlayer(token, playerId, callback) {
    String.validate.notVoid(token)
    String.validate.notVoid(playerId)
    Function.validate(callback)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
    { Authorization: `Bearer ${token}`}, (error, status, body) => {
        if(error) return callback(error)

        if (status === 200) {
            call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/${playerId}`),
            undefined, { Authorization: `Bearer ${token}`}, (error, status) => {
                if (error) return callback(error)

                if (status === 200) {
                    const user = JSON.parse(body)

                    const { favPlayer = [] } = user 

                    const actualIndex = favPlayer.indexOf(playerId)

                    if(actualIndex !== -1) favPlayer.splice(actualIndex, 1)
                    else favPlayer.push(actualIndex)

                    call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify({favPlayer}), 
                    { Authorization: `Bearer ${token}`, 'Content-type': 'aplication/json'}, 
                    (error, status, body) => {
                        if(error) return callback(error)

                        if(status === 204) {
                            callback()
                        } else {
                            const { error } = JSON.parse(body)
                            
                            callback(new Error(error))
                        }
                    }
                     )
                } else {
                    const { error } = JSON.parse(body)

                    callback(new Error(error))
                }
            }
        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    })
}
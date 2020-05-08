function toggleFavouriteCard(token, cardId, callback) {
    String.validate.notVoid(token)
    String.validate.notVoid(cardId)
    Function.validate(callback)
    
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        {
            Authorization: `Bearer ${token}`
        },
        (error, status, body) => {
            if (error) return callback(error)

            if (status == 200) {
                const user = JSON.parse(body)

                const { myCards = [] } = user

                const index = myCards.indexOf(cardId)

                if (index < 0) myCards.push(cardId)
                else myCards.splice(index, 1)

                call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify({ myCards }),
                    {
                        'Authorization': `Bearer ${token}`,
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

                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        })

}
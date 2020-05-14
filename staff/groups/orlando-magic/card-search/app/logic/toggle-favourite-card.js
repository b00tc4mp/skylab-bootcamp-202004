/**
 * Adds or deletes a card from the list of favourite cards of the logged user
 * 
 * @param {string} token A token that authenticates the user when performin user API protocols.
 * @param {string} cardId An id of the card that is to be added to or deleted from favourites
 *
 * @param {callback} callback The expression to be called when there is an Error.
 * 
 * @throws {TypeError} When the token or the cardId do not match the format requirements.
 * @throws {Error} When callback is not a function or following is not an array.
 */

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
        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    })
}

/**
 * Invoked when an error occurs.
 * 
 * @callback callback
 * @param {Error} error It will receive an error when remote logic fails or there is a network problem.
 */
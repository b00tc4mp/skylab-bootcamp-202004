/**
 * Retrieves the favourite cards of a user
 * 
 * @param {string} token A token that authenticates the user when performin user API protocols.
 * @param {string} id Optional variable. When used, it will have the id of a user (other than the logged user) to retrieve the cards from.
 * @param {string} retrieveIds Optional variable. When it equals true, the function will return an array of card Ids instead of card objects. 
 * 
 * @param {callback} callback The expression to be called after retrieving the results, which receives an Error or an array of results.
 * 
 * @throws {TypeError} When the token or the id are not strings
 * @throws {Error} When callback is not a function.
 */

function retrieveUserCards(token, callback, id = "", retrieveIds){
    String.validate.notVoid(token)
    Function.validate(callback)

    call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/${id}`,
    undefined,
    { 'Authorization': `Bearer ${token}` },
    (error, status, body) => {
        if (error) return callback(error)

        if (status === 200) {
            const { myCards = [] } = JSON.parse(body)

            if(!myCards.length) return callback(undefined, [])
            else if (retrieveIds === true) return callback(undefined, myCards)

            const cards = myCards.map(card => ({"id": card}))

            call('POST', 'https://api.scryfall.com/cards/collection', `{ "identifiers" : ${JSON.stringify(cards)} }`,
            { 'Content-type': 'application/json' }, (error, status, body) => {
                if (error) return callback(error)

                if (status === 200) {
                    const { data } = JSON.parse(body)

                    callback(undefined, data)
                } else{
                    const {error} = JSON.parse(body)

                    callback(new Error(error.message))
                }
            })
        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    }
)}

/**
 * Invoked when an error occurs or when results are retrieved.
 * 
 * @callback callback
 * @param {Error} error It will receive an error when remote logic fails or there is a network problem.
 * @param {string} data It receives an array of cards objects matching the cards favorited by the user. If retrieveIds === true, it receives only the card Ids.
 */
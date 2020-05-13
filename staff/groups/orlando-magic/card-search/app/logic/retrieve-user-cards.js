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
)
}
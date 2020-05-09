function retrieveMyCards(token, callback) {
    String.validate.notVoid(token)

    Function.validate(callback)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
    undefined,
    { 'Authorization': `Bearer ${token}` },
    (error, status, body) => {
        if (error) return callback(error)

        if (status === 200) {
            const { myCards = [] } = JSON.parse(body)

            const cards = myCards.map(card => ({"id": card}))

            call('POST', 'https://skylabcoders.herokuapp.com/proxy?url=https://api.scryfall.com/cards/collection', `{ "identifiers" : ${JSON.stringify(cards)}`,
            { 'Content-type': 'application/json' }, (error, status, body) => {
                if (error) return callback(error)

                if (status === 200) {
                    const { data } = JSON.parse(body)

                    callback(undefined, data)
                } else {
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
function retrieveUserCards(token, id, callback) {
    String.validate.notVoid(token)
    String.validate.notVoid(id)
    Function.validate(callback)

    call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/${id}`,
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const { myCards=[] } = JSON.parse(body)

                callback(undefined, myCards)
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        }
    )
}
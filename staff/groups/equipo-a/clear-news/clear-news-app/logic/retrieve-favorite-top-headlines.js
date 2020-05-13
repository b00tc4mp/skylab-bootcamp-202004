function retrieveFavoriteTopHeadlines(token, callback) {
    String.validate(token);

    Function.validate(callback);

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                let user = JSON.parse(body)

                const { headlines = [] } = user

                callback(undefined, headlines)

            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }
        }

    )
}
function tweet(token, message, callback) {
    // TODO add tweet (with message and date now) to user (email)
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

    if (typeof message !== 'string') throw new TypeError(message + ' is not a string')
    if (!message.trim().length) throw new Error('message is empty or blank')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)
            if (status === 200) {
                let user = JSON.parse(body);
                (user.tweets || (user.tweets = [])).push({ text: message, date: new Date().toDateString() })
                call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', `{ "tweets" : ${JSON.stringify(user.tweets)}}`,
                    { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
                    (error, status, body) => {
                        if (error) return callback(error)
                        if (status === 204) callback()
                        else {
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
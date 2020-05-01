function tweet(token, message, callback) {
    // TODO add tweet (with message and date now) to user (email)
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

    if (typeof message !== 'string') throw new TypeError(message + ' is not a string')
    if (!message.trim().length) throw new Error('message is empty or blank')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    // const user = users.find(user => user.email === email)

    // if (!user) throw new Error(`e-mail ${email} is not exists`)

    // if(!user.tweet) user.tweet = []
    // else user.tweet.push({text: message, date: Date.now()})

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






// tweet = [{message:'sddfdfdgf', date: new Date}]

// `{ "tweets" : "${JSON.stringify(user.tweets)}"}`
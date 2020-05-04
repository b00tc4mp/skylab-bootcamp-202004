function tweet(token, message, callback) {
String.validate.alphabetic(message)
String.validate.notVoid(token)
Function.validate(callback)
    if (typeof message !== 'string') throw new TypeError(message + ' is not a string')
    if (!TEXT_REGEX.test(message)) throw new Error(message + ' is not alphabetic')
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)
    let newDate = new Date;
    newDate = newDate.toDateString()
    call('GET',
        'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        { "Content-type": "application/json", "Authorization": `Bearer: ${token}` }, (error, status, body) => {
            if (status === 200) {
                if (error) return callback(error)

                const response = JSON.parse(body)
                const { username } = response
                const newTweet = { username, message, newDate }
                if (!response.tweets) response.tweets = []
            
                response.tweets.push(newTweet)
            
                call('PATCH',
                    'https://skylabcoders.herokuapp.com/api/v2/users',
                    JSON.stringify(response),
                    { "Content-type": "application/json", "Authorization": `Bearer ${token}` }, (error, status, body) => {
                        if (error) return callback(error)
                        if (status === 204) {
                            callback(status)
                            
                        } else {
                            const { error } = JSON.parse(body)

                            callback(new Error(error))
                        }
                    })
            }
        })
}
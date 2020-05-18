function tweet(token, message, tweets = [], callback){
    if (typeof message !== 'string') throw new TypeError(message + ' is not a string')
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const newTweet = {message, date: new Date }
    tweets.push(newTweet)
    
    const url = 'https://skylabcoders.herokuapp.com/api/v2/users'
    const body = JSON.stringify({tweets})
    const headers = { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' }

    call('PATCH', url, body, headers, (error, status, response) => {
        if (error) return callback(error)

        if (status === 204){
            return callback(undefined, newTweet)
        }
        const {error: responseError} = JSON.parse(response)
        if (responseError) callback(new Error(responseError))
    })
}

function tweet(token, message, callback) {

    if (typeof message !== 'string') throw new TypeError(message + ' is not a string')
   
    let date = new Date;

    call('GET',
        'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        { "Content-type": "application/json", "Authorization": `Bearer: ${token}` }, (error, status, body) => {
            if (error) return callback(error)
            if (status === 200) {

                const response = JSON.parse(body)
                const { username } = response
                const newTweet = { username, message, date }
                
                if (!response.tweets) response.tweets = []

                response.tweets.push(newTweet)

                call('PATCH',
                    'https://skylabcoders.herokuapp.com/api/v2/users',
                    JSON.stringify(response), 
                    { "Content-type": "application/json", "Authorization": `Bearer: ${token}` }, (error, status, body) => {
                        if (error) return callback(error)
                        if (status === 204) {
                            debugger

                            callback(undefined,"success")
                        } else {
                            const { error } = JSON.parse(body)

                            callback(new Error(error))
                        }
                    })
            }
        })
}
//gay
function writeTweet(tweet, token, callback) {

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined, { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            
            if (error) return callback(error)

            if (status === 200) {

                let user = JSON.parse(body)
                const { tweets = [] } = user
                tweets.push({ text: tweet, date: Date(Date.now).slice(0, 24) })
                let stringTweets = JSON.stringify({ tweets })

                call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    stringTweets, { 'Authorization': `Bearer ${token}`, 'Content-type': 'Application/json' },
                    (error, status, body) => {
                        if (error) return callback(error)
                        if (status === 204) {
                            callback()
                        } else {
                            const { error } = JSON.parse(body)
                            callback(new Error(error))
                        }
                    }
                )
            }
        }
    )
}
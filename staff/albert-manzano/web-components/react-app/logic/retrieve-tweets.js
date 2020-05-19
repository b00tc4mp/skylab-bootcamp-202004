function retrieveTweets(token, callback) {
    const _tweets = []
    call('GET',
        'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { "Content-type": "application/json", "Authorization": `Bearer: ${token}` }, (error, status, body) => {
            if (error) return callback(error);
            if (status === 200) {
                const { tweets, following } = JSON.parse(body);

                tweets && tweets.forEach((tweet) => {
                    const { message, date, username } = tweet
                    _tweets.push({ message, date, username })
                })

                let counter = 0
                following && following.forEach(follower => {
                    call('GET',
                        `https://skylabcoders.herokuapp.com/api/v2/users/${follower}`, undefined,
                        { "Content-type": "application/json", "Authorization": `Bearer: ${token}` }, (error, status, body) => {
                            if (error) return callback(error);
                            if (status === 200) {
                                counter++
                                const { tweets } = JSON.parse(body);

                                tweets && tweets.forEach((tweet) => {
                                    const { message, date, username } = tweet
                                    _tweets.push({ message, date, username })
                                })

                                if (counter === following.length) callback(undefined, _tweets)
                            } else {
                                const { error } = JSON.parse(body)
                                callback(new Error(error))
                            }
                        })
                })
            }
        })
    const tweets = _tweets
    return (tweets)
}


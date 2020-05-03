function retrieveTweets(token, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    let tweetsToShow = []

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
    { 'Authorization': `Bearer ${token}` },
    (error, status, body) => {
        if (error) return callback(error)
        if (status === 200) {
            let user = JSON.parse(body);
            if (user.tweets) tweetsToShow = user.tweets.map(({text, date}) => ({text, date, username: 'Me'}));
            
            if (user.following) {
                let following = user.following
                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
                undefined,
                { Authorization: `Bearer ${token}` },
                (error, status, body) => {
                    if (error) return callback(error)

                    if (status === 200) {
                        let users = JSON.parse(body)

                        users = users.filter(function (user) {
                            const { id } = user

                            return user.tweets && following.includes(id) 
                        })

                        _users = users.map(({ username, tweets }) => ({ username, tweets }))

                        _users.forEach(({tweets, username}) => tweets.forEach(tweet => tweetsToShow.push({text: tweet.text, date: tweet.date, username})))

                        // tweetsToShow.sort((a,b) => b.date-a.date)

                        callback(undefined, tweetsToShow)

                    } else {
                        const { error } = JSON.parse(body)

                        callback(new Error(error))
                    }

                }
                )
            } else callback(undefined, tweetsToShow)
            
        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }

    })

}
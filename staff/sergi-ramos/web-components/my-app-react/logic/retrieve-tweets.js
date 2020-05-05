function retrieveTweets(email, token, callback) {
    let tweetsAll = []

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
        undefined, { Authorization: `Bearer: ${token}` },
        (error, status, body) => {
            if (error) return callback(error)
            if (status === 200) {

                const usersTweets = JSON.parse(body)

                let userRetrieve = usersTweets.filter((user) => {
                    return user.username === email
                })
                const [{ name, tweets, following }] = userRetrieve
                if (tweets) {
                    for (let i = 0; i < tweets.length; i++) {
                        const { text, date } = tweets[i]
                        tweetsAll.push({ name, text, date })
                    }
                } else {
                    //TODO feedback if no any personal or following tweets
                }

                if (following) {
                    for (let i = 0; i < following.length; i++) {

                        let followingRetrieve = usersTweets.filter((user) => {
                            return user.id === following[i]
                        })
                        const [{ name, tweets }] = followingRetrieve
                        if (tweets) {
                            for (let i = 0; i < tweets.length; i++) {
                                const { text, date } = tweets[i]
                                tweetsAll.push({ name, text, date })
                            }
                        }
                    }
                }
            }
            callback(undefined, tweetsAll)
        }
    )
}


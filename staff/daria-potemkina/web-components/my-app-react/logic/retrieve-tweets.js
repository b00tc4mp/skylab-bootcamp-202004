function retrieveTweets(token, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            allTweets = [];
            if (error) return callback(error)

            if (status === 200) {

                let user = JSON.parse(body)

                const { name, surname, tweets } = user

                for (let i in tweets) {
                    let { text, date } = tweets[i]
                    allTweets.push({ name, surname, text, date })
                }

                let { following } = user;

                for (let i = 0; i < following.length; i++) {
                    call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/${following[i]}`,
                        undefined,
                        { 'Authorization': `Bearer ${token}` },
                        (error, status, body) => {
                            if (error) return callback(error)

                            if (status === 200) {
                                let followUser = JSON.parse(body);
                                const { name, surname, tweets } = followUser

                                for (let i in tweets) {
                                    let { text, date } = tweets[i]
                                    allTweets.push({ name, surname, text, date })
                                }
                            } else {
                                const { error } = JSON.parse(body)
                                callback(new Error(error))
                            }
                            callback(undefined, allTweets)
                        })
                }
            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }
            callback(undefined, allTweets)
        })
}


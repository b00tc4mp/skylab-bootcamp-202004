function retrieveTweets(token, callback) {
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const bodyObj = JSON.parse(body)

                const { tweets } = bodyObj
                const { following } = bodyObj

                let arrayList = []
                if (tweets) arrayList.push(tweets)
                if (following) {
                    following.forEach(element => {

                        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
                            undefined, { 'Authorization': `Bearer ${token}` },
                            (error, status, body) => {
                                if (error) return callback(error)

                                if (status === 200) {
                                    const response = JSON.parse(body)
                                    response.forEach(a => { if (a.id === element) arrayList.push(a.tweets) })
                                    callback(undefined, arrayList)
                                } else {
                                    const { error } = JSON.parse(body)

                                    callback(new Error(error))
                                }
                            })
                    });
                }
            }
        })

}
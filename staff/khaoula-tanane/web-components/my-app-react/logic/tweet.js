function tweet(token, text, callback){
    // if (typeof userEmail !== 'string') throw new TypeError(userEmail + ' is not a string')
    // if (!EMAIL_REGEX.test(userEmail)) throw new Error(userEmail + ' is not an e-mail')

    let body = undefined
    let url = 'https://skylabcoders.herokuapp.com/api/v2/users'
    let headers = { Authorization: `Bearer ${token}` }

    call('GET', url, body, headers, (error, status, response) => {
       
        if (error) return callback(error)
        if (status === 200){
            let user = JSON.parse(response);
            if(!user.tweets) user.tweets = []
            let newTweet = {username: user.username, text, date: new Date() }
            user.tweets.push(newTweet)

            body = JSON.stringify({tweets: user.tweets})
            url = 'https://skylabcoders.herokuapp.com/api/v2/users'
            headers = { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' }
            call('PATCH', url, body, headers, (error, status, response) => {
                if (error) return callback(error)
                if (status === 204){
                    callback(undefined, newTweet)
                } 
            })

        }
        const {error: responseError} = JSON.parse(response)
        if (responseError) callback(new Error(responseError))

    })

}

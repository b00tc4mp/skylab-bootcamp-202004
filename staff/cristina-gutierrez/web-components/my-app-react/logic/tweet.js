function tweet(email, message) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')
    if (typeof message !== 'string') throw new TypeError(message + ' is not a string')
    
    const user = users.find(user => user.email === email)
    
    const date = Date.now()

    const tweet = { message, date }

    if (user.tweets) {
        tweets.push(tweet)
    } else {
        user.tweets = [tweet]
    }
}

    // TODO call to update user (body => { tweets: [...] } )
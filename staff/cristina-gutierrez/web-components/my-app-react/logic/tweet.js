function tweet(token, message) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')
    if (typeof message !== 'string') throw new TypeError(message + ' is not a string')
    
    const user = users.find(function(user) { return user.email === email })
    
    const date = Date.now()

    if(user.tweets) {
        tweets.push({message, date})
    } else {
        user.tweets = []
        tweets.push({ message, date })
    }

    // (user.tweets || (user.tweets=[])).push({message,date})
}

// TODO call to retrieve user
    // TODO create tweet object { message, date }
    // TODO check if user already has tweets array
    // TODO if user already has tweets array, then push new tweet to it
    // ELSE create new tweets array and push new tweet
    // TODO call to update user (body => { tweets: [...] } )
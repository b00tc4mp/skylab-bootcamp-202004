function retrieveTweets(userEmail){
    if (typeof userEmail !== 'string') throw new TypeError(userEmail + ' is not a string')
    if (!EMAIL_REGEX.test(userEmail)) throw new Error(userEmail + ' is not an e-mail')

    let user = retrieveUser(userEmail)
    let visibleTweets = []

    user.tweets && user.tweets.forEach(tweet => visibleTweets.push(tweet))

    user.follows && user.follows.forEach(followedUser => followedUser.tweets.forEach(tweet => visibleTweets.push(tweet)))

    return visibleTweets
}
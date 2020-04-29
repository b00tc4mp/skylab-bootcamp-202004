function tweet(userEmail, text){
    if (typeof userEmail !== 'string') throw new TypeError(userEmail + ' is not a string')
    if (!EMAIL_REGEX.test(userEmail)) throw new Error(userEmail + ' is not an e-mail')

    if (typeof text !== 'string') throw new TypeError(text + ' is not a string')

    const userThatFollows = retrieveUser(userEmail)

    userThatFollows.tweets || (userThatFollows.tweets = [])

    let tweet = {
        text,
        date: new Date
    }

    userThatFollows.tweets.push(tweet)
}
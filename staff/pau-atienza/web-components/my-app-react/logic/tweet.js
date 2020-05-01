function tweet(userEmail, text){
    if (typeof userEmail !== 'string') throw new TypeError(userEmail + ' is not a string')
    if (!EMAIL_REGEX.test(userEmail)) throw new Error(userEmail + ' is not an e-mail')

    if (typeof text !== 'string') throw new TypeError(text + ' is not a string')

    let user = retrieveUser(userEmail)

    user.tweets || (user.tweets = [])

    let tweet = {
        name: user.name,
        surname: user.surname,
        text,
        date: new Date
    }

    user.tweets.push(tweet)
}
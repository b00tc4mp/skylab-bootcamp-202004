function tweet(email, message) {
    // TODO add tweet (with message and date now) to user (email)
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    if (typeof message !== 'string') throw new TypeError(message + ' is not a string')
    if (!message.trim().length) throw new Error('message is empty or blank')

    const user = users.find(user => user.email === email)

    if (!user) throw new Error(`e-mail ${email} is not exists`)

    if(!user.tweet) user.tweet = []
    else user.tweet.push({text: message, date: Date.now()})
}
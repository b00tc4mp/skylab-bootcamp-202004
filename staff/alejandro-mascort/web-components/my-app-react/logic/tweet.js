function tweet(email, message) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    const user = users.find(user => user.email === email)

    if (!user) throw new Error(`user with e-mail ${email} not found`)

    if (!user.tweets) user.tweets = []

    user.tweets.push({message, date: new Date})
}
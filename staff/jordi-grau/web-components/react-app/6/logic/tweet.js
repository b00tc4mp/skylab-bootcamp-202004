function tweet(email, message) {
    // TODO add tweet (with message and date now) to user (email)
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    if (typeof message !== 'string' ) throw new TypeError(message + ' is not a string')
    if (!message.trim().length) throw new Error('message is empty or blank')

    const user = users.find(user => { user.email === email })

    if (user) user.tweet({text: message, date: Date(Date.now())})
    else throw new Error ('user not found')
}

function retrieveUser(email) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    const user = users.find(user => { return user.email === email })

    // sanitize user (do not return password)
    
    const { name, surname, email: _email } = user

    return { name, surname, email: _email }
}
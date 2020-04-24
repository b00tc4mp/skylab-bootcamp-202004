function retrieveUser(email){
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    // return users.find((user) => user.email === email)
    return users.find(user => user.email === email)
}
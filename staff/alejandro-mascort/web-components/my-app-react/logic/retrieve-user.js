function retrieveUser(token, callback) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    call('GET','https://skylabcoders.herokuapp.com/api/v2/users',
    undefined,
    { 'Authorization': `Bearer ${token}`  },
    (error, status, body) => {
        if (error) callback(error)

        if (status === 200) {
            const {name, surname, username: email} = JSON.parse(body)

            callback(undefined, name, surname, email)
        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    })
}
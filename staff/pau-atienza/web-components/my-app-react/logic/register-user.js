function registerUser(name, surname, username, password, callback) {
    if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
    if (!TEXT_REGEX.test(name)) throw new Error(name + ' is not alphabetic')

    if (typeof surname !== 'string') throw new TypeError(surname + ' is not a string')
    if (!TEXT_REGEX.test(surname)) throw new Error(surname + ' is not alphabetic')

    if (typeof username !== 'string') throw new TypeError(username + ' is not a string')
    if (!EMAIL_REGEX.test(username)) throw new Error(username + ' is not an e-mail')

    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (password.length < 8) throw new Error('password does not have the min length')

    const body = JSON.stringify({name, surname, username, password})
    const url = 'https://skylabcoders.herokuapp.com/api/v2/users'
    const headers = { 'Content-type': 'application/json' }

    call('POST', url, body, headers, (error, status, response) => {
        if (error) return callback(error)
        
        if (status === 201) return callback()
        const {error: responseError} = JSON.parse(response)
        if (responseError) callback(new Error(responseError))
    })
}
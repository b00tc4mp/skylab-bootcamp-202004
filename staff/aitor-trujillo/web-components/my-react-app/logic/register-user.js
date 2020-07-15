function registerUser(name, surname, email, password, callback) {
    if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
    if (!TEXT_REGEX.test(name)) throw new Error(name + ' does not match the format')

    if (typeof surname !== 'string') throw new TypeError(surname + ' is not a string')
    if (!TEXT_REGEX.test(surname)) throw new Error(surname + ' does not match the format')

    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (password.length < 8) throw new Error('password does not have the min length')

    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
        `{"name": "${name}","surname": "${surname}","username": "${email}","password": "${password}"}`,
        { 'Content-type': 'application/json' }, (error, status, response) => {
            if (error) return callback(error)

            if (status === 201)
                callback()
            else {
                const { error } = JSON.parse(response)

                callback(new Error(error))
            }
        }
    )
}
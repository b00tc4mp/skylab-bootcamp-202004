const registerUser = (name, surname, email, password, callback) => {
    debugger

    if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
    if (!TEXT_REGEX.test(name)) throw new Error(name + ' is not alphabetic')

    if (typeof surname !== 'string') throw new TypeError(surname + ' is not a string')
    if (!TEXT_REGEX.test(surname)) throw new Error(surname + ' is not alphabetic')


    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (password.length < 8) throw new Error('password does not have min length')

    const user = users.find((user) => { return user.email === email })

    if (user) throw new Error('user already exists')

    call('POST', "https://skylabcoders.herokuapp.com/api/v2/users",
        `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' },
        (error, status, body) => {
            if (error) return callback(error)
            if (status === 201) {
                callback()
            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }
        })
}
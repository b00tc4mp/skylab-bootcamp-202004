function registerUser(username, email, password, callback) {
    String.validate.alphabetic(username)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    Function.validate(callback)

    call('POST',
    'https://skylabcoders.herokuapp.com/api/v2/users',
    `{ "nickname": "${username}", "username": "${email}", "password": "${password}" }`,
    { 'Content-type': 'application/json' }, (error, status, body) => {
        if (error) return callback(error)

        if (status === 201)
            callback()
        else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    })
}
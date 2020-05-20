function authenticateUser(email, password, callback) {
    Email.validate(email)
    
    String.validate.notVoid(password)

    String.validate.lengthGreaterEqualThan(password, 6)

    Function.validate(callback);

    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth', `{ "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' },
        (error, status, body) => {

            if (error) return callback(error)

            if (status === 200) {
                const { token } = JSON.parse(body)

                callback(undefined, token)
            } else {
                callback(new Error(JSON.parse(body).error))
            }
        }
    )
}
function loginUser(email, password, callback)  {

    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!email.trim().length) throw new Error('email is empty or blank')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (!password.trim().length) throw new Error('password is empty or blank')

    if(!callback) throw new Error('callback is not function')

    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
        `{ "username": "${email}", "password": "${password}" }`, 
        { 'Content-type': 'application/json' },
         (error, status, body) => {

            if (error) return callback(error)

            if (status === 200) {
                const { token } = JSON.parse(body)

                callback(undefined, token)
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        }
    )
}
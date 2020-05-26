function registerUser(name, surname, email, password, callback) {
    String.validate.alphabetic(name);

    String.validate.alphabetic(surname)
    
    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 6)

    Function.validate(callback)


    call('POST',
        'https://skylabcoders.herokuapp.com/api/v2/users',
        `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 201) {
                callback()

            } else {
                callback(new Error(JSON.parse(body).error))
                
            }
        }
    )
}
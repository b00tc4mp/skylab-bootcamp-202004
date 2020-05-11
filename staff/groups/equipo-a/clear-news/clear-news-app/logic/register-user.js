function registerUser(name, surname, email, password, interests, country, callback) {

    String.validate.alphabetic(name)
    String.validate.notVoid(name)
    String.validate.alphabetic(surname)
    String.validate.notVoid(surname)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)
    Function.validate(callback)

    let count = 0
    for (interest in interests) {
        if (interests[interest] === false) {
            count++
        }
    }

    if (count === 7) {
        callback(new Error('At least one field should be checked'))
    } else {

        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{"name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}", "categories": ${JSON.stringify(interests)}, "country": "${country}"}`,
            { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (error) return callback(error)

                if (status === 201) callback()
                else {
                    const { error } = JSON.parse(body)

                    callback(new Error(error))
                }
            }
        )

    }


}
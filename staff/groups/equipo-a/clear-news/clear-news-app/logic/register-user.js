function registerUser(name, surname, email, password, categories, country, callback) {
    String.validate.alphabetic(name)
    String.validate.alphabetic(surname)

    Email.validate(email)

    String.validate.lengthGreaterEqualThan(password, 8)

    String.validate.alphabetic(country)

    Function.validate(callback)


    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
        `{"name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}", "categories": ${JSON.stringify(categories)}, "country": "${country}"}`,
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
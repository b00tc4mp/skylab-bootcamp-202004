function registerUser(name, surname, email, password, callback) {
    if (typeof name !== 'string') throw new TypeError(name + ' is not a string')
    if (!TEXT_REGEX.test(name)) throw new Error(name + ' is not alphabetic')

    if (typeof surname !== 'string') throw new TypeError(surname + ' is not a string')
    if (!TEXT_REGEX.test(surname)) throw new Error(surname + ' is not alphabetic')

    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (password.length < 8) throw new Error('password does not have the min length')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    var xhr = new XMLHttpRequest()

    xhr.open('POST', 'https://skylabcoders.herokuapp.com/api/v2/users')

    xhr.setRequestHeader('Content-type', 'application/json')

    xhr.onload = function () {
        if (this.status === 201)
            callback()
        else {
            const { error } = JSON.parse(this.responseText)

            callback(new Error(error))
        }
    }

    xhr.onerror = function () {
        callback(new Error('network error'))
    }

    xhr.send(`{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`)
}
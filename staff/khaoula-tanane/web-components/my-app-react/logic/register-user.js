function registerUser(name, surname, username, password, callback) {


    if (typeof password !== 'string') throw new TypeError(password + ' is not a string')
    if (password.length < 8) throw new Error('password does not have the min length')

    if(typeof callback !== 'function') throw new TypeError (callback + ' is not a function')

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

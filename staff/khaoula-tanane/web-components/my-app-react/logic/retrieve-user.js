function retrieveUser(token, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    const body = undefined
    const url = 'https://skylabcoders.herokuapp.com/api/v2/users'
    const headers = { 'Authorization': `Bearer ${token}` }

    call('GET', url, body, headers,(error, status, response) => {
            if (error) return callback(error)

            if (status === 200) {
                const user = JSON.parse(response)
                user.email = user.username
                callback(undefined, user)
            } else {
                const { _error } = JSON.parse(response)

                callback(new Error(_error))
            }
        }
    )
}
function retrieveUser(token, callback) {
    if (typeof token !== 'string') throw new TypeError(email + ' is not a string')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function}`)

    // const user = users.find(function(user){return user.email === email})

    // return user

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` }, (error, state, body) => {
            if (error) return callback(error)

            if (state === 200) {
                const { name, surname, username } = JSON.parse(body)
                callback(undefied, { name, surname, email: username })
            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }

        })
}
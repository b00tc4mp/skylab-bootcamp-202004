function retrieveUser(token, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

    call('GET','https://skylabcoders.herokuapp.com/api/v2/users',
    undefined,
    { 'Authorization': `Bearer ${token}`  },
    (error, status, body) => {
        if (error) callback(error)

        if (status === 200) {
            const {name, surname, username: email, following} = JSON.parse(body)

            callback(undefined,{ name, surname, email, following})
        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    })
}
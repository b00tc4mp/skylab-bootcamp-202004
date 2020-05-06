function isUserAuthenticated(token, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
    undefined, {'Authorization': `Bearer ${token}`},
    (error, status) => {
        if (error) return callback(error)
        if (status === 401) return callback(new Error('invalid token'))
        callback( undefined, status === 200) 
    })
}

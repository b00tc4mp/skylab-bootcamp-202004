function isUserAuthenticated(token, callback) {
    String.validate.notVoid(token)
    Function.validate(callback)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
    undefined, {'Authorization': `Bearer ${token}`},
    (error, status) => {
        if (error) return callback(error)
        if (status === 401) return callback(new Error('invalid token'))
        callback( undefined, status === 200) 
    })
}
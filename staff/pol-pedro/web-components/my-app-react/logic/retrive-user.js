function retive(token, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call('GET','https://skylabcoders.herokuapp.com/api/v2/users', undefined, {'Authorization':`Bearer ${token}`}, (error, status, body) => {
        if(error) return callback(error)

        if(status === 200){
            const user = JSON.parse(body)
            callback(undefined, user)
        }else {
            const {error} = JSON.parse(body)
            callback(console.error(error, undefined)
            )
        }
    })
}
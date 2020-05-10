function favList(token, callback) {
    if(token === undefined) throw new TypeError('You first have to login')
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, {'Authorization':`Bearer ${token}`}, (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const bodyInfo = JSON.parse(body)
                const getSpots = bodyInfo.favSpots
                callback(undefined, getSpots)
            }else {
                const {error} = JSON.parse(body)
                callback(console.error(error, undefined))
            }
        })

}
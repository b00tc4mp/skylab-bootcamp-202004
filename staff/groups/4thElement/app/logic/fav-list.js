function favList(token, callback) {
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        {
            Authorization: `Bearer ${token}`
        },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const getSpots = JSON.parse(body)

                callback(undefined, getSpots)
            }
        })

}
function toggleFollowUser(token, followingId, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

    if (typeof followingId !== 'string') throw new TypeError(following + ' is not a string')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    let following

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
    {
        Authorization: `Bearer ${token}`
    },
    (error, status, body) => {
        if (error) return callback(error)

        if (status === 200) {
            call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/${followingId}`, undefined,
                {
                    Authorization: `Bearer ${token}`
                },
                (error, status) => {
                    if (error) return callback(error)

                    if (status == 200) {
                        const user = JSON.parse(body)

                        const { following = [] } = user

                        const index = following.indexOf(followingId)

                        if (index < 0) following.push(followingId)
                        else following.splice(index, 1)

                        call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify({ following }),
                            {
                                Authorization: `Bearer ${token}`,
                                'Content-type': 'application/json'
                            },
                            (error, status, body) => {
                                if (error) return callback(error)

                                if (status === 204) {
                                    callback()
                                } else {
                                    const { error } = JSON.parse(body)

                                    callback(new Error(error))
                                }
                            })
                    } else {
                        const { error } = JSON.parse(body)

                        callback(new Error(error))
                    }
                })
        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    })
}
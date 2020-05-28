function toggleFollowUser(token, followingId, callback) {

    String.validate.notVoid(token)
    String.validate.notVoid(followingId)
    Function.validate(callback)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/',

        undefined,

        {
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`
        },

        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/${followingId}`,

                    undefined,

                    {
                        "Content-type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },

                    (error, status) => {
                        if (error) return callback(error)

                        if (status === 200) {
                            const user = JSON.parse(body)
                            const { following = [] } = user
                            const index = following.indexOf(followingId)

                            if (index < 0) following.push(followingId)
                            else following.splice(index, 1)
                           
                            call('PATCH',
                                'https://skylabcoders.herokuapp.com/api/v2/users',
                                JSON.stringify({ following }),
                                { "Content-type": "application/json", "Authorization": `Bearer: ${token}` },
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



                    }
                )
            }
        }
    )
}
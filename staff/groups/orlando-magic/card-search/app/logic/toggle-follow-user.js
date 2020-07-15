/**
 * Adds or deletes a user from the list of followed users of the logged user
 * 
 * @param {string} token A token that authenticates the user when performin user API protocols.
 * @param {string} followingId An id of the user that is to be added to or deleted from favourites
 *
 * @param {callback} callback The expression to be called when there is an Error.
 * 
 * @throws {TypeError} When the token or the followingId do not match the format requirements.
 * @throws {Error} When callback is not a function or following is not an array.
 */

function toggleFollowUser(token, followingId, callback) {
    String.validate.notVoid(token)
    String.validate.notVoid(followingId)
    Function.validate(callback)

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

/**
 * Invoked when an error occurs.
 * 
 * @callback callback
 * @param {Error} error It will receive an error when remote logic fails or there is a network problem.
 */
/**
 * Retrieves the information of a group of users that match the search query
 * 
 * @param {string} token A token that authenticates the user when performin user API protocols.
 * @param {string} query A string input that should be present in the username or email of the searched users.
 *
 * @param {callback} callback The expression to be called after retrieving the results, which receives an Error or an array of results.
 * 
 * @throws {TypeError} When the token or the query do not match the format requirements.
 * @throws {Error} When callback is not a function or following is not an array.
 */

function searchUsers(token, query, callback) {
    String.validate.notVoid(token)
    String.validate(query)
    Function.validate(callback)

    query = query.toLowerCase()

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
    { Authorization: `Bearer ${token}` },
    (error, status, body) => {
        if (error) return callback(error)

        if (status === 200) {
            const user = JSON.parse(body)

            const { username: _username, following = [] } = user

            call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
                undefined,
                { Authorization: `Bearer ${token}` },
                (error, status, body) => {
                    if (error) return callback(error)

                    if (status === 200) {
                        let users = JSON.parse(body)

                        users = users.filter(function (user) {
                            const { nickname, username } = user

                            return nickname && nickname.toLowerCase().includes(query) || username.toLowerCase().includes(query)
                        })

                        users = users.map(({ id, nickname, username, myCards = []}) => {
                            const _user = { id, nickname, email: username, myCards}

                            if (username !== _username) _user.following = following.includes(id)

                            return _user
                        })

                        callback(undefined, users)
                    } else {
                        const { error } = JSON.parse(body)

                        callback(new Error(error))
                    }
                }
            )
        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    })
}

/**
 * Invoked when an error occurs or when results are retrieved.
 * 
 * @callback callback
 * @param {Error} error It will receive an error when remote logic fails or there is a network problem.
 * @param {string} users It receives an array of objects containing the information of the users in the "following" array.
 */
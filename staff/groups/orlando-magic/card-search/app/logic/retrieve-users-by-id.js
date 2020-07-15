/**
 * Retrieves the information of the users followed by the logged user
 * 
 * @param {string} token A token that authenticates the user when performin user API protocols.
 * @param {string} following An array of ids of the users that we want to retrieve the information fro - used exclusivaly to retrieve the "following" of the logged user).
 *
 * @param {callback} callback The expression to be called after retrieving the results, which receives an Error or an array of results.
 * 
 * @throws {TypeError} When the token is not a string.
 * @throws {Error} When callback is not a function or following is not an array.
 */

function retrieveUsersById(token, following, callback) {
    String.validate.notVoid(token)

    Function.validate(callback)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
        undefined,
        { Authorization: `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                let users = JSON.parse(body)

                users = users.filter(function (user) {
                    return following.includes(user.id)
                })

                users = users.map(({ id, nickname, username, myCards = []}) => {
                    const _user = { id, nickname, email: username, myCards, following: true}

                    return _user
                })

                callback(undefined, users)
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        }
    )
}

/**
 * Invoked when an error occurs or when results are retrieved.
 * 
 * @callback callback
 * @param {Error} error It will receive an error when remote logic fails or there is a network problem.
 * @param {string} users It receives an array of objects containing the information of the users in the "following" array.
 */
/**
 * Retrieves the nickname and email of a user
 * 
 * @param {string} token A token that authenticates the user when performin user API protocols.
 * @param {string} id Optional variable. When used, it will have the id of a user (other than the logged user) to retrieve the information from.
 *
 * @param {callback} callback The expression to be called after retrieving the results, which receives an Error or an array of results.
 * 
 * @throws {TypeError} When the token is not a string.
 * @throws {Error} When callback is not a function.
 */

function retrieveUser(token,callback, id = "") {
    String.validate.notVoid(token)

    Function.validate(callback)

    call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/${id}`,
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const { nickname, username } = JSON.parse(body)

                callback(undefined, { nickname, email: username })
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
 * @param {string} following It receives an object with the username (nickname) and email(username) of the user.
 */
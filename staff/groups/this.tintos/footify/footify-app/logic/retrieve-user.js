/**
 * Checks user credentials.
 * 
 * @param {string} token The token of the current user. 
 * @param {callback} callback The expression to be called after checking credentials, receiving an Error and object.
 * 
 * @returns {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @returns {Object} object It receives an object, with the information of user, in case credentials are correct.
 * 
 * @throws {Error} If network doesn't work.
 */


function retrieveUser(token, callback) {
    String.validate.notVoid(token)

    Function.validate(callback)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => { 
            if (error) return callback(error)

            if (status === 200) {
                const { name, surname, username, likes = []} = JSON.parse(body)

                callback(undefined, { name, surname, email: username, likes })
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        }
    )
}

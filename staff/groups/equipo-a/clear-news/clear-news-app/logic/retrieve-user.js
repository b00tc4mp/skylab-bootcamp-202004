/**
  * Retrieve user. 
  * 
  * @param {string} token Users token
  * 
  * @param {function} callback The expression to be called after checking credentials, will recieve an Error or authentication token.
  *
  * @throws {TypeError} If any of the parameters does not match the corresponding type or if callback is not a function.
  * @throws {Error} If there is no token.
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
                const { name, surname, username, categories, country } = JSON.parse(body)
                
                callback(undefined, { name, surname, email:username, categories, country})
            } else {
                const { error } = JSON.parse(body)
                

                callback(new Error(error))
            }
        }
    )
}

/**
 * 
 * 
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @param {String} name Users name
 * @param {String} surname Users surname
 * @param {String} email Users email
 * @param {Object} categories Users preferences
 * @param {String} country Users country
 */
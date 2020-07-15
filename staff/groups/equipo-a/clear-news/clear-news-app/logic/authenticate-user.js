/**
  * 
  * @param {string} email Users input email
  * @param {string} password Users input password
  * @param {function} callback The expression to be called after checking credentials, will recieve an Error or authentication token
  *
  *
  * @throws {TypeError} If any of the parameters does not match the corresponding type or if callback is not  a function
  * @throws {Error} If e-mail does not match the expected format.
  */

function authenticateUser(email, password, callback) {
    
    Email.validate(email)

    String.validate.notVoid(password)
    String.validate(password)

    Function.validate(callback)

    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
        `{ "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' },
        (error, status, body) => {

            if (error) return callback(error)

            if (status === 200) {
                const { token } = JSON.parse(body)

                callback(undefined, token)
                
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        }
    )
}

/**
 * Invoked after remote authentication.
 * 
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @param {string} token It receives a token in case credentials are correct.
 */
/**
 * Send email and password to get a valid token.
 * @param {email} email - data required to make a successful api call. 
 * @param {string} password - data required to make a successful api call.
 * @param {callback} callback 
 */

function authenticateUser(email, password, callback) {
    Email.validate(email)
    String.validate.notVoid(password)
    Function.validate(callback)

    const url = 'https://skylabcoders.herokuapp.com/api/v2/users/auth'
    const body = JSON.stringify({ username: email, password })
    const headers = { 'Content-type': 'application/json' }

    call('POST', url, body, headers, (error, status, response) => {
        if (error) throw error 

        if (status === 200) {
            const { token } = JSON.parse(response)
            callback(undefined, token)
        } else {
            const { error } = JSON.parse(response)
            callback(new Error(error))
        }

    })

}
/**
 * callback is inside authencticateUser function, returns the api's answer (response or error).
 * @callback callback
 * @param {string} error - api's answer when an error exists.
 * @param {string} token - destructured from api's answer when succeeds.
 */

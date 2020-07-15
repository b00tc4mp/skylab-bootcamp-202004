/**
 * Registers a new user in the database
 * 
 * @param {string} username the name that the user will have in the app (called nickname in the database)
 * @param {string} email unique email that identifies the account (cannot be repeated in other accounts and is called username in the database)
 * @param {string} password password used during the login step
 * 
 * @param {callback} callback The expression to be called after retrieving the results, which receives an Error or an array of results.
 * 
 * @throws {TypeError} When the username, email or passwords are not strings or do not fit the format requirements
 * @throws {Error} When callback is not a function.
 */


function registerUser(username, email, password, callback) {
    String.validate.alphabetic(username)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)
    Function.validate(callback)

    call('POST',
    'https://skylabcoders.herokuapp.com/api/v2/users',
    `{ "nickname": "${username}", "username": "${email}", "password": "${password}" }`,
    { 'Content-type': 'application/json' }, (error, status, body) => {
        if (error) return callback(error)

        if (status === 201)
            callback()
        else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    })
}
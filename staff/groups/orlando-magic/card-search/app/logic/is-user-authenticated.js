/**
 * Checks that the user token is still valid
 * 
 * @param {string} token A token that authenticates the user when performing user API protocols.
 * @param {callback} callback The expression to be called after retrieving the results, which receives an Error or an array of results.
 * 
 * @throws {TypeError} If token is not a string.
 * @throws {Error} If callback is not a function.
 */

function isUserAuthenticated(token, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
    undefined, {'Authorization': `Bearer ${token}`},
    (error, status) => {
        if (error) return callback(error)
        if (status === 401) return callback(new Error('invalid token'))
        callback( undefined, status === 200) 
    })
}

/**
 * Invoked after retrieving the results.
 * 
 * @callback callback
 * @param {Error} error It will receive an error when the token is not valid, the remote logic fails or there is a network problem.
 */
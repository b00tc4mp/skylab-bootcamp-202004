/**
 * Retrieves the followed users of the logged user
 * 
 * @param {string} token A token that authenticates the user when performin user API protocols.
 *  
 * @param {callback} callback The expression to be called after retrieving the results, which receives an Error or an array of results.
 * 
 * @throws {TypeError} When the token is not a string.
 * @throws {Error} When callback is not a function.
 */
function retrieveUserFollowing(token, callback){
    String.validate.notVoid(token)
    Function.validate(callback)

    call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/`,
    undefined,
    { 'Authorization': `Bearer ${token}` },
    (error, status, body) => {
        if (error) return callback(error)

        if (status === 200) {
            const { following = [] } = JSON.parse(body)
             
            callback(undefined, following)
        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    }
)}

/**
 * Invoked when an error occurs or when results are retrieved.
 * 
 * @callback callback
 * @param {Error} error It will receive an error when remote logic fails or there is a network problem.
 * @param {string} following It receives an array of ids of the users followed by the user.
 */
/**
 * Gets the trello token stored in the skylab api
 * @param {string} tokenskylab token associated with the user in the skylab api
 * @param {function} callback  callback called after ending the api call, if an error happened during the call it receibes it as a parameter else it receives the trello token asociated with this user
 * @throws {TypeError} throws an error if tokenskylab is not a string
 * @throws {TypeError} throws an error if the callback is not a function
 */
function retrievetrellofromskylab(tokenskylab, callback) {
    String.validate(tokenskylab)
    
    Function.validate(callback)

    call("GET", "https://skylabcoders.herokuapp.com/api/v2/users", undefined, { "Authorization": `Bearer ${tokenskylab}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                let { trello_token } = JSON.parse(body)

                callback(undefined, trello_token)
            } else {
                callback(new Error(JSON.parse(body).error))
            }
        })
}
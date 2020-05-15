/**
 * Calls the skylab users api and update one users by ading their trello tokens
 * @param {function} callback callback called after ending the api call, if an error happened during the call it receibes it as a parameter
 * @param {string} tokenskylab the token of the skylab users api related to our user
 * @param {string} tokentrello the token of the trelo api related to our user
 * @throws {TypeError} throws an error if tokentrello or tokenskylab are not a string
 * @throws {TypeError} throws an error if callback is not a function
 */
function linkskylabtrello(callback, tokenskylab, tokentrello) {
    Function.validate(callback)
    String.validate(tokenskylab)
    String.validate(tokentrello)

    call("PATCH", 'https://skylabcoders.herokuapp.com/api/v2/users',
        `{"trello_token":"${tokentrello}"}`, { "Content-type": "application/json", "Authorization": `Bearer ${tokenskylab}` },
        (error, status, body) => {
            if (error) return callback(error)
            if(status!==204){
                return callback(new Error(JSON.parse(body).error))
            }
            return callback()
        })
}
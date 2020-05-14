/**
  * Confirms token validation. 
  * 
  * @param {string} token Users token
  * @param {function} callback The expression to be called after checking credentials, will recieve an Error or authentication token.
  *
  * @throws {TypeError} If any of the parameters does not match the corresponding type or if callback is not a function.
  * @throws {Error} If there is no token.
  */

function isUserAuthenticated(token, callback) {
    String.validate.notVoid(token)

    Function.validate(callback)
  
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status,body) => {
            if (error) return callback(error)
            if(status>=400){
              const {error:_error}=JSON.parse(body)
              return callback(new Error (_error))
            }
            callback(undefined, status === 200)
        }
    )
}

/**
  * Confirms token validation. 
  * 
  * @param {function} callback The expression to be called after checking credentials, will recieve an Error or correct authentication token.
  *
  * @throws {TypeError} If any of the parameters does not match the corresponding type or if callback is not a function.
  *
  */
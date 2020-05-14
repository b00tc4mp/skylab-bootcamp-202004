/**
 * Checks user credentials.
 * @param {string} token The token obtain in the authenticate user .
 * @param {callback} callback The expression to be called after checking credentials. 
 * @return Return true if the token is valid or false to invalid.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} Error if the token is empty or blank.`
 */




const isUserAuthenticated = (token, callback) =>{
    String.validate.notVoid(token);

    Function.validate(callback);

        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        {'Authorization':`Bearer ${token}`},
        (error,status)=>{
            if(error) return callback(error);

            callback(undefined, status=== 200);
        }
   )
}

/**
 * Invoked after remote authentication.
 * 
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @param {boolean} Return a boolean value, true or false. 
 */


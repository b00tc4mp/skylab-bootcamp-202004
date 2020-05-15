/**
 * Checks user credentials.
 * 
 * @param {string} email The user e-mail. 
 * @param {string} password The user password.
 * @param {callback} callback The expression to be called after checking credentials, receiving an Error or an authentication token.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If e-mail does not match the expected format.
 */




function authenticateUser (email,password,callback) {
    if(email === '') throw new Error(`${email} email can not be empty`);
    Email.validate(email);
    
    String.validate.notVoid(password);

    Function.validate(callback);

    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
        `{ "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' },
        (error, status, body) => {
            if(error) throw callback(error);

            if(status === 200) {
                const {token} = JSON.parse(body);

                callback(undefined, token);
            }else{
                const {error} = JSON.parse(body);
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
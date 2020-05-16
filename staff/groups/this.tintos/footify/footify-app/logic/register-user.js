
/**
 * Checks user credentials.
 * 
 * @param {string} name The user name. 
 * @param {string} surname The user surname. 
 * @param {string} email The user email. 
 * @param {string} password The user password min length 8.
 * @param {string} password The user password confirmation.
 * 
 * @param {callback} callback The expression to be called after checking credentials, receiving an Error.
 * 
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 * @throws {Error} If e-mail does not match the expected format.
 * 
 * @return If register is correcto don`t return nothing.
 */


function registerUser(name,surname,email,password,confirmPassword,callback){
   
    String.validate.alphabetic(name);
    String.validate.alphabetic(surname);

    if(email === '') throw new Error(`${email} email can not be empty`)
    Email.validate(email);

    String.validate.lengthGreaterEqualThan(password,8);
    String.validate.lengthGreaterEqualThan(confirmPassword,8);
    String.validate.equalThan(password,confirmPassword);

    Function.validate(callback);

    call('POST',
        'https://skylabcoders.herokuapp.com/api/v2/users',
        `{"name":"${name}","surname":"${surname}","username":"${email}","password":"${password}", "app":"footify"} `,
        {'Content-type':'application/json'},
        (error,status,body)=>{
            if(error) return callback(error);

            if(status === 201) callback()
            else {
                const {error} = JSON.parse(body)
                callback(new Error(error))
            }

    })
}

/**
 * Invoked after remote authentication.
 * 
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * 
 */
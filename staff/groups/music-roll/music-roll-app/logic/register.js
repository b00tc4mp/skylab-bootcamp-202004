
/**

 * Register a new user

 *@param {string}  surname the user name
 
 *@param {string} name The user name

 *@param {string} email The user e-mail. 

 *@param {string} password The user password.

 *@param {callback} callback The expression to be called after create a new user, receiving an Error or redirection to login.

 * 

 * @throws {TypeError} If any of the parameters does not match the corresponding type.

 * @throws {Error} If e-mail does not match the expected format.

 * @throws {Error} If the password dont have the requirements

 */

function registerUser(name, surname, email, password, callback) { 
   
    String.validate.alphabetic(name)
    String.validate.alphabetic(surname)

    Email.validate(email)
    Password.validate(password)

    Function.validate(callback) 
    debugger
    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
     `{"name": "${name}", "surname": "${surname}", "username": "${email}","password": "${password}"}`,
    { "Content-Type": "application/json"},
    (error,status,body) => {
        if (error) return callback(error)
        if(status === 201) callback()
        else {
            const {error} = JSON.parse(body)
            callback(new Error(error))
        }

    })
   
} 
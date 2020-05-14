/**  Change users preferences
  * 
  * @param {string} token Users token, received from authenticate
  * @param {object} userUpdate Users data, when they want to change preferences
  * @param {function} callback The expression to be called after checking credentials, will recieve an Error or authentication token
  *
  *
  * @throws {TypeError} If any of the parameters does not match the corresponding type or if callback is not  a function
  * @throws {Error} If e-mail or token does not match the expected format.
  */

function profileChange(token, userUpdate, callback) {


    let { name, surname, email, password, oldPassword, categories, country } = userUpdate
    Email.validate(email);
    
    if (oldPassword !==""){ 
        String.validate.notVoid(oldPassword);
        String.validate(oldPassword);
        String.validate.notVoid(password);
        String.validate(password);
        
    } else {
        delete userUpdate.oldPassword
        delete userUpdate.password
    }

    if(password!==""){
        String.validate.notVoid(oldPassword);
        String.validate(oldPassword);
        String.validate.notVoid(password);
        String.validate(password);
        
    } else {
        delete userUpdate.oldPassword
        delete userUpdate.password

    }

    String.validate.notVoid(name);
    String.validate(name);

    String.validate.notVoid(surname);
    String.validate(surname);

    Function.validate(callback);

    String.validate.notVoid(token);
    String.validate(token);

    String.validate.notVoid(country);
    String.validate(country);

    let count = 0
    for (category in categories) {
        if (categories[category] === false) {
            count++
        }
    }

    if (count === 7) {
        callback(new Error('Kindly choose one topic.'));

    } else {
        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
            undefined,
            { 'Authorization': `Bearer ${token}` },
            (error, status, body) => {
                if (error) return callback(error)

                if (status === 200) {
                    const { username} = JSON.parse(body)
                    if(email===username) delete userUpdate.email
                    call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify(userUpdate),
                        { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` },
                        (error, status, body) => {
                            if (error) return callback(error)

                            if (status === 204) {
                                callback("message");

                            } else {
                                const { error } = JSON.parse(body);
                                callback(new Error(error));
                            }
                        });
                } else {
                    const { error } = JSON.parse(body)

                    callback(new Error(error))
                }
            }
        )
    }
}
/**
 * Invoked after remote authentication.
 * 
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * @param {string} nothing
 */

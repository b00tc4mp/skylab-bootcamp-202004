/**
  * Register new user. 
  * @param {string} name Users input name
  * @param {string} surname Users input surname
  * @param {string} email Users input email
  * @param {string} password Users input password
  * @param {object} categories Users input categories
  * @param {string} country Users input password
  * 
  * 
  * @param {function} callback The expression to be called after checking credentials, will recieve an Error or authentication token.
  *
  * @throws {TypeError} If any of the parameters does not match the corresponding type or if callback is not  a function
  * @throws {Error} If e-mail does not match the expected format.
  */
function registerUser(name, surname, email, password, categories, country, callback) {

    String.validate.alphabetic(name);
    String.validate.notVoid(name);
    String.validate(name);
    String.validate.alphabetic(surname);
    String.validate.notVoid(surname);
    String.validate(surname);
    String.validate.alphabetic(country);
    String.validate.notVoid(country);
    String.validate(country);
    Email.validate(email);
    String.validate.lengthGreaterEqualThan(password, 8);
    Function.validate(callback);

    let count = 0
    for (let interest in categories) {
        if (categories[interest] === false) {
            count++
        }
    }

    if (count === 7) {
        callback(new Error('Kindly choose one topic.'))
    } else {

        call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users',
            `{"name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}", "categories": ${JSON.stringify(categories)}, "country": "${country}"}`,
            { 'Content-type': 'application/json' },
            (error, status, body) => {
                if (error) return callback(error);

                if (status === 201) callback();
                else {
                    const { error } = JSON.parse(body);

                    callback(new Error(error))
                }
            }
        )

    }


}

/**
 * 
 * 
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * 
 */
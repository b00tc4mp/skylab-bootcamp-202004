function registerUser(name, surname, email, password, callback) {
    //Comprueba que los valores dados son validos antes de hacer el registro
    if (typeof name !== 'string') {
        throw new TypeError(name + ' is not a string');
    }

    if (!TEXT_REGEX.test(name)) {
        throw new Error(name + ' is not alphabetic');
    }

    if (typeof surname !== 'string') {
        throw new TypeError(surname + ' is not a string');
    }

    if (!TEXT_REGEX.test(surname)) {
        throw new Error(surname + ' is not alphabetic');
    }

    if (typeof email !== 'string') {
        throw new TypeError(email + ' is not a string');
    }

    if (!EMAIL_REGEX.test(email)) {
        throw new Error(email + ' is not an e-mail');
    }

    if (typeof password !== 'string') {
        throw new TypeError(password + ' is not a string');
    }

    if (password.length < 6) {
        throw new Error('password does not have the min length');
    }

    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`);
    }
    //Llama a la api para que registre este nuevo usuario
    call('POST',
        'https://skylabcoders.herokuapp.com/api/v2/users',
        `{ "name": "${name}", "surname": "${surname}", "username": "${email}", "password": "${password}" }`,
        { 'Content-type': 'application/json' },
        (error, status, body) => {
             //Comprueba error de conexion
            if (error) {
                return callback(error);
            }
            //Comprueba que no ha habido un error llamando a la API
            if (status === 201) {
                callback();

            } else {
                callback(new Error(JSON.parse(body).error));

            }
        }
    )
}
function retrieveUser(email) {
    if (typeof email !== 'string') {
        throw new TypeError(email + ' is not a string');
    };

    if (!EMAIL_REGEX.test(email)) {
        throw new Error(email + ' is not an e-mail');
    };

    const user = users.find(function (user) {
        return user.email === email;
    });

    const { name, surname, email: _email } = user;

    return { name, surname, email: _email };
}


/* function retrieveUser(token, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const { name, surname, username } = JSON.parse(body)

                callback(undefined, { name, surname, email: username })
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        }
    )
}
 */



//Devuelve los datos de un usuario a partir de una coincidencia
function retrieveUser(token, callback) {
    //Comprueba que los parametros son del tipo adecuado
    //if(typeof query!=="string") throw new TypeError(query +" is not a string");

    if (typeof token !== "string") throw new TypeError(token + " is not a string");
    if (typeof callback !== "function") throw new TypeError(callback + " is not a function");

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { "Authorization": `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error);
            if (status == 200) {
                const user = JSON.parse(body);
                callback(undefined, { name: user.name, surname: user.surname, email: user.username });
            } else {
                callback(new Error(JSON.parse(body).error))
            }

        }
    )
}
/**
 * Lanza un popup para que el usuario inicie sesion y ligue su cuenta con trello
 * @param {function} onSuccess callback que se llama cuando no hay ningún error
 * @param {function} onFailure callback que se llama en caso de error
 * @throws {TypeError} lanza un error si los parámetros no son funciones
 */
function authenticateuser(onSuccess, onFailure) {
    //Comprueba que se le han mandado dos callbacks
    Function.validate(onSuccess);
    Function.validate(onFailure);

    //Crea el popup de trello para que el usuario inicie sesion y llama a la callback correspondiente
    window.Trello.authorize({
        type: 'popup',
        name: 'Task Talk',
        scope: {
            read: 'true',
            write: 'true'
        },
        expiration: 'never',
        success: onSuccess,
        error: onFailure
    });
    // http://127.0.0.1:5501/task-talk/index.html
}
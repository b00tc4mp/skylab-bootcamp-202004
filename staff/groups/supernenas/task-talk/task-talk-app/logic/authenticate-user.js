//Crea un pop up para que el usuario inicie sesión en trello
function authenticateUser(onSuccess, onFailure) {
    //Comprueba que se le han mandado dos callbacks
    if (typeof onSuccess !== "function") throw new TypeError(onSuccess + " is not a function");
    if (typeof onFailure !== "function") throw new TypeError(onFailure + " is not a function");

    //Crea el popup de trello para que el usuario inicie sesion y llama a la callback correspondiente
    window.Trello.authorize({
        type: 'popup',
        name: 'Task Talk',
        scope: {
            read: 'true',
            write: 'true'
        },
        expiration: '1hour',
        success: onSuccess,
        error: onFailure
    });
}
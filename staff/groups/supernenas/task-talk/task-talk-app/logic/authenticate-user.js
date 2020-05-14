/**
 * Launch a popup for the user to log in and link their account with trello
 * @param {function} onSuccess Callback that is called when there is no error
 * @param {function} onFailure Callback that is called in case of error
 * @throws {TypeError} Throws an error if parameters are not functions
 */

function authenticateuser(onSuccess, onFailure) {
    Function.validate(onSuccess)
    Function.validate(onFailure)

    //Create the trello popup for the user to log in and call the corresponding callback
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
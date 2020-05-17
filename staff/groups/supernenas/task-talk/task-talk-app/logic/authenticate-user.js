/**
 * Launch a popup for the user to log in and link their account with trello
 * @param {function} onSuccess Callback that is called when there is no error
 * @param {function} onFailure Callback that is called in case of error
 * @throws {TypeError} Throws an error if parameters are not functions
 */

function authenticateUser(onSuccess, onFailure) {
    Function.validate(onSuccess)

    Function.validate(onFailure)

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
    })
}
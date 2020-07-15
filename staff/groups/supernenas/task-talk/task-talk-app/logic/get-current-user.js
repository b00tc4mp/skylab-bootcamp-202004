/**
 * Returns the information of the trello user you are currently working with
 * @param {function} onSuccess Callback that is called when there is no error, receives the user from trello whose token has been saved as parameter
 * @param {function} onFailure Callback which is called in case of error, receives error as parameter
 * @throws  {Error} Throws an error if Trello is not saving any tokens
 * @throws {TypeError} Throws an error if onSuccess or onFailure are not functions
 */
function getCurrentUser(onSuccess,onFailure) {
    if(!Trello.token()) throw new Error("Trello does not include a token")

    Function.validate(onSuccess)

    Function.validate(onFailure)

    Trello.get("/members/you",onSuccess,onFailure)
}
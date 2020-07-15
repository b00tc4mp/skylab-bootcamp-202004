/**
 * Function that allows you to delete a certain group
 * @param {string} groupId ID of the group to delete
 * @param {function} onSuccess Callback that is called when there is no error, reeives null
 * @param {function} onFailure Callback that is called when it gives an error, receives the error as a parameter
 * @throws {TypeError} Throws an error if groupId is not a string
 * @throws {TypeError} Throws an error if onSuccess o onFailure are not functions
 */

function deleteGroup(groupId, onSuccess, onFailure) {
    String.validate(groupId)
    
    Function.validate(onSuccess)

    Function.validate(onFailure)

    Trello.delete("boards/" + groupId, onSuccess, onFailure)
}
/**
 * Delete a certain activity
 * @param {string} id ID of the activity to delete
 * @param {function} onSuccess Callback which is called when there is no error
 * @param {function} onFailure Callback which is called in case of error, receives error as parameter
 * @throws {TypeError} Throws an error if the ID is not a string
 * @throws {TypeError} Throws an error if onSuccess or onFailure are not functions
 */

function deleteActivity(id, onSuccess, onFailure) {
    String.validate(id)

    Function.validate(onSuccess)

    Function.validate(onFailure)

    Trello.delete(`cards/${id}`, onSuccess, onFailure)
}
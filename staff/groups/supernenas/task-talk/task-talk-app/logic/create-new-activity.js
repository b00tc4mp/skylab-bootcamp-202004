/**
 * Create a new empty activity
 * @param {string} activityName Name of the activity to be created
 * @param {string} listId ID of the list to which it will belong
 * @param {function} onSuccess Callback that is called when there is no error, receives the new activity as parameter
 * @param {function} onFailure Callback which is called in case of error, receives error as parameter 
 * @throws {TypeError} Throws an error if activityName or listId are not strings
 * @throws {TypeError} Throws an error if onSuccess or onFailure are not functions
 */
function createNewActivity(activityName, activityMessage, listId, onSuccess, onFailure) {
    Function.validate(onSuccess)

    Function.validate(onFailure)

    if (activityMessage === undefined) {
        activityMessage = ""
    } else {
        String.validate(activityMessage)
    }

    String.validate(activityName)
    
    String.validate(listId)

    Trello.post("cards", {
        name: activityName,
        idList: listId,
        desc: activityMessage
    }, onSuccess, onFailure)
}
/**
 * Function that changes the name and description of a specific group
 * @param {string} groupId ID of the group to update
 * @param {string} groupTitle The title that the group will have
 * @param {string} groupDesc Description that the group will have
 * @param {function} onSuccess Callback which is called when no error, receives the updated group as parameter
 * @param {function} onFailure Callback that is called when it has an error, receives the error as a parameter
 * @throws {TypeError} Throws an error if groupId, groupTitle or groupDesc is not a string
 * @throws {TypeError} Throws an error if onSuccess or onFailure  are not functions
 */

function updateGroup(groupId, groupTitle, groupDesc = "", onSuccess, onFailure) {
    String.validate(groupId)

    String.validate(groupTitle)
    
    String.validate(groupDesc)
    
    Function.validate(onSuccess)
    
    Function.validate(onFailure)

    Trello.put("boards/" + groupId, { name: groupTitle, desc: groupDesc }, onSuccess, onFailure)
}
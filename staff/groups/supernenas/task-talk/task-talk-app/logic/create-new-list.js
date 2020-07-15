/**
 * Create a list within a certain group
 * @param {string} listName Name of the list to be created
 * @param {string} groupId ID of the group to which the list belongs
 * @param {function} onSuccess Callback that is called when there is no error, receives new list as parameter
 * @param {function} onFailure Callback which is called in case of error, receives error as parameter
 * @throws {TypeError} Throws an error if listName or groupId are not a string
 * @throws {TypeError} Throws an error if onSuccess or onFailure are not functions
 */
function createNewList(listName, groupId, onSuccess, onFailure) {
    String.validate(listName)

    String.validate(groupId)

    Function.validate(onSuccess)
    
    Function.validate(onFailure)

    Trello.post("list", { name: listName, idBoard: groupId }, onSuccess, onFailure)
}
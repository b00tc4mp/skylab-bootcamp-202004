/**
 * Create a new empty group with the user and create it as the only member
 * @param {string} groupname Name of the group to be created
 * @param {function} onSuccess Callback that is called when there is no error, receives the new group as parameter
 * @param {function} onFailure Callback which is called in case of error, receives error as parameter
 * @throws {TypeError} Throws an error if groupname is not a string
 * @throws {TypeError} Throws an error if onSuccess or onFailure are not functions
 */

const TEXT_LENGTH = 16384

function createNewGroup(groupname, groupdesc, onSuccess, onFailure) {
    String.validate(groupname)

    String.validate(groupdesc)

    Function.validate(onSuccess)
    
    Function.validate(onFailure)

    if (groupname.length > TEXT_LENGTH) groupname = groupname.substr(0, TEXT_LENGTH)

    Trello.post("boards/", {
        name: groupname,
        desc: groupdesc,
        defaultLists: false
    }, onSuccess, onFailure)
}
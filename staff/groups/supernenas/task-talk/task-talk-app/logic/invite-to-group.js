/**
 * Invite a user to a group
 * @param {string} userid ID of the user to be invited
 * @param {string} groupid ID of the group to which you are invited
 * @param {function} onSuccess Callback which is called if no error occurs, receives the id of the group and its members
 * @param {function} onFailure Callback which is called if any error occurs, receive the error
 * @throws {TypeError} Throws an error if userid or groupid is not a string or if onSucces or onFailure is not a function
 */

function inviteToGroup(userid,groupid,onSuccess,onFailure){
    String.validate(userid)

    String.validate(groupid)

    Function.validate(onSuccess)
    
    Function.validate(onFailure)

    Trello.put(`boards/${groupid}/members/${userid}`,{type:"admin"},onSuccess,onFailure)
}
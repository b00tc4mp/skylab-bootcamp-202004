/**
 *Makes a user leave a group. For now whoever created the group cannot abandon it, only delete it
 * @param {string} userid ID of the user who is leaving the group
 * @param {string} groupid ID of the group being abandoned
 * @param {function} onSuccess Callback that you call if you have not had any errors, receives the group
 * @param {function} onFailure Callback to which it calls if any error occurs, receives the error
 * @throws {TypeError} Throws an error if userid or groupid are not strings or if onSuccess or onFailure are not functions
 */

function leaveGroup(userid,groupid,onSuccess,onFailure){
    String.validate(userid)

    String.validate(groupid)

    Function.validate(onSuccess)
    
    Function.validate(onFailure)

    Trello.delete(`boards/${groupid}/members/${userid}`,onSuccess,onFailure)
}

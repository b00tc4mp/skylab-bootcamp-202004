/**
 * Returns the information of all the groups to which a certain user belongs. If the user is private at that time and username coincide, you can remove your private groups
 * @param {string} username Username whose groups are going to get, (ID is also valid)
 * @param {function} onSuccess Callback that is called when there is no error, receives groups as parameter
 * @param {function} onFailure Callback which is called in case of error, receives error as parameter
 * @throws {TypeError} Throws an error if username is not a string
 * @throws {TypeError} throws an error if onSuccess or onFailure are not functions
 */

function retrieveUserGroups(username,onSuccess,onFailure){
    const groups = []
    
    String.validate(username)

    Function.validate(onSuccess)

    Function.validate(onFailure)

    Trello.get("members/" + username, getUserSucces, onFailure)
    
    function getUserSucces (user) {
        iterateGroups(user, 0)
    }
    function iterateGroups(user, index) {
        if (index < user.idBoards.length) {
            Trello.get("boards/" + user.idBoards[index], (group) => {
                groups.push(group)

                index++

                if (index < user.idBoards.length) {
                    iterateGroups(user, index)

                } else {
                    onSuccess(groups)
                }
            },onFailure)
        }
    }
}
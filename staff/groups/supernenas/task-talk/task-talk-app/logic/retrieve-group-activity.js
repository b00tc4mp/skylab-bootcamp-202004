/**
 * Returns all the cards belonging to a certain board
 * @param {string} groupId ID of the group from which the activities will be taken
 * @param {function} onSuccess Callback that is called when there is no error, receives all activities as parameter
 * @param {function} onFailure callback which is called in case of error, receives error as parameter
 * @throws {TypeError} throws an error if groupId is not a string
 * @throws {TypeError} throws an error if onSuccess or onFailure are not functions
 */
function retrieveGroupActivity(groupId, onSuccess, onFailure){
    String.validate(groupId)

    Function.validate(onSuccess)
    
    Function.validate(onFailure)

    Trello.get("boards/"+groupId+"/cards",(results) => {
        let aux = results.map((value) => { return value })

        aux.sort((a, b) => {return new Date(b.dateLastActivity)-new Date(a.dateLastActivity)})

        onSuccess(aux)
    },onFailure)
}
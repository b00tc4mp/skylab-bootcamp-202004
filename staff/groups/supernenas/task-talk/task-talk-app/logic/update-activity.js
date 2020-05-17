/**
 * Update the name and description
 * @param {string} id ID of the activity to be updated
 * @param {{name: string,desc: string,idList: string}} newValues Object with properties to be updated
 * @param {function} onSuccess Callback that is called when there is no error, receives updated activity as parameter
 * @param {function} onFailure Callback which is called in case of error, receives error as parameter
 * @throws {TypeError} Throws an error if name, desc or idList are not a string
 * @throws {TypeError} Throws an error if onSuccess or onFailure are not a function 
 */

function updateActivity(id, newValues, onSuccess, onFailure) {
    String.validate(id)

    String.validate(newValues.name)

    String.validate(newValues.desc)

    String.validate(newValues.idList)
    
    Function.validate(onSuccess)
    
    Function.validate(onFailure)

    Trello.put("cards/" + id, { 
        name: newValues.name, 
        desc: newValues.desc, 
        idList: newValues.idList 
    }, onSuccess, onFailure)
}
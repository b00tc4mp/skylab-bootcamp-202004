/**
 * Crea una nueva actividad vacía
 * @param {string} activityName el nombre de la actividad que se va a crear
 * @param {string} listId id de la lista a la que pertenecerá
 * @param {function} onSuccess callback que se llama cuando no hay ningún error, recibe la nueva actividad como parámetro
 * @param {function} onFailure callback que se llama en caso de error, recibe el error como parámetro 
 * @throws {TypeError} lanza un error si activityName o listId no son strings
 * @throws {TypeError} lanza un error si onSuccess o onFailure no son funciones
 */
function createnewactivity(activityName, activityMessage, listId, onSuccess, onFailure) {
    //Comprueba que se le han mandado dos callbacks
    Function.validate(onSuccess);
    Function.validate(onFailure);
    if (activityMessage === undefined)
        activityMessage = ""
    else {
        String.validate(activityMessage)
    }
    String.validate(activityName);
    String.validate(listId);

    Trello.post("cards", {
        name: activityName,
        idList: listId,
        desc: activityMessage
    }, onSuccess, onFailure);
}
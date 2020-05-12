//Crea una nueva actividad vacia
function createNewActivity(activityName, listId, onSuccess, onFailure) {
    //Comprueba que se le han mandado dos callbacks
    Function.validate(onSuccess);
    Function.validate(onFailure);
    String.validate(activityName);
    String.validate(listId);

    Trello.post("cards", { name: activityName, idList: listId }, onSuccess, onFailure);
}
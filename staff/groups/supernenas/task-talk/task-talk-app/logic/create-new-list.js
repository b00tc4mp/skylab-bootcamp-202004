//Crea listas dentro de un grupo para meter cartas
function createNewList(listName,groupId,onSuccess,onFailure){
    //Comprueba el tipo de los parámetros
    String.validate(listName);
    String.validate(groupId);
    Function.validate(onSuccess);
    Function.validate(onFailure);

    Trello.post("list",{name: listName,idBoard: groupId},onSuccess,onFailure);
}
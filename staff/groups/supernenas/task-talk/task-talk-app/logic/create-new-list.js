/**
 * Crea una lista dentro de un determinado grupo
 * @param {string} listName nombre de la lista que se va a crear
 * @param {string} groupId id del grupo al que pertenece la lista
 * @param {function} onSuccess callback que se llama cuando no hay ningún error, recibe la nueva lista como parámetro
 * @param {function} onFailure callback que se llama en caso de error, recibe el error como parámetro
 * @throws {TypeError} lanza un error si listName o groupId no son un string
 * @throws {TypeError} lanza un error si onSuccess o onFailure no son funciones
 */
function createnewlist(listName,groupId,onSuccess,onFailure){
    //Comprueba el tipo de los parámetros
    String.validate(listName);
    String.validate(groupId);
    Function.validate(onSuccess);
    Function.validate(onFailure);

    Trello.post("list",{name: listName,idBoard: groupId},onSuccess,onFailure);
}
//Crea listas dentro de un grupo para meter cartas
function createNewList(listName,groupId,onSucces,onFailure){
    //Comprueba el tipo de los parámetros
    
    if(typeof listName!=="string") throw new TypeError(listName+" is not a string");
    if(typeof groupId!=="string") throw new TypeError(groupId+" is not a string");
    if(typeof onSucces!=="function") throw new TypeError(onSucces+" is not a function");
    if(typeof onFailure!=="function") throw new TypeError(onFailure+" is not a function");

    Trello.post("list",{name: listName,idBoard: groupId},onSucces,onFailure);
}
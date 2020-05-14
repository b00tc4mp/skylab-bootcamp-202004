/**
 * Devuelve la información del usuario de trello con el que se está trabajando en ese momento
 * @param {function} onSuccess callback que se llama cuando no hay ningún error, recibe el usuario que de trello cuyo token se ha guardado como parámetro  
 * @param {function} onFailure callback que se llama en caso de error, recibe el error como parámetro 
 * @throws  {Error} lanza un error si Trello no está guardando ningún token
 * @throws {TypeError} lanza un error si onSuccess o onFailure no son funciones
 */
function getcurrentuser(onSuccess,onFailure){
    //Comprueba errores sincronos
    if(!Trello.token()) throw new Error("Trello does not include a token");
    Function.validate(onSuccess);
    Function.validate(onFailure)
    Trello.get("/members/you",onSuccess,onFailure)
}
//token de pepito grillo
// 1b2c6e40f6ccb9a4c19ed12760c2995f59783a4dbfc2a265ed538bd144f8e19f
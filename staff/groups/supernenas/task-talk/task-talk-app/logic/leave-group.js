/**
 * Hace que un usario abandone un grupo. Por ahora quien haya creado el grupo no puede abandonarlo, solo borrarlo
 * @param {string} userid id del usuario que va a abandonar el grupo
 * @param {string} groupid id del grupo que se va a abandonar
 * @param {function} onSuccess callback a la que llama si no ha habido ningún error, recibe el grupo
 * @param {function} onFailure callback a la que e llama si ocurre algun error, recibe el error
 * @throws {TypeError} lanza un error si userid o grouid no son strings o si onSuccess o onFailure no son funciones
 */
function leavegroup(userid,groupid,onSuccess,onFailure){
    String.validate(userid);
    String.validate(groupid);
    Function.validate(onSuccess);
    Function.validate(onFailure);
    Trello.delete(`boards/${groupid}/members/${userid}`,onSuccess,onFailure)
}
//user.id de Hector "5bc71f9b224462720874c409"
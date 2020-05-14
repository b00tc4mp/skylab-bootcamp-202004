/**
 * Invita a un usuario a un grupo
 * @param {string} userid id del usuario al que se va a invitar
 * @param {string} groupid id del grupo al que se le invita
 * @param {function} onSuccess callback a la que se llama si no ocurre ningñun error, recibe la id del grupo y sus miembros
 * @param {function} onFailure callback a la que se llama si ocurre algún error, recibe el error
 * @throws {TypeError} lanza un error si userid o groupid no son un string o si onSucces o onFailure no una funcion
 */
function invitetogroup(userid,groupid,onSuccess,onFailure){
    String.validate(userid);
    String.validate(groupid);
    Function.validate(onSuccess);
    Function.validate(onFailure);

    Trello.put(`boards/${groupid}/members/${userid}`,{type:"admin"},onSuccess,onFailure)
}
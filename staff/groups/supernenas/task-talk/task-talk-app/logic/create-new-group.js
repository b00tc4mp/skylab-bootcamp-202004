/**
 * Crea un nuevo grupo vacío con el usuario que lo crea como único miembro
 * @param {string} groupname nombre del grupo que se va a crear
 * @param {function} onSuccess callback que se llama cuando no hay ningún error, recibe el nuevo grupo como parámetro
 * @param {function} onFailure callback que se llama en caso de error, recibe el error como parámetro
 * @throws {TypeError} lanza un error si groupname no es un string
 * @throws {TypeError} lanza un error si onSuccess o onFailure no son funciones
 */
function createnewgroup(groupname, groupdesc, onSuccess, onFailure) {
    //Comprueba que los parametros son del tipo correcto
    String.validate(groupname);
    String.validate(groupdesc);
    Function.validate(onSuccess);
    Function.validate(onFailure);

    //Comprueba el tamaño del nombre y si se sobrepasa lo trunca
    if (groupname.length > 16384) groupname = groupname.substr(0, 16384);

    Trello.post("boards/", {
        name: groupname,
        desc: groupdesc,
        defaultLists: false
    }, onSuccess, onFailure)
}
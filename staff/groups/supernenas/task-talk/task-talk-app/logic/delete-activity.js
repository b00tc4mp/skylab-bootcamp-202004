/**
 * Elimina una determinada actividad
 * @param {string} id id de la actividad que va a ser borrada
 * @param {function} onSuccess callback que se llama cuando no hay ningún error
 * @param {function} onFailure callback que se llama en caso de error, recibe el error como parámetro
 * @throws {TypeError} lanza un error si id no es un string
 * @throws {TypeError} lanza un error si onSuccess o onFailure no son funciones
 */
function deleteactivity(id, onSuccess, onFailure) {
    //Comprueba el tipo de parametros
    String.validate(id)
    Function.validate(onSuccess)
    Function.validate(onFailure)

    Trello.delete(`cards/${id}`, onSuccess, onFailure);
}
//Elimina una actividad
function deleteActivity(id, onSuccess, onFailure) {
    //Comprueba el tipo de parametros
    String.validate(id)
    Function.validate(onSuccess)
    Function.validate(onFailure)

    Trello.delete(`cards/${id}`, onSuccess, onFailure);
}
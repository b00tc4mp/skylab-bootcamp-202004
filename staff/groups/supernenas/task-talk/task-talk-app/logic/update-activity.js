/**
 * Actualiza el nombre, descripción
 * @param {string} id id de la actividad que se va a actualizar
 * @param {{name: string,desc: string,idList: string}} newValues objeto con las propiedades que se van a actualizar
 * @param {function} onSuccess callback que se llama cuando no hay ningún error, recibe la actividad actualizada como parámetro
 * @param {function} onFailure callback que se llama en caso de error, recibe el error como parámetro
 * @throws {TypeError} lanza un error si name, desc o idList no son un string
 * @throws {TypeError} lanza un error si onSuccess o onFailure no son una función
 */
function updateactivity(id,newValues,onSuccess, onFailure){
    //Comprueba el tipo de los parámetros
    String.validate(id);
    String.validate(newValues.name);
    String.validate(newValues.desc);
    String.validate(newValues.idList);
    Function.validate(onSuccess);
    Function.validate(onFailure);

    Trello.put("cards/"+id,{name: newValues.name,desc: newValues.desc,idList: newValues.idList},onSuccess,onFailure)
}
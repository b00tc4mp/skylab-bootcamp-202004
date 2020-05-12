/**
 * Devuelve todas las tarjetas pertenecientes a un determinado tablón
 * @param {string} groupId id del grupo del que se van a sacar las actividades
 * @param {function} onSuccess callback que se llama cuando no hay ningún error, recibe todas las actividades como parámetro
 * @param {function} onFailure callback que se llama en caso de error, recibe el error como parámetro
 * @throws {TypeError} lanza un error si groupId no es un string
 * @throws {TypeError} lanza un error si onSuccess o onFailure no son funciones
 */
function retrievegroupactivity(groupId,onSuccess, onFailure){
    //Comprueba que los parametros son del tipo adecuado
    String.validate(groupId);
    Function.validate(onSuccess);
    Function.validate(onFailure);

    Trello.get("boards/"+groupId+"/cards",(results)=>{
        //Los reordena para que aparezcan primero las últimas en haber sido editadas
        let aux=results.map((value)=>{return value})
        aux.sort((a,b)=>{return new Date(b.dateLastActivity)-new Date(a.dateLastActivity)});
        onSuccess(aux);
    },onFailure)
}
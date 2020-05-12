//Devuelve todas las tarjetas dentro de un determinado tablon
function retrieveGroupActivity(groupid,onSuccess, onFailure){
    //Comprueba que los parametros son del tipo adecuado
    String.validate(groupid);
    Function.validate(onSuccess);
    Function.validate(onFailure);

    Trello.get("boards/"+groupid+"/cards",(results)=>{
        //Los reordena para que aparezcan primero las últimas en haber sido editadas
        let aux=results.map((value)=>{return value})
        aux.sort((a,b)=>{return new Date(b.dateLastActivity)-new Date(a.dateLastActivity)});
        onSuccess(aux);
    },onFailure)
}
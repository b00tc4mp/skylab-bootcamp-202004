//Devuelve todas las tarjetas dentro de un determinado tablon
function retrieveGroupActivity(groupid,onSuccess, onFailure){
    //Comprueba que los parametros son del tipo adecuado
    if(typeof groupid!=="string") throw new TypeError(groupid + " is not a string");
    if(typeof onSuccess!=="function") throw new TypeError(onSuccess+" is not a function");
    if(typeof onFailure!=="function") throw new TypeError(onFailure+" is not a function");
    Trello.get("boards/"+groupid+"/cards",(results)=>{
        //Los reordena para que aparezcan primero las últimas en haber sido editadas
        let aux=results.map((value)=>{return value})
        aux.sort((a,b)=>{return new Date(b.dateLastActivity)-new Date(a.dateLastActivity)});
        onSuccess(aux);
    },onFailure)
}
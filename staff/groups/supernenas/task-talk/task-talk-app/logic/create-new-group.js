//Crea un nuevo grupo vacío
function createNewGroup(groupname,onSuccess,onFailure){
    //Comprueba que los parametros son del tipo correcto
    if(typeof groupname!=="string") throw new TypeError(groupname+" is not a string");
    if(typeof onSuccess!=="function") throw new TypeError(onSuccess+" is not a function");
    if(typeof onFailure!=="function") throw new TypeError(onFailure+" is not a function");
    //Comprueba el tamaño del nombre y si se sobrepasa lo trunca
    if(groupname.length>16384) groupname= groupname.substr(0,16384);

    Trello.post("boards/",{name: groupname,defaultLists:false},onSuccess,onFailure)
}
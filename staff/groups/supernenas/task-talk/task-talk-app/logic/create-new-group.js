//Crea un nuevo grupo vacío
function createNewGroup(groupname,onSuccess,onFailure){
    //Comprueba que los parametros son del tipo correcto
    String.validate(groupname);
    Function.validate(onSuccess);
    Function.validate(onFailure);
    
    //Comprueba el tamaño del nombre y si se sobrepasa lo trunca
    if(groupname.length>16384) groupname= groupname.substr(0,16384);

    Trello.post("boards/",{name: groupname,defaultLists:false},onSuccess,onFailure)
}
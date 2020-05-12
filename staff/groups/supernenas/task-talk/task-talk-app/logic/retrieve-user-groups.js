//Devuelve la información de todos los grupos a los que pertenece un usuario
//Requiere que el usuario esté logeado para ver sus boards privados

function retrieveUserGroups(username,onSucces,onFailure){
    const groups=[];
    //Comprueba que los parametros son del tipo correcto
    String.validate(username);
    Function.validate(onSucces);
    Function.validate(onFailure);

    //Obtener la información del usuario
    Trello.get("members/"+username,getUserSucces,onFailure)
    function getUserSucces(user){
        //Si no ha tenido ningun fallo para sacar el usuario
        //itera sobre todos los grupos en los que participa
        iterateGroups(user,0);
    }
    //Es una función recursiva va por cada uno de los grupos del usuario y los almacena
    //Una vez termina con todos llama a la callback de acierto y se los pasa
    function iterateGroups(user,index){
        if(index<user.idBoards.length){
            Trello.get("boards/"+user.idBoards[index],(group)=>{
                groups.push(group);
                index++;
                if(index<user.idBoards.length){
                    iterateGroups(user,index);
                }else{
                    //let results= groups.map((value)=>value.name) //Podemos usar esto si queremos recomponer los resultados
                    onSucces(groups);
                }
            },onFailure)
        }
    }
}

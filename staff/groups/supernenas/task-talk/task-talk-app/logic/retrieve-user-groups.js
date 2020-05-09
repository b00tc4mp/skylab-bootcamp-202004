//Devuelve la información de todos los grupos a los que pertenece un usuario
//Requiere que el usuario esté logeado para ver sus boards privados

function retrieveUserGroups(username,onSucces,onFail){
    const groups=[];
    //Comprueba que los parametros son del tipo correcto
    
    if(typeof username!=="string") throw new TypeError(username+" is not a string")
    if(typeof onSucces!=="function") throw new TypeError(onSucces+" is not a function")
    if(typeof onFail!=="function") throw new TypeError(onFail+ " is not a function")

    //Obtener la información del usuario
    Trello.get("members/"+username,getUserSucces,getUserFailure)
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
            },iterationFailure)
        }
    }
    //En caso de haber algún fallo durante las llamadas a API ejecuta la callback de error
    //Y le pasa el objeto que ha devuelto esa llamada
    function getUserFailure(error){
        onFail(error);
    }
    function iterationFailure(error){
        onFail(error);
    }
}

/**
 * Devuelve la informacion de todos los grupos a los que pertenece un determinado usuario. Si el usuario vinculado en ese momento y username coinciden puede sacar sus grupos privados 
 * @param {string} username nombre de usuario (también vale su id) cuyos grupos van a sacar
 * @param {function} onSuccess callback que se llama cuando no hay ningún error, recibe los grupos como parámetro
 * @param {function} onFailure callback que se llama en caso de error, recibe el error como parámetro
 * @throws {TypeError} lanza un error si username no es un string
 * @throws {TypeError} lanza un error si onSuccess o onFailure no son funciones
 */
function retrieveusergroups(username,onSuccess,onFailure){
    const groups=[];
    //Comprueba que los parametros son del tipo correcto
    String.validate(username);
    Function.validate(onSuccess);
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
                    onSuccess(groups);
                }
            },onFailure)
        }
    }
}

//Devuelve un array con todos los petes que va a ver un usuario
const retrievePetes=(user)=>{
    if(user===undefined) throw new Error("user is not defined");
    if(user.constructor.name!=="User") throw new TypeError(user +" is not a User");
    const resultPetes=[];
    for(var i=0;i<user.following.length;i++){
        for(var j=0;j<user.following[i].petes.length;j++){
            resultPetes.push(user.following[i].petes[j]);
        }
    }
    //Ordena los petes de más actual a más antiguo
    resultPetes.sort((a,b)=>b.date-a.date);
    return resultPetes;
}
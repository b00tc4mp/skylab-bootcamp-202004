//Devuelve un array con los usuarios que siguen al usuario en cuestion
function retrieveFollowers(token,callback){
    //Comprueba que se le han dado los valores correctos
    if(typeof token!=="string") throw new TypeError(token + " is not a string");
    if(typeof callback!=="function") throw new TypeError(callback+ " is not a function");

    //Primero obtiene el id del usuario en cuestion
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', 
        undefined, 
        { "Authorization": `Bearer ${token}`}, 
        (error, status, body) => {
            if(error) return callback(error);
            if(status===200){
                const user = JSON.parse(body); //El usuario en el que stoy buscando
                //Coger todos los usuarios y filtrar los que sigan a userid
                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all', 
                undefined, 
                { "Authorization": `Bearer ${token}`}, 
                (error, status, body) => {
                    if(error) return callback(error);
                    if(status===200){
                        const users = JSON.parse(body);
                        let results=users.filter(u=>{
                            if(u.following){

                                u.following.includes(user.id)
                            }
                        })
                        console.log(results)
                        callback(undefined, results);
                    }else{
                        callback(new Error(JSON.parse(body).error))
                    }
                })
            }else{
                callback(new Error(JSON.parse(body).error))
            }
        })
}
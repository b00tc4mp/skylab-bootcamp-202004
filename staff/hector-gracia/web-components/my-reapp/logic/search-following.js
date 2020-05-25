//Devuelve los datos de todos los usuarios
function searchFollowing(token,callback){
    //Comprueba que los parametros son del tipo adecuado

    if(typeof token!=="string") throw new TypeError(token +" is not a string");
    if(typeof callback!=="function") throw new TypeError(callback+ " is not a function");

    //Sacar todo los usuarios a los que está siguiendo
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', 
        undefined, 
        { "Authorization": `Bearer ${token}`}, 
        (error, status, body) => {
            if(error) return callback(error);
            if(status==200){
                const user = JSON.parse(body); //El usuario en el que stoy buscando
                //Coger todos los usuarios y filtrar los que tenga id que coincidan con user.following
                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all', 
                undefined, 
                { "Authorization": `Bearer ${token}`}, 
                (error, status, body) => {
                    if(error) return callback(error);
                    if(status==200){
                        const users = JSON.parse(body);
                        let results=users.filter(u=>user.following.includes(u.id))
                        results = results.map(({ name, surname, username, id }) => ({ name, surname, email: username, id }));
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


function toogleFollow(token,id,callback){//Hace que un usuario siga o deje de seguir a otro token usuario que ejecuta la accion id objetivo
    if(typeof token!=="string") throw new TypeError(token + " is not a string");
    if(typeof id==="undefined") throw new Error(id + " is not defined");

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', 
        undefined, 
        { "Authorization": `Bearer ${token}`}, 
        (error, status, body) => {
            if(error) return callback(error);
            if(status==200){
                const user = JSON.parse(body);
                //Si el usuario no tiene array con following se lo creará
                if(user.following===undefined){
                    call("PATCH","https://skylabcoders.herokuapp.com/api/v2/users",
                    `{"following": ["${id}"] }`,
                    {"Content-type": "application/json", "Authorization": `Bearer ${token}`}, (error,status,body)=>{
                        if(error) return callback(error);
                        if(status===204){
                            callback(undefined)
                        }else{
                            callback(new Error(JSON.parse(body).error))
                        }
                    })
                }else{
                    let following=user.following;
                    if(following.includes(id)){//Si ya le estaba siguiendo le deja de seguir
                        following.splice(following.indexOf(id),1);
                    }else{//Si no le seguia empieza a seguirle
                        following.push(id);
                    }
                    //crea un string con todas las ids que sigue
                    let follow=JSON.stringify(following);
                    call("PATCH","https://skylabcoders.herokuapp.com/api/v2/users",
                    `{"following": ${follow} }`,
                    {"Content-type": "application/json", "Authorization": `Bearer ${token}`}, (error,status,body)=>{
                        if(error) return callback(error);
                        if(status===204){
                            callback(undefined)
                        }else{
                            callback(new Error(JSON.parse(body).error))
                        }
                    })
                }
            }else{
                callback(new Error(JSON.parse(body).error))
            }
        }
    )
}
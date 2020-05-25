function makeTweet(token,tweet,callback){//Hace que un usuario siga o deje de seguir a otro token usuario que ejecuta la accion id objetivo
    if(typeof token!=="string") throw new TypeError(token + " is not a string");
    if(typeof tweet!=="string") throw new TypeError(tweet + " is not a string");

    //Saca los datos del usuario actual
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', 
        undefined, 
        { "Authorization": `Bearer ${token}`}, 
        (error, status, body) => {
            if(error) return callback(error);
            if(status==200){
                const user = JSON.parse(body);
                //Si el usuario no tiene array con tweets se lo creará
                if(user.tweets===undefined){
                    call("PATCH","https://skylabcoders.herokuapp.com/api/v2/users",
                    `{"tweets": [{"message": "${tweet}", "date": "${Date.now().toString()}"}] }`,
                    {"Content-type": "application/json", "Authorization": `Bearer ${token}`}, (error,status,body)=>{
                        if(error) return callback(error);
                        if(status!==204){
                            callback(undefined)
                        }else{
                            callback(new Error(JSON.parse(body).error))
                        }
                    })
                }else{
                    let tweets=user.tweets;
                    tweets.push({message: tweet, date: Date.now().toString()});
                    //crea un string con todos los tweets que ha hecho
                    let alltweets=JSON.stringify(tweets);
                    call("PATCH","https://skylabcoders.herokuapp.com/api/v2/users",
                    `{"tweets": ${alltweets} }`,
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
function retrieveUserTweets(token,callback){
    //Comprueba el token y la callback
    if(typeof token!=="string") throw new TypeError(token +" is not a string");
    if(typeof callback!=="function") throw new TypeError(callback + " is not a function");
     //Sacar todo los tweets del usuario
     call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', 
     undefined, 
     { "Authorization": `Bearer ${token}`}, 
     (error, status, body) => {
         if(error) return callback(error);
         if(status==200){
            const user = JSON.parse(body); //El usuario en el que estoy buscando
            callback(undefined,user.tweets);
             
         }else{
            callback(new Error(JSON.parse(body).error))
         }
     })
}
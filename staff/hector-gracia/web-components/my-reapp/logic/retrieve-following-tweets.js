//Devuelve los tweets de todos los usuarios a los que está siguiendo
function retrieveFollowingTweets(token,callback){
    //Comprueba el valor de los parametros
    if(typeof token!=="string") throw new TypeError(token + " is not a string");
    if(typeof callback!=="function") throw TypeError(callback + " is not a funciton");

    let alltweets=[];
    let tweetUsers=[];
    let tweetsAndUsers=[];

    //Busca a todos los usuarios que está siguiendo
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
                        //Añadir los tweets de cada usuario que es seguidp
                        results.forEach(followingUser=>{
                            for(var i=0;i<followingUser.tweets.length;i++){
                                alltweets.push(followingUser.tweets[i]);
                                tweetUsers.push(followingUser);
                                tweetsAndUsers.push({tweet:followingUser.tweets[i],user:followingUser})
                            }
                        })
                        callback(undefined, alltweets,tweetUsers, tweetsAndUsers);
                    }else{
                        callback(new Error(JSON.parse(body).error))
                    }
            
                })
            }else{
                callback(new Error(JSON.parse(body).error))
            }
        })
}
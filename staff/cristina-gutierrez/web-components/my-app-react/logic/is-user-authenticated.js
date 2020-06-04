function isUserAuthenticated(token, callback) {
    //Comprobar que token es un string
    String.isString(token);

    call("GET", "https://skylabcoders.herokuapp.com/api/v2/users",
    undefined,{ Authorization: `Bearer ${token}` },
    (error, status, body)=>{
        if(error) return callback(error);
        if(status===200){
            callback(undefined,true);
        }else{
            callback(undefined,false);
        }
    })
    
} 
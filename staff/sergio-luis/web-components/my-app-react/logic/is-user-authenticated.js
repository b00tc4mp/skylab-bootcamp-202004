function isUserAuthenticated(token,callback){
    String.validate.notVoid(token);

    Function.validate(callback);

    callback('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
    undefined,
    {
        Authorization:`Bearer ${token}`
    },
    (error,status)=>{
        if(error) throw callback(error)

        callback(undefined, status === 200)
    }
    )
}
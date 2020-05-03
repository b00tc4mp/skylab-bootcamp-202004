function checkFollow(token, callback) {
    call('GET','https://skylabcoders.herokuapp.com/api/v2/users',
    undefined,
    {'Authorization': `Bearer ${token}`},
    (error,status,body) =>{
        if(error) throw callback(error);
   
        if(status === 200){
            const {following} = JSON.parse(body)
            if(following)
               callback(undefined, following)
            // else
            // updateUser(token, error => {if(error) throw Error; callback(undefined, following)})
                
        }else{
            const {error} = JSON.parse(body);

            callback(new Error(error));

        }
    })
}



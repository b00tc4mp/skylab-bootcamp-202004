function checkFollow(token, callback) {
    call('GET','https://skylabcoders.herokuapp.com/api/v2/users',
    undefined,
    {'Authorization': `Bearer ${token}`},
    (error,status,body) =>{
        if(error) throw callback(error);
   
        if(status === 200){
            const {followers} = JSON.parse(body)
            if(followers)
               callback(undefined, following )
            else updateUser(token, error => {if(error) throw Error})
        }else{
            const {error} = JSON.parse(body);

            callback(new Error(error));

        }
    })
}
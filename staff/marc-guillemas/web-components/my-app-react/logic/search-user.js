function searchUsers(token,query,callback){

    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)
    
  
    const follow = checkFollow(token, (error,following)=>{
        return following
    })
    
    call('GET','https://skylabcoders.herokuapp.com/api/v2/users/all',
    undefined,
    {'Authorization': `Bearer ${token}`},
    (error,status,body) =>{
        if(error) throw callback(error);
   
        if(status === 200){
                let users = JSON.parse(body)

                users = users.filter(function (user) {
                    const { name, surname, username,id } = user

                    return name && name.toLowerCase().includes(query) || surname && surname.toLowerCase().includes(query) || username.toLowerCase().includes(query)
                })

                users = users.map(({ name, surname, username, id }) => ({ name, surname, email: username, id }))
                
                callback(undefined, users)
        }else{
            const {error} = JSON.parse(body);

            callback(new Error(error));

        }
    })
}
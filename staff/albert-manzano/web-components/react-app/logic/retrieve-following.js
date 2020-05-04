function  retrieveFollowing(token,callback){

    let _following=[]

        call('GET', 
            'https://skylabcoders.herokuapp.com/api/v2/users', 
            undefined,
            { "Content-type": "application/json", "Authorization": `Bearer: ${token}` },(error, status, body) => {
                if (error) return callback(error);
                if(status===200){
                    const {following} =JSON.parse(body);

                    following && following.forEach((following)=>{
                        _following.push({following})
                    })
                }               
        })  
    const following=_following
   callback(undefined,following)
}
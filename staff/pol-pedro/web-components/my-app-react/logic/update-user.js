function updateUser(token, userInfo, callback){
    let user = JSON.stringify(userInfo)
    call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users',user,{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, (error, status, body) =>{
        if(error) return callback(error)

        if(status === 204){
            return callback(undefined)
        }else{
            const {error} = JSON.parse(body)
            return callback(error)
        }
    } )
}
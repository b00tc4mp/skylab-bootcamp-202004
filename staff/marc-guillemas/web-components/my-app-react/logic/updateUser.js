function updateUser(token, callback) {
    
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`);
    
    if (typeof callback !== 'function' ) throw new TypeError(`${callback} is not a function`)
    
    call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users',
    '{"following" : "[]"}',
    {"Content-type":"application/json"},
    { 'Authorization': `Bearer ${token}` },
    (error,status,body)=>{
        if(error) return callback(error);
        
        if(status === 204){
            callback()
            
        }else{
            const {error} = JSON.parse(body);
            
            callback(new Error(error))
        }
    })
} 
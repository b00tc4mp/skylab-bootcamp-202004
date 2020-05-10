function storeNews(token, title,callback) {
    String.validate.notVoid(token)
    String.validate.notVoid(title)
    Function.validate(callback)
    
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined ,  
     { 'Authorization': `Bearer ${token}`}, 
    (error, status, body) => {
      if (error) return callback(error)
      if (status === 200){
        // callback()
        const user=JSON.parse(body)
        if(!user.favorite) user.favorite=[]
        
        let toIndex = user.favorite.indexOf(title)
                if(toIndex === -1) {
                    user.favorite.push(title)
                } else if(toIndex !== -1){
                    user.favorite.splice(toIndex, 1)
                }
                
            call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users',JSON.stringify(user),
            { 'Content-type': 'application/json' , 'Authorization': `Bearer ${token}`}, 
            (error, status, body) => {
            if (error) return callback(error)

            if (status === 204){
                 callback(undefined)
            } else {
                    const { error } = JSON.parse(body)
                    callback(new Error(error))
                }
        
            })
        }
    }) 
}
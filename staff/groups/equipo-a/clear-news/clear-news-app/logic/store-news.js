/**
  *  Save/delete favorite news in the list
  * 
  * @param {string} token Users token
  * @param {string} title The title of the news you have clicked
  * 
  * @param {function} callback The expression to be called after checking credentials, will recieve an Error or authentication token.
  *
  * @throws {TypeError} If any of the parameters does not match the corresponding type or if callback is not a function.
  * @throws {Error} If there is no token.
  */
function storeNews(token, title,callback) {
    String.validate.notVoid(token)
    String.validate(title)
    Function.validate(callback)
    
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined ,  
     { 'Authorization': `Bearer ${token}`}, 
    (error, status, body) => {
      if (error) return callback(error)
      if (status === 200){
      
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
        }else{
            const { error } = JSON.parse(body)
            callback(new Error(error))
        }
    }) 
}

/**
 * 
 * 
 * @callback callback
 * @param {Error} error It may receive an error in case remote logic fails or there is a network problem.
 * 
 */
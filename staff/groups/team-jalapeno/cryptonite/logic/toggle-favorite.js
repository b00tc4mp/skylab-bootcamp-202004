function toggleFavorite(token, id, callback){   // logica para pasar un coin a favorite
    String.validate.notVoid(token)
    String.isString(id)
    Function.validate(callback)
    
    retrieveUser(token, (error, user)=> {
        if ( error ) return callback(error)
        
        let { favorites } = user

        if (favorites.indexOf(id) === -1) {
            favorites.push(id)
        } else {
            favorites = favorites.filter(fav => fav !== id)
        }

        const url = 'https://skylabcoders.herokuapp.com/api/v2/users'
        const body = JSON.stringify({favorites})
        const headers =  { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` }


        call('PATCH', url, body, headers, (error, status, response) => {
            
            if(error) return callback(error)

            if(status === 204) return callback()

            const { error: apiError } = JSON.parse(response)
            callback(new Error(apiError))
        })
            
    })

}
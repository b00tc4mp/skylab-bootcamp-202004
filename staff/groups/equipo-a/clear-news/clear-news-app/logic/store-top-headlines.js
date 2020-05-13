function storeTopHeadlines(token, headline, callback) {
    String.validate.notVoid(token)
    // String.validate.notVoid(title)
    Function.validate(callback)
    
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined ,  
     { 'Authorization': `Bearer ${token}`}, 
    (error, status, body) => {
      if (error) return callback(error)

      if (status === 200){
        // callback()
        const user = JSON.parse(body)
        if(!user.headlines) user.headlines=[]
        if(!user.favorite) user.favorite=[]

        let newsTitle = []
        for(let i in user.headlines) {
            newsTitle.push(user.headlines[i].title)
        }
        
        let toIndex = newsTitle.indexOf(headline.title)
                if(toIndex === -1) {
                    user.headlines.push(headline)
                } else if(toIndex !== -1){
                    user.headlines.splice(toIndex, 1)
                }

                let favIndex = user.favorite.indexOf(headline.title)
                if(toIndex === -1) {
                    user.favorite.push(headline.title)
                } else if(favIndex !== -1){
                    user.favorite.splice(favIndex, 1)
                }     
                
            call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users',JSON.stringify(user),
            { 'Content-type': 'application/json' , 'Authorization': `Bearer ${token}`}, 
            (error, status, body) => {
            if (error) return callback(error)

            if (status === 204){
                 callback()
            } else {
                    const { error } = JSON.parse(body)
                    callback(new Error(error))
                }
        
            })
        }
    }) 
}
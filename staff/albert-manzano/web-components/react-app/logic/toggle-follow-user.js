function toggleFollowUser(token, following ,callback) {

        call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/',
        undefined, { "Content-type": "application/json",'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)
    
            if (status === 200) {
                const users = JSON.parse(body)
                const index = (user.following || (user.following = [])).indexOf(following)
    
                if {
                    (index > -1) user.following.splice(index, 1)
                    toggle=false
                }else{
                    user.following.push(following)
                    toggle=true
                }
                
            } else {
                const { error } = JSON.parse(body)
    
                callback(new Error(error))
            }
            call('PATCH',
                'https://skylabcoders.herokuapp.com/api/v2/users',
                JSON.stringify(user),
                { "Content-type": "application/json", "Authorization": `Bearer: ${token}` }, (error, status, body) => {
                    if (error) return callback(error)
                    if (status === 204) {
                        debugger
                        callback(undefined,toggle)
                    } else {
                        const { error } = JSON.parse(body)
                        callback(new Error(error))
                    }
                })
        
    }
    callback(undefined,toggle)
)
}
function searchUsers(token, query, callback) {
    query = query.toLowerCase()

    call('GET','https://skylabcoders.herokuapp.com/api/v2/users/all',
    undefined,
    {'Authorization' : `Bearer ${token}`}, 
    (error, status, body) => {
        if (error) return callback(error) 

        if (status === 200) {
            const users = JSON.parse(body)
            
            const _users = users.filter(function (user) {
                const { username } = user
        
                return username.toLowerCase().includes(query)
            })

            callback(undefined, _users)
        } else {
            const {error} = JSON.parse(body)

            callback(new Error(error))
        }
    })
}
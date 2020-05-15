function searchUsers(token, query, callback) {
    String.validate(query)
    if(token === undefined) throw new TypeError('you first have to log in')
    if(typeof token != 'string') throw new TypeError('invalid token')

    query = query.toLowerCase()

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all', undefined, {'Authorization': `Bearer ${token}`}, (error, status, body) => {
        if(error) return callback(error)

        if (status === 200){
            let users = []
            let results = JSON.parse(body)
            results.forEach(element => {
                if(element.thElement){
                    users.push(element)
                }
            })
            users = users.filter((user) => {
                const {name, surname, username} = user
                return name && name.toLowerCase().includes(query) || surname && surname.toLowerCase().includes(query) || username.toLowerCase().includes(query)
            })     
            callback(undefined, users)
        }else{
            let error = JSON.parse(body)
            callback(error, undefined)
        }
    })
}
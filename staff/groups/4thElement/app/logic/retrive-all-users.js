function retriveAllUsers (token, callback){
    if(token === undefined) throw new TypeError('LogIn first')

    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all', undefined, {'Authorization': `Bearer ${token}`}, (error, status, body) => {
        if(error) return callback(error)

        if (status === 200){
            let webUsers = []
            let results = JSON.parse(body)
            results.forEach(element => {
                if(element.thElement){
                    webUsers.push(element)
                }
            })
            return callback(undefined, webUsers)
        }else{
            let error = JSON.parse(body)
            return callback(error, undefined)
        }
    })
}  
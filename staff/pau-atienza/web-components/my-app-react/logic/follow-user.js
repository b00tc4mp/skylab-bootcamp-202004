function toggleFollowUser(token, followID, followers = [followID], callback){
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)
    if (typeof followID !== 'string') throw new TypeError(followID + ' is not a string')
    
    let index = followers.indexOf(followID)

    if (index === -1) followers.push(followID)
        else followers.splice(index, 1)

    let body = JSON.stringify({ followers })
    let url = "https://skylabcoders.herokuapp.com/api/v2/users"
    let headers = {Authorization: `Bearer ${token}`,"Content-type": "application/json"};

    call("PATCH", url, body, headers, (error, status, response) => {
        if (error) return callback(error)
        if (status === 204) {
            return callback(undefined, followID)
        }
        const { error: responseError } = JSON.parse(response)
        if (responseError) callback(new Error(responseError))
    })
}
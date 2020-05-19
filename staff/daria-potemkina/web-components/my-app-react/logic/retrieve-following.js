function retrieveFollowing(token, callback){
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
    undefined,
    {Authorization: `Bearer ${token}`},
    (error, status, body) => {
     if(error) return callback(error)

     if (status === 200){
        const follows = JSON.parse(body)

        const { following } = follows

        callback(following)

     }else{
         const {error} = JSON.parse(body)
         callback(new Error(error))
     }
    })
}
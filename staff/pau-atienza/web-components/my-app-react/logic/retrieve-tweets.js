function retrieveTweets(token, user, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    let body = undefined
    let url = "https://skylabcoders.herokuapp.com/api/v2/users/all"
    let headers = { Authorization: `Bearer ${token}` }

    if (!user.following)return callback(undefined, user.tweets)

    call("GET", url, body, headers, (error, status, response) => {
        if (error) return callback(error)
        if (status === 200) {
            const allUsers = JSON.parse(response)

            const followerUsers = allUsers.filter(element => 
                user.following.some(id => id === element.id))

            let allTweets = followerUsers.reduce((accumulator, element)=>{
                element.tweets && element.tweets.forEach(({text, message = text, date}) => 
                    {accumulator.push({username: element.username, message, date})}) 
                return accumulator
            }, [])
            
            user.tweets && user.tweets.forEach(({text, message = text, date}) =>{ 
                allTweets.push({username: user.username, message, date})
            })
            
            callback(undefined, allTweets)
        }
        const { error: responseError } = JSON.parse(response)
        if (responseError) callback(new Error(responseError))
    })
}
  
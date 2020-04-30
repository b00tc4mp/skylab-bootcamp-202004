function retrieveTweets(email) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
   
    let user = users.find(user=>email === user.email)
    
    if (!user) throw new Error(`user with e-mail ${email} not found`)
    // [pepi][pepo]
    let tweets = user.following.forEach(emailFollower => {
        users.forEach(_user => {
            if(_user.email === emailFollower) {
                return _user.tweets 
            }
        })        
    })
    
    return {tweets}
}
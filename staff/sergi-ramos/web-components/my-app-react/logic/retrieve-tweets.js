const retrieveTweets = (_email) => {

    let userRetrieve = users.filter((user) => {
        return user.email === _email
    })
    const [{tweets, following}] = userRetrieve
    
    for(let i = 0; i < following.length; i++){
retrieveTweets()
    }
    
    return tweets
}







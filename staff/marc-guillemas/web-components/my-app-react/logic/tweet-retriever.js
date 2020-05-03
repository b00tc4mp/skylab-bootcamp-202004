function tweetRetriever(loggedUser) {
    
    
    
    const followingUsers = users.filter(user => {
        
        for (let i = 0; i < loggedUser.twitter.following.length; i++) {
            if (user.email === loggedUser.twitter.following[i] || user.email === loggedUser.email) return true;
            }
            return false;
        })
    
    const results = []
    for (let i = 0; i < followingUsers.length; i++){
            for(let j = 0; j < followingUsers[i].twitter.tweets.length; j++){
                let _tweet = {name: followingUsers[i].name, surname: followingUsers[i].surname,
                     tweet: followingUsers[i].twitter.tweets[j].tweet}
                results.push(_tweet)
            }
    }

    return results
}
function tweet(text, user){
    let tweet = {
        user,
        text,
        date: new Date
    }
    tweets.push(tweet)
}
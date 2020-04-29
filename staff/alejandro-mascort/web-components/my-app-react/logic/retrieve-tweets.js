function retrieveTweets(email) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    const user = users.find(user => user.email === email)

    if (!user) throw new Error(`user with e-mail ${email} not found`)

    let tweetsFollowing

    if (!user.tweets) tweetsFollowing = []
    else {
        tweetsFollowing = user.tweets.map(({message, date}) => {
            return {message, 
            date,
            userFollowed: 'Me'}
        })
    }

    let userFollowing, message, date

    if (user.following) {
        for (let i = 0; i < user.following.length; i++) {
            userFollowing = users.find(__user => __user.email === user.following[i])
            if (userFollowing.tweets) {
                for (let j = userFollowing.tweets.length-1; j >= 0; j--) {
                    message = userFollowing.tweets[j].message
                    date = userFollowing.tweets[j].date
                    userFollowed = userFollowing.email
                    tweetsFollowing.push({message, date, userFollowed})
                }
            }
        }
    }

    tweetsFollowing.sort((a,b) => b.date-a.date)

    return tweetsFollowing
}
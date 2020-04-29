function retrieveTweets(email) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    const user = users.find(user => user.email === email)

    if (!user) throw new Error(`user with e-mail ${email} not found`)

    const tweetsFollowing = []
    let userFollowing
    debugger
    if (user.following) {
        for (let i = 0; i < user.following.length; i++) {
            userFollowing = users.find(__user => __user.email === user.following[i])
            if (userFollowing.tweets) {
                for (let j = userFollowing.tweets.length-1; j >= 0; j--) tweetsFollowing.push(userFollowing.tweets[j])
            }
        }
    }

    tweetsFollowing.sort((a,b) => b.date-a.date)

    return tweetsFollowing
}
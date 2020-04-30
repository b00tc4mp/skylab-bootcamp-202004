function retrieveTweets(email) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    const user = users.find(user => user.email === email)

    let miTweets = user.tweet

    let miFollowers = user.following

    let tweets = []

    for (let i in miFollowers) {
        let follTweets = users.find(user => user.email === miFollowers[i])
        tweets.push(follTweets.tweet)
    }

    for (let i in tweets) {
        for (let j in tweets[i])
            miTweets.push(tweets[i][j])
    }
    return miTweets
}

// function retrieveTweets(email) {
//     if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
//     if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

//     let miTweets = []

//     const user = users.find(user => user.email === 'dariapotemkina@mail.ru')

//     const {name, tweet} = user

//     miTweets.push({name, tweet})

//     let miFollowers = user.following

//     let tweets = []

//     for (let i in miFollowers) {
//         let follTweets = users.find(user => user.email === miFollowers[i])
//         let {name, tweet} = follTweets
//         tweets.push({name, tweet})
//     }

//     for (let i in tweets) {
//         for (let j in tweets[i])
//             miTweets.push(tweets[i][j])
//     }
//     return miTweets
// }
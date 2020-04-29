const retrieveTweets = (_email) => {
    let tweetsAll = []

    let userRetrieve = users.filter((user) => {
        return user.email === _email
    })
    const [{ name, tweets, following }] = userRetrieve
    for (let i = 0; i < tweets.length; i++) {
        const {message, date } = tweets[i]
        tweetsAll.push({ name, message, date })
    }
    for (let i = 0; i < following.length; i++) {

        let followingRetrieve = users.filter((user) => {
            return user.email === following[i]
        })
        const [{ name, tweets }] = followingRetrieve
        for (let i = 0; i < tweets.length; i++) {
            const { message, date } = tweets[i]
            tweetsAll.push({ name, message, date })
        }
    }
    return tweetsAll
}

// const retrieveTweets = (_email) => {
//     let tweetsAll = []

//     let userRetrieve = users.filter((user) => {
//         return user.email === _email
//     })
//     const [{ name, tweets, following }] = userRetrieve
//     for (let i = 0; i < tweets.length; i++) {
//         const {message, date } = tweets[i]
//         tweetsAll.push({ message, date })
//     }
//     for (let i = 0; i < following.length; i++) {

//         let followingRetrieve = users.filter((user) => {
//             return user.email === following[i]
//         })
//         const [{ tweets }] = followingRetrieve
//         for (let i = 0; i < tweets.length; i++) {
//             const { message, date } = tweets[i]
//             tweetsAll.push({message, date })
//         }
//     }
//     return [tweetsAll, userRetrieve.name]
// }

function toggleFollowUser(userEmail, followEmail){
    if (typeof userEmail !== 'string') throw new TypeError(userEmail + ' is not a string')
    if (!EMAIL_REGEX.test(userEmail)) throw new Error(userEmail + ' is not an e-mail')

    if (typeof followEmail !== 'string') throw new TypeError(followEmail + ' is not a string')
    if (!EMAIL_REGEX.test(followEmail)) throw new Error(followEmail + ' is not an e-mail')

    const userToFollow = retrieveUser(followEmail)
    if (!userToFollow) throw new Error(`The user with e-mail ${followEmail} does not exist`)

    const userThatFollows = retrieveUser(userEmail)

    userThatFollows.follows || (userThatFollows.follows = [])

    if(!userThatFollows.follows.some(email => followEmail===email)) {
        userThatFollows.follows.push(followEmail)
    } else{
        let index = userThatFollows.follows.indexOf(followEmail)
        userThatFollows.follows.splice(index, 1)
    }
}
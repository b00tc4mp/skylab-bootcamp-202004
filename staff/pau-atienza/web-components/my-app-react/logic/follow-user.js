function followUser(userEmail, followEmail){
    if (typeof userEmail !== 'string') throw new TypeError(userEmail + ' is not a string')
    if (!EMAIL_REGEX.test(userEmail)) throw new Error(userEmail + ' is not an e-mail')

    if (typeof followEmail !== 'string') throw new TypeError(followEmail + ' is not a string')
    if (!EMAIL_REGEX.test(followEmail)) throw new Error(followEmail + ' is not an e-mail')

    const userToFollow = users.find(({email}) => followEmail === email)

    if (!userToFollow) throw new Error(`The user with e-mail ${followEmail}does not exist`)

    const userThatFollows = users.find(({email}) => userEmail === email)

    userThatFollows.follows || (userThatFollows.follows = [])

    userThatFollows.following.some(email => followEmail===email) && userThatFollows.follow.push(followEmail)

}
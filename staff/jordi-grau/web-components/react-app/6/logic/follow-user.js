function followUser(email, following) {
    // TODO add following (= email) to the user (email)
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    if (typeof following !== 'string') throw new TypeError(following + ' is not a string')
    if (!EMAIL_REGEX.test(following)) throw new Error(following + ' is not an e-mail')

    const user = users.find( user => user.email === email)

    if(!user) throw new Error('user not found')

    const followUser = users.find(user => user.email === following)

    if(!followUser) throw new Error('user not found')

    if (!user.following) user.following = []

    const index = user.indexOf(following)

    if(index === -1) user.following.push(following)
    else user.following.splice(index, 1)

}
function followUser(email, following) {
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(email)) throw new Error(email + ' is not an e-mail')

    if (typeof following !== 'string') throw new TypeError(following + ' is not a string')
    if (!EMAIL_REGEX.test(following)) throw new Error(following + ' is not an e-mail')

    const user = users.find(user => user.email === email)

    if(!user) throw new Error (`e-mail ${email} is not exists`)

    const followUser = users.find(user => user.email === following)

    if(!followUser) throw new Error (`e-mail ${following} is not exist`)

    if(!user.following) user.following = []

    const index = user.following.indexOf(following)

    if(index = -1) user.following.push(following)
    else user.following.splice(index, 1)

}
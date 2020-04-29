function followUser(emailFollower, selfemail) {
    debugger
    if (typeof emailFollower !== 'string') throw new TypeError(emailFollower + ' is not a string')
    if (!EMAIL_REGEX.test(emailFollower)) throw new Error(emailFollower + ' does not match the format')

    if (typeof selfemail !== 'string') throw new TypeError(email + ' is not a string')
    if (!EMAIL_REGEX.test(selfemail)) throw new Error(email + ' does not match the format')

    const user = users.find(user => user.email === selfemail)
    if (!user) throw new Error(`${selfemail} not exist`)

    const follower = users.find(user => user.email === emailFollower)
    if (!follower) throw new Error(`${emailFollower} not matched`)

    const index = (user.following || (user.following = [])).indexOf(emailFollower)

    if (index > -1) user.following.splice(index, 1)
    else user.following.push(emailFollower)



}
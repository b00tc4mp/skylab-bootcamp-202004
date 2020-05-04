function toggleFollowUser(email, following) {
    Email.validate(email)

    Email.validate(following)

    // TODO call to retrieve user
    // TODO check if array of following exists, otherwise create new array
    // TODO if following user (id) it is already in array, then remove it, otherwise add it
    // TODO call to update user (body => { following: [...] })

    const user = users.find(user => user.email === email)

    if (!user) throw new Error(`user with e-mail ${email} not found`)

    const _user = users.find(user => user.email === following)

    if (!_user) throw new Error(`user with e-mail ${following} not found`)

    const index = (user.following || (user.following = [])).indexOf(following)

    if (index > -1) user.following.splice(index, 1)
    else user.following.push(following)
}
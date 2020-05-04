/*function toggleFollowUser(email, following) {
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
}*/

function toggleFollowUser(token, followingId, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

    if (typeof followingId !== 'string') throw new TypeError(following + ' is not a string')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    let following

    call('GET','https://skylabcoders.herokuapp.com/api/v2/users',
    undefined,
    { 'Authorization': `Bearer ${token}`  },
    (error, status, body) => {
        if (error) callback(error)

        if (status === 200) {
            const user = JSON.parse(body);

            (user.following ? (following = user.following) : (following=[]))

            const index = following.indexOf(followingId)

            if (index > -1) following.splice(index, 1)
            else following.push(followingId)

            call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', `{ "following" : ${JSON.stringify(following)}}`,
            { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
            (error, status, body) => {
                if (error) return callback(error)
                if (status === 204) callback()
                else {
                    const { error } = JSON.parse(body)

                    callback(new Error(error))
                }
            })

        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    })
}
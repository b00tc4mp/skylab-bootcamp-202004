function toggleFollowUser(token, followId, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)

    if (typeof followId !== 'string') throw new TypeError(`${followId} is not a string`)

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users',
        undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                let user = JSON.parse(body);
                const index = (user.following || (user.following = [])).indexOf(followId);
                if (index === -1) user.following.push(followId);
                else user.following.splice(index, 1);

                call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users',
                    `{ "following" : ${JSON.stringify(user.following)} }`,
                    { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
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

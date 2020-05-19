function searchUsers(token, query, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')

    if (typeof query !== 'string') throw new TypeError(query + ' is not a string')

    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    query = query.toLowerCase()

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        { Authorization: `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const user = JSON.parse(body)

                const { username: _username, following = [] } = user

                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
                    undefined,
                    { Authorization: `Bearer ${token}` },
                    (error, status, body) => {
                        if (error) return callback(error)

                        if (status === 200) {
                            let users = JSON.parse(body)

                            users = users.filter(function (user) {
                                const { name, surname, username } = user

                                return name && name.toLowerCase().includes(query) || surname && surname.toLowerCase().includes(query) || username.toLowerCase().includes(query)
                            })

                            users = users.map(({ id, name, surname, username }) => {
                                const _user = { id, name, surname, email: username }

                                if (username !== _username) _user.following = following.includes(id)

                                return _user
                            })

                            // TODO optimize this processing by just using a single Array.prototype.reduce function

                            callback(undefined, users)
                        } else {
                            const { error } = JSON.parse(body)

                            callback(new Error(error))
                        }

                    }
                )
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        })
}
function retrieveUsersById(token, following, callback) {
    String.validate.notVoid(token)

    Function.validate(callback)

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
        undefined,
        { Authorization: `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                let users = JSON.parse(body)

                users = users.filter(function (user) {
                    return following.includes(user.id)
                })

                users = users.map(({ id, nickname, username, myCards = []}) => {
                    const _user = { id, nickname, email: username, myCards, following: true}

                    return _user
                })

                callback(undefined, users)
            } else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
        }
    )
}
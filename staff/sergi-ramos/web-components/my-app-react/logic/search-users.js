function searchUsers(query, token, following, callback) {
    String.validate.notVoid(token)
    String.validate(query)
    Function.validate(callback)
    query = query.toLowerCase()
    let userFilter
    call("GET", "https://skylabcoders.herokuapp.com/api/v2/users/",
        undefined, { Authorization: `Bearer: ${token}` },
        (error, status, body) => {
            if (error) return callback(error)
            if (status === 200) {

                const user = JSON.parse(body)
                const { username: _username, following = [] } = user


                call("GET", "https://skylabcoders.herokuapp.com/api/v2/users/all",
                    undefined, { Authorization: `Bearer: ${token}` },
                    (error, status, body) => {
                        if (error) return callback(error)

                        if (status === 200) {
                            const users = JSON.parse(body)

                            userFilter = users.filter(function ({
                                name, surname, username: email
                            }) {
                                return name && name.includes(query) || surname && surname.includes(query) || email && email.includes(query)

                            })
                    
                            userFilter = userFilter.map(({ id, name, surname, username }) => {
                                const _user = { id, name, surname, username }

                                if (username !== _username) _user.following = following.includes(id)

                                return _user
                            })
                            callback(undefined, userFilter)
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





        // userFilter.forEach(user => {
                            //     if (following) {
                            //         for (let i = 0; i < following.length; i++) {
                            //             if (user.id === following[i]) user.follow = true
                            //             else user.follow = false
                            //         }
                            //     } else {
                            //         user.follow = false
                            //     }
                            // })
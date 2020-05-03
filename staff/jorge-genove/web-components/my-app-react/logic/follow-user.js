function toggleFollowUser(emailFollowing, token, email, callback) {
    Email.validate(email)


    Email.validate(emailFollowing)

    let userID;

   

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, { Authorization: `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                let { following = [] } = JSON.parse(body)

                call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all', undefined, { Authorization: `Bearer ${token}` },
                    (error, status, body) => {

                        if (error) return callback(error)

                        if (status === 200) {
                            const users = JSON.parse(body)
                            for (var i = 0; i < users.length; i++) {
                                if (users[i].username === emailFollowing) {


                                    userID = users[i].id
                                    const repeatedId = following.findIndex((id) => {
                                        return id === userID
                                    })
                                    if(repeatedId === -1) following.push(userID)
                                    else following.splice(repeatedID,1)
                                }
                            }
                            let follower = JSON.stringify({ following })

                            call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users',
                                follower, { Authorization: `Bearer ${token}`, "Content-type": "application/json" },
                                (error, status, body) => {
                                    if (error) return callback(error)

                                    if (status === 204) {
                                        callback()
                                    } else {
                                        const {error} = JSON.parse(body)

                                        callback(new Error(error))

                                    }
                                })
                        }
                    })
            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))

            }
        })
}





















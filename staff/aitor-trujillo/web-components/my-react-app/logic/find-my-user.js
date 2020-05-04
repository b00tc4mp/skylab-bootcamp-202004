function findMyUser(token, userEmail, callback) {

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all',
        undefined,
        { Authorization: `Bearer ${token}` }, (error, status, response) => {

            if (error) callback(error)

            if (status === 200) {
                const users = JSON.parse(response)

                const myUser = users.find(user => user.username === userEmail)
                callback(undefined, myUser)
            } else {
                const error = JSON.parse(response)
                callback(new Error(error))
            }

        })
}
function searchUsers(query, token, callback) {
    call(
        "GET",
        "https://skylabcoders.herokuapp.com/api/v2/users/all",
        undefined,
        { Authorization: `Bearer: ${token}` },
        (error, status, body) => {
            if (error) return callback(error)
            if (status === 200) {

                const users = JSON.parse(body)
                const userFilter = users.filter(function ({
                    name, surname, username: email
                }) {
                    return name && name.includes(query) || surname && surname.includes(query) || email && email.includes(query)

                })

                callback(undefined, userFilter)
            } else {
                const { error } = JSON.parse(body)
                callback(new Error(error))
            }
        }
    )
}




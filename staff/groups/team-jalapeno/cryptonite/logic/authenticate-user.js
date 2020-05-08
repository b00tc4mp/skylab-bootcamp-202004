function authenticateUser(email, password, callback) {

    // TYPEOF FILTER PENDING
    // TESTING PENDING

    call('POST', 'https://skylabcoders.herokuapp.com/api/v2/users/auth',
        `{ "username": "${email}", "password": "${password}"}`, { 'Content-type': 'application/json' },
        (error, status, response) => {
            if (error) throw error

            if (status === 200) {
                const { token } = JSON.parse(response)
                console.log(token)
                callback(undefined, token)
            } else {
                const { error } = JSON.parse(response)
                callback(new Error(error))
            }

        })

}
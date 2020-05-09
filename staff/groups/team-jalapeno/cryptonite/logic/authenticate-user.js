function authenticateUser(email, password, callback) {

    // TYPEOF FILTER PENDING
    // TESTING PENDING

    const url = 'https://skylabcoders.herokuapp.com/api/v2/users/auth'
    const body = JSON.stringify({ username: email, password })
    const headers = { 'Content-type': 'application/json' }

    call('POST', url, body, headers, (error, status, response) => {
        if (error) throw error 

        if (status === 200) {
            const { token } = JSON.parse(response)
            callback(undefined, token)
        } else {
            const { error } = JSON.parse(response)
            callback(new Error(error))
        }

    })

}
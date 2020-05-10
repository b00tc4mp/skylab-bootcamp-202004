 
function retrieveUser(token, callback) {
    String.validate.notVoid(token)
    Function.validate(callback)

    const url = 'https://skylabcoders.herokuapp.com/api/v2/users/'
    const body = undefined
    const headers =  { 'Authorization': `Bearer ${token}` }

    call('POST', url, body, headers, (error, status, response) => {
        if (error) return callback(error)

        if (status === 200) {
            const { name, surname, username } = JSON.parse(response)
            return callback(undefined, { name, surname, email: username })
        }
        
        const { error } = JSON.parse(response)
        callback(new Error(error))
    })
}
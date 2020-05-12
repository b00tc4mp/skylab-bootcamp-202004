 
function retrieveUser(token, callback) {
    String.validate.notVoid(token)
    Function.validate(callback)
 
    const url = 'https://skylabcoders.herokuapp.com/api/v2/users/'
    const body = undefined
    const headers =  { 'Authorization': `Bearer ${token}` }

    call('GET', url, body, headers, (error, status, response) => {
        if (error) return callback(error)

        if (status === 200) {
            const { name, surname, username, favorites = [], portfolio = [] } = JSON.parse(response)
            return callback(undefined, { name, surname, email: username, favorites, portfolio })
        }
        
        const { error: apiError } = JSON.parse(response)
        callback(new Error(apiError))
    })
}
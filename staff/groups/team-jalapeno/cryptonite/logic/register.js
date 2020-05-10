function register(name, surname, email, password, callback){
    
    String.validate.alphabetic(name)
    String.validate.alphabetic(surname)
    Email.validate(email)
    String.validate.lengthGreaterEqualThan(password, 8)
    Function.validate(callback)
    
    const url = 'https://skylabcoders.herokuapp.com/api/v2/users'
    const body = JSON.stringify({name, surname, username: email, password})
    const headers =  { 'Content-type': 'application/json' }

    call('POST', url, body, headers, (error, status, response) => {
        
        if(error) return callback(error)

        if(status === 201) return callback()

        const { error: apiError } = JSON.parse(response)
        callback(new Error(apiError))
    })
}
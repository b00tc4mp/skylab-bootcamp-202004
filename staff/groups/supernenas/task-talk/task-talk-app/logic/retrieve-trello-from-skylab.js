function retrievetrellofromskylab(tokenskylab, callback) {
    String.validate(tokenskylab)
    
    Function.validate(callback)

    call("GET", "https://skylabcoders.herokuapp.com/api/v2/users", undefined, { "Authorization": `Bearer ${tokenskylab}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                let { trello_token } = JSON.parse(body)

                callback(undefined, trello_token)
            } else {
                callback(new Error(JSON.parse(body).error))
            }
        })
}
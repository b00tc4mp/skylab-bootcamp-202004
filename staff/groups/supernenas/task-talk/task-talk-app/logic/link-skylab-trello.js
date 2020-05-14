function linkskylabtrello(callback, tokenskylab, tokentrello) {
    Function.validate(callback)
    String.validate(tokenskylab)
    String.validate(tokentrello)

    call("PATCH", 'https://skylabcoders.herokuapp.com/api/v2/users',
        `{"trello_token":"${tokentrello}"}`, { "Content-type": "application/json", "Authorization": `Bearer ${tokenskylab}` },
        (error, status, body) => {
            if (error) {
                return callback(error)
            } else
                return callback()
        })
}
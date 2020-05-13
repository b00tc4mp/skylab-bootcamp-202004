function retrieveUserFollowing(token, callback, id = ""){
    String.validate.notVoid(token)

    Function.validate(callback)

    call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/${id}`,
    undefined,
    { 'Authorization': `Bearer ${token}` },
    (error, status, body) => {
        if (error) return callback(error)

        if (status === 200) {
            const { following = [] } = JSON.parse(body)
             
            callback(undefined, following)
        } else {
            const { error } = JSON.parse(body)

            callback(new Error(error))
        }
    }
)
}
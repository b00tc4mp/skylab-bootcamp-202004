function createTweet(token, message, callback) {
    call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', `{"name": "${message}"}`,  
     { 'Authorization': `Bearer ${token}`}, 
    (error, status, body) => {
      if (error) return callback(error)

      if (status === 204)
                callback()
            else {
                const { error } = JSON.parse(body)

                callback(new Error(error))
            }
    })
    
 }













 // TODO call to retrieve user
    // TODO create tweet object { message, date }
    // TODO check if user already has tweets array
    // TODO if user already has tweets array, then push new tweet to it
    // ELSE create new tweets array and push new tweet
    // TODO call to update user (body => { tweets: [...] } )
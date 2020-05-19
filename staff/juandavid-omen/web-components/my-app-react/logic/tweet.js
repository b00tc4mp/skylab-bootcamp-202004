function createTweet(token, message, callback) {
    String.validate.notVoid(token);
    String.validate.alphabetic(message);
    Function.validate(callback);
    
    let newDate = new Date;
    newDate = newDate.toDateString();
    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined,
        { 'Authorization': `Bearer ${token}` },
        (error, status, body) => {
            if (error) return callback(error)

            if (status === 200) {
                const bodyObj = JSON.parse(body)
                const { username } = bodyObj
                const newTweet = { username, message, newDate }
                if (!bodyObj.tweets) bodyObj.tweets = []
                bodyObj.tweets.push(newTweet)

                call('PATCH', 'https://skylabcoders.herokuapp.com/api/v2/users', JSON.stringify(bodyObj),
                    { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` },
                    (error, status, body) => {
                        if (error) return callback(error)

                        if (status === 204) {
                            callback()
                        } else {
                            const { error } = JSON.parse(body)

                            callback(new Error(error))
                        }
                    }
                )
            }
        }
    )
}
function retrieveTweets(token, callback) {
    const list = [];

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users', undefined, { 'Authorization': `Bearer ${token}` }, (error, status, body) => {
        if (error) return callback(error)

        if (status === 200) {
            const { tweets, following } = JSON.parse(body);
            
            tweets && tweets.forEach((tweet) => {
                const { mesagge } = tweet;
                list.push(mesagge);  
            })
            
            let counter = 0;
            following && following.forEach(element => {
                call('GET', `https://skylabcoders.herokuapp.com/api/v2/users/${element}`,
                    undefined,
                    { 'Authorization': `Bearer ${token}` },
                    (error, status, body) => {
                        if (error) return callback(error)

                        if (status === 200) {
                            counter++;
                            const { tweets } = JSON.parse(body)
                            
                            tweets && tweets.forEach((tweet) => list.push(tweet.tweets))

                            if (counter === following.length) callback(undefined, list)

                        } else {
                            const { error } = JSON.parse(body);

                            callback(new Error(error));
                        }
                    }
                )
            });
        }
    })
}   
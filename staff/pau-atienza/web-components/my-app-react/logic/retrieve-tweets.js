function retrieveTweets(token, callback) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    let body = undefined;
    let url = "https://skylabcoders.herokuapp.com/api/v2/users";
    let headers = { Authorization: `Bearer ${token}` };
  
    call("GET", url, body, headers, (error, status, response) => {
        if (error) return callback(error);
        if (status === 200) {
            let user = JSON.parse(response)

            if (user.followers) {
                url = "https://skylabcoders.herokuapp.com/api/v2/users/all";

                call("GET", url, body, headers, (error, status, response) => {
                    if (error) return callback(error);
                    if (status === 200) {
                        const allUsers = JSON.parse(response);
                        const followerUsers = allUsers.filter(element => user.followers.some(username => username === element.username))
                        

                        // let allTweets = followerUsers.reduce((accumulator, {username, tweets})=>{
                        //     if(tweets) return (accumulator.concat(element.map(({message, text, date}) => 
                        //     { if (!message) let message = text
                        //         return({username, message, date})})))
                           
                        // }, [])

                        let allTweets = []
                        followerUsers.forEach(follower => {
                            if (follower.tweets) allTweets = allTweets.concat(follower.tweets)})
                            
                        if (user.tweets) allTweets = allTweets.concat(user.tweets);
                        callback(undefined, allTweets);
                        // if (user.tweets) allTweets = allTweets.concat(user.tweets.map(({message, text, date}) => 
                        // { if (!message) let message = text
                        //     return({username: user.username, message, date})}));
                    }
                    const { error: responseError } = JSON.parse(response);
                    if (responseError) callback(new Error(responseError));
                });
            } else callback(undefined, user.tweets);
        }
  
        const { error: responseError } = JSON.parse(response);
        if (responseError) callback(new Error(responseError));
    });
}
  
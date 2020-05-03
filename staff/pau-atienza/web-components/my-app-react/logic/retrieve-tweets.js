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
                        const followerUsers = allUsers.filter(element => user.followers.some(id => id === element.id))
                        
                        let allTweets = followerUsers.reduce((accumulator, element)=>{
                            if(element.tweets){ 
                                element.tweets.forEach(({message, text, date}) => 
                                    {if (!message) message = text
                                        accumulator.push({username: element.username, message, date})
                                    }
                                ) 
                            }
                            return accumulator
                        }, [])
                        
                        if (user.tweets) user.tweets.forEach(({message, text, date}) => 
                            { if (!message) message = text
                                allTweets.push({username: user.username, message, date})
                            }
                        )
                
                        callback(undefined, allTweets)
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
  
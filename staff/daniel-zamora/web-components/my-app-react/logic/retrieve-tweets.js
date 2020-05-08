function retrieveTweets(token,callback) {
String.validate.notVoid(token)
Function.validate(callback)

    const _tweets=[]
    call('GET', 
    'https://skylabcoders.herokuapp.com/api/v2/users', 
    undefined,
    { "Content-type": "application/json", "Authorization": `Bearer: ${token}` },(error, status, body) => {
        if (error) return callback(error);
        if(status===200){
            const {tweets, following=[]} =JSON.parse(body);
            
            tweets && _tweets.push(tweets)
    
            let counter=0
            following && following.forEach(follower => {
                call('GET',
                `https://skylabcoders.herokuapp.com/api/v2/users/${follower}`,undefined,
                { "Content-type": "application/json","Authorization": `Bearer: ${token}` },(error, status, body) => {
                    if (error) return callback(error);
                    if(status===200){
                        counter++
                        const {tweets} =JSON.parse(body);
                        tweets && _tweets.push(tweets)
                        
                        if(counter === following.length) 
                        callback(undefined, tweets)
                    }else {
                     const { error } = JSON.parse(body)
                     debugger
                    callback(new Error(error))
                    }
                })      
            })
        }
    })
}


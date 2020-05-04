function allTweets(token, callback){

    call('GET', 'https://skylabcoders.herokuapp.com/api/v2/users/all', undefined, {'Authorization':`Bearer ${token}`}, (error, status, body) => {
        if(error) return callback(error)

        if(status === 200){
            let Alltweets = []
            let theBody = JSON.parse(body)

            for(var i in theBody){

                if(theBody[i].tweets){
                    for(var g in theBody[i].tweets){
                        Alltweets.push({
                            username: theBody[i].username,
                            tweet: theBody[i].tweets[g].text,
                            date: theBody[i].tweets[g].date,
                            id: theBody[i].id
                        })
                    }
                }
            }

            Alltweets.sort((a, b) => b.date-a.date)
            return callback(undefined, Alltweets)
        }else{
            const {error} = JSON.parse(body)
            return callback(error)
        }
        
    })

}
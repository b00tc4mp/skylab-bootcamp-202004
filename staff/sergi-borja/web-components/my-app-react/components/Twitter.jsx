function Twitter(getToken) {
    function handleSubmit(event) {
        event.preventDefault()

        let {tweet} = event.target
        tweet = tweet.value
        const token= getToken

        createTweet(token, tweet, (error)=>{
            if (error) throw error
        })
    }
    

    return <section className="twitter">
        <h1>Twitter</h1>
        <form onSubmit = {handleSubmit}>
            <input name= "tweet" placeholder="twitea un poco"/>
            <button>Submit</button>
        </form>
    </section>
    
}
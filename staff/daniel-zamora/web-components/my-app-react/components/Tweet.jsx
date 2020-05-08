function Tweet({ message }) {
    function handleTweet(event) {
        event.preventDefault()
        
        let { tweet } = event.target
        tweet = tweet.value
        onSubmit(tweet)
    }

    return <section className="tweet">
        <form onSubmit={handleTweet}>
            <input type="text" name="tweetea" defaultValue={tweet} />
            <button>🔍</button>
        </form>
    </section>
}
function Tweet({onSubmitTweet}) {

  function handleOnSubmitTweet (event) {
      event.preventDefault()
        const tweet = event.target.tweet.value

        onSubmitTweet(tweet)
    }

    return <> <section className="search">
        <form onSubmit={handleOnSubmitTweet}>
            <input type="text" name="tweet" />
            <button>Tweet</button>
        </form>
    </section>
    </>


}
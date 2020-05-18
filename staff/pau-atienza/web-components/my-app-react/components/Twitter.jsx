function Twitter ({token, handleTweet, tweet, user}){
  return <>
    <section className="twitter">
      <form onSubmit={(event) => {event.preventDefault(); handleTweet(event)}}>
        <input type="text" name="tweet" />
        <button>Tweet</button>
      </form>
    </section>
    {<Tweets token = {token} tweet = {tweet} user = {user}/>}
  </>
}
  
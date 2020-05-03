function Twitter ({token, handleTweet, tweet}){
  return <>
    <section className="tweet">
      <form onSubmit={(event) => {event.preventDefault(); handleTweet(event)}}>
        <input type="text" name="tweet" />
        <button>Tweet</button>
      </form>
    </section>
    {<Tweets token = {token} tweet = {tweet}/>}
  </>
}
  
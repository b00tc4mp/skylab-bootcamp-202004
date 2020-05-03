function Tweets({ followersTweets }) {
    const printTweets = () => {
        debugger
        return followersTweets.map(({ username, text, date }) => (
            <li>{`${username} tweeted: ${text} ${date.toString().slice(0,10) + ' ' + date.toString().slice(11,16)}`}</li>));
    };
  
    return (
        <>
        <h3>Feed</h3>
      <section className="tweets">
        <ul>{printTweets()}</ul>
      </section>
      </>
    );
  }
  
function Tweets({ followersTweets }) {
  const printTweets = () => {
    return followersTweets.map(({ username, text, date }) => (
      <li>{`${username} tweeted: ${text} ${new Date}`}</li>
    ));
  };

  return (
    <section className="tweets">
      <ul>{printTweets()}</ul>
    </section>
  );
}


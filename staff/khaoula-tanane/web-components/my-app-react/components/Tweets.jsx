function Tweets({ followersTweets }) {
  const printTweets = () => {
    return followersTweets.map(({ username, text, date }) => (
      <li>{`${username} tweeted: ${text} ${date
        .toString()
        .slice(4, 21)}`}</li>
    ));
  };

  return (
    <section className="tweets">
      <ul>{printTweets()}</ul>
    </section>
  );
}

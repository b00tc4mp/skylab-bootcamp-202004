function Tweets({email}){
    let tweets = retrieveTweets(email)

    return <section className="tweets">
        <ul>{tweets.map(tweet => <li>{`${tweet.text}, ${tweet.date}`}</li>)}</ul>
        </section>
}
function Tweets({email}) {
    let tweets = retrieveTweets(email)
    let list = tweets.map(({message, date}) => <li><h4>{message}</h4><h6>({date.toString()})</h6></li>)

    return <ul>{list}</ul>
}
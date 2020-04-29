function Tweets({email, view}) {
    let tweets = retrieveTweets(email)

    if (view == 'my tweets') tweets = tweets.filter(({userFollowed}) => userFollowed === 'Me')

    let list = tweets.map(({message, date, userFollowed}) => <li><h4>{message} by <i>{userFollowed}</i></h4><h6>({date.toString()})</h6></li>)

    return <ul>{list}</ul>
}
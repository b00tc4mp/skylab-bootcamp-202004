function Tweets({email, view}) {
    let tweets = retrieveTweets(email)

    if (view == 'my tweets') tweets = tweets.filter(({userFollowed}) => userFollowed === 'Me')

    let list = tweets.map(({message, date, userFollowed}) => <li><h4>{message} by <a href='' onClick={event => event.preventDefault()}><i>{userFollowed}</i></a></h4><h6>({date.toString()})</h6></li>)

    return <ul>{list}</ul>
}
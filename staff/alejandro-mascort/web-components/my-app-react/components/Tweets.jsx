function Tweets({tweets, view}) {
    if (view == 'my tweets') tweets = tweets.filter(({username}) => username === 'Me')

    let list = tweets.map(({text, date, username}) => <li ><h4>{text} by <a href='' onClick={event => event.preventDefault()}><i>{username}</i></a></h4><h6>{date}</h6></li>)

    return <ul>{list}</ul>
}

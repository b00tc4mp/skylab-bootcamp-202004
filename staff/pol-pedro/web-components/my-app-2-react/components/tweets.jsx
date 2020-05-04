function Tweets ({results, onFollow, ifFollowed}){
    return <ul>
        {results.map(({username, tweet, date, id}) => <li><span className="username">{username}</span> <br/> <span  className="tweet">{tweet}</span> <br/> {!ifFollowed(id) && <span className="following" onClick={() => onFollow(id)}>+ Follow</span>} {ifFollowed(id) && <span className="following--alert">Following</span>} <span className="date">{date}</span></li>)}
        </ul>
}
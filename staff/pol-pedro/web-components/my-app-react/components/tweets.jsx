function Tweets ({results, onFollow, ifFollowed, user, view, onUnFollow}){
    function userFollow (id) {
        for(var i in user.following){
            if(user.following[i] === id){
                return true
            }
        }
        return false
    }
    return <ul>
        {!view && results.map(({username, tweet, date, id}) => <li><span className="username">{username}</span> <br/> <span  className="tweet">{tweet}</span> <br/> {!ifFollowed(id) && <span className="following" onClick={() => onFollow(id)}>+ Follow</span>} {ifFollowed(id) && <span className="following--alert" onClick={() => onUnFollow(id)}>Following</span>} <span className="date">{date}</span></li>)}
        {view === 'following' && results.map(({username, tweet, date, id}) => userFollow(id) && <li><span className="username">{username}</span> <br/> <span  className="tweet">{tweet}</span> <br/> {!ifFollowed(id) && <span className="following" onClick={() => onFollow(id)}>+ Follow</span>} {ifFollowed(id) && <span className="following--alert">Following</span>} <span className="date">{date}</span></li>)}
        </ul>
}


// function Tweets ({results, onFollow, ifFollowed}){
//     return <ul>
//         {results.map(({username, tweet, date, id}) => <li><span className="username">{username}</span> <br/> <span  className="tweet">{tweet}</span> <br/> {!ifFollowed(id) && <span className="following" onClick={() => onFollow(id)}>+ Follow</span>} {ifFollowed(id) && <span className="following--alert">Following</span>} <span className="date">{date}</span></li>)}
//         </ul>
// }
function ResultsUser ({results, onFollow, ifFollowed, onUnFollow}){
    return <ul>
        {results.map(({name, surname, username, id}) => <li>{name} <br/> {surname} <br/> {username} <br/> {!ifFollowed(id) && <span className="following" onClick={() => onFollow(id)}>+ Follow</span>} {ifFollowed(id) && <span className="following--alert" onClick={() => onUnFollow(id)}>Following</span>}</li>)}
        </ul>
}
function ResultsUser ({results}){
    return <ul>
        {results.map(({name, surname, username}) => <li>{name} <br/> {surname} <br/> {username}</li>)}
        </ul>
}
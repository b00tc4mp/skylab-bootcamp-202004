function Results({user}) {

    return <section className="results">
        {    user.length ?
        <ul>{user.map(({ name, surname, username }) => <li>{`${name} ${surname} (${username})`}</li>)}</ul>
        : <Feedback message="sorry, no results :(" level="warning" />}
        </section>

}
function Results({user}) {

    return <section className="results">
        {    user.length ?
        <ul>{user.map(({ name, surname, email }) => <li>{`${name} ${surname} (${email})`}</li>)}</ul>
        : <Feedback message="sorry, no results :(" level="warning" />}
        </section>

}
function Results({ users }) {
    return <section className="results">
    {   users.length ?
        <ul>{users.map(({ name, surname, email }) => <li>{`${name} ${surname} (${email})`}</li>)}</ul>
        : <Feedback message="sorry, there are no results, try again" level="warning" />
    }
    </section>
}
function UsersResults({ foundUsers }) {
    return <section className="results">

        {
            foundUsers.length ?
                <ul>{foundUsers.map(({ name, surname, email }) => <li>{`${name} ${surname} (${email})`}</li>)}</ul>
                : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
}
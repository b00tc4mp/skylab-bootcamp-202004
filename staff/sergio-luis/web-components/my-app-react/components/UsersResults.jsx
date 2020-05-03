function UsersResults({ users }) {
    return   <section className="results">
        {
        users.length ?
            <ul>{users.map(({ name, surname, email }) => <li>{`${name} ${surname} (${email})`}</li>)}</ul>
            : <Feedback message="sorry, no results :(" level="warning" />
        }
   </section>
}
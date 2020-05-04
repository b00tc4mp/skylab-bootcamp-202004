function Results({ users }) {
    return <section className="results">
        {
            users.length ?
                <ul>{users.map(({ name, surname, email,id}) => <li>{`${name} ${surname} (${email})`}
                <button>{ includes(id).users.following ? "Unfollow" : "Follow"}</button></li>)}</ul>
                : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
}
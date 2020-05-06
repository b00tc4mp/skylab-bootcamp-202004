function Results({ users, goToFollow }) {

  const handleGotoToogle = id => {
        toggleFollowUser(token, id, callback)

        goToFollow(token)
    }

    return <section className="results">
        {
            users.length ?
                <ul>{users.map(({ name, surname, email, id}) => <li>{`${name} ${surname} (${email})`}
                <button onClick={handleGotoToogle(id)}></button></li>)}</ul>
                : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
}
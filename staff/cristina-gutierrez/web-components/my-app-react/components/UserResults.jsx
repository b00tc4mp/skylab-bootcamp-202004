function Results({ users, token }) {
    function handleToggleFollow(followingId) {
        try {
            toggleFollowUser(token, followingId, error => {

            })
        } catch (error) {
            if (error) throw error
        }
    }

    return <section className="results">
        {
            users.length ?
                <ul>{users.map(({ id, name, surname, email, following, self }) =>
                    <li key={id}>{`${name} ${surname} (${email})`} {
                        //Si self===false
                        !self && <button onClick={() =>
                        handleToggleFollow(id)}>{following ? "Unfollow" : "Follow"}</button>
                    }</li>)}
                </ul>
                : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
}
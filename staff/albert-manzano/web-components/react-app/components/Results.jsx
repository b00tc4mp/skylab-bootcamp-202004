function UserResults({ users, token, onToggleFollow }) {
    function handleToggleFollow(followingId) {
        try {
            toggleFollowUser(token, followingId, error => {
                if (error.message === 'invalid token')
                onUserSessionExpired()
                 else throw error
            })
        } catch (error) {
            if (error) throw error
        }
    }

    return <section className="results">
        {
            users.length ?
                <ul>{users.map(({ id, name, surname, email, following }) =>
                    <li>{`${name} ${surname} (${email})`} {
                        typeof following !== 'undefined' ?
                            <button onClick={() => handleToggleFollow(id)}>
                                {following ? 'Unfollow' : 'Follow'}
                            </button>
                            :
                            undefined
                    }
                    </li>
                )}</ul>
                : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
}
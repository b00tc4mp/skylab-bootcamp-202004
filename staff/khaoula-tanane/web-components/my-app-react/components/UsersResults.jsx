function UsersResults({ foundUsers, handleFollow }) {
    return <section className="results">
        {
            foundUsers.length ?
                <ul>{foundUsers.map(({ id, name, surname, email, following }) =>
                    <li>{`${name} ${surname} (${email})`} {
                        typeof following !== 'undefined' ?
                            <button onClick={() => handleFollow(id)}>
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
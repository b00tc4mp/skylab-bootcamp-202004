function UsersResults({ foundUsers, user, handleFollow }) {
    return <section className="results">
        {
            foundUsers.length ?
                <ul>{foundUsers.map(({ name, surname, email }) => 
                <li>{`${name} ${surname} (${email})`} <button onClick={(event) => {
                    event.preventDefault()
                    handleFollow(email)
                }}>{user.followers.includes(email)? 'Unfollow' : 'Follow'}</button> </li>)}</ul>
                : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
}
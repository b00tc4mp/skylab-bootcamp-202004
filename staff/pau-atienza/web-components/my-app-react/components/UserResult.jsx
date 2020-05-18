function UserResult({ foundUsers, user, handleFollow }){

    return <section className="results--user">
        {user && foundUsers && <ul>{foundUsers.map(({ name, surname, email, id }) => 
            <li>{`${name} ${surname} (${email})`} 
                {user.email === email ||
                <button onClick={(event) => {handleFollow(id)}}>
                    {user.following && user.following.includes(id)? 'Unfollow' : 'Follow'}
                </button>} 
            </li>)}</ul>}
        {foundUsers === [] && <Feedback message="sorry, no results :(" level="warning" />}
    </section>
}
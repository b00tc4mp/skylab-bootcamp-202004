function UserResult({ foundUsers, user, handleFollow }){

    let printUsers = () => {
        return foundUsers.map(({ name, surname, email, id }) => 
            <li>{`${name} ${surname} (${email})`} 
                {user.email === email ||
                <button onClick={(event) => {handleFollow(id)}}>
                    {user.following && user.following.includes(id)? 'Unfollow' : 'Follow'}
                </button>} 
            </li>
        )
    }
    

    return <section className="results--user">
        {user && foundUsers && <ul>{printUsers()}</ul>}
        {foundUsers === [] && <Feedback message="sorry, no results :(" level="warning" />}
    </section>
}
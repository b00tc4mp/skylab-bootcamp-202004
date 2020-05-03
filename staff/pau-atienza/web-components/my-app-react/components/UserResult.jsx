function UserResult({ foundUsers, user, handleFollow }){
    
    return <section className="results">
        {foundUsers &&
            <ul>{foundUsers.map(({ name, surname, email }) => 
            <li>{`${name} ${surname} (${email})`} <button onClick={(event) => {event.preventDefault(); 
                handleFollow(email)}}>{ user.followers && user.followers.includes(email)? 'Unfollow' : 'Follow'}</button> </li>)}</ul>
        }
        {foundUsers === [] && <Feedback message="sorry, no results :(" level="warning" />}
    </section>
}
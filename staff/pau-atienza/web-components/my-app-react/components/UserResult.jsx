function UserResult({ foundUsers, user, handleFollow }){
    
    return <section className="results--user">
        {foundUsers &&
            <ul>{foundUsers.map(({ name, surname, email, id }) => 
            <li>{`${name} ${surname} (${email})`} <button onClick={(event) => {event.preventDefault(); 
                handleFollow(id)}}>{user.followers && user.followers.includes(id)? 'Unfollow' : 'Follow'}</button> </li>)}</ul>
        }
        {foundUsers === [] && <Feedback message="sorry, no results :(" level="warning" />}
    </section>
}
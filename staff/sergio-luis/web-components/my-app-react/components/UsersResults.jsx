function UsersResults({ users, token, onToggleFollow }) {
    function handleToggleFollow(followingId){
        try{
            toggleFollowUser(token,followingId,error=>{
                if(error){
                    onToggleFollow()
                }    
            })
        }catch(error){
            if(error) throw error;
        }
    }

    return   <section className="results">
        {
        users.length ?
            <ul>{users.map(({ id, name, surname, email, following }) => 
            <li key={id}>{`${name} ${surname} (${email})`}
            {
                typeof following !== 'undefined'?
                <button onClick={()=>handleToggleFollow(id)}>{
                    following? 'Unfollow':'Follow'
                }</button>
                :
                undefined
            }
            </li>
            )}</ul>
            : <Feedback message="sorry, no results :(" level="warning" />
        }
   </section>
}
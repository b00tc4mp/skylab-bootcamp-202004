function Results({ users, onFollow, onUserSessionExpired, token }) {

const handleFollow = (followingId) =>{
    try {
        toggleFollowUser(token, followingId, error => {
            if(error){
                if(error.message === 'invalid token')
                    onUserSessionExpired()
                else throw error
            } else onFollow()
        })
    } catch(error){
        if(error) throw error
    }
}
    return <section className="results">
        {
            users.length ? (<>
                <ul>{users.map(({ name, surname, email, id, following }) => (
                    <li>
                        {`${name} ${id} ${surname} (${email})`}<button onClick={event => {
                        event.preventDefault();
                        handleFollow(id);
                        
                    }}>{}</button></li>

                    
                ))}</ul>
            </>) : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
}



/*  function handleFollow(event){
 console.log(event.id.value);
 console.log(event.target.id.value);

}
*/
//<buttom onClick={handlenoseke(id)}></buttom>
//<buttom onClick= {()=>{handlenoske(id)}}></buttom>
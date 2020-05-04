function UserResults({ users }) {
    function handleTogglefollow(followingId){
        try {
            toggleFollowUser(token, followingId, error => {

            })
        } catch (error) {
            if (error) {
                throw error;
            }
            
        }
    }

    return <section className="results">
        {
            users.length ?
                <ul>{users.map(({ name, surname, email }) => 
                    <li>{`${name} ${surname} (${email})`}</li>)}
                </ul>
                : <Feedback message="sorry, no results :(" level="warning" />
        }
    </section>
}
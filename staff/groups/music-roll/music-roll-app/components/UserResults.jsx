function UserResults({results, token, onUserSessionExpired, onToggleFollow}) {
    // sessionStorage._token = '123'
    function handleToggleFollow(followingId) {
        try {
            toggleFollowUser(token, followingId, error => {
                if (error) {
                    if (error.message === 'invalid token')
                        onUserSessionExpired()
                    else throw error
                } else onToggleFollow()
            })
        } catch (error) {
            if (error) throw error
        }
    }
    
    return <section>
        {
        results.length ? <ul>
            {results.map(({ id, name, surname, email, following }) => {
                return <li key={id}>{`${name} ${surname} (${email})`} 
                {
                    typeof following !== 'undefined' ?
                        <button onClick={() => handleToggleFollow(id)}>
                            {following ? 'Unfollow' : 'Follow'}
                        </button>
                        :
                        undefined
                }
                </li>
            })}
        </ul> : console.error("no results sorry") }
    </section>
}
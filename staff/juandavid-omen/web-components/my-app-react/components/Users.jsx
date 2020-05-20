function Users({ onSearch, users, query, token, onUserSessionExpired }) {
    const handleSearch = (query) => {
        try {
            searchUsers(token, query, (error, users) => {
                if (error) {
                    if (error.message === 'invalid token') {
                        onUserSessionExpired()
                    } else {
                        throw error
                    }
                } else {
                    onSearch(users, query);
                }
            })
        } catch (error){
            throw error
        }
    }
    
    const handleToggleFollow = () => handleSearch(query)

    return <section className="users">
        <h2>Users</h2>

        <Search onSubmit={handleSearch} query={query} />
        {users && <UserResults users={users} token={token} onToggleFollow={handleToggleFollow} onUserSessionExpired={onUserSessionExpired}/>}
    </section>
}
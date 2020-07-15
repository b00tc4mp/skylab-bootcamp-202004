function Users({ onSearch, users, query, token , onUserSessionExpired}) {
    function handleSearch(query) {
        searchUsers(token, query, (error, users) => {
            if (error) throw error // TODO handle this error with a feedback

            onSearch(users, query)
        })
    }

    function handleFollow() {
        handleSearch(query)
    }
    let followButton=0;
    function handleButton () {
        followButton++
    }


    return <section className="users">
        <h2>Users</h2>

        <Search onSubmit={handleSearch} query={query} />
        {users && <Results users={users} onFollow={handleFollow}  onUserSessionExpired={onUserSessionExpired} token={token}/>}
    </section>
}

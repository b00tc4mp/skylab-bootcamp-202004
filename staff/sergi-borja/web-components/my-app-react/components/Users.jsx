function Users({ onSearch, users, query, token }) {
    function handleSearch(query) {
        searchUsers(token, query, (error, users) => {
            if (error) throw error // TODO handle this error with a feedback

            onSearch(users, query)
        })
    }

    function handleFollow (id) {
        toggleFollowUser(id, token, (error)=>{
            if (error) throw error
        })
    }
    let followButton=0;
    function handleButton () {
        followButton++
    }


    return <section className="users">
        <h2>Users</h2>

        <Search onSubmit={handleSearch} query={query} />
        {users && <Results users={users} handleFollow={handleFollow} handleButton={handleButton}/>}
    </section>
}

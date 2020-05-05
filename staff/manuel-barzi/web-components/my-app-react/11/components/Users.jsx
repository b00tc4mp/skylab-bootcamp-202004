function Users({ onSearch, users, query, token }) {
    function handleSearch(query) {
        searchUsers(token, query, (error, users) => {
            if (error) throw error // TODO handle this error with a feedback

            onSearch(users, query)
        })

    }

    function handleToggleFollow() {
        handleSearch(query)
    }

    return <section className="users">
        <h2>Users</h2>

        <Search onSubmit={handleSearch} query={query} />
        {users && <UserResults users={users} token={token} onToggleFollow={handleToggleFollow} />}
    </section>
}
function Users({ onSearch, users, query, token }) {
    function handleSearch(query) {
        searchUsers(token, query, (error, users) => {
            if (error) throw error

            onSearch(users, query)
        })
    }

    return <section className="users">
        <h2>Users</h2>

        <Search onSubmit={handleSearch} query={query} />
        {users && <Results users={users} />}
    </section>
}
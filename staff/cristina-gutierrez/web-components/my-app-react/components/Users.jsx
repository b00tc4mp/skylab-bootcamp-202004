function Users({ onSearch, users, query }) {
    function handleSearch(query) {
        const users = searchUsers(query)

        onSearch(users, query)
    }

    return <section className="users">
        <h2>Users</h2>

        <Search onSubmit={handleSearch} query={query} />
        {users && <Results users={users} />}
    </section>
}
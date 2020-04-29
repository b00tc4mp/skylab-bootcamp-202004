function Users({ onSearch, users, query }) {
    return <section className="users">
        <h2>Users</h2>

        <Search onSubmit={onSearch} query={query} />
        {users && <Results users={users} />}
    </section>
}
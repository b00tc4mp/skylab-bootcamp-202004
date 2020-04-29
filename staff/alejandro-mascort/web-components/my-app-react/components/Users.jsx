function Users({usersResults, handleSearchUsers, query}) {
    return <section className='users'>
        <h2>Users</h2>
        <Search onSubmit={handleSearchUsers} query={query}/>
        {usersResults && <Results results={usersResults} />}
    </section>
}
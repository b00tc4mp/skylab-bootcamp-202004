function Users({usersResults, following, handleSearchUsers, toggleUser,query}) {
    return <section className='users'>
        <h2>Users</h2>
        <Search onSubmit={handleSearchUsers} query={query}/>
        {usersResults && <UserResults results={usersResults} following={following} toggleUser={toggleUser}/>}
    </section>
}
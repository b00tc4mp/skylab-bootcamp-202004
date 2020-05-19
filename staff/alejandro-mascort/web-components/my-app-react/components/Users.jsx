function Users({usersResults, handleSearchUsers, query, handleToggle, errorUsers}) {

    return <section className='users'>
        <h2>Users</h2>
        <Search onSubmit={handleSearchUsers} query={query}/>
        {errorUsers && <Feedback message={errorUsers} level='error'/>}
        {usersResults && <UserResults results={usersResults} handleToggle={handleToggle}/>}
    </section>
}
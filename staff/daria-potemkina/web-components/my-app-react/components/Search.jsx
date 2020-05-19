function Search({onSubmit, results, error, following, toggleFollowUser}) {
    function handleSubmit(event) {
        event.preventDefault()

        let { query } = event.target

        query = query.value

        onSubmit(query)
    }

    return <section className="users">
        <h2>Users</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="query"/>
            <button type="submit">🔍</button>
        </form>
        {results && <Results results={results} error={error} following={following} toggleFollowUser={toggleFollowUser}/>}
        {error && <Feedback message = {error} level = {'warning'} />}
    </section>
}


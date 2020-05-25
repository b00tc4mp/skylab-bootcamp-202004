function Google({ onSubmit, results, error }) {
    function handleSubmit(event) {
        event.preventDefault()

        let { query } = event.target

        query = query.value

        onSubmit(query)
    }
    return <section className="google">
        <h2>Google</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="query"/>
            <button type="submit">🧐</button>
        </form>
        {results && <SearchResults results={results}/>}
        {error && <Feedback message = {error} level = {'warning'} />}
    </section>
}
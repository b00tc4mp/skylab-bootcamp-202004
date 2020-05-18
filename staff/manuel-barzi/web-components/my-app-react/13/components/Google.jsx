const { useEffect } = React

function Google({ onSearch, query, results }) {
    useEffect(() => {
        const query = address.hash.query()

        query && query.q && handleSearch(query.q)
    }, [])

    function handleSearch(query) {
        google(query, (error, results) => {
            if (error) throw error // TODO do something with error (feedback panel?) 

            onSearch(results, query)
        })
    }

    return <section className="google">
        <h2>Google</h2>

        <Search onSubmit={handleSearch} query={query} />
        {results && <GoogleResults results={results} />}
    </section >
}
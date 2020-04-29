function Google({ onSearch, query, results }) {
    return <section className="google">
        <h2>Google</h2>

        <Search onSubmit={onSearch} query={query} />
        {results && <GoogleResults results={results} />}
    </section >
}
function Ecosia ({ onSearch, query, results }) {
  const handleSearch = (query) => {
    ecosia(query, (error, results) => {
      if (error) {
        throw error
      }
      onSearch(results, query);

    })
  }

  return <section className='ecosia'>
      <h2>Ecosia</h2>

      <Search onSubmit={handleSearch} query={query} />
      {results && <EcosiaResults results={results} />}
    </section>
}
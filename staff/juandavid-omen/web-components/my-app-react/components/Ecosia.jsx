function Ecosia ({ onSearch, query, results }) {
  function handleSearch (query) {
    ecosia(query, (error, results) => {
      if (error) {
        throw error // TODO do something with error (feedback panel?)
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
function SearchSpotCompo({onSubmitSpot}) {

    const handleSpot = (event) => {
        event.preventDefault()

        let { query } = event.target

        query = query.value

        onSubmitSpot(query)
    }

return <section className='Searcher'>
<form onSubmit={handleSpot}>
    <input className='input' type="text" name='query'  />
    <button className='search-button'>🔍</button>
</form>
</section>

}
function Ecosia({ onSubmit, resultsEco, error }) {
    function handleSubmit(event) {
        event.preventDefault()

        let { query } = event.target

        query = query.value

        onSubmit(query)
    }

    return <section className='ecosia'>
        <h2>Ecosia</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="query" />
            <button type="submit"> 🌳</button>
        </form>
        {resultsEco && <SearchResults results={resultsEco}/>}
        {error && <Feedback message={error} level={'warning'}/>}
    </section>
}
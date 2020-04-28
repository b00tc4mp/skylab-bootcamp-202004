function SearchGoogle({onSubmit}) {
    function handleSubmit(event) {
        event.preventDefault()

        let {query} = event.target
        query = query.value
        
        onSubmit(query)
    }

    return <section className='searchGoogle'>
        <form onSubmit={handleSubmit}>
            <input type="text" name="query"/>
            <button>Google</button>
        </form>
    </section>
}
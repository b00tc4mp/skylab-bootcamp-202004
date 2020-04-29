function CreateTweet({onSubmit}) {
    function handleSubmit(event) {
        event.preventDefault()
        
        let { query } = event.target
        
        query = query.value
        
        onSubmit(query)

        event.target.query.value = ''
    }
    
    return <section className="search"> 
        <form onSubmit={handleSubmit}>
            <input type="text" name="query" />
            <button>Tweet!</button>
        </form>
    </section>
}
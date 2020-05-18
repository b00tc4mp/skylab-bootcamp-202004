function Search({ onSubmit }) {

    function handleSubmitUsers(event) {
        event.preventDefault()

        let { query } = event.target

        query = query.value
      
            onSubmit(query)    
    }
    return <section className="search">
        <form onSubmit={handleSubmitUsers} >
            <input type="text" name="query" placeholder="search"></input>
            <button>🔍</button><br></br>
        </form>
    </section>
}
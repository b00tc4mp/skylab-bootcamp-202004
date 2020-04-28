function Search({ onSearch }) {

    function handleSubmitUsers(event) {
        event.preventDefault()

        let { query } = event.target

        query = query.value
      
            onSearch(query)    
    }



    return <section className="search">
        <form onSubmit={handleSubmitUsers} >
            <label>Users search<input type="text" name="query"></input></label>
            <button>🔍</button><br></br>
        </form>
    </section>
}
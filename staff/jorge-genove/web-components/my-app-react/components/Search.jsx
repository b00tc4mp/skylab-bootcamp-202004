function Search({ onSubmit }) {

    function handleSubmitUsers(event) {
        event.preventDefault()
        let { query } = event.target
        query = query.value
        onSubmit(query)    
    }

    return <section className="search">
        <form onSubmit={handleSubmitUsers} >
            <label>search<input type="text" name="query"></input></label>
            <button>🔍</button><br></br>
        </form>
    </section>
}
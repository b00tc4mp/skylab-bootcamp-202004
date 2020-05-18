function GoogleSearch({handleSearchGoogle, googleResults}){

    return <section className="search--google">
        <form onSubmit = {(event) =>{event.preventDefault(); handleSearchGoogle(event.target.query.value)}}>
            <input type="text" name="query"/>
            <button>Search Google</button>
        </form>
        <EngineResults results={googleResults}/>
    </section>
}
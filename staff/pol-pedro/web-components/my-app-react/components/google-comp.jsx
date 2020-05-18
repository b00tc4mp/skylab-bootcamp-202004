function GoogleComp ({ onGoogle, results, query, loadSpinner, spiner }) { //hacer un calss para poder usar el spiner cambiando el state
    function handelSubmit(event){ //handel errors
        event.preventDefault()
        loadSpinner()
        let searchValue = event.target.search.value
        google(searchValue, results => {
            loadSpinner()
            onGoogle(results, searchValue)
        })
    }
    
    return <section class="home">
    <section class="home__search">
        <form onSubmit = {handelSubmit} >
            <input type="text" name="search" placeholder={`search in google`}/>
            <button class="search">search</button>
            {/* <h2 button="change">${onNav}</h2> */}
        </form>
        {spiner && <i className={spiner}></i>}
    <ul>
        {results && <GoogleResults results = {results}/>}
    </ul>
    </section>
    </section>
}
function SearchSpotCompo({onSubmitSpot}) {

    const handleSpot = (event) => {
        event.preventDefault()

        let { query } = event.target

        query = query.value

        onSubmitSpot(query)
    }

return <section className='Searcher'>
<form onSubmit={handleSpot}>
    <div className="Searcher__input-container">
    <button className="Searcher__input-container__button"><img  className='Searcher__input-container__image' src="./images/icon.png"/></button>
    <input className='Searcher__input-container__type' placeholder='Search Spots..' type="text" name='query'/>
    </div>
</form>
</section>

}
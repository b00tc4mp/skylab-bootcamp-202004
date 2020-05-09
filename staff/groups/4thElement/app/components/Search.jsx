const { useState } = React

function Search({ movingSurfForecast }) {

    const [query, setQuery] = useState('')

    

    const handleSubmitSpot = (query) =>{
        setQuery(query)
    }

    const onGoToSurfForecast = (surfForecastSelected) =>{
        movingSurfForecast(surfForecastSelected)
    }

    return <section className="Search">
        <SearchSpotCompo onSubmitSpot={handleSubmitSpot} />
        {query && <SpotResultsList  query={query} onGoToSurfForecast={onGoToSurfForecast}/>}

    </section>
}
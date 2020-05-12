const { useState } = React

function Search({ movingSurfForecast, sportState }) {

    const [query, setQuery] = useState('')

    

    const handleSubmitSpot = (query) =>{
        setQuery(query)
    }

    const onGoToSurfForecast = (surfForecastSelected) =>{
        movingSurfForecast(surfForecastSelected)
    }

    return <section className="Search">
        <SearchSpotCompo onSubmitSpot={handleSubmitSpot} />
        {query && <SpotResultsList  query={query} onGoToSurfForecast={onGoToSurfForecast} sportState={sportState}/>}

    </section>
}
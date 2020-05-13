const { useState } = React

function Search({ movingSurfForecast, sportState, token }) {

    const [query, setQuery] = useState('')
    const [selectorState, setselectorState] = useState('spots')

    

    const handleSubmitSpot = (query) =>{
        setQuery(query)
    }

    const onGoToSurfForecast = (surfForecastSelected) =>{
        movingSurfForecast(surfForecastSelected)
    }

    const handelChangeSelector = (val) => {
        setselectorState(val)
    }

    return <section className="Search">
        <SearchSpotCompo onSubmitSpot={handleSubmitSpot} searchSelector={handelChangeSelector} selectorState={selectorState}/>
        {query && <SpotResultsList  query={query} onGoToSurfForecast={onGoToSurfForecast} sportState={sportState} selectorState={selectorState} token={token}/>}

    </section>
}
const { useState, useEffect } = React

function SpotResultsList({ query, onGoToSurfForecast }) {

    const handleSurfForecast = (surfForecastSelected) =>{
        onGoToSurfForecast(surfForecastSelected)
    }
    
    const [spots, setSpots] = useState();

    useEffect(() => {
        searchSpotList(query, (spotsFound) => {
            setSpots(spotsFound)
        })
    }, [query]);

    return <section className="spot-result-list">
        {
            spots ? (<>
            
                <ul className='ul-spot-results'>{spots.map(( item ) =>
                    <li className='li-spot-results' onClick={() => handleSurfForecast(item)}>{`${item.name}`} </li>
                    
                )}</ul>

            </>)
                : (
                    <Feedback message="sorry, no results :(" />
                )
        }
    </section>
}
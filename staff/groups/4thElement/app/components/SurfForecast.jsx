const { useState, useEffect } = React

function SurfForecast(forecastSelected){

    const [forecast, setForecast] = useState()

    
    surfForecastLogic(forecastSelected, function(error, waveSize){
        setForecast(waveSize)
    })
   

    // useEffect(() => {
    //     searchSpotList(query, (spotsFound) => {
    //         setSpots(spotsFound)
    //     })
    // }, [query]);

    return <section className="spot-result-list">

        <h1>{`${forecast}`}</h1>

        {/* {
            spots ? (<>
            
                <ul>{spots.map(( item ) =>
                    <li onClick={() => handleSurfForecast(item.coordinates)}>{`${item.name}`} </li>
                    
                )}</ul>

            </>)
                : (
                    <Feedback message="sorry, no results :(" />
                )
        } */}
    </section>
}
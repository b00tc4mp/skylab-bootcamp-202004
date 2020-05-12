const { useState, useEffect } = React

function SpotResultsList({ query, onGoToSurfForecast, sportState }) {

    const [spots, setSpots] = useState();

    useEffect(() => {
        if(sportState === 'surf'){
            searchSpotList(query, (spotsFound) => {
                setSpots(spotsFound)
            })
        }else{
            searchSpotListSnow(query, (spotsFound) => {
                setSpots(spotsFound)
            })
        }

    }, [query]);

    return <section className="spot-result-list">
        {
            spots ? (<>
            
                <ul className='ul-spot-results'>{spots.map(( item ) =>
                    <li className='li-spot-results' onClick={() => onGoToSurfForecast(item)}>{`${item.name}`} </li>
                    
                )}</ul>

            </>)
                : (
                    <Feedback message="sorry, no results :(" />
                )
        }
    </section>
}
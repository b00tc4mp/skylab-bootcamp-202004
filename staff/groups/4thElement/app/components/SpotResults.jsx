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

    return <section className="Spot-Searched">
        {
            spots ? (<>
                <h2 className='Spot-Searched__title'>Spots</h2>
                <ul className='Spot-Searched__list'>{spots.map(( item ) =>
                    <li className='Spot-Searched__item' onClick={() => handleSurfForecast(item)}>{`${item.name}`} </li>
                )}</ul>

            </>)
                : (
                    <Feedback message="sorry, no results :(" />
                )
        }
    </section>
}
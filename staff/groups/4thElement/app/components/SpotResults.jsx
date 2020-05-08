const { useState, useEffect } = React

function SpotResultsList({ query }) {
    const [spots, setSpots] = useState();

    useEffect(() => {
        searchSpotList(query, (spotsFound) => {
            setSpots(spotsFound)
        })
    }, []);

    return <section className="spot-result-list">
        {
            spots ? (<>
            
                <ul>{spots.map(( item ) =>
                    <li>{`${item.name}`} </li>
                )}</ul>

            </>)
                : (
                    <Feedback message="sorry, no results :(" />
                )
        }
    </section>
}
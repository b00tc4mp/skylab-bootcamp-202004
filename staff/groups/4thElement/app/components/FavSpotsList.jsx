
const { useState, useEffect } = React

function FavSpotsList({ token, results, onGoToSurfForecast, sportState }) {

    const [_results,  setResults] = useState(results)

    const handleSurfForecast = (surfForecastSelected) => {
        onGoToSurfForecast(surfForecastSelected)
    }

    const handleXButton = (surfForecastSelected) => {
        addToFavs(token, surfForecastSelected, undefined, (error, resultsUpdated) => {
            if (error) console.log('handlexbutton ERROR')
            setResults(resultsUpdated)
        })
    }
    
    if(_results) {
    return  <ul className="Favorites__List">
        <h2 className='Favorites__List--title'>Favorite Spots</h2>
        {_results.map((element) => <li className='Favorites__List--elements'><h4 onClick={() => handleSurfForecast(element)}>{element.name}</h4>
            <button className='Favorites__List--xButton'><img onClick={() => handleXButton(element)} className='Favorites__List--xImage' src="./images/x.png" /></button> </li>)}
    </ul>
    } else {
        return <>            
        {<FavSpots token={token} onGoToSurfForecast={onGoToSurfForecast} sportState={sportState}/>}
        </>

    }

    

}
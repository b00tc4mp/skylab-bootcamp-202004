
const { useState, useEffect } = React

function FavSpotsList({results, onGoToSurfForecast}) {

    const handleSurfForecast = (surfForecastSelected) =>{
        onGoToSurfForecast(surfForecastSelected)
    }

    return <ul className="Favorites__List">
        <h2 className='Favorites__List--title'>Favorite Spots</h2>
        {results.map((element) => <li onClick={()=> handleSurfForecast(element)} className='Favorites__List--elements'>{element.name}</li>)}
    </ul>

}
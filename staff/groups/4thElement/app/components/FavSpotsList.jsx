
const { useState, useEffect } = React

function FavSpotsList({results, onGoToSurfForecast}) {

    const handleSurfForecast = (surfForecastSelected) =>{
        onGoToSurfForecast(surfForecastSelected)
    }

    return <ul className="Favorites__List">
        {results.map((element) => <li onClick={()=> handleSurfForecast(element)} className='Favourites__List--elements'>{element.name}</li>)}
    </ul>

}

// {
//     favSpots ? (<>

//         <ul>
//             {favSpots.map((element) => {
//                 return <li >{`${element}`}</li>
//             })}
//         </ul>
//     </>)
//         : (
//             <Feedback message="sorry, no results :(" />
//         )
// }
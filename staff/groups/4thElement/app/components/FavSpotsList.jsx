
const { useState, useEffect } = React

function FavSpotsList({results}) {
    return <ul className="Favorites__List">
        {results.map((element) => <li>{element.name}</li>)}
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
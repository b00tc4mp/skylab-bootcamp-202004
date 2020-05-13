//cambiar el nombre ya que tambien se muestran los resultados de users y no solo de spots

const { useState, useEffect } = React

function SpotResultsList({ query, onGoToSurfForecast, sportState, selectorState , token}) {

    const [spots, setSpots] = useState();
    const [users, setUsers] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if(selectorState === 'spots'){

            if(sportState === 'surf'){
                searchSpotList(query, (spotsFound) => { //sacaar el list para que la funcion se llame como el archivo
                    setSpots(spotsFound)
                })
            }else{
                searchSpotListSnow(query, (spotsFound) => {
                    setSpots(spotsFound)
                })
            }
        }else{
            try{
                searchUsers(token, query, (error, found) => {
                    if(error){
                        setError(error)
                    }else{
                        setUsers(found)
                        setError(undefined)
                    }
                })
                }catch({message}){
                    setError(message)
                }
        }

    }, [query]);
    //cambiar calss names

    return <ul className="SpotSearched">
        {spots && spots.length > 0 && spots.map((element) =>{
            return <li className='SpotSearched__item' onClick={() => onGoToSurfForecast(element)}>{`${element.name}`} </li>
        })}
        {users && users.map((element) =>{
            return <li className='SpotSearched__item'>{element.name} {element.surname} <br/> email: {element.username}</li>
        })}
        {!spots || spots.length < 1 && <Feedback message={'No results found'} level={'error'}/>}
        {error && <Feedback message={error} level={'error'}/>}
    </ul>
}

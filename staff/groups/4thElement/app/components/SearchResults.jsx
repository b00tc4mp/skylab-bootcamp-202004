
const { useState, useEffect } = React

function SearchResults({ query, onGoToSurfForecast, sportState, selectorState , token}) {

    const [spots, setSpots] = useState()
    const [users, setUsers] = useState()
    const [error, setError] = useState()
    const [spiner, setSpiner] = useState()

    useEffect(() => {
        // to clean the search and display only the error or the new results
        setError(undefined)
        setUsers(undefined)
        setSpots(undefined)
        if(selectorState === 'spots'){
            try{
                if(sportState === 'surf'){
                    searchSpotList(query, sportState, (spotsFound) => { 
                        if(spotsFound === undefined || spotsFound.length < 1){
                            setError('No results found..')
                        }else{
                            setSpots(spotsFound)
                        }
                    })
                }else{
                    searchSpotList(query, sportState, (spotsFound) => {
                        if(spotsFound === undefined || spotsFound.length < 1){
                            setError('No results found..')
                        }else{
                            setSpots(spotsFound)
                        }
                    })
                }
            }catch({message}){
                setError(message)
            }
        }else{
            typeof token != 'undefined' && setSpiner('on')
            try{
                searchUsers(token, query, (error, found) => {
                    setSpiner(undefined)
                    if(error){
                        setError(error)
                    }else{
                        if(found === undefined || found.length < 1){
                            setError('No results found..')
                        }else{
                            setUsers(found)
                        }
                    }
                })
                }catch({message}){
                    setSpiner(undefined)
                    setError(message)
                }
        }

    }, [query, selectorState]);
    return <ul className="SpotSearched">
        {spots && selectorState === 'spots' && spots.map((element) =>{
            return <li className='SpotSearched__item' onClick={() => onGoToSurfForecast(element)}>{`${element.name}`} </li>
        })}
        {users && selectorState !== 'spots' && users.map((element) =>{
            return <li className='SpotSearched__item'>{element.name} {element.surname} <br/> email: {element.username}</li>
        })}
        {error && selectorState === 'spots' && <Feedback message={error} level={'error'}/> } 
        {error && selectorState !== 'spots' && <Feedback message={error} level={'error'}/>}
        {spiner && sportState === 'surf' && <img className="Spiner" src='./images/spinerSurf.gif'/>}
        {spiner && sportState !== 'surf' && <img className="Spiner" src='./images/spinerSnow.gif'/>}
    </ul>
}

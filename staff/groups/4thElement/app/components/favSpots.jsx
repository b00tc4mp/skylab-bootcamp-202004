const { useState, useEffect } = React

function FavSpots({ token, movingSurfForecast, sportState }) {

    const [favSpots, setFavSpots] = useState()
    const [error, setError] = useState()
    const [spiner, setSpiner] = useState()

    useEffect(() => {
        setSpiner('on')
        try{
            favList(token, sportState, (error, favSpots) => {
                setSpiner(undefined)
                if (error) setError(error)
                if (favSpots.length < 1) setError('You dont have any favs to your list')
                setFavSpots(favSpots)
            })
        }catch({message}){
            setSpiner(undefined)
            setError(message)
        }
    },[]) // [token] trying wen upadate

    const onGoToSurfForecast = (surfForecastSelected) =>{
        movingSurfForecast(surfForecastSelected)
    }

    return <section className="Favorites">
        {favSpots && <FavSpotsList token={token} results={favSpots} onGoToSurfForecast={onGoToSurfForecast} sportState={sportState}/>}
        {spiner && sportState === 'surf' && <img className="Favorites__Spiner" src='./images/spinerSurf.gif'/>}
        {spiner && sportState !== 'surf' && <img className="Favorites__Spiner" src='./images/spinerSnow.gif'/>}
        {error && <Feedback message={ error } level={'error'}/>} 
    </section>
} //handel the charging phase sow it shows a spinwe or some like that instead of the error message (with a stater chargin in the asincron callback parobably)
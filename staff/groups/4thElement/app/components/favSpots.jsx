const { useState, useEffect } = React

function FavSpots({ token }) {

    const [favSpots, setFavSpots] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        try{
            favList(token, (error, favSpots) => {
                if (error) setError(error)
                
                setFavSpots(favSpots)
            })
        }catch({message}){
            setError(message)
        }
    },[]) // [token] trying wen upadate

    return <section className="Favorites">
        {favSpots && <FavSpotsList results={favSpots}/>}
        {!favSpots && <Feedback message={ error ? error : 'You dont have any favs to your list'} level={'error'}/>} 
    </section>
} //handel the charging phase sow it shows a spinwe or some like that instead of the error message (with a stater chargin in the asincron callback parobably)
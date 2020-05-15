const { useState, useEffect } = React

function Favorites({ token, handleMusicTool}) {debugger

    const [favorites, setFavorites] = useState(undefined)
    const [error, setError] = useState(undefined)
    

    useEffect(() => {debugger
    try{
        retrieveFavorites(token, (error, results) => {
            if(error) console.log(error)
            setFavorites(results)
        })
    
    }catch(error) {if(error) setError(error)}
    },[])

    const onMusicTool = (event, preview_url) => {
        event.preventDefault()
        if(!preview_url) setError('🤑 You have to buy premium app 💸')
        if(preview_url) setError(undefined)
        handleMusicTool(preview_url)
    }

debugger
    return <section className="favorites">
        {/* <h2 className= "favorite__head-title">Music that i love</h2>
        <section className="favorite__artist">
            <h2 className ="favorite__title">Artist</h2>
            <ul className="favorite__list"> 
                {favorites && favorites.favoriteArtist.map(({images, name}) => {
                    return  <li className = "favorite__items">
                    <h2>{name}</h2>
                    <img className="album__img" src={images} />
                    
                </li>
                })}
        
            </ul>
        </section>
        <section className="favorite__album">
            <h2 className="favorite__album">Albums</h2>
            <ul className="favorite__list"> 
                {favorites  && favorites.favoriteAlbum.map(({image, name}) => {
                    return  <li className="favorite__items">
                    <h2>{name}</h2>
                    <img className="album__img"src={image} />
                    
                </li>
                })}
        
            </ul>
        </section>
        <section className="favorite__track">
            <h2 className="favorite__">Songs</h2>
            <ul className="favorite__list"> 
                {favorites && favorites.favoriteTrack.map(({name,artistName, preview_url}) => {
                    return  <li>
                    <a src={preview_url}><h2 >{name}</h2></a> 
                        <p>{artistName}</p>
                </li>
                })}
        
            </ul>
            {error && <Feedback error={error} />}
         </section> */}
        <h2 className= "favorites__head-title">Music that i love</h2>
        <section className="favorite__artist">
            <h2 className ="favorite__title">Artist</h2>
            <ul className="favorite__list"> 
                {favorites && favorites.favoriteArtist.map(({images, name}) => {
                    return  <li className = "favorite__items">
                    <h2>{name}</h2>
                    <img className="album__img" src={images} />
                    
                </li>
                })}
        
            </ul>
        </section>
        <section className="favorite__album">
            <h2 className="favorite__title">Albums</h2>
            <ul className="favorite__list"> 
                {favorites  && favorites.favoriteAlbum.map(({image, name}) => {
                    return  <li className="favorite__items">
                    <h2>{name}</h2>
                    <img className="album__img"src={image} />
                    
                </li>
                })}
        
            </ul>
        </section>
        <section className="favorite__track">
            <h2 className="favorite__title">Songs</h2>
            <ul className="favorite__list"> 
                {favorites && favorites.favoriteTrack.map(({name,artistName, preview_url}) => {
                    return  <li className="favorite__items">
                    <a src="" onClick={() => {onMusicTool(event,preview_url)}}><h2 >{name}</h2></a> 
                        <p>{artistName}</p>
                </li>
                })}
                    {error && <Feedback message={error} />}

            </ul>
         </section>
    </section>

}


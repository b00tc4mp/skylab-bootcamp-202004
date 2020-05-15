const { useState, useEffect } = React

function Favorites({ token}) {debugger

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
debugger
    return <section className="favorite">
        <h2 className= "favorite__title">Music that i love</h2>
        <section className="favorite__artist">
        <h2 className ="favorite__title--artist">Artist</h2>
        <ul className="favorite__list"> 
            {favorites && favorites.favoriteArtist.map(({images, name}) => {
                return  <li className = "favorite__items">
                   <h2>{name}</h2>
                   <img class="album__img" src={images} />
                   
               </li>
            })}
    
        </ul>
        </section>
        <section className="favorite__album">
            <h2>Albums</h2>
        <ul className="favorite__list"> 
            {favorites  && favorites.favoriteAlbum.map(({image, name}) => {
                return  <li className="favorite__items">
                   <h2>{name}</h2>
                   <img class="album__img"src={image} />
                   
               </li>
            })}
    
        </ul>
        </section>
        <h2>Songs</h2>
        <section className="favorite__track">
        <ul className="favorite__list"> 
            {favorites && favorites.favoriteTrack.map(({name,artistName, preview_url}) => {
                return  <li>
                   <a src={preview_url}><h2 >{name}</h2></a> 
                    <p>{artistName}</p>
               </li>
            })}
    
        </ul>
    {error && <Feedback error={error} />}
    </section>
    </section>

}


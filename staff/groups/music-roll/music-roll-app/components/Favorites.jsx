const { useState, useEffect } = React

function Favorites({ token}) {debugger

    const [favorites, setFavorites] = useState(undefined)

    useEffect(() => {debugger
        console.log('hola he entrado')
        retrieveFavorites(token, (error, results) => {
            if(error) console.log(error)
            setFavorites(results)
        })
    },[])
debugger
    return <section className="favorites">
        <h2>Music that i love</h2>
        
        <ul> 
            {favorites && favorites.favoriteArtist.map(({images, name}) => {
                return  <li>
                   <img src={images} />
                   <p>{name}</p>
               </li>
            })}
    
        </ul>
        <ul> 
            {favorites  && favorites.favoriteAlbum.map(({image, name}) => {
                return  <li>
                   <img src={image} />
                   <p>{name}</p>
               </li>
            })}
    
        </ul>
        <ul> 
            {favorites && favorites.favoriteTrack.map(({name,artistName, preview_url}) => {
                return  <li>
                    <h2>{artistName}</h2>
                    <audio controls src={preview_url}></audio>
                   <p>{name}</p>
               </li>
            })}
    
        </ul>


    </section>

}


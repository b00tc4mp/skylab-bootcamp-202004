const { useState, useEffect } = React

function AlbumResults({ results, token, spotyToken, onSessionExpired, handleMusicTool }) {

    const [albumTracks, setAlbumTracks] = useState(undefined);

    useEffect(() => {
        setAlbumTracks(undefined);
    }, [results]);
    
    function handleOnAlbum(id) {
        searchAlbumTracks(id, spotyToken, (error, resultsTracks) => {
            if (error) console.log(error)
            setAlbumTracks(resultsTracks)
        })
    };

    function handleToggleAlbum(name, image) {
        const favorite = {name,image}
        const flag = 'favoriteAlbums'

        

        toggleFavoriteMusic(flag,token,favorite, error => {
            if (error && error.message === 'Invalid token') onSessionExpired()

        })
    };

    return <>
        {results.length ? <ul>
            {
                results.map(({ name, id, artistsArray, image }) => {
                    return <li className="disc-list">
                        <h2 className="disc-list__title">{`${name}`}</h2> <h1 className="disc-list__artist">{`${artistsArray.join()}`} </h1><a href="" onClick={(event) => {
                            event.preventDefault()
                            handleOnAlbum(id)

                        }}><img className="disc-list__image" src={image}/></a><button className="disc-list__btn" onClick={()=>handleToggleAlbum(name,image)}>I like it!</button> 
                    </li>
                })
            }
        </ul> : console.error("fail")}

        {albumTracks && <ResultsTracks albumTracks={albumTracks} handleMusicTool={handleMusicTool}/>} 
    </>
}
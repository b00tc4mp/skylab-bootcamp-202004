const { useEffect, useState } = React

function ArtistResults({ results, token,spotyToken, handleMusicTool, handleError }) {


    const [artistGreatestHits, setArtistGreatestHits] = useState(undefined)
    const [artistResults, setArtistResults] = useState(undefined);

    useEffect(() => {
        setArtistGreatestHits(undefined);
    }, [results]);

    
    function handleOnArtist(id) {
        searchArtistGreatestHits(id, spotyToken, (error, hitsResults) => {
            if (error) console.log(error)
            setArtistGreatestHits(hitsResults)
        })
    };
    
    
   
    function handleToogleArtist(name, images) {
        const flag = 'favoriteArtist'
        const favorite = { name, images }
        toggleFavoriteMusic(flag, token, favorite, (error, results) => {

        })

    }



    return <>
        {results.length ? <ul className="artist-list">
            {
                results.map(({ name, id, images }) => {
                    return <li className="artist-list__item" key={`${id}`}><h2 className="artist-list__title">{`${name}`}</h2> <a onClick={(event) => {
                        event.preventDefault()
                        handleOnArtist(id)

                    }} href=""><img className="artist-list__image" src={`${images}`} width="100px" height="100px"></img></a><button className="artist-list__btn" onClick={() => handleToogleArtist(name, images)}>I like it!</button></li>
                })
            }

        </ul> : console.error("fail")}
    
        {artistGreatestHits && <ArtistsHits artistGreatestHits={artistGreatestHits} handleMusicTool={handleMusicTool} handleError={handleError}/>}
    </>
}
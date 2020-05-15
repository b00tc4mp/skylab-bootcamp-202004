const { useEffect, useState } = React

function ArtistResults({ results, token,spotyToken }) {


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
        {results.length ? <ul>
            {
                results.map(({ name, id, images }) => {
                    return <li key={`${id}`}>{`${name}`} <a onClick={(event) => {
                        event.preventDefault()
                        handleOnArtist(id)

                    }} href=""><img src={`${images}`} width="100px" height="100px"></img></a><button onClick={() => handleToogleArtist(name, images)}>I like it!</button></li>
                })
            }
        </ul> : console.error("fail")}
    
        {artistGreatestHits && <ArtistsHits artistGreatestHits={artistGreatestHits}/>}
    </>
}
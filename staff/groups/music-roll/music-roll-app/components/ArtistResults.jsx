function ArtistResults({ results,token}) {
    
    function handleToogleArtist(name,images){
    const flag = 'favoriteArtist'
    const favorite= {name,images}
    toggleFavoriteMusic(flag,token,favorite,(error,results) =>{
        
    })
    
    }
    
    
    
    return<>
        {results.length ? <ul className="artist-list">
            {
            results.map(({name, id, images}) => {
                return <li className="artist-list__item" key={`${id}`}>{`${name}`} <a href=""><img src={`${images}`} width="100px" height="100px"></img></a><button className="artist-list__btn" onClick={()=>handleToogleArtist(name,images)}>I like it!</button></li>
            })
        }
        </ul> : console.error("fail")}
    </>
}
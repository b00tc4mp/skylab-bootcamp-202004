const { useState, useEffect } = React

function AlbumResults({ results, token }) {
    

    const [albumTracks, setAlbumTracks] = useState(undefined)


   

        function handleOnAlbum(id) {debugger
            
            
             searchAlbumTracks(id, token, (error, resultsTracks) => {
                if (error) console.log(error)

                setAlbumTracks(resultsTracks)
                
            })

        }
    


    return <>
        {results.length ? <ul>
            {
                results.map(({ name, id, artistsArray, image }) => {
                    return <li><a href="" onClick={(event) => 
                        {event.preventDefault()
                        handleOnAlbum(id)}}><img src={image} /></a>
                        {`${artistsArray.join()} ${name}`} </li>

                })
            }
        </ul> : console.error("fail")}
    
    {albumTracks && <ResultsTracks albumTracks={albumTracks}/>  }
    </>
}

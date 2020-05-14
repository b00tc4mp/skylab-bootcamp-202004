const { useState, useEffect } = React

function AlbumResults({ results, token }) {
    const [albumTracks, setAlbumTracks] = useState(undefined)

    useEffect(() => {
        setAlbumTracks(undefined);
    }, [results]);

    function handleOnAlbum(id) {
        debugger
        searchAlbumTracks(id, token, (error, resultsTracks) => {
            if (error) console.log(error)
            setAlbumTracks(resultsTracks)
        })
    }

    return <>
        {results.length ? <ul className="disc-list">
            {
                results.map(({ name, id, artistsArray, image }) => {
                    return <li className="disc-list__item">
                        <h2 className="disc-list__title">{`${name}`}</h2>    <h5 className="disc-list__artist">{`${artistsArray.join()}`} </h5><a href="" onClick={(event) => {
                            event.preventDefault()
                            handleOnAlbum(id)
                        }}><img className="disc-list__image" src={image} /></a>
                    </li>
                })
            }
        </ul> : console.error("fail")}

        {albumTracks && <ResultsTracks albumTracks={albumTracks} />}
    </>
}

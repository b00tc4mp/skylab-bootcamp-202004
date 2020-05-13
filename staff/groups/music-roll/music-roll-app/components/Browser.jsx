const { useState, useEffect } = React

function Browser({ token }) {

    const [trackResults, setTrackResults] = useState(undefined)

    const [albumResults, setAlbumResults] = useState(undefined)

    const [playlistsResults, setPlaylistsResults] = useState(undefined)


    const handleSubmit = (event) => {
        debugger
        event.preventDefault()
        let { browser, query } = event.target
        browser = browser.value
        const browserquery = query.value


        if (browser === 'album') {
            searchAlbum(token, browserquery, (error, results) => {
                

                if (error) console.log(error)

                setAlbumResults(results)

            })
        }
        if (browser === 'artist') searchArtist()



        if (browser === 'track') searchTrack(token, browserquery, (error, results) => {


            if (error) console.log(error)

            setTrackResults(results)

            console.error("fail")


        })


        if (browser === 'playlist') searchPlaylist()

  
        if (browser === 'playlist') searchPlaylists(token, browserquery, (error, results) => {
            try{
                if (error) console.log(error)

                setPlaylistsResults(results)
            }catch{
                console.error("fail")
            }
        })

    }

    return <section className="browser">
       <section className ="browser__search">
        <h2 className="title">Browser</h2>
        <form className="browser__form" onSubmit={handleSubmit} >
            <select name="browser">
                <option defaultValue>Choose one:</option>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
                <option value="track">Track</option>
                <option value="playlist">Playlists</option>
            </select>
            <i></i>
            <input type="text" name="query" placeholder="What do you want to listen?" />
            <button>Submit</button>
        </form>
        </section>
        <section className="results">
            {trackResults && <TrackResults results={trackResults} />}

            {albumResults && <AlbumResults results={albumResults} token={token} />}

            {playlistsResults && <PlaylistsResults results={playlistsResults} />}


        </section>

    </section>
}

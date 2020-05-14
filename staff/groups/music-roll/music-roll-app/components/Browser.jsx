const { useState, useEffect } = React

function Browser({ token, spotyToken, onSessionExpired }){

const [trackResults, setTrackResults] = useState(undefined)

const [albumResults, setAlbumResults] = useState(undefined)

const [playlistsResults, setPlaylistsResults] = useState(undefined)

const [artistResults, setArtistResults] = useState(undefined);

const [error, setError] = useState(undefined)

const handleSubmit = (event) => {
    debugger
    event.preventDefault()
    let { browser, query } = event.target
    browser = browser.value
    const browserquery = query.value


    if (browser === 'album') {
        searchAlbum(spotyToken, browserquery, (error, results) => {

            if (error) setError('No matches found!')
           
            setAlbumResults(results)

        })
    }
    if (browser === 'artist') {
        searchArtist(spotyToken, browserquery, (error, results) => {
            try {
                if (error) throw new Error("fail")

                setArtistResults(results)
            } catch (error) {
                console.error(error.message)
            }
        })
    }



    if (browser === 'track') searchTrack(spotyToken, browserquery, (error, results) => {


        if (error) console.log(error)

        setTrackResults(results)

        console.error("fail")


    })



    if (browser === 'playlist') searchPlaylists(spotyToken, browserquery, (error, results) => {
        try {
            if (error) console.log(error)

            setPlaylistsResults(results)
        } catch{
            console.error("fail")
        }
    })

}


return <section className="browser-results">
    <h2 className="browser__title">Browser</h2>
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
    <section className="results">
        
        {error && <Feedback message={error}/>}

        {trackResults && <TrackResults results={trackResults} token={token} spotyToken={spotyToken} />}

        {albumResults && <AlbumResults results={albumResults} token={token} spotyToken={spotyToken} onSessionExpired={handleSessionExpired} />}

        {playlistsResults && <PlaylistsResults results={playlistsResults} token={token} />}

        {artistResults && <ArtistResults results={artistResults} token={token} spotyToken={spotyToken} />}


    </section>

</section>

}
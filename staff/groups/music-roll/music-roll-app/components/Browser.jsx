const { useState, useEffect } = React

function Browser({ token }) {

    const [trackResults, setTrackResults] = useState(undefined);
    const [artistResults, setArtistResults] = useState();

    const handleSubmit = (event) => {
        event.preventDefault()
        let { browser, query } = event.target
        browser = browser.value
        const browserquery = query.value


        if (browser === 'album') searchAlbum()
        if (browser === 'artist') searchArtist(token, browserquery, (error, results) => {
            try {
                if (error) throw new Error("fail")

                setArtistResults(results)
            } catch (error) {
                console.error(error.message)
            }
        })
       
        if (browser === 'track') searchTrack(token, browserquery, (error, results) => {
           
            try{
                if (error) console.log(error)

                setTrackResults(results)
            }catch{
                console.error("fail")
            }
            
        })
  
        if (browser === 'playlist') searchPlaylist()
    }

    return <section className="browser">
        <h2 className="title">Browser</h2>
        <form className="browser__form" onSubmit={handleSubmit} >
            <select name="browser">
                <option defaultValue>Choose one:</option>
                <option value="artist">Artist</option>
                <option value="album">Album</option>
                <option value="track">Track</option>
                <option value="playlists">Playlists</option>
            </select>
            <i></i>
            <input type="text" name="query" placeholder="What do you want to listen?" />
            <button>Submit</button>
        </form>
        <section className="results">
            {trackResults && <TrackResults results={trackResults} />}
            {artistResults && <ArtistResults results={artistResults} />}
        </section>
    </section>
}

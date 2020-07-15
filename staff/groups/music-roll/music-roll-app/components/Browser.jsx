const { useState, useEffect } = React

function Browser({ token, spotyToken, onSessionExpired, handleMusicTool }){


    const [trackResults, setTrackResults] = useState(undefined)


    const [albumResults, setAlbumResults] = useState(undefined)

    const [playlistsResults, setPlaylistsResults] = useState(undefined)

    const [artistResults, setArtistResults] = useState(undefined);

    const [error, setError] = useState(undefined)

    const handleSubmit = (event) => {
         
        event.preventDefault()
        let { browser, query } = event.target
        browser = browser.value
        const browserquery = query.value
        address.hash.query({ q: browserquery })


        if (browser === 'album') {
            try {
                searchAlbum(spotyToken, browserquery, (error, results) => {
                    setTrackResults(undefined)
                    setPlaylistsResults(undefined)
                    setArtistResults(undefined)
                    if (error) setError('No matches found!')
                    if (!error) setError(undefined)

                    setAlbumResults(results)

                })
            } catch (error) {
                if (error) setError('Somethings Wrong')
            }

        }
        if (browser === 'artist') {
            try {
                searchArtist(spotyToken, browserquery, (error, results) => {
                    setTrackResults(undefined)
                    setPlaylistsResults(undefined)
                    setAlbumResults(undefined)
                    if (error) setError('No matches found!')
                    if (!error) setError(undefined)
                    setArtistResults(results)

                })
            } catch (error) {
                if (error) setError('Somethings wrong')
            }


        }



        if (browser === 'track') {

            try {
                searchTrack(spotyToken, browserquery, (error, results) => {
                    setArtistResults(undefined)
                    setPlaylistsResults(undefined)
                    setAlbumResults(undefined)
                    
                    if (error) setError('No matches found!')
                    if (!error) setError(undefined)

                    setTrackResults(results)
                })

            } catch (error) {
                if (error) setError('Somethings Wrong')
            }

        }


        


        if (browser === 'playlist') {
            try {
                searchPlaylists(spotyToken, browserquery, (error, results) => {
                    setTrackResults(undefined)
                    setArtistResults(undefined)
                    setAlbumResults(undefined)
                    
                    if (error) setError(error)
                    if (!error) setError(undefined)

                    setPlaylistsResults(results)
                })
            } catch (error) {
                if (error) setError('Somethings wrong')
            }


        }

    }

    const handleError = (error) => {
        setError(error)
    }

    return <section className="browser-results">
        <section className="browser">
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
        </section>
        <section className="results">



            {trackResults && <TrackResults results={trackResults} token={token} spotyToken={spotyToken}  handleMusicTool={handleMusicTool} handleError={handleError}/>}

            {albumResults && <AlbumResults results={albumResults} token={token} spotyToken={spotyToken}  /* onSessionExpired={handleSessionExpired} */ handleMusicTool={handleMusicTool} handleError={handleError} />}


            {playlistsResults && <PlaylistsResults results={playlistsResults} token={token} />}

            {artistResults && <ArtistResults results={artistResults} token={token} spotyToken={spotyToken} handleMusicTool={handleMusicTool} handleError={handleError}/>}

        </section>

        {error && <Feedback message={error} />}

    </section>

}
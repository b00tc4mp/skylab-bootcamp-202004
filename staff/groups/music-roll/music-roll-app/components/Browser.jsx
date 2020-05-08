const {Usestate,UseEffect} = React

function Browser() {

const [viewResult, setViewResult] = setState(undefined)

const handleSubmit = (event) => {
    event.preventDefault()
    let {browser, query} = event.target
    browser = browser.value
    query = query.value
    let functionLauncher = browser
    
    if (functionLauncher === 'album') searchAlbum()
    if (functionLauncher === 'artist') searchArtist() 
    if (functionLauncher === 'track') searchTrack()
    if (functionLauncher === 'playlist') searchPlaylist()


    setViewResult(browser)

}

return <section class="browser">
            <h2>Browser</h2>
            <form onSubmit={handleSubmit}>
                <select name="browser">
                    <option selected>Choose one:</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                    <option value="track">Track</option>
                    <option value="playlists">Playlists</option>
                </select>
                <input type="text" name="query" placeholder="What do you want to listen?"/>
                <button>Submit</button>
            </form>     
{viewResult === 'album' && <AlbumResults/>}  
{viewResult === 'artist' && <ArtistResults/>}
{viewResult === 'track' && <TrackResults/>}
{viewResult === 'playlist' && <PlaylistResults/>}
        </section>
    
}

    
  
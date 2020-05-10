/* const {Usestate,UseEffect} = React



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

} */
function Browser() {
return <section class="browser">
            <h2 className="title">Browser</h2>
            <form className ="browser__form" /* onSubmit={handleSubmit} */ >
                <select name="browser__options">
                    <option selected>Choose one:</option>
                    <option value="artist">Artist</option>
                    <option value="album">Album</option>
                    <option value="track">Track</option>
                    <option value="playlists">Playlists</option>
                </select>
                <i></i>
                <input type="text" name="query" placeholder="What do you want to listen?"/>
                <button>Submit</button>
            </form>     
        <section className ="results">

        </section>
        </section>
    
}

    
  
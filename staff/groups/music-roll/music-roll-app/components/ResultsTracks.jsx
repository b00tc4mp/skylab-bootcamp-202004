function ResultsTracks({albumTracks, handleMusicTool}) { debugger

    const handleToggleMusicTool = (event, preview_url) => {
        event.preventDefault()
        debugger
        handleMusicTool(preview_url)
    }

    return <>
        {albumTracks.length ? <ol className="track-results">
            {
                albumTracks.map(({ name, preview_url}) => {
                    return <li className="track-results__item"> <a key={`${preview_url}`} onClick={(event) => {handleToggleMusicTool(event, preview_url)}}>{`${name}`}</a></li>

                })
            }
        </ol> : console.error("fail")}
    </>

}
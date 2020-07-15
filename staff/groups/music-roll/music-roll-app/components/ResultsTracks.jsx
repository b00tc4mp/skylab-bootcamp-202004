function ResultsTracks({albumTracks, handleMusicTool, handleError}) {  

    const onMusicTool = (event, preview_url) => {
        event.preventDefault()
    
        if(!preview_url) return handleError('🤑 You have to buy premium app 💸')
        if(preview_url) handleError(undefined)
        handleMusicTool(preview_url)
    
    }

    return <>
        {albumTracks.length ? <ol className="track-results">
            {
                albumTracks.map(({ name, preview_url}) => {
                    return <li className="track-results__item"> <a key={`${preview_url}`} onClick={() => {onMusicTool(event, preview_url)}}>{`${name}`}</a></li>

                })
            }
        </ol> : console.error("fail")}
    </>

}
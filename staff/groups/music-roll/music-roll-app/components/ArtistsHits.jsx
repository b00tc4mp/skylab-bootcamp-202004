function ArtistsHits({artistGreatestHits, handleMusicTool, handleError}){
const onMusicTool = (event, preview_url) => {
    event.preventDefault()

    if(!preview_url) return handleError('🤑 You have to buy premium app 💸')
    if(preview_url) handleError(undefined)
    handleMusicTool(preview_url)

}
return <>
        {artistGreatestHits.length ? <ol className="hits-results">
            {
                artistGreatestHits.map(({ name, preview_url}) => {
                    return <li className="hits-results__item"> <a href="" onClick={() => {onMusicTool(event, preview_url)}}>{`${name}`}</a></li>

                })
            }
        </ol> : console.error("fail")}
    </>

}
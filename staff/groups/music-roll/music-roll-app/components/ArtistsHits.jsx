function ArtistsHits({artistGreatestHits}){

return <>
        {artistGreatestHits.length ? <ol className="hits-results">
            {
                artistGreatestHits.map(({ name, preview_url}) => {
                    return <li> <a href={`${preview_url}`}>{`${name}`}</a><button>I like it</button></li>

                })
            }
        </ol> : console.error("fail")}
    </>

}
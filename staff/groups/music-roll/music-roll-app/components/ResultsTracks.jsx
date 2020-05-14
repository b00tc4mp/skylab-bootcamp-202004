function ResultsTracks({albumTracks}) { debugger

    return <>
        {albumTracks.length ? <ol className="track-results">
            {
                albumTracks.map(({ name, preview_url}) => {
                    return <li className="track-results__item"> <a href={`${preview_url}`}>{`${name}`}</a></li>

                })
            }
        </ol> : console.error("fail")}
    </>

}
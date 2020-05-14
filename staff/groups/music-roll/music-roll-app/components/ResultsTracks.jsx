function ResultsTracks({albumTracks}) { debugger

    return <>
        {albumTracks.length ? <ol className="track-results">
            {
                albumTracks.map(({ name, preview_url}) => {
                    return <li> <a href={`${preview_url}`}>{`${name}`}</a>button</li>

                })
            }
        </ol> : console.error("fail")}
    </>

}
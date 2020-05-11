function ResultsTracks({albumTracks}) { debugger

    return <>
        {albumTracks.length ? <ul>
            {
                albumTracks.map(({ name, preview_url}) => {
                    return <li> <a href={`${preview_url}`}>{`${name}`}</a></li>

                })
            }
        </ul> : console.error("fail")}
    </>

}
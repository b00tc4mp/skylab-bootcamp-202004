const {useState} = React
function AudioTool ({currentSong}) {
    debugger
    return <section className="audio-tool">
        <audio controls src={`${currentSong}`}/>
    </section>
}
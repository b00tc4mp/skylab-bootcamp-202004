const {useState} = React
function AudioTool ({currentSong}) {
     
    return <section className="audio-tool">
        <audio controls src={`${currentSong}`}/>
    </section>
}
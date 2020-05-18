const {useState, useEffect} = React
function AudioTool ({songsArray}) {
    
    const [currentSong, setCurrentSong] = useState()
    const [index, setIndex] = useState(0)
    const [name, setName] = useState()
    const [artistName, setArtistName] = useState()
    
    
    //$ grep -r components -e TODO
    //esto va a petar, mirar abajo
    //TODO botones para cancione siguiente y anterior
    
    useEffect(() => {
        if(songsArray) {
            setCurrentSong(songsArray[index].preview_url)
            setName(songsArray[index].artistName) 
            setArtistName(songsArray[index].name)
        }
    },[songsArray])

    const onEnd = () => {
        if(index>=songsArray.length-1) setIndex(0)
        else setIndex(index+1)
         
        setCurrentSong(songsArray[index].preview_url)
        setName(songsArray[index].artistName) 
        setArtistName(songsArray[index].name)

    }
    // debugger
    const handlePreviousSong = () => {debugger
        if(index === 0) setIndex(songsArray.length-1)
        else setIndex(index-1)
        setCurrentSong(songsArray[index].preview_url)
        setName(songsArray[index].artistName) 
        setArtistName(songsArray[index].name)

    }
    const handleNextSong = () => {
        if(index === songsArray.length-1) setIndex(0)
        else setIndex(index+1)
        setCurrentSong(songsArray[index].preview_url)
        setName(songsArray[index].artistName) 
        setArtistName(songsArray[index].name)

    }
    return <section className="audio-tools">
        <section className="audio-tools__controls">
        <i className="fas fa-step-backward" onClick={handlePreviousSong}></i><p className="audio-tools__song">{`${artistName !== undefined ? artistName +" - "+ name : ""}`}</p><i className="fas fa-step-forward" onClick={handleNextSong}></i>
        </section>
        <section className="audio-tools__player">
        <audio controls src={`${currentSong}`} onEnded={onEnd}/>
        </section>

    </section>
        
}
